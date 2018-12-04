class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(val) {
    this.values.push(val);
    let index = this.values.length - 1;
    let parent = Math.floor((index - 1) / 2);
    while (this.values[index] > this.values[parent]) {
      [this.values[index], this.values[parent]] = [this.values[parent], this.values[index]];
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
    return this;
  }

  extract() {
    const val = this.values;
    if (val.length === 0) return null;
    if (val.length === 1) return val.pop();
    if (val.length === 2) {
      if (val[0] > val[1]) {
        return val.shift();
      } else {
        return val.pop();
      }
    }
    [val[0], val[val.length - 1]] = [val[val.length - 1], val[0]];
    const ans = val.pop();
    let index = 0;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    while (val[left] > val[index] || val[right] > val[index]) {
      if (val[left] >= val[right]) {
        if (left >= val.length) return ans;
        [val[index], val[left]] = [val[left], val[index]];
        index = left;
        left = 2 * index + 1;
      } else {
        if (right >= val.length) return ans;
        [val[index], val[right]] = [val[right], val[index]];
        index = right;
        right = 2 * index + 2;
      }

    }

    return ans;
  }
}

const heap = new MaxBinaryHeap();
heap.insert(1);
heap.insert(2);
heap.insert(5);
heap.extract();

