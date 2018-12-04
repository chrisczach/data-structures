class Node {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor () {
    this.nodes = []
  }

//insert
insert(value, priority) {
  this.nodes.push(new Node(value, priority))
  this.bubbleUp()
}

bubbleUp(){
  let index = this.nodes.length - 1;
  const node = this.nodes[index];
  while(index > 0){
      let parentIndex = Math.floor((index - 1)/2);
      let parent = this.nodes[parentIndex];
      if(node.priority <= parent.priority) break;
      this.nodes[parentIndex] = node;
      this.nodes[index] = parent;
      index = parentIndex;
  }
}

//extract
}

let q = new PriorityQueue();
q.insert('low', 1);
q.insert('high', 9);
q.insert('low also', 2);
q.insert('another low', 4);
q.insert('higher', 10);
q.insert('another high', 8);