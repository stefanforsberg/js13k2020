let g = {
    w: 500,
    h: 350,
    w2: 500/2,
    h2: 350/2,
    pos: 0,
    dir: 2,
    room: [
        [0,0,0,1, "You should not be here"]
    ]
};

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

        const x = e.clientX - c.offsetLeft + g.w2;
        const y = e.clientY - c.offsetTop + g.h2;

        if(x < 100) {
            g.dir--;
            if(g.dir < 0) { g.dir = 3}
        } else if(x > g.w-100) {
            g.dir++;
            if(g.dir >= 3) { g.dir = 0}
        }

        drawRoom();

        g.ctx.font = "30px Arial";
        g.ctx.fillStyle = "red";
        g.ctx.fillText(`${e.clientX - c.offsetLeft + g.w2},${e.clientY - c.offsetTop + g.h2}`, 10, 50);
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

function getRoom() {
    const r = g.room[g.pos];
    switch(g.dir) {
        case 0:
            return [r[0],r[1],r[2]];
        case 1:
            return [r[1],r[2],r[3]];
        case 2:
            return [r[2],r[3],r[0]];            
        case 3:
            return [r[3],r[0],r[1]];
    }
}

function drawRoom() {

    g.ctx.clearRect(0, 0, g.w, g.h);

    var r = getRoom();

    g.ctx.fillStyle = "#898989";
    g.ctx.fillRect(0, 0, g.w, g.h);

    const xdiff = 50;
    const ydiff = 40;

    // left view
    if(r[0] === 0) {
        g.ctx.line(0,0,xdiff,ydiff)
        g.ctx.line(0,g.h,xdiff,g.h-ydiff)
    } else {
        g.ctx.line(0,ydiff,xdiff,ydiff)
        g.ctx.line(0,g.h-ydiff,xdiff,g.h-ydiff)
    }

    // center view
    if(r[1] === 0) {
        // draw room one step forward
        var grd = g.ctx.createRadialGradient(g.w2, g.h2, 50, g.w2, g.h2, 460);
        grd.addColorStop(0, "rgba(0,0,0,1)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
    
        g.ctx.line(xdiff,ydiff,xdiff+xdiff,ydiff+ydiff)

        // Fill with gradient
        g.ctx.fillStyle = grd;
        g.ctx.beginPath();
        g.ctx.ellipse(g.w2, g.h2, g.w*1.2, g.h2*1.2, 0, 0, 2*Math.PI, true);
        g.ctx.fill();

    } else {
        g.ctx.fillRect(xdiff, ydiff, g.w-2*xdiff, g.h-2*ydiff);

        var grd = g.ctx.createRadialGradient(g.w2, g.h2, 50, g.w2, g.h2, 460);
        grd.addColorStop(0, "rgba(0,0,0,0.5)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
    
        // Fill with gradient
        g.ctx.fillStyle = grd;
        g.ctx.beginPath();
        g.ctx.ellipse(g.w2, g.h2, g.w*1.2, g.h2*1.2, 0, 0, 2*Math.PI, true);
        g.ctx.fill();
    }

    // right view
    if(r[2] === 0) {
        g.ctx.line(g.w,0,g.w-xdiff,ydiff)
        g.ctx.line(g.w,g.h,g.w-xdiff,g.h-ydiff)
    } else {
        g.ctx.line(g.w,ydiff,g.w-xdiff,ydiff)
        g.ctx.line(g.w,g.h-ydiff,g.w-xdiff,g.h-ydiff)
    }

    g.ctx.beginPath();
    g.ctx.rect(xdiff, ydiff, g.w-2*xdiff, g.h-2*ydiff);
    g.ctx.stroke();



    




    
    


}