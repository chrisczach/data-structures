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
    list[v2].push(v1);
    list[v1].sort();
    list[v2].sort();
    return `${v1} and ${v2} edge added`
  }

  removeEdge(v1,v2) {
    const list = this.adjacencyList;
    if(!list[v1] || !list[v2]) {
      const missing = !list[v1] && !list[v2]  ?  `${v1} and ${v2} are ` : !list[v1]  ?  `${v1} is` :  `${v2} is`;
      return `Vertex ${missing} invalid`
    }
 
    if(list[v1].indexOf(v2)  === -1 )  {
     return `${v1} and ${v2} edge doesn't exist`
   }
 
   list[v1] = list[v1]. filter(e=> e !== v2);
   list[v2] =   list[v2] .filter(e=> e !== v1);
   return `${v1} and ${v2} edge removed`
   }
 
   removeVertex(vertex){
     const list = this.adjacencyList;
     if(!list[vertex]) return `Vertex ${vertex} doesn't exist`;
     list[vertex].forEach(v2=> this.removeEdge(vertex, v2));
     return `Vertex ${ delete list[vertex] && vertex} has been removed`
   }

   dfsRecursive (vertex, visited = []) {
    const list = this.adjacencyList;
    visited.push(vertex);
    if(list[vertex].length === 0) return visited;
    list[vertex].forEach(e=>{
      if(visited.indexOf(e) === -1) {
       this.dfsRecursive(e, visited)
      }
     
    })
    return visited;
   }

   dfsIterative (start) {
     const stack = [];
     stack.push(start);
     const results = [];
     while(stack.length !== 0) {
      const vertex = stack.pop();
      if(results.indexOf(vertex) === -1) {
        results.push(vertex);
      }
      const hold = [];
     this.adjacencyList[vertex].forEach(e=> results.indexOf(e) === -1 && hold.push(e));
while(hold.length !==  0) {
  stack.push(hold.pop());
}
     }
     return results;
   }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A','B');
graph.addEdge('A','C');
graph.addEdge('B','D');
graph.addEdge('C','E');
graph.addEdge('D','E');
graph.addEdge('D','F');
graph.addEdge('E','F');
graph.dfsRecursive('C');
graph.dfsIterative('C');
