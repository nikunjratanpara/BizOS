import { createSelector } from "./createSelector";
import { MemoizedSelector } from "./MemoizedSelector";
export function createFeatureSelector<T>(featureName: string): MemoizedSelector<object, T> {
  return createSelector((state: any) => state[featureName], (featureState: any) => featureState);
}