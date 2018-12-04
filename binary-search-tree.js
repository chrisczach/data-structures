class Node {
  constructor(val) {
    this.value = val;
    this.left;
    this.right;
  }
}

class BinarySearchTree {
  constructor() {
    this.root;
  }
  insert(val) {
    const node = new Node(val);
    if (!this.root) {
      this.root = node;
      return this;
    }
    
    const recur = (currNode) => {
      if (val < currNode.value) {
        if (currNode.left) {
          return recur(currNode.left)
        } else {
          currNode.left = node;
          return this;
        }
      } else {
        if (currNode.right) {
          return recur(currNode.right)
        } else {
          currNode.right = node;
          return this;
        }
      }
    }

    recur(this.root)
  }

  find(val, node = this.root) {
        if (!node) {
        return false
        } else if (node.value === val) {
          return node
        } else if (val < node.value) {
          if(!node.left) {return false}
        return this.find(val, node.left)
        } else {
          if(!node.right) {return false}
        return this.find(val, node.right)
      }
  }

  bfs() {
    const visited = [];
    const q = [this.root];

    while (q.length > 0) {
      if (q[0].left) q.push(q[0].left)
      if (q[0].right) q.push(q[0].right)
      visited.push(q.shift().value)
    }
    return visited;
  }

  dfsPreOrder(node = this.root) {
    const left = node.left ? this.dfsPreOrder(node.left) : [];
    const right = node.right ? this.dfsPreOrder(node.right) : [];
    return [node.value,...left, ...right]
  }
  dfsPostOrder(node = this.root) {
    const left = node.left ? this.dfsPostOrder(node.left) : [];
    const right = node.right ? this.dfsPostOrder(node.right) : [];
    return [...left, ...right, node.value]
  }

  dfsInOrder(node = this.root) {
    const left = node.left ? this.dfsInOrder(node.left) : [];
    const right = node.right ? this.dfsInOrder(node.right) : [];
    return [...left, node.value, ...right]
  }
}

const test = new BinarySearchTree();
test.insert(5);
test.insert(1);
test.insert(0);
test.insert(2);
test.insert(7);
test.insert(6);
test.insert(9);

