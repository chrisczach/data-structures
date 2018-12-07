const BinaryHeap = require('./binary-heap');

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(value) {
    return this.adjacencyList[value]
      ? 'Vertex already exist'
      : (this.adjacencyList[value] = []) && `Vertex ${value} has been added`;
  }

  addEdge(from, to, weight, oneDirection = false) {
    const list = this.adjacencyList;
    if (!list[from] || !list[to]) {
      const missing =
        !list[from] && !list[to]
          ? `${from} and ${to} are `
          : !list[from]
          ? `${from} is`
          : `${to} is`;
      return `Vertex ${missing} invalid`;
    }
    if (list[from].indexOf(to) !== -1) {
      return `${from} and ${to} edge already exist`;
    }

    list[from].push({ node: to, weight });
    list[from].sort();
    if (!oneDirection) {
      list[to].push({ node: from, weight });
      list[to].sort();
      return `${from} and ${to} edge added`;
    } else {
      return `${from} and ${to} one way edge added`;
    }
  }

  removeVertex(vertex) {
    const list = this.adjacencyList;
    if (!list[vertex]) return `Vertex ${vertex} doesn't exist`;
    list[vertex].forEach(v2 => this.removeEdge(vertex, v2.node));
    return `Vertex ${delete list[vertex] && vertex} has been removed`;
  }

  removeEdge(start, end, oneDirection = false) {
    const list = this.adjacencyList;
    if (!list[start] || !list[end]) {
      const missing =
        !list[start] && !list[end]
          ? `${start} and ${end} are `
          : !list[start]
          ? `${start} is`
          : `${end} is`;
      return `Vertex ${missing} invalid`;
    }

    if (list[start].findIndex(e => e.node === end) === -1) {
      return `${start} and ${end} edge doesn't exist`;
    }
    list[start] = list[start].filter(e => e.node !== end);
    if (oneDirection) {
      return `${start} to ${end} direction edge removed`;
    } else {
      list[end] = list[end].filter(e => e.node !== start);
      return `${start} and ${end} edge removed`;
    }
  }

  shortestPath(start, end) {
    const nodes = new BinaryHeap('min'); //MinBinaryHeap for queueing unvisited nodes
    const distances = {};
    const previous = {};
    const path = [end];
    let smallest;
    // add start to MinBinaryHeap queue
    nodes.insert(start, 0);
    //initialize distances and previous objects
    for (const vertex in this.adjacencyList) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      previous[vertex] = null;
    }
    //iterate through nodes
    while (nodes.values.length) {
      smallest = nodes.extract().value;
      //if end has been reached, push nodes visited to path array
      if (smallest === end) {
        const build = (end, previous) => {
          if (previous[end] === null) {
            return;
          } else {
            path.push(previous[end]);
            build(previous[end], previous);
          }
        };
        build(end, previous);
        return path.reverse();
      }
      //for each neighboring node
      for (const neighbor in this.adjacencyList[smallest]) {
        const next = this.adjacencyList[smallest][neighbor];
        //calculate distance to node from current path
        const curDistance = distances[smallest] + next.weight;
        //update distance object for node if new path is shorter than stored path
        if (curDistance < distances[next.node]) {
          //add distance from start for each node
          distances[next.node] = curDistance;
          //add last stop before each node
          previous[next.node] = smallest;
          //add node to nodes queue
          nodes.insert(next.node, curDistance);
        }
      }
    }
  }
}

//const WeightedGraph = require('./weighted-graph');
const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

graph.shortestPath('A', 'E');

module.exports = WeightedGraph;
