function setup() {
  createCanvas(500, 500);
}

rgb = [
    [0, 208, 255],
    [255, 250, 165],
    [0, 132, 2],
    [160, 111, 38],
    [255, 255, 255]
  ];
strlvl = [100, 110, 145, 165]; // hiver
strlvl2 = [95, 110, 145, 185]; // ete

function draw() {
  
  const tgen = (n) => {
    var r = strlvl.length;
    for (i = 0; i < strlvl.length; i++) {
      if (n < strlvl[i]) {
        r = i;
        break;
      }
    }
    return r;
  }

  var scl = 3;
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  var inc = 0.02;
  var yoff = 0;
  var tabl = [];

  noiseSeed(0);
  for (var x = 0; x < cols; x++) {
    var xoff = 0;
    tabl.push([]);
    for (var y = 0; y < rows; y++) {
      var index = (x + y * width) * 4;
      var n = noise(xoff, yoff) * 255;

      noStroke();
      fill(...rgb[tgen(n)], 255);
      rect(x * scl, y * scl, scl, scl);

      tabl[x].push(n);

      xoff += inc;
    }
    yoff += inc;
  }

  noLoop();
}

const seasons = () => {
  setInterval(() => {
    var chages = false;
    strlvl.forEach((e, i)=>{
      if(e < strlvl2[i]){
    		chages = true;
        strlvl[i]+=0.5;
      }else if(e > strlvl2[i]){
    		chages = true;
        strlvl[i]-=0.5;
      }
    });
    
    if (chages){
    	redraw();
    }
  }, 250);
}
