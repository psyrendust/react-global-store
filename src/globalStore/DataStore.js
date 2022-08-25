import EventEmitter from "eventemitter3";

export class DataStore extends EventEmitter {
  _head = -1;
  _size = 0;
  _uuid = null;
  _values = [];
  constructor(key) {
    super();
    this._uuid = key;
  }
  get canRedo() {
    return this._head < this._size - 1;
  }
  get canUndo() {
    return this._head > 0;
  }
  get value() {
    if (this._head < 0) return null;
    return this.getValueAt(this._head);
  }
  set value(state) {
    // eslint-disable-next-line no-undef
    const ref = new WeakRef(state);
    this._head++;
    this._values.length = this._head;
    this._values[this._head] = ref;
    this._size = this._head + 1;
    console.log("[test][value] set value", {
      head: this._head,
      size: this._size,
      values: this._values
    });
    this.emit("change");
  }
  get prevValue() {
    const index = this._head - 1;
    if (index < 0) return null;
    return this.getValueAt(index);
  }
  clear() {
    this._values.length = 0;
    this._size = 0;
    this._head = -1;
  }
  destroy() {
    this.clear();
    this._uuid = null;
    this._values = null;
    this._size = null;
  }
  getValueAt(index) {
    if (index >= 0 && index < this._size) {
      const ref = this._values[index];
      return ref.deref();
    } else {
      throw new RangeError(
        `${index} is out of range of [0, ${this._size - 1}]`
      );
    }
  }
  toString() {
    return {
      _uuid: this._uuid,
      _head: this._head,
      _size: this._size,
      _values: this._values.map((value) => value.deref())
    };
  }
  undo() {
    if (this.canUndo) {
      this._head--;
      this.emit("change");
    }
  }
  redo() {
    if (this.canRedo) {
      this._head++;
      this.emit("change");
    }
  }
}
