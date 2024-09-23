class Node {
    constructor(position, name) {
      
      
      this.pos = position
      this.name = name

    }
    render(center, angle, zoom){
  let pos = zoomPoint(center, this.pos, zoom);
  point(center.x, center.y);
  //let pos = rotatePoint(center, this.pos, angle);
  strokeWeight(2)
  fill('red');
  

  noStroke();
  beginShape();
  arc(pos.x, pos.y-30, 30, 30, PI, 0);
  vertex(pos.x, pos.y);
  bezierVertex(pos.x-5, pos.y-20, pos.x-15, pos.y-18,  pos.x-15, pos.y-30);
  vertex(pos.x+15, pos.y-30);
  bezierVertex(pos.x+15, pos.y-18,pos.x+5, pos.y-20,pos.x,pos.y);
  endShape();
  fill('white')
  circle(pos.x, pos.y-30, 15)
  textSize(20);
  stroke(255)
  fill(0)
  text(this.name, pos.x+20, pos.y-(40-10));
  
  //text(this.name, 100 ,100)

    }

  }
  function rotatePoint(center, pos, angle) {
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
  function zoomPoint(center, pos, zoom){
    let offsetx = pos.x - center.x;
    let offsety = pos.y - center.y;
    offsetx = offsetx * zoom;
    offsety = offsety * zoom;
    let nx = center.x+offsetx;
    let ny = center.y+offsety;
    return createVector(nx, ny);
  
  }