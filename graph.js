class Graph {
    constructor(json) {
        this.graph = json;
    }

    solve(startNode, endNode) {
        let visited = [];
        let queue = [];
        let source = new Map();
        
        // (distance to node, node name, source node)
        queue.push([0, startNode, null]);

        while (queue.length > 0) {
            // Sort by distance
            queue.sort((a, b) => a[0] - b[0]);
            let currentNode = queue.shift();

            if (!visited.includes(currentNode[1])) {
                visited.push(currentNode[1]);
                let distance = currentNode[0];
                source.set(currentNode[1], currentNode[2]);
                
                let connectedNodes = this.graph[currentNode[1]].connections;

                for (let i = 0; i < connectedNodes.length; i++) {
                   
                    queue.push([distance + connectedNodes[i].distance, connectedNodes[i].name, currentNode[1]]);
                }
            }
        }
        
        return this.#solvePath(startNode, endNode, source);
    }

    drawLine(node1, node2, zoom, center) {
        stroke(0);
        let pos1 = this.#zoomPoint(center, createVector(this.graph[node1].x, this.graph[node1].y), zoom);
        let pos2 = this.#zoomPoint(center, createVector(this.graph[node2].x, this.graph[node2].y), zoom);
        line(pos1.x, pos1.y, pos2.x, pos2.y);
    }

    drawNode(node, center, camera) {
        let pos = camera.zoomPoint(center, createVector(this.graph[node].x, this.graph[node].y));

        strokeWeight(2);
        fill('red');
        noStroke();
        beginShape();
        arc(pos.x, pos.y - 30, 30, 30, PI, 0);
        vertex(pos.x, pos.y);
        bezierVertex(pos.x - 5, pos.y - 20, pos.x - 15, pos.y - 18, pos.x - 15, pos.y - 30);
        vertex(pos.x + 15, pos.y - 30);
        bezierVertex(pos.x + 15, pos.y - 18, pos.x + 5, pos.y - 20, pos.x, pos.y);
        endShape();
        
        fill('white');
        circle(pos.x, pos.y - 30, 15);
        textSize(20);
        stroke(255);
        fill(0);
        text(node, pos.x + 20, pos.y - (40 - 10));
    }

    #solvePath(startNode, endNode, source) {
        let path = [];
        let currentNode = endNode;
        while (true) {
            path.unshift(currentNode);
            if (source.get(currentNode) == null) {
                break;
            }
            currentNode = source.get(currentNode);
        }
        return path;
    }

    #rotatePoint(center, pos, angle) {
        let cx = center.x;
        let cy = center.y;
        let x = pos.x;
        let y = pos.y;
        var radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return createVector(nx, ny);
    }

    #zoomPoint(center, pos, zoom) {
        let offsetx = pos.x - center.x;
        let offsety = pos.y - center.y;
        offsetx *= zoom;
        offsety *= zoom;
        let nx = center.x + offsetx;
        let ny = center.y + offsety;
        return createVector(nx, ny);
    }
}
