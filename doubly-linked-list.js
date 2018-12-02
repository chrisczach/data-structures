class Node {
  constructor(val, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(val) {
    const node = new Node(val, null, this.tail);
    this.length++;
    if (!this.head) { return !!(this.head = this.tail = node); }
    this.tail.next = node;
    this.tail = node;
    return true;
  }

  pop() {
    const popped = this.tail;
    if (!this.head) {
      return false
    } else if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    popped.prev = null;
    this.length--;
    return popped;
  }

  shift() {
    const shifted = this.head;
    if (!this.head) {
      return false
    } else if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next
      this.head.prev = null;
    }
    shifted.next = null;
    this.length--;
    return shifted;
  }

  unshift(val) {
    if (val === undefined) { return false }
    const node = new Node(val);
    node.next = this.head;
    this.head = node;
    this.length++;
    return true;
  }

  get(index) {
    if (index < 0 || index >= this.length) return false;
    let node;
    if (index <= this.length / 2) {
      node = this.head
      for (let i = 0; i < index; i++) {
        node = node.next;
      }
    } else {
      node = this.tail;
      for (let i = index; i < this.length-1; i++) {
        node = node.prev;
      }
    }
    return node;
  }

  set(index, val) {
    const node = this.get(index);
    if (node === false) { return false };
    node.val = val;
    return true;
  }

  insert(index, val) {
    if (index < 0 || index > this.length) {
      return false
    } else if (index === 0) {
      return this.unshift(val)
    } else if (index === this.length) {
      return this.push(val)
    } else {
      const node = new Node(val);
      const insertPoint = this.get(index);
      if (insertPoint === false) { return false };
      node.next = insertPoint.next;
      node.prev = insertPoint;
      insertPoint.next = node;
      node.next.prev = node;
      this.length++;
      return true;
    }
  }

  remove(index) {
    const node = this.get(index);
    if (node === false) { return false };
    node.prev.next = node.next;
    node.next.prev = node.prev;
    node.next = null;
    node.prev = null;
    this.length--;
    return node;
  }
}


