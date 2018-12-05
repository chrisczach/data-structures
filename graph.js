class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(value) {
    return this.adjacencyList[value]
      ? 'Vertex already exist'
      : (this.adjacencyList[value] = []);
  }

  addEdge(v1, v2) {
    const list = this.adjacencyList;
    if(!list[v1] || !list[v2]) {
      const missing = !list[v1] && !list[v2]  ?  `${v1} and ${v2} are ` : !list[v1]  ?  `${v1} is` :  `${v2} is`;
      return `Vertex ${missing} invalid`
    }
    if(list[v1].indexOf(v2)  !== -1 )  {
      return `${v1} and ${v2} edge already exist`
    }

    list[v1].push(v2);
    list[v2].push(v2);
    return `${v1} and ${v2} edge added`
  }

  
}

const graph = new Graph();
graph.addVertex('a');
graph.addVertex('b');
graph.addVertex('c');
graph.addEdge('a', 'b');
