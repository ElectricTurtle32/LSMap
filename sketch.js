
let voice;
let voices;
let zoom = 1;
let scrollDelta = 0;
let pscrollWheel = 0;
let center;
let data
let time = 0;
let jsonmap;
let graph;
function preload() {
  // Load the JSON file and then call the loadData() function below
  jsonmap = loadJSON('school.json');

}
function setup() {
  
  let canvas = createCanvas(windowWidth, windowHeight);
  center = createVector(0, 0);
  canvas.parent('sketch-container');
  graph = new Graph(jsonmap);
 //angleMode(DEGREES);
  voice = new p5.Speech();
  voice.onLoad = voiceReady;
  voices = voice.voices
  function voiceReady(){
    console.log(voice.voices)
    voice.setVoice('Google US English');
  }



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

  let path = graph.solve('2223', '2237');
  text(path, 50, 50)
  for (let i = 0; i < path.length-1; i++){
    text(Object.keys(jsonmap)[i].toString(), 50, 50*i);
    text(Object.keys(jsonmap)[i+1].toString(), 100, 50*i);
    graph.drawLine(path[i].toString(), path[i+1].toString(), zoom, center);
  }
  for (let i = 1; i < Object.keys(jsonmap).length; i++){
    graph.drawNode(Object.keys(jsonmap)[i].toString(), zoom, center);
  }
  // for (let i = 0; i < path.length-1; i++){
  //   p1 = rotatePoint(center, nodes.get(path[i]).pos, zoom);
  //   p2 = rotatePoint(center, nodes.get(path[i+1]).pos, zoom);

  //   strokeWeight(4);
  //   stroke(0, 255, 0);
  //  line(p1.x, p1.y, p2.x, p2.y);
    
  // }


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mouseClicked(){
  voice.speak('turn left here.')

}
function mouseWheel(event) { 
  
  

  center = createVector(mouseX, mouseY);
  
  zoom += event.delta/((30-zoom)*10); 
  zoom = constrain(zoom, 1, 30);
  

} window.onerror = function(msg, url, linenumber) {
  alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
  return true;
}