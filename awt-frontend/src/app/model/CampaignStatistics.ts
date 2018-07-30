import {MinimalPeak} from "./MinimalPeak";
import {AnnotationConflict} from "./AnnotationConflict";

export class CampaignStatistics {
  numberOfStartedPeaks: number;
  numberOfAnnotatedPeaks: number;
  numberOfPeaksWithRejectedAnnotations: number;
  numberOfConflicts: number;

  annotatedPeaks: MinimalPeak[];
  annotatedPeaksWithRejectedAnnotations: MinimalPeak[];
  conflicts: AnnotationConflict[];

}
