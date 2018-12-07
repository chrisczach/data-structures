class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class Queue {
  constructor() {
    this.length = 0;
    this.start = null;
    this.end = null;
  }

  push(val) {
    const node = new Node(val);
    node.next = this.start;
    if(this.start) {this.start.prev = node};
    this.start = node;
    if (this.end === null) { this.end = node };
    this.length++;
    return node;
  }

  pop() {
    if(this.head === null) {return null}
    const popped = this.end;
    this.end = this.end.prev;
    popped.next = null;
    popped.prev = null;
    return popped;
  }

  }
