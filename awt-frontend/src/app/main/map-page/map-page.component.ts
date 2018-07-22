import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {icon, Map, tileLayer} from 'leaflet';
import {Peak} from "../../model/Peak";
import {MarkerColors} from "../../model/MarkerColors";
import {ActivatedRoute, Router} from "@angular/router";
import {PeakService} from "../../services/peak/peak.service";
import {Observable} from "rxjs/internal/Observable";
import {TSMap} from "typescript-map";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  private peakListObservable: Observable<Peak[]>
  private peakList: Peak [];
  private baselayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });
  map: L.Map;
  selectedPeak: Peak
  mapMarkers = new TSMap<string, L.Marker>()


  options = {
    layers: [this.baselayer],
    zoom: 5,
    center: L.latLng([ 47, 8 ])
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private peakService: PeakService,
  ) {}

  ngOnInit() {

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
        icon: icon({
        iconUrl: 'assets/marker-icon-' + color + '.png',
        shadowUrl: 'assets/marker-shadow.png'
      }),
      title: peak.id.toString(),
      clickable: true
      })
      .on('click', this.onMarkerClick, this)
      .addTo(this.map)

      this.mapMarkers.set(peak.id.toString(), marker);
  }

  private resolveMarkerColor(peak: Peak): MarkerColors {
    let annotationsLenght: number = peak.annotations.length;

    if(!peak.toBeAnnotated) {
      return MarkerColors.Green;
    }
    if(annotationsLenght == 0 && peak.toBeAnnotated) {
      return MarkerColors.Yellow;
    }
    if(annotationsLenght > 0 && peak.toBeAnnotated) {
      return MarkerColors.Orange;
    }
    if (peak.hasConflict()) {
      return MarkerColors.Red;
    }
    return MarkerColors.Blue;
  }


  iconBuilder(color: MarkerColors): L.Icon {
    return icon({
      iconUrl: 'assets/marker-icon-' + color + '.png',
      shadowUrl: 'assets/marker-shadow.png'
    })
  }


  private getPeakListObservable(){
    this.activatedRoute.paramMap.subscribe(
      data=> {
        this.peakListObservable = this.peakService.getAllPeaks(data.get('id'));
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
}
