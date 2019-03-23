import {Annotation} from "./Annotation";

export class Peak {
  id: number;
  latitude: number;
  longitude: number;
  elevation: string;
  provenance: string;
  name: string;
  toBeAnnotated: boolean;
  localized_names: Array<string[]>;
  annotations: Annotation []


  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public hasConflict():boolean {
    if (this.annotations.length == 0) {
      return false;
    }
    let firstIsValid: boolean = this.annotations[0].valid;

    //check if conflicts exist
    for (let annotation of this.annotations) {
      if(annotation.valid != firstIsValid) {
        return true;
      };
    }
    //no conflicts exist false if loop finished without returning
    return false;
  }

  public hasRejectedAnnotations() {
    console.log('entered hasRejectedAnnotations');
    if (this.annotations.length == 0) {
      return false;
    }

    //check if rejected annotations exist
    for (let annotation of this.annotations) {
      if(!annotation.acceptedByManager) {
        return true;
      };
    }
    //no rejected annotations exist if loop finished without returning
    return false;
  }

}
