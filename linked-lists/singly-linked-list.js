class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  push(val) {
    const node = new Node(val);
    if (!this.head) {
      this.tail = node;
      this.head = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  pop() {
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      let poppedValue = this.head;
      [this.head, this.tail, this.length] = [null, null, 0];
      return poppedValue;
    }
    this.tail = this.get(this.length - 2);
    const poppedValue = this.tail.next;
    this.tail.next = null;
    this.length--;
    return poppedValue;
  }

  shift() {
    if (this.length === 0) return undefined;
    if (this.length === 1) this.tail = null;
    const shiftValue = this.head;
    this.head = this.head.next;
    this.length--;
    return shiftValue;
  }

  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.tail = node;
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }

  set(index, value) {
    if (index < 0 || index >= this.length) return false;
    this.get(index).val = value;
    return true;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      return false;
    } else if (index === 0) {
      return !!this.unshift(value);
    } else if (index === this.length) {
      return !!this.push(value);
    } else {
      const node = new Node(value);
      const prevNode = this.get(index - 1);
      const nextNode = prevNode.next;
      prevNode.next = node;
      node.next = nextNode;
      this.length++;
      return true;
    }
  }

  remove(index) {
    if (index < 0 || index > this.length) {
      return false;
    } else if (index === 0) {
      return this.shift();
    } else if (index === this.length - 1) {
      return this.pop();
    } else {
      const prevNode = this.get(index - 1);
      const removeNode = prevNode.next;
      const nextNode = removeNode.next;
      prevNode.next = nextNode;
      this.length--;
      return removeNode;
    }
  }
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let prev = null;
    let next = null;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next

    }
    return this
  }

  print() {
    const arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

const list = new SinglyLinkedList();
list.push('index 0');
list.push('index 1');
list.push('index 2');
list.push('index 4');
list.push('index 5');
list.get(3);
list.insert(3, 'index 3');
list.get(3);
