let g = {
    w: 500,
    h: 250,
    w2: 500/2,
    h2: 250/2,
    pos: 0,
    dir: 2,
    room: [
        [1,0,1,1, "#898989"],
        [1,1,1,0, "#898989"],
        [1,0,1,0, "#e7fbbd"],
        [1,1,1,0, "#898989"],
        [1,1,1,0, "#bee5c7"]
    ],
    text: {
        t02: "You should not be here"
    },
    code: {
        c10: ["c10","404", ()=> {
                return generateSelect([4])+generateSelect([0])+generateSelect([4]);
            },()=> {
                return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
            }, () => {
                g.room[1][1] = 0;
                g.room[1][4] = "#e7fbbd";
            }],
        c30: ["c30","404", ()=> {
                return generateSelect([0,1,2,3,4,5,6,7,8,9])+generateSelect([0,1,2,3,4,5,6,7,8,9])+generateSelect([0,1,2,3,4,5,6,7,8,9]);
            },()=> {
                return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
            }, () => {
                g.room[3][1] = 0;
                g.room[3][4] = "#bee5c7";
            }],
    },
    alphaR0: "rgba(0,0,0,0)",
    alphaR1: "rgba(0,0,0,0.2)",
    alphaR2: "rgba(0,0,0,1)",
};

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function generateSelect(options) {
    return `<select>${options.reduce( (p,c) => p + `<option>${c}</option>`, "")}</select>`
}

function setCanvas() {
    let h = window.innerHeight - 30;
    let w = window.innerWidth -30;

    if(h > 800) {
        h = 800;
    } 

    if(w > 800) {
        w = 800;
    }

    // if(h > w && h > 800) {
    //     console.log("h>w")
    //     w = 800*0.75
    //     h = 800
    // } else if (w > h && w > 1000) {
    //     h = 1000*0.75
    //     w = 1000
    // }
     
    
    // if(h > w) {
    //     h = h;

    // }


    // if(h > 700) {
    //     h = 700;
    // }  else if( h <= 300) {
    //     h = 150
    // }


    // const w = h*1.75;

    g.w = w;
    g.w2 = w/2;
    g.h = h;
    g.h2 = h/2

    g.c = document.getElementById("canvas");

    g.c.width = w;
    g.c.height = h; 
}

ready(async () => {

    g.c = document.getElementById("canvas");

    setCanvas();

    g.ctx = g.c.getContext("2d");
    g.msg = document.getElementById("message")
    g.msgContainer = document.getElementById("messagecontainer")
    g.codeContainer = document.getElementById("codecontainer");
    g.codeInput = document.getElementById("code");

    document.getElementById("solve").addEventListener("click", () => {
        const c = g.code[`c${g.pos}${g.dir}`];
        if(c[3]() === c[1]) {
            c[4]();
            g.code[`c${g.pos}${g.dir}`] = undefined;
            drawRoom();
            // correct
        } else {
            // wrong code
        };
    })

    g.c.addEventListener("click", (e) => {

        const x = e.clientX - g.c.offsetLeft + g.w2;
        const y = e.clientY - g.c.offsetTop + g.h2;

        if(x < 100) {
            g.dir--;
            if(g.dir < 0) { g.dir = 3}
        } else if(x > g.w-100) {
            g.dir++;
            if(g.dir > 3) { g.dir = 0}
        } else {
            const r = getRoom();
            if(r[1] === 0) {
                g.pos += (g.dir === 0 ? 1 : -1);
            }
        }

        console.log("pos: " + g.pos)

        drawRoom();

        // g.ctx.font = "30px Arial";
        // g.ctx.fillStyle = "red";
        // g.ctx.fillText(`${e.clientX - c.offsetLeft + g.w2},${e.clientY - c.offsetTop + g.h2}`, 10, 50);
    })


    g.ctx.line = function(x1,y1,x2,y2) {
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.stroke();
    }

    g.ctx.drawWall = function(x1,y1,x2,y2,x3,y3,x4,y4,fill,a1,a2) {
        g.ctx.beginPath();

        g.ctx.moveTo(x1,y1);
        g.ctx.lineTo(x2,y2);
        g.ctx.lineTo(x3,y3);
        g.ctx.lineTo(x4,y4);
        g.ctx.lineTo(x1,y1);

        var grd = g.ctx.createLinearGradient(x1, y1, x2, y1);
        grd.addColorStop(0, a1);
        grd.addColorStop(1, a2);
        g.ctx.fillStyle = fill;
        g.ctx.fill();
        g.ctx.fillStyle = grd;
        g.ctx.fill();

        g.ctx.line(x1,y1,x2,y2)
        g.ctx.line(x3,y3,x4,y4)
    }

    drawRoom();

});

function getRoom() {
    const r = g.room[g.pos];
    switch(g.dir) {
        case 0:
            return [r[0],r[1],r[2], r[4]];
        case 1:
            return [r[1],r[2],r[3], r[4]];
        case 2:
            return [r[2],r[3],r[0], r[4]];            
        case 3:
            return [r[3],r[0],r[1], r[4]];
    }
}

