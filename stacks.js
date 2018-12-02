class Node {
  constructor(val) {
    this.val = val;
    this.next = null
  }
}

class Stack {
  constructor() {
    this.length = 0
    this.last = null
  }
  push(val) {
    const node = new Node(val);
    node.next = this.last;
    this.last = node;
    this.length++
    return this.last;
  }
  pop() {
    if (!this.last) return null;
    this.last = this.last.next;
    this.length--;
    return this.last;
  }
}