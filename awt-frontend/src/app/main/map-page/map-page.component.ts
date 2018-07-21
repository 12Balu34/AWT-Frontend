import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {icon, Map, marker, tileLayer} from 'leaflet';
import {Peak} from "../../model/Peak";
import {MarkerColors} from "../../model/MarkerColors";
import {ActivatedRoute, Router} from "@angular/router";
import {PeakService} from "../../services/peak/peak.service";
import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs/internal/Subject";

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


  options = {
    layers: [],
    zoom: 5,
    center: L.latLng([ 47, 8 ])
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private peakService: PeakService
  ) {
    this.eventSubject
      .subscribe((v) => { console.log(v) } );
  }

  ngOnInit() {
    this.getPeakListObservable();
    this.subscribeToPeakListObservable();
  }

  addAllMarkers() {
    console.log('accessed addAllMarkers');
    this.options.layers.push(this.baselayer);

    for (let peak of this.peakList) {
      this.addSingleMarker(peak);
    }
  }

  addSingleMarker(peak: Peak) {
    console.log('accessed addSingleMarker');
    this.options.layers.push(
      this.markerBuilder(peak)
    );
  }

  markerBuilder(peak: Peak){
    console.log('accessed markerBuilder');
    let color = this.resolveMarkerColor(peak);
    return marker(
      [peak.latitude, peak.longitude],
      {
        icon: this.iconBuilder(color),
        title: peak.id.toString(),
        clickable: true
      }
    )
  }

  private resolveMarkerColor(peak: Peak): MarkerColors {
    console.log('accessed resolveMarkerColor');
    let annotationsLenght: number = peak.annotations.length;

    if(!peak.toBeAnnotated) {
      console.log('returned green');
      return MarkerColors.Green;
    }
    if(annotationsLenght == 0 && peak.toBeAnnotated) {
      console.log('returned yellow');
      return MarkerColors.Yellow;
    }
    if(annotationsLenght > 0 && peak.toBeAnnotated) {
      console.log('returned orange');
      return MarkerColors.Orange;
    }
    if (peak.hasConflict()) {
      console.log('returned red');
      return MarkerColors.Red;
    }
    console.log('returned green');
    return MarkerColors.Blue;
  }


  iconBuilder(color: MarkerColors) {
    console.log('accessed iconBuilder')
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
        console.log('Received data with length: ' + data.length)
        this.peakList = data;
        this.addAllMarkers();
      },
      error => {
        console.log(error)
      }
    )
  }

  eventSubject = new Subject<string>();

  onMapReady(map: Map) {
    this.map = map;
    L.marker([51.5, -0.09]).addTo(this.map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();  }

  onMapClick(e) {
    console.log(e.marker.title)
  }

}
