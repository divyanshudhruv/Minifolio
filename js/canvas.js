var canvas = document.querySelector('canvas');
var canvasWidth = canvas.width = window.innerWidth;
var canvasHeight = canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var heightScale = 0.866;


function rnd(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
};


function render() {
    ctx.fillStyle = 'rgb(246,249,252)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.lineWidth = 0;

    var hueStart = rnd(0, 0);
    var triSide = 30;
    var halfSide = triSide / 2;
    var rowHeight = Math.floor(triSide * heightScale);
    var columns = Math.ceil(canvasWidth / triSide) + 1;
    var rows = Math.ceil(canvasHeight / rowHeight);

    var col, row;
    for (row = 0; row < rows; row++) {
        var hue = hueStart + (row * 3);

        for (col = 0; col < columns; col++) {

            var x = col * triSide;
            var y = row * rowHeight;
            var clr;

            if (row % 2 != 0) {
                x -= halfSide;
            }

            // upward pointing triangle
            clr = 'hsl(' + hue + ', 0%, ' + rnd(90, 240) + '%)';
            ctx.fillStyle = clr;
            ctx.strokeStyle = clr;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + halfSide, y + rowHeight);
            ctx.lineTo(x - halfSide, y + rowHeight);
            ctx.closePath();
            ctx.fill();
            //ctx.stroke(); // needed to fill antialiased gaps on edges

            // downward pointing triangle
            clr = 'hsl(' + hue + ', 0%, ' + rnd(90, 245) + '%)';
            ctx.fillStyle = clr;
            ctx.strokeStyle = clr;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + triSide, y);
            ctx.lineTo(x + halfSide, y + rowHeight);
            ctx.closePath();
            ctx.fill();
            //ctx.stroke();

        };
    };
};

document.body.appendChild(canvas);

render();

document.body.addEventListener('dblclick', render);