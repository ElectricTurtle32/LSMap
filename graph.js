
class Graph {
    constructor(json) {
    this.graph = json;


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
                alert(JSON.stringify(this.graph[currentNode[1]]))
                let connectedNodes = this.graph[currentNode[1]].connections;
              
                for (let i = 0; i < connectedNodes.length; i++){
                    queue.push([distance+connectedNodes[i].distance, connectedNodes[i].name, currentNode[1]]);
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
    
