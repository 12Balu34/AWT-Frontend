import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {icon, Map, tileLayer} from 'leaflet';
import {Peak} from "../../model/Peak";
import {MarkerColors} from "../../model/MarkerColors";
import {ActivatedRoute, Router} from "@angular/router";
import {PeakService} from "../../services/peak/peak.service";
import {Observable} from "rxjs/internal/Observable";
import {TSMap} from "typescript-map";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {AnnotationService} from "../../services/annotation/annotation.service";
import {AnnotationBase} from "../../model/Annotation";
import {MessageTimeout} from "../../app-constants/messageTimeout";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  private dtOptions: DataTables.Settings = {};
  private isManager;

  private campaignId: string;
  private peakListObservable: Observable<Peak[]>
  private peakList: Peak [];
  private selectedPeak: Peak;

  private annotationForm: FormGroup;
  private localizedNames: FormArray;

  private baselayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });
  private map: L.Map;
  private mapMarkers = new TSMap<string, L.Marker>();

  private message: string;
  private messageClass: string;


  options = {
    layers: [this.baselayer],
    zoom: 5,
    center: L.latLng([ 47, 8 ])
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private peakService: PeakService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private annotationService: AnnotationService
  ) {}

  ngOnInit() {
    this.isManager = this.authService.isManager();
    this.dtOptions = {
      pageLength: 2
    };
    this.createForm();
  }

  //--------- Methods related to the Annotation Form ----------
  private createForm(){
    this.annotationForm = this.formBuilder.group({
      valid: [true, Validators.required],
      name: ['', Validators.required],
      elevation: ['', Validators.required],
      localizedNames: this.formBuilder.array([this.createLocalizedName()])
    });
    this.localizedNames = this.annotationForm.get('localizedNames') as FormArray;
  }

  private createLocalizedName(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      language: ['', Validators.required]
    })
  }

  onMapReady(map: Map) {
    this.map = map;
    this.getPeakListObservable();
    this.subscribeToPeakListObservable();
  }

  addAllMarkers() {
    for (let peak of this.peakList) {
      this.addSingleMarker(peak);
    }
  }

  addSingleMarker(peak: Peak) {
    let color = this.resolveMarkerColor(peak);

    let marker = L.marker(
      [peak.latitude, peak.longitude],
      {
        icon: this.iconBuilder(this.resolveMarkerColor(peak)),
        title: peak.id.toString(),
        clickable: true
      })
      .on('click', this.onMarkerClick, this)
      .addTo(this.map);

      this.mapMarkers.set(peak.id.toString(), marker);
  }

  rejectAnnotation(peakId: number, annotationId: number) {
    this.updateRejectedMarkerColor(peakId.toString());
    this.annotationService.rejectAnnotation(+this.campaignId, peakId, annotationId)
      .subscribe(
      data => this.updateAnnotationStatus(false, annotationId),
      error => {
        this.message = error;
        this.messageClass = 'alert alert-danger alert-dismissible';
      }
    )

  }

  acceptAnnotation(peakId: number, annotationId: number) {
    this.annotationService.acceptAnnotation(+this.campaignId, peakId, annotationId)
      .subscribe(
        data => this.updateAnnotationStatus(true, annotationId),
        error => {
          this.message = error;
          this.messageClass = 'alert alert-danger alert-dismissible';
        }
      )
  }

  hasRejectedAnnotations(peak: Peak): boolean {
    if (peak.annotations.length == 0) {
      return false;
    }

    //check if rejected annotations exist
    for (let annotation of peak.annotations) {
      if(annotation.acceptedByManager != null && !annotation.acceptedByManager) {
        return true;
      };
    }
    //no rejected annotations exist if loop finished without returning
    return false;
  }

  addLocalizedName() {
    this.localizedNames.push(this.createLocalizedName());
    this.convertLocalizedPeaksToStringArray();
  }

  removeLastLocalizedName(){
    this.localizedNames.removeAt(this.localizedNames.length-1);
  }

  convertLocalizedPeaksToStringArray(): Array<string[]> {
    if(this.localizedNames.length == 0) {
      return null;
    }
    let tempArray = new Array<string[]>();

    for(let i = 0; i <this.localizedNames.length; i++) {
      let tempArrayComponent: string [] = new Array();
      tempArrayComponent.push(this.localizedNames.at(i).get('language').value);
      tempArrayComponent.push(this.localizedNames.at(i).get('name').value);
      tempArray.push(tempArrayComponent);
    }
    return tempArray;
  }

  createAnnotation(){
    const annotation: AnnotationBase = new AnnotationBase(
      this.annotationForm.get('name').value,
      +this.annotationForm.get('elevation').value,
      this.convertLocalizedPeaksToStringArray(),
      this.annotationForm.get('valid').value == true
    );

    this.annotationService.createAnnotation(+this.campaignId, this.selectedPeak.id, annotation)
      .subscribe(
        data => {
          this.message = data.message;
          this.messageClass = 'alert alert-success alert-dismissible';
          setTimeout(()=>this.resetMessage(), MessageTimeout);
          this.updateAnnotatedMarkerColor(this.selectedPeak.id.toString());
        },
        error => {
          this.message = error;
          this.messageClass = 'alert alert-danger alert-dismissible';
          setTimeout(()=>this.resetMessage(), MessageTimeout)
        }
      )
  }


  //--------- Methods for the Map and Markers -------------
  updateRejectedMarkerColor(peakId: string) {
    this.mapMarkers.get(peakId)
      .setIcon(
        this.iconBuilder(MarkerColors.Red)
      );
  }

  updateAnnotatedMarkerColor(peakId: string) {
    this.mapMarkers.get(peakId)
      .setIcon(
        this.iconBuilder(MarkerColors.Orange)
      );
  }

  resolveMarkerColor(peak: Peak): MarkerColors {
    let annotationsLenght: number = peak.annotations.length;

    if(!peak.toBeAnnotated) {
      return MarkerColors.Green;
    }
    if(annotationsLenght == 0 && peak.toBeAnnotated) {
      return MarkerColors.Yellow;
    }
    if(annotationsLenght > 0 && peak.toBeAnnotated) {
      if(this.hasRejectedAnnotations(peak)) {
        return MarkerColors.Red;
      }
      else return MarkerColors.Orange;
    }
    return MarkerColors.Blue;
  }

  iconBuilder(color: MarkerColors): L.Icon {
    return icon({
      iconUrl: 'assets/marker-icon-' + color + '.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  }

  onMarkerClick(event) {
    this.selectCurrentPeak(+event.sourceTarget.options.title);
  }

  selectCurrentPeak(peakId: number){
    for(let peak of this.peakList) {
      if (peak.id == peakId) {
        this.selectedPeak = peak;
      }
    }
  }


  //--------- Methods to get Peaks -------------
  private getPeakListObservable(){
    this.activatedRoute.paramMap.subscribe(
      data=> {
        this.campaignId = data.get('id');
        this.peakListObservable = this.peakService.getAllPeaks(this.campaignId);
      }
    )
  }

  private subscribeToPeakListObservable() {
    this.peakListObservable.subscribe(
      data => {
        this.peakList = data;
        this.addAllMarkers();
      },
      error => {
        console.log(error)
      }
    )
  }


  //--------- Utility method to hide reset and hide messages -------------
  private resetMessage() {
    this.messageClass = null;
    this.message = null;
  }

  private updateAnnotationStatus(isAccepted: boolean, annotationId: number) {
    for (let annotation of this.selectedPeak.annotations) {
      if(annotation.id == annotationId) {
        annotation.acceptedByManager = isAccepted;
        return;
      }
    }
  }
}
