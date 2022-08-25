import { DataStore } from "./DataStore";

export class DataLake {
  _lake = new Map();
  clear() {
    for (const [uuid] of this._lake) {
      this.delete(uuid);
    }
  }
  delete(key) {
    if (this._lake.has(key)) {
      const store = this._lake.get(key);
      store.destroy();
      this._lake.delete(key);
    }
  }
  get(key, createIfMissing) {
    if (!this._lake.has(key) && createIfMissing) {
      this._lake.set(key, new DataStore(key));
    }
    return this._lake.get(key);
  }
  has(key) {
    return this._lake.has(key);
  }
  set(key, value) {
    const store = this._lake.get(key, true);
    store.value = value;
  }
}
