class HashTable {
  constructor() {
    this.data = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
  }

  hash(key, arrayLen = this.data.length) {
    let total = 0;
    let WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % arrayLen;
    }
    return total;
  }

  set(key, value) {
    const data = [key, value]
    const hash = this.hash(key);
    const slot = this.data[hash];
    const subIndex = slot.findIndex(e => e[0] === key)
    if (slot.length === 0 || subIndex === -1) {
      slot.push(data)
    } else {
      slot[subIndex] = data;
    }
    return this.data;
  }

  get(key) {
    const hash = this.hash(key);
    const slotLength = this.data[hash].length;
    if (slotLength === 0) {
      return 'key not found'
    } else if (slotLength === 1) {
      return this.data[hash][0];
    } else {
      return this.data[hash].find(e=> e[0] === key)
    }
  }
  keys() {
    const arr = [];
    this.data.forEach(e => {
      e.forEach(e2 => {
        arr.push(e2[0])
      })
    });
    return arr;
  }

  values() {
    const arr = [];
    this.data.forEach(e => {
      e.forEach(e2 => {
        if (arr.indexOf(e2[1]) === -1) {
          arr.push(e2[1])
        }
      })
    });
    return arr;
  }
}

const hash = new HashTable();
debugger
hash.set('testing', 1);
hash.set('another', 2);
hash.set('third', 3);
hash.set('fourth', 4);
hash.set('fifth', 'five');
hash.set('sixth', 1);
hash.set('7th', 2);