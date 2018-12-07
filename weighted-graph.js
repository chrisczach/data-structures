class PriorityQueue {
  constructor(){
    this.values = [];
  }
  enq(value,priority) {
    this.values.push({value, priority});
    this.values.sort((a,b)=> a.priority - b.priority );
  };

  deq() {
    return this.values.shift();
  };
}



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
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    const path = [end];
    let smallest;
    //initialize
    for(const vertex in this.adjacencyList) { 
      distances[vertex] = vertex === start ? 0 : Infinity;
      nodes.enq(vertex, vertex === start ? 0 : Infinity);
      previous[vertex] = null;
    };
    //iterate through nodes
      while(nodes.values.length) {
        smallest = nodes.deq().value;
        if(smallest === end) {
          const build = (end, previous) => {
            if(previous[end] === null) {return 
            } else {
              path.push(previous[end]);
              build(previous[end],previous)
            } 
          }
          build(end,previous)
          return path.reverse();
        }
        for(const neighbor in this.adjacencyList[smallest]){
          const next = this.adjacencyList[smallest][neighbor];
          //calculate distance to next node
          const curDistance = distances[smallest] + next.weight;
          if(curDistance < distances[next.node]) {
            distances[next.node] = curDistance;
            previous[next.node] = smallest;
            nodes.enq(next.node, curDistance);
          }
        }

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

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

graph.shortestPath('A', 'E');
