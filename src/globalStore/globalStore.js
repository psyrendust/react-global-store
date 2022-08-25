import { getGlobal } from "./getGlobal";
import { DataLake } from "./DataLake";

export class GlobalStore {
  data = new DataLake();
  fetchCache = new Map();
  version = 1;
}

let canMergeGlobalStore = true;
export let globalStore = (function () {
  let global = getGlobal();
  if (global.__gwInstanceCount > 0 && !global.__gwGlobalStore)
    canMergeGlobalStore = false;
  if (
    global.__gwGlobalStore &&
    global.__gwGlobalStore.version !== new GlobalStore().version
  ) {
    canMergeGlobalStore = false;
  }
  let instance;
  if (!canMergeGlobalStore) {
    instance = new GlobalStore();
  } else if (global.__gwGlobalStore) {
    global.__gwInstanceCount += 1;
    instance = global.__gwGlobalStore;
  } else {
    global.__gwInstanceCount = 1;
    global.__gwGlobalStore = new GlobalStore();
    instance = global.__gwGlobalStore;
  }
  return instance;
})();

export function getGlobalStore() {
  return globalStore;
}
