class Node {
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.nodes = [];
  }

  insert(val, priority) {
    const nodes = this.nodes;
    nodes.push(new Node(val, priority));
    let index = nodes.length - 1;
    let parent = Math.floor((index - 1) / 2);
    while (nodes[index].priority > nodes[parent].priority) {
      [nodes[index], nodes[parent]] = [nodes[parent], nodes[index]];
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
    return this;
  }

  extract() {
    const nodes = this.nodes;
    if (nodes.length === 0) return null;
    if (nodes.length === 1) return nodes.pop();
    if (nodes.length === 2) {
      if (nodes[0].priority > nodes[1].priority) {
        return nodes.shift();
      } else {
        return nodes.pop();
      }
    }
    [nodes[0], nodes[nodes.length - 1]] = [nodes[nodes.length - 1], nodes[0]];
    const ans = nodes.pop();
    let index = 0;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    while (nodes[left].priority > nodes[index].priority || nodes[right].priority > nodes[index].priority) {
      if (nodes[left].priority >= nodes[right].priority) {
        if (left >= nodes.length) return ans;
        [nodes[index], nodes[left]] = [nodes[left], nodes[index]];
        index = left;
        left = 2 * index + 1;
      } else {
        if (right >= nodes.length) return ans;
        [nodes[index], nodes[right]] = [nodes[right], nodes[index]];
        index = right;
        right = 2 * index + 2;
      }

    }

    return ans;
  }
}

const q = new PriorityQueue();
q.insert('test 5', 5);
q.insert('test 4', 4);
q.insert('test 6', 6);
q.insert('test 1', 1);
q.insert('test 2', 2);
q.insert('test 3', 3);
debugger;
q.extract();