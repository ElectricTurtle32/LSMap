
class Graph {
    constructor(graph) {
        this.graph = graph;


    }
    solve(startNode, endNode){
        let visted = [];
        let queue = [];
        let source = new Map();
        // (distance to node) (node name) (source node)
        queue.push([0, startNode, null])
        while (queue.length > 0){
            queue.sort((a, b) => a[0] - b[0])
            let currentNode = queue.pop();
            if (!visted.includes(currentNode[1])){
                visted.push(currentNode[1]);
                let distance = currentNode[0];
                source.set(currentNode[1], currentNode[2]);
                let connectedNodes = this.graph.get(currentNode[1])
              
                for (let i = 0; i < connectedNodes.length-1; i +=2){
                    queue.push([distance+connectedNodes[i+1], connectedNodes[i], currentNode[1]]);
                }
            }
        }
        
        return this.#solvePath(startNode, endNode, source);
        
    }
    #solvePath(startNode, endNode, source){
        let path = [];
        let currentNode = endNode;
        while(true){
            path.unshift(currentNode);
            if (source.get(currentNode) == null){
                break;
            }
            currentNode = source.get(currentNode);
        }
        return path;
    }
}
    
