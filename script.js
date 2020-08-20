let g = {
    w: 500,
    h: 250,
    w2: 500/2,
    h2: 250/2,
    pos: 0,
    dir: 2,
    room: [
        [1,0,1,1, "#898989",0,0,0,"You should not be here"],
        [1,1,1,0, "#898989","You should not be here","code10",0,0],
        [1,0,1,0, "#e7fbbd",0,0,0,0],
        [1,1,1,0, "#898989",0,0,0,0],
        [1,1,1,0, "#bee5c7",0,0,0,0]
    ],
    code: {
        code10: ["c10","404", ()=> {
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
    alphaR2: "rgba(0,0,0,0.9)",
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

    g.w = w;
    g.w2 = w/2;
    g.h = h;
    g.h2 = h/2

    g.c = document.getElementById("canvas");

    g.c.width = w;
    g.c.height = h; 

    g.xdiff = Math.round(g.w > g.h ? g.w/10 : g.w/8);
    g.ydiff = Math.round(g.w > g.h ? g.h/8 : g.h/15);
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
        
        const c = g.code[`code${g.pos}${g.dir}`];
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
        const x = e.offsetX;
        const y = e.offsetY;

        if(x < g.xdiff) {
            g.dir--;
            if(g.dir < 0) { g.dir = 3}
        } else if(x > g.w-g.xdiff) {
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

function getRoom(relativePos = 0) {

    if(relativePos != 0) {
        if(g.dir === 0) relativePos = g.pos + 1;

        if(g.dir === 2) relativePos = g.pos - 1;
    } else {
        relativePos = g.pos;
    }

    const r = g.room[relativePos];
    switch(g.dir) {
        case 0:
            return [r[0],r[1],r[2], r[4], r[5],r[6],r[7]];
        case 1:
            return [r[1],r[2],r[3], r[4], r[6],r[7],r[8]];
        case 2:
            return [r[2],r[3],r[0], r[4], r[7],r[8],r[5]];            
        case 3:
            return [r[3],r[0],r[1], r[4], r[8],r[5],r[6]];
    }
}

function getNextRoomColor() {

    const nextRoomIndex = (g.dir === 0 || g.dir === 3) ? g.pos+1 : g.pos-1;

    return g.room[nextRoomIndex][4]
}

function getNextNextRoomColor() {

    let nextNextRoomIndex = (g.dir === 0 || g.dir === 3) ? g.pos+2 : g.pos-2;

    if(nextNextRoomIndex >= g.room.length) {
        nextNextRoomIndex = nextNextRoomIndex-1;
    } else if(nextNextRoomIndex <= 0) {
        nextNextRoomIndex = 0;
    }

    return g.room[nextNextRoomIndex][4]
}

function drawRoom() {

    g.msgContainer.style.display="none";
    g.codeContainer.style.display="none";
    g.ctx.clearRect(0, 0, g.w, g.h);

    const r = getRoom();

    g.ctx.fillStyle = r[3];
    g.ctx.fillRect(0, 0, g.w, g.h);

    const xdiff = Math.round(g.w > g.h ? g.w/10 : g.w/8);
    const ydiff = Math.round(g.w > g.h ? g.h/8 : g.h/15);

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

        if(r[4] != 0) {
            
            g.ctx.beginPath();

            g.ctx.moveTo(0,g.h2-ydiff/2);
            g.ctx.lineTo(xdiff-xdiff/2, g.h2-ydiff/3);
            g.ctx.lineTo(xdiff-xdiff/2,g.h2+ydiff/3);
            g.ctx.lineTo(0, g.h2+ydiff/2);
            g.ctx.lineTo(0,g.h2-ydiff/2);

            var grd = g.ctx.createLinearGradient(0, g.h2-ydiff, 0, g.h2+ydiff);
            grd.addColorStop(0, "rgba(0,0,0,0.4)");
            grd.addColorStop(1, "rgba(0,0,0,0.6)");
            g.ctx.fillStyle = grd;
            g.ctx.fill();
            g.ctx.stroke();
            

            // g.ctx.line(x1,y1,x2,y2)
            // g.ctx.line(x3,y3,x4,y4)

            // g.ctx.drawWall(0,g.h2-ydiff,xdiff-15, g.h2-ydiff/2, xdiff-15,g.h2+ydiff/2, 0, g.h2+ydiff, r[3], g.alphaR0, g.alphaR1)
        }
    }

    // center view
    if(r[1] === 0) {
        // // draw room one step forward

        const nextRoom = getRoom(1)
        

        //const nextRoomColor = getNextRoomColor();

        var grd = g.ctx.createLinearGradient(xdiff, ydiff, xdiff, ydiff+ydiff);
        grd.addColorStop(0, g.alphaR1);
        grd.addColorStop(1, g.alphaR2);
        g.ctx.fillStyle = nextRoom[3]
        g.ctx.fillRect(xdiff, ydiff, g.w-xdiff*2, ydiff);
        g.ctx.fillStyle = grd;
        g.ctx.fillRect(xdiff, ydiff, g.w-xdiff*2, ydiff);

        console.log("nr: " + nextRoom[4])

        var grd = g.ctx.createLinearGradient(xdiff, g.h-ydiff, xdiff, g.h-ydiff*2);
        grd.addColorStop(0, g.alphaR1);
        grd.addColorStop(1, g.alphaR2);
        g.ctx.fillStyle = nextRoom[3]
        g.ctx.fillRect(xdiff, g.h-ydiff*2, g.w-xdiff*2, ydiff);
        g.ctx.fillStyle = grd;
        g.ctx.fillRect(xdiff, g.h-ydiff*2, g.w-xdiff*2, ydiff);

        // left wall
        g.ctx.drawWall(xdiff,ydiff,xdiff+xdiff, ydiff+ydiff, xdiff+xdiff,g.h-ydiff-ydiff,xdiff,g.h-ydiff, nextRoom[3],g.alphaR1,g.alphaR2)

        // right wall
        g.ctx.drawWall(g.w-xdiff, ydiff,g.w-xdiff-xdiff,ydiff+ydiff, g.w-xdiff-xdiff,g.h-ydiff-ydiff,g.w-xdiff,g.h-ydiff, nextRoom[3],g.alphaR1,g.alphaR2)

        g.ctx.fillStyle = getNextNextRoomColor();
        g.ctx.fillRect(xdiff*2,ydiff*2,g.w-xdiff*4,g.h-ydiff*4)
        g.ctx.fillStyle = g.alphaR2
        g.ctx.fillRect(xdiff*2,ydiff*2,g.w-xdiff*4,g.h-ydiff*4)

    } else {
        // A wall is in front of us
        g.ctx.fillStyle = g.alphaR1,g.alphaR1
        g.ctx.fillRect(xdiff, ydiff, g.w-2*xdiff, g.h-2*ydiff);

        // Write text message
        if(r[5] != 0) {
            if(r[5].startsWith("code")) {
                g.codeInput.innerHTML = g.code[r[5]][2]();
                g.codeContainer.style.display="block";
            } else {
                g.msg.innerText = r[5];
                g.msgContainer.style.display="block";
            }
        }

        // Write code message

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

    
    // const t = g.text[`t${g.pos}${g.dir}`];
    // if(t) {
    //    g.msg.innerText = t;
    //    g.msgContainer.style.display="block";
    // }

    // const c = g.code[`c${g.pos}${g.dir}`];

    // if(c) {
    //     g.codeInput.innerHTML = c[2]();
    //     g.codeContainer.style.display="block";
    // }

    




    
    


}