let nodes = new Map();
let nodes2 = new Map();
let nodes3 = new Map();
let voice;
let voices;
let zoom = 0;
let scrollDelta = 0;
let pscrollWheel = 0;
let center;
let data
let time = 0;
let jsonmap;
function preload() {
  // Load the JSON file and then call the loadData() function below
  jsonmap = loadJSON('map.json', loadData);
}
function setup() {
  
  let canvas = createCanvas(windowWidth, windowHeight);
  center = createVector(0, 0);
  canvas.parent('sketch-container');
 //angleMode(DEGREES);
  voice = new p5.Speech();
  voice.onLoad = voiceReady;
  voices = voice.voices
  function voiceReady(){
    console.log(voice.voices)
    voice.setVoice('Google US English');
  }
  
  
  
  dot = new Node(100, 100, 'test')
  
  foo = new Map()
 foo.set(1, [2, 3, 3, 3]);
 foo.set(2, [1, 3, 4, 3.5, 5, 2.8]);
 foo.set(3, [1, 3, 5, 2.8, 6, 3.5]);
 foo.set(4, [2, 3.5, 5, 3.1, 7, 10]);
 foo.set(5, [2, 2.8, 3, 2.8, 4, 3.1, 7, 7]);
 foo.set(6, [7, 2.5, 3, 3.5]);
 foo.set(7, [6, 2.5, 5, 7, 4, 10]);
data = [
  [2113, 29, 54],
  [2112, 43, 54],
  [2111, 45, 54],
  [2109, 62, 54],
  [2104, 84, 54],
  [2103, 89, 54],
  [2102, 99, 54],
  [2161, 30, 78],
  [2162, 34, 78],
  [2138, 63, 80],
  [2136, 72, 80],
  [2133, 87, 80],
  [2132, 94, 80],
  [2164, 30, 90],
  [2165, 36, 95],
  [2167, 30, 100],
  [2168, 30, 102],
  [2166, 36, 97],
  [2171, 31, 122],
  [2174, 31, 143],
  [2173, 36, 130],
  [2172, 36, 127],
  [2176, 30, 153],
  [2154, 33, 153],
  [2152, 50, 160],
  [2149, 50, 131],
  [2150, 50, 133],
  [2148, 50, 118],
  [2147, 50, 113],
  [2202, 63, 184],
  [2222, 35, 173],
  [2223, 35, 179],
  [2227, 35, 191],
  [2226, 53, 190],
  [2231, 28, 211],
  [2232, 50, 211],
  [2234, 64, 210],
  [2237, 94, 210],
  [2206, 84, 184],
  [2105, 78, 58]
];

for (let i = 1; i < 8; i++){
  nodes.set(i, new Node(createVector(round(random(50, 400)), round(random(50, 800))), 'Room ' + i));
}
for (let i = 1; i < 8; i++){
  nodes.set(i, new Node(createVector(round(random(50, 400)), round(random(50, 800))), 'Room ' + i));
}
console.log(data)
for (let i = 0; i < data.length; i++){
  nodes2.set(i, new Node(createVector(data[i][1]*2, data[i][2]*2), data[i][0]));
}
  graph = new Graph(foo);
};

function draw() { 
  background(255);

  
  //dot.render();
  
    // Save the current state (translation/rotation/etc)
    
    
  // for (let i = 0; i < voices.length; i++){
  //   let foo = voices[i]
  //   voice.setVoice(foo.name)
  //   voice.speak('This is a test')  
  //   text(JSON.stringify(foo.name), i*10, i*10);
  // }
  let path = graph.solve(1, 7);
  
  
  for (let i = 0; i < path.length-1; i++){
    p1 = rotatePoint(center, nodes.get(path[i]).pos, zoom);
    p2 = rotatePoint(center, nodes.get(path[i+1]).pos, zoom);

    strokeWeight(4);
    stroke(0, 255, 0);
   line(p1.x, p1.y, p2.x, p2.y);
    
  }
  //console.log(nodes2)
  for (let i = 0; i < data.length; i++){
    nodes2.get(i).render(center, zoom, zoom);
    
  }
  for (let i = 1; i < 8; i++){
    nodes.get(i).render(center, zoom, zoom);
    
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
  center.x = center.x*zoom;
  center.y = center.y*zoom;
  let offsetx = pos.x - center.x;
  let offsety = pos.y - center.y;
  offsetx = offsetx * zoom;
  offsety = offsety * zoom;
  let nx = center.x+offsetx;
  let ny = center.y+offsety;
  return createVector(nx, ny);

}
function mouseClicked(){
  voice.speak('turn left here.')

}
function mouseWheel(event) { 
  
  
  time = millis();
  // Change the red value according 
  console.log(zoom);
  center = createVector(mouseX, mouseY);
  
  zoom += event.delta/((30-zoom)*100); 
  zoom = constrain(zoom, 1, 30);
  

} 