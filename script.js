let g = {};

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(() => {
    var c = document.getElementById("canvas");
    g.ctx = c.getContext("2d");

    c.addEventListener("click", (e) => {

        drawRoom();

        console.log(e.clientX - c.offsetLeft + 350/2);
        console.log(e.clientY - c.offsetTop +500/2);

        g.ctx.font = "30px Arial";
        g.ctx.fillStyle = "red";
        g.ctx.fillText(`${e.clientX - c.offsetLeft + 350/2},${e.clientY - c.offsetTop +500/2}`, 10, 50);
    })


    g.ctx.line = function(x1,y1,x2,y2) {
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.stroke();
    }

    drawRoom();

    g.ctx.font = "30px Arial";
        g.ctx.fillStyle = "red";
        g.ctx.fillText(`Ready`, 10, 50);

});

function drawRoom() {

    g.ctx.clearRect(0, 0, 350, 500);

    var grd = g.ctx.createRadialGradient(350/2, 500/2, 50, 350/2, 500/2, 360);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "white");

    // Fill with gradient
    g.ctx.fillStyle = grd;
    g.ctx.fillRect(0, 0, 350, 500);

    g.ctx.line(0,0,40,25)
    g.ctx.line(350,0,310,25)
    g.ctx.line(0,500,40,475)
    g.ctx.line(350,500,310,475)

    g.ctx.beginPath();
    g.ctx.rect(40, 25, 270, 450);
    g.ctx.stroke();
}