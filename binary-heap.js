class Node {
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
  }
}
class BinaryHeap {
  constructor(minOrMax = 'min') {
    this.sortBy = minOrMax;
    this.values = [];
  }

  compare(node, parent) {
    if (this.sortBy === 'max') {
      return node && parent && node.priority > parent.priority;
    } else {
      return node && parent && node.priority < parent.priority;
    }
  }
  insert(value, priority) {
    this.values.push(new Node(value, priority));
    let index = this.values.length - 1;
    let parent = Math.floor((index - 1) / 2);

    while (this.compare(this.values[index], this.values[parent])) {
      [this.values[index], this.values[parent]] = [
        this.values[parent],
        this.values[index]
      ];
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
    return this;
  }

  extract() {
    const values = this.values;
    if (values.length === 0) return null;
    if (values.length === 1) return values.pop();
    if (values.length === 2) {
      if (this.compare(values[0], values[1])) {
        return values.shift();
      } else {
        return values.pop();
      }
    }
    [values[0], values[values.length - 1]] = [
      values[values.length - 1],
      values[0]
    ];
    const ans = values.pop();
    let index = 0;
    let left = 2 * index + 1;
    let right = 2 * index + 2;
    while (
      this.compare(values[left], values[index]) ||
      this.compare(values[right], values[index])
    ) {
      if (this.compare(values[left], values[right])) {
        if (left >= values.length) return ans;
        [values[index], values[left]] = [values[left], values[index]];
        index = left;
        left = 2 * index + 1;
      } else {
        if (right >= values.length) return ans;
        [values[index], values[right]] = [values[right], values[index]];
        index = right;
        right = 2 * index + 2;
      }
    }
    return ans;
  }
}

const heap = new BinaryHeap('max');
heap.insert('testing', 5);
heap.insert('testing', 1);
heap.insert('testing', 3);
heap.insert('testing', 7);
heap.insert('testing', 2);

module.exports = BinaryHeap;