let angle;

function setup() { 
  let canvas = createCanvas(350, 350); 
  canvas.position(59, 50);
  angle = Math.PI / 4;
} 

function draw() { 
  background(255); 
  angle = map(Math.sin(frameCount * 0.01), -1, 1, Math.PI / 2, Math.PI / 16); 
  translate(width / 2, height); 
  branch(100); 
}

function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function branch(len) {
  line(0, 0, 0, -len); 
  translate(0, -len); 
  if (len > 4) { 
    push(); 
    rotate(angle); 
    branch(len * 0.67); 
    pop(); 
    push(); 
    rotate(-angle);
    branch(len * 0.67); 
    pop(); 
  }
}
