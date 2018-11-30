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
    if (!this.head) {return !! (this.head = this.tail = node);}
    this.tail.next = node;
    this.tail  = node;
    return true;
  }

  pop(){
    const popped = this.tail;
    if(!this.head) {return false
    } else if(this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.length--;
    return popped;
  }
}

const list = new DoublyLinkedList();
list.push(1);
list.push(2);
list.push(3);

