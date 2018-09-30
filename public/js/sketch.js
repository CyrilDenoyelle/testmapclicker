
const sketch = function (p) {
  p.setup = () => {
    p.createCanvas(500, 500);
  }

  p.draw = () => {

    var scl = 3;
    var cols = p.floor(p.width / scl);
    var rows = p.floor(p.height / scl);
    var inc = 0.02;
    var yoff = 0;
    var tabl = [];

    p.noiseSeed();

    for (var x = 0; x < cols; x++) {
      var xoff = 0;
      tabl.push([]);
      for (var y = 0; y < rows; y++) {
        var index = (x + y * p.width) * 4;
        var n = p.noise(xoff, yoff) * 255;

        p.noStroke();
        p.fill(...rgb[p.helpers.tgen(n)], 255);
        p.rect(x * scl, y * scl, scl, scl);

        tabl[x].push(n);

        xoff += inc;
      }
      yoff += inc;
    }
    p.noLoop();
  }

  p.helpers = {
    tgen: (n) => {
      var r = strlvl.length;
      for (i = 0; i < strlvl.length; i++) {
        if (n < strlvl[i]) {
          r = i;
          break;
        }
      }
      return r;
    },
    seasons: () => {
      setInterval(() => {
        var chages = false;
        strlvl.forEach((e, i) => {
          if (e < strlvl2[i]) {
            chages = true;
            strlvl[i] += 0.5;
          } else if (e > strlvl2[i]) {
            chages = true;
            strlvl[i] -= 0.5;
          }
        });

        if (chages) {
          redraw();
        }
      }, 250)
    },
  }

};


rgb = [
  [0, 208, 255],
  [255, 250, 165],
  [0, 132, 2],
  [160, 111, 38],
  [255, 255, 255]
];
strlvl = [100, 110, 145, 165]; // hiver
strlvl2 = [95, 110, 145, 185]; // ete

new p5(sketch, window.document.getElementById('app'));
