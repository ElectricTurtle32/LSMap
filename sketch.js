
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
let start = null;
let roomNames = [2202, 2205, 2222, 2237, 2223];
let camera;
function preload() {
  
  jsonmap = loadJSON('map.json');

}
function setup() {
  
  let canvas = createCanvas(windowWidth, windowHeight);
  
  center = createVector(0, 0);
  
  canvas.parent('sketch-container');
  graph = new Graph(jsonmap);
  camera = new Cam(createVector(100, 100), 0, 1);
  voice = new p5.Speech();
  voice.onLoad = voiceReady;
  voices = voice.voices
  
  function voiceReady(){
    console.log(voice.voices)
    voice.setVoice('Google US English');
  }



};

function draw() { 
  
// document.querySelectorAll("#searchList li").forEach(element => {
//   element.addEventListener("click", () => {alert("skibi yes yes")});
// })
  background(255);


if (start != null){
  let path = graph.solve(start, '2222');
  center = createVector(jsonmap[start].x,jsonmap[start].y);
  for (let i = 0; i < path.length-1; i++){

    graph.drawLine(path[i].toString(), path[i+1].toString(), center, camera);
  }
  // for (let i = 1; i < Object.keys(jsonmap).length; i++){
  //   graph.drawNode(Object.keys(jsonmap)[i].toString(), zoom, center);
  // }
  for (let i = 0; i < path.length; i++){
    if (path[i] > 0){
    graph.drawNode(path[i].toString(), center, camera);
  }
}
}

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mouseClicked(){
  voice.speak('turn left here.')
  
}
function mouseWheel(event) { 
  
  

  
  camera.zoom += event.delta/10; 
  zoom += event.delta/10; 
  zoom = constrain(zoom, 1, 300);
  

} window.onerror = function(msg, url, linenumber) {
  alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
  return true;
}

function updateList(){
  let list = document.getElementById("searchList");
  let div = document.getElementById("searchDiv");;
  let query = document.getElementById("search").value;
  query = query.trim();
  let arr = roomNames.filter((el) => el.toString().includes(query.toLowerCase()));
  arr = arr.slice(0,5)
  list.innerHTML = '';
  
  // Loop through the array and create list items
  if (query != ''){
   
    if (arr.length == 0){
      const li = document.createElement('li');
      li.textContent = "Add a missing place";
      li.id = 'item';
      li.onclick = function() {window.open("https://github.com/ElectricTurtle32/LSMap/issues/new/choose");};
      list.appendChild(li);
    }else{
  arr.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      li.id = 'item';
      li.onclick = function() {start = li.textContent;};
      list.appendChild(li);
  });
}
} 
}