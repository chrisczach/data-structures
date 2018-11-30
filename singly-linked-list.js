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
     [this.head,  this.tail,  this.length ] = [null, null, 0]
      return poppedValue;
    }
    this.tail = this.get(this.length-2);
    const poppedValue = this.tail.next;
    this.tail.next = null;
    this.length--;
     return poppedValue;
  }

  shift() {
    if(this.length === 0) return undefined
    if(this.length === 1) this.tail = null
    const shiftValue = this.head;
    this.head = this.head.next;
    this.length--;
    return shiftValue
    
  }

  unshift(val) {
    const node = new Node(val);
    if (!this.head) {
      this.tail =  node;
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    return node;
  }

  get (index) {
    if(index < 0 || index >= this.length) return null
    let node = this.head;
    for(let i = 0; i < index; i ++){
      node = node.next;
    }
    return node 
  }
}

const list = new SinglyLinkedList();
list.push('index 0');
list.push('index 1');
list.push('index 2');
list.push('index 3');
list.push('index 4');
list.push('index 5');
list.pop()

list.get(4)
list.get(5)