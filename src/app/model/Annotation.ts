import {MinimalUser} from "./MinimalUser";

export class AnnotationBase {
  name: string;
  elevation: number;
  localized_names: Array<string[]>;
  valid: boolean;



  constructor(name: string, elevation: number, localized_names: Array<string[]>, valid: boolean) {
    this.name = name;
    this.elevation = elevation;
    this.localized_names = localized_names;
    this.valid = valid;
  }
}

export class Annotation extends AnnotationBase {
  id: number;
  creationDateTime: string;
  worker: MinimalUser;
  acceptedByManager: boolean;
  peakId: number;


  constructor(annotationBase: AnnotationBase, peakId: number) {
    super(annotationBase.name, annotationBase.elevation, annotationBase.localized_names, annotationBase.valid);
    this.peakId = peakId;
  }
}
