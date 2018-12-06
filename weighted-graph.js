class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(value) {
    return this.adjacencyList[value]
      ? 'Vertex already exist'
      : (this.adjacencyList[value] = []);
  }

  addEdge(v1, v2, weight) {
    const list = this.adjacencyList;
    if (!list[v1] || !list[v2]) {
      const missing =
        !list[v1] && !list[v2]
          ? `${v1} and ${v2} are `
          : !list[v1]
          ? `${v1} is`
          : `${v2} is`;
      return `Vertex ${missing} invalid`;
    }
    if (list[v1].indexOf(v2) !== -1) {
      return `${v1} and ${v2} edge already exist`;
    }

    list[v1].push({ node: v2, weight });
    list[v2].push({ node: v1, weight });
    list[v1].sort(/* (a,b) => a < b ? 1 : -1 */);
    list[v2].sort(/* (a,b) => a < b ? 1 : -1 */);
    return `${v1} and ${v2} edge added`;
  }

  removeVertex(vertex) {
    const list = this.adjacencyList;
    if (!list[vertex]) return `Vertex ${vertex} doesn't exist`;
    list[vertex].forEach(v2 => this.removeEdge(vertex, v2.node));
    return `Vertex ${delete list[vertex] && vertex} has been removed`;
  }

  removeEdge(v1, v2) {
    const list = this.adjacencyList;
    if (!list[v1] || !list[v2]) {
      const missing =
        !list[v1] && !list[v2]
          ? `${v1} and ${v2} are `
          : !list[v1]
          ? `${v1} is`
          : `${v2} is`;
      return `Vertex ${missing} invalid`;
    }

    if (list[v1].findIndex(e => e.node === v2) === -1) {
      return `${v1} and ${v2} edge doesn't exist`;
    }

    list[v1] = list[v1].filter(e => e.node !== v2);
    list[v2] = list[v2].filter(e => e.node !== v1);
    return `${v1} and ${v2} edge removed`;
  }

  shortestPath(start, end) {
    const distances = {};
    const previous = {};
    const queue = [];
    for (const vertex in this.adjacencyList) {
      previous[vertex] = null;
      if (vertex === start) {
        distances[vertex] = 0;
        queue.push({ vertex, distance: 0 });
      } else {
        distances[vertex] = Infinity;
        queue.push({ vertex, distance: Infinity });
      }
    }
    queue.sort((a, b) => a.distance - b.distance);
    
    while (queue.length !== 0) {
      const vertex = queue.shift();
    // Left off here
    //
    //  
    }
  }
}

const graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 10);
graph.addEdge('A', 'C', 20);
graph.addEdge('B', 'D', 50);
graph.addEdge('C', 'E', 5);
graph.addEdge('D', 'E', 30);
graph.addEdge('D', 'F', 25);
graph.addEdge('E', 'F', 45);
graph.shortestPath('A', 'E');
