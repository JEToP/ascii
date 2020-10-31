let capture;
const resolution = 5;

const associations = {
    0: '@',
    35: '%',
    70: '#',
    105: '&',
    140: '(',
    175: '/',
    210: ',',
    245: '.',
}

function setup() {
  createCanvas(1200, 1000);
  
  capture = createCapture(VIDEO);
  capture.hide();
}
function draw() {
  background(255, 255, 255);
  if (capture.loadedmetadata) {
    let c = capture.get(0, 0, width, height);

    let d = pixelDensity();

    c.loadPixels();

    for(let i = 0; i < c.height; i += resolution) {
        for(let j = 0; j < c.width; j += resolution) {
          let index = 4 * d * (j * d * c.width + i);
          let col = color(c.pixels[index], c.pixels[index + 1], c.pixels[index + 2], c.pixels[index + 3]);

          let b = brightness(col);
          let character;

          if(b >= 245) {
            character = associations[245]
          } else if(b >= 210) {
            character = associations[210]
          } else if(b >= 175) {
            character = associations[175]
          } else if(b >= 140) {
            character = associations[140]
          } else if(b >= 105) {
            character = associations[105]
          } else if(b >= 70) {
            character = associations[70]
          } else if(b >= 35) {
            character = associations[35]
          } else {
            character = associations[0]
          }
          
          textSize(10)
          text(character, i * 2, j * 2)
        }
    }

    // c.updatePixels();
  }
}