function getNextRoomColor() {

    const nextRoomIndex = (g.dir === 0 || g.dir === 3) ? g.pos+1 : g.pos-1;

    console.log("Next room: " + nextRoomIndex)

    return g.room[nextRoomIndex][4]
}

function drawRoom() {

    g.msgContainer.style.display="none";
    g.codeContainer.style.display="none";
    g.ctx.clearRect(0, 0, g.w, g.h);

    var r = getRoom();

    g.ctx.fillStyle = r[3];
    g.ctx.fillRect(0, 0, g.w, g.h);

    const xdiff = g.w > g.h ? g.w/10 : g.w/8;
    const ydiff = g.w > g.h ? g.h/8 : g.h/15;

    // Ceiling
    var grd = g.ctx.createLinearGradient(0, 0, 0, ydiff);
    grd.addColorStop(0, g.alphaR0);
    grd.addColorStop(1, g.alphaR1);
    g.ctx.fillStyle = grd;
    g.ctx.fillRect(0, 0, g.w, ydiff);

    // Floor
    var grd = g.ctx.createLinearGradient(0, g.h, 0, g.h-ydiff);
    grd.addColorStop(0, g.alphaR0);
    grd.addColorStop(1, g.alphaR1);
    g.ctx.fillStyle = grd;
    g.ctx.fillRect(0, g.h-ydiff, g.w, ydiff);

    // left view
    if(r[0] === 0) {
        g.ctx.line(0,ydiff,xdiff,ydiff)
        g.ctx.line(0,g.h-ydiff,xdiff,g.h-ydiff)

        g.ctx.fillStyle = g.alphaR1
        g.ctx.fillRect(0,ydiff,xdiff,g.h-ydiff*2)

    } else {
        g.ctx.drawWall(0,0,xdiff, ydiff, xdiff,g.h-ydiff,0,g.h, r[3],g.alphaR0,g.alphaR1)
    }

    // center view
    if(r[1] === 0) {
        // // draw room one step forward

        const nextRoomColor = getNextRoomColor();

        var grd = g.ctx.createLinearGradient(xdiff, ydiff, xdiff, ydiff+ydiff);
        grd.addColorStop(0, g.alphaR1);
        grd.addColorStop(1, g.alphaR2);
        g.ctx.fillStyle = nextRoomColor
        g.ctx.fillRect(xdiff, ydiff, g.w-xdiff*2, ydiff);
        g.ctx.fillStyle = grd;
        g.ctx.fillRect(xdiff, ydiff, g.w-xdiff*2, ydiff);

        var grd = g.ctx.createLinearGradient(xdiff, g.h-ydiff, xdiff, g.h-ydiff*2);
        grd.addColorStop(0, g.alphaR1);
        grd.addColorStop(1, g.alphaR2);
        g.ctx.fillStyle = nextRoomColor
        g.ctx.fillRect(xdiff, g.h-ydiff*2, g.w-xdiff*2, ydiff);
        g.ctx.fillStyle = grd;
        g.ctx.fillRect(xdiff, g.h-ydiff*2, g.w-xdiff*2, ydiff);

        // left wall
        g.ctx.drawWall(xdiff,ydiff,xdiff+xdiff, ydiff+ydiff, xdiff+xdiff,g.h-ydiff-ydiff,xdiff,g.h-ydiff, nextRoomColor,g.alphaR1,g.alphaR2)

        // right wall
        g.ctx.drawWall(g.w-xdiff, ydiff,g.w-xdiff-xdiff,ydiff+ydiff, g.w-xdiff-xdiff,g.h-ydiff-ydiff,g.w-xdiff,g.h-ydiff, nextRoomColor,g.alphaR1,g.alphaR2)

        g.ctx.fillStyle = g.alphaR2
        g.ctx.fillRect(xdiff*2,ydiff*2,g.w-xdiff*4,g.h-ydiff*4)

    } else {
        // A wall is in front of us
        g.ctx.fillStyle = g.alphaR1,g.alphaR1
        g.ctx.fillRect(xdiff, ydiff, g.w-2*xdiff, g.h-2*ydiff);
    }

    // right view
    if(r[2] === 0) {
        g.ctx.line(g.w,ydiff,g.w-xdiff,ydiff)
        g.ctx.line(g.w,g.h-ydiff,g.w-xdiff,g.h-ydiff)

        g.ctx.fillStyle = g.alphaR1
        g.ctx.fillRect(g.w-xdiff,ydiff,xdiff,g.h-ydiff*2)
    } else {

        g.ctx.drawWall(g.w, 0,g.w-xdiff,ydiff, g.w-xdiff,g.h-ydiff,g.w,g.h, r[3],g.alphaR0,g.alphaR1)
        
    }

    g.ctx.beginPath();
    g.ctx.rect(xdiff, ydiff, g.w-2*xdiff, g.h-2*ydiff);
    g.ctx.stroke();

    
    const t = g.text[`t${g.pos}${g.dir}`];
    if(t) {
       g.msg.innerText = t;
       g.msgContainer.style.display="block";
    }

    const c = g.code[`c${g.pos}${g.dir}`];

    if(c) {
        g.codeInput.innerHTML = c[2]();
        g.codeContainer.style.display="block";
    }

    




    
    


}