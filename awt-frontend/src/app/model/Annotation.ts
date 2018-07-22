import {MinimalUser} from "./MinimalUser";

export class Annotation {

  id: number;
  creationDateTime: string;
  elevation: number;
  name: string;
  worker: MinimalUser;
  valid: boolean;
  acceptedByManager: boolean;
  localized_names:  Array<string[]>;
}
