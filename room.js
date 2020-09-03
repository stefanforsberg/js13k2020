export const room = {
    init: function(g) {

        this.g = g;

        this.xdiff = Math.round(g.w > g.h ? g.w/10 : g.w/8);
        this.ydiff = Math.round(g.w > g.h ? g.h/8 : g.h/15);

        this.msg = document.getElementById("message")
        this.msgContainer = document.getElementById("messagecontainer")
        this.codeContainer = document.getElementById("codecontainer");
        this.codeOverlay = document.getElementById("codeoverlay")
        this.codeInput = document.getElementById("code");

        this.startRoom = [
            [1,0,1,1, "#898989",0,0,0,"You should not be here"],
            [1,0,1,0, "#898989","4-ever",0,"4-ever",0],
            [0,1,0,0, "#898989",0,"code20Start",0,0],
            [1,0,1,0, "#898989",0,0,0,0],
            [1,1,1,0, "#898989",0,"code40Start",0,0],
            [1,0,1,0, "#898989",0,0,0,0],
            [1,0,1,0, "#898989",0,0,"Andrea was always such a square",0],
            [1,1,1,0, "#898989",0,"code70Start",0,0],
            [1,0,1,0, "#898989",0,0,0,0],
            [1,0,1,0, "#898989","Adam. He/him",0,0,0],
            [1,1,1,0, "#898989",0,"code100Start",0,0],
            [1,1,1,0, "#898989",0,0,0,0],
        ]

        this.startRoomCode = {
            code20Start: ["c20","404", ()=> {
                    return this.generateSelect([4])+this.generateSelect([0])+this.generateSelect([4]);
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    console.log("solv")
                    g.room.currentRoom[2][1] = 0;
                }],
            code40Start: ["c40","404", ()=> {
                    const choices = Array.from(Array(10).keys());
                    return this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices);
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[4][1] = 0;
                }],
            code70Start: ["c70","16016", ()=> {
                    const choices = Array.from(Array(21).keys());
                    return this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices);
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[7][1] = 0;
                }],
            code100Start: ["c100","100000001000", ()=> {
                    const choices = Array.from(Array(2).keys());
                    return `${this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)}<br />${this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)}<br />${this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)}`;
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[7][1] = 0;
                }],
        },

        this.redRoom = [
            [1,0,1,0, "#898989",0,0,0,0],
            [1,0,1,0, "#898989",0,0,0,0],
            [1,0,1,0, "#898989",0,0,0,0],
            [1,0,1,0, "#0000ff",0,0,0,0],
            [1,0,1,0, "#0000ff",0,0,0,0],
            [1,0,1,0, "#0000ff",0,0,0,0],
            [1,1,1,0, "#0000ff",0,0,0,0],
        ],

        this.currentCode = this.startRoomCode;
        this.currentRoom = this.startRoom;

    },

    generateSelect: function(options) {
        return `<select>${options.reduce( (p,c) => p + `<option>${c}</option>`, "")}</select>`
    },

    turnLeft: function() {
        this.g.dir--;
        if(this.g.dir < 0) { this.g.dir = 3}

        this.drawRoom();
    },

    turnRight: function() {
        this.g.dir++;
        if(this.g.dir > 3) { this.g.dir = 0}

        this.drawRoom();
    },

    moveForward: function() {
        const r = this.getRoom();
        if(r[1] === 0) {

            if(this.g.pos === 2 && this.g.dir === 3) {
                this.currentRoom = this.redRoom;
                this.g.pos = 0;
                this.g.dir = 0;
            } else {
                this.g.pos += (this.g.dir === 0 ? 1 : -1);
            }
            

            

            this.drawRoom();
        }

        
    },

    getRoom: function(relativePos = 0) {

        console.log(this.g.pos + "," + this.g.dir + "," + relativePos)
    
        if(this.g.pos === 2 && this.g.dir === 3) {
            return [relativePos === 0 ? 0 : 1,0,1, "#898989", 0,0,0];
        }
    
        if(this.g.dir === 0) {
            relativePos = this.g.pos + relativePos
        }
        else if (this.g.dir === 2) 
        {
            relativePos = this.g.pos - relativePos;
        } else {
            relativePos = this.g.pos;
        }
    
        const r = this.currentRoom[relativePos];
    
        switch(this.g.dir) {
            case 0:
                return [r[0],r[1],r[2], r[4], r[5],r[6],r[7]];
            case 1:
                return [r[1],r[2],r[3], r[4], r[6],r[7],r[8]];
            case 2:
                return [r[2],r[3],r[0], r[4], r[7],r[8],r[5]];            
            case 3:
                return [r[3],r[0],r[1], r[4], r[8],r[5],r[6]];
        }
    },

    drawRoom: function() {

        console.log(this.msgContainer)

        this.msgContainer.style.display="none";
        this.codeContainer.style.display="none";
        this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);

        const rooms = 3;

        for(var i = 0; i < rooms; i++) {

            const currentRoom = this.getRoom(i);

            const xdiff = this.xdiff;
            const ydiff = this.ydiff;

            const scaleFactorX = i*xdiff;
            const scaleFactorY = i*ydiff;

            const x1 = 0;
            const y1 = 0;

            if(i == 2) {
                xdiff = Math.floor(xdiff * 0.7)
                ydiff = Math.floor(ydiff * 0.7)
            }

            // Ceiling
            this.g.ctx.fillStyle = currentRoom[3];
            this.g.ctx.fillRect(x1+scaleFactorX, y1 +scaleFactorY, this.g.w - 2*scaleFactorX, ydiff);

            var grd = this.g.ctx.createLinearGradient(x1+scaleFactorX, y1 + scaleFactorY, x1+scaleFactorX, scaleFactorY + ydiff);
            grd.addColorStop(0, this.g[`alphaR${i}`]);
            grd.addColorStop(1, this.g[`alphaR${i+1}`]);
            this.g.ctx.fillStyle = grd;
            this.g.ctx.fillRect(x1+scaleFactorX, y1 +scaleFactorY, this.g.w - 2*scaleFactorX, ydiff);

            // Floor

            this.g.ctx.fillStyle = currentRoom[3];
            this.g.ctx.fillRect(x1+scaleFactorX, this.g.h - ydiff - scaleFactorY, this.g.w - 2*scaleFactorX, ydiff);

            var grd = this.g.ctx.createLinearGradient(0, this.g.h -scaleFactorY, 0, this.g.h - scaleFactorY -ydiff);
            grd.addColorStop(0, this.g[`alphaR${i}`]);
            grd.addColorStop(1, this.g[`alphaR${i+1}`]);
            this.g.ctx.fillStyle = grd;
            this.g.ctx.fillRect(x1+scaleFactorX, this.g.h - ydiff - scaleFactorY, this.g.w - 2*scaleFactorX, ydiff);


            this.g.ctx.beginPath();
            this.g.ctx.moveTo(x1+scaleFactorX, y1 +scaleFactorY)
            this.g.ctx.lineTo(this.g.w -scaleFactorX, y1  +scaleFactorY);
            this.g.ctx.lineTo(this.g.w-scaleFactorX, this.g.h -scaleFactorY);
            this.g.ctx.lineTo(x1 +scaleFactorX, this.g.h  - scaleFactorY);
            this.g.ctx.lineTo(x1 +scaleFactorX, y1 + scaleFactorY)
            this.g.ctx.stroke();

            // Left part of room
            if(currentRoom[0] === 1) {
                this.g.ctx.line(x1+scaleFactorX, y1 +scaleFactorY, x1+scaleFactorX + xdiff, y1 +scaleFactorY + ydiff)
                this.g.ctx.line(x1+scaleFactorX, this.g.h - scaleFactorY, x1+scaleFactorX + xdiff, this.g.h - scaleFactorY - ydiff)

                this.g.ctx.drawWall(x1+scaleFactorX,y1+scaleFactorY, x1+scaleFactorX + xdiff, y1+scaleFactorY + ydiff, x1 +scaleFactorX + xdiff, this.g.h - scaleFactorY- ydiff, x1 + scaleFactorX, this.g.h - scaleFactorY, currentRoom[3], this.g[`alphaR${i}`], this.g[`alphaR${i+1}`])

                // Has something on wall
                if(currentRoom[4] !== 0) {

                    let clipStart = i === 0 ? 0 : x1+scaleFactorX + xdiff/(10/i);
                    let clipWidth = i === 0 ? xdiff/2 : xdiff - 2*xdiff/(10/i);

                    this.g.ctx.save();
                    this.g.ctx.rect(clipStart, 0, clipWidth, this.g.h);
                    this.g.ctx.clip();

                    this.g.ctx.beginPath();
                    this.g.ctx.fillStyle = currentRoom[4].startsWith("c") ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                    this.g.ctx.moveTo(0, this.g.h2-this.g.h2/6)
                    this.g.ctx.lineTo(this.g.w2, this.g.h2)
                    this.g.ctx.lineTo(0, this.g.h2+this.g.h2/6)

                    this.g.ctx.fill();

                    this.g.ctx.restore();
                }
                
            } else {
                
                this.g.ctx.fillStyle = this.g[`alphaR${i+1}`];
                this.g.ctx.fillRect(x1+scaleFactorX, y1 + scaleFactorY+ydiff, xdiff, this.g.h - scaleFactorY - ydiff - scaleFactorY - ydiff)
                
                this.g.ctx.line(x1+scaleFactorX, y1 + scaleFactorY+ydiff, x1+scaleFactorX + xdiff, y1 +scaleFactorY + ydiff)
                this.g.ctx.line(x1+scaleFactorX, this.g.h - scaleFactorY - ydiff, x1+scaleFactorX + xdiff, this.g.h - scaleFactorY - ydiff)
            }

            if(currentRoom[2] === 1) {

                this.g.ctx.line(this.g.w - scaleFactorX, y1 + scaleFactorY, this.g.w - scaleFactorX - xdiff, y1 + scaleFactorY + ydiff)
                this.g.ctx.line(this.g.w - scaleFactorX, this.g.h - scaleFactorY, this.g.w - scaleFactorX - xdiff, this.g.h - scaleFactorY - ydiff)

                this.g.ctx.drawWall(this.g.w - scaleFactorX, y1+scaleFactorY , this.g.w - scaleFactorX - xdiff, scaleFactorY + ydiff, this.g.w - scaleFactorX - xdiff, this.g.h -scaleFactorY - ydiff,this.g.w - scaleFactorX, this.g.h - scaleFactorY, currentRoom[3],this.g[`alphaR${i}`], this.g[`alphaR${i+1}`])

                // Has something on wall
                if(currentRoom[6] !== 0) {

                    let clipStart = i === 0 ? this.g.w - xdiff/2 : this.g.w-scaleFactorX - xdiff + xdiff/(10/i);
                    let clipWidth = i === 0 ? xdiff/2 : xdiff - 2*xdiff/(10/i);

                    this.g.ctx.save();
                    this.g.ctx.rect(clipStart, 0, clipWidth, this.g.h);
                    this.g.ctx.clip();

                    this.g.ctx.beginPath();
                    this.g.ctx.fillStyle = currentRoom[6].startsWith("c") ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"
                    this.g.ctx.moveTo(this.g.w, this.g.h2-this.g.h2/6)
                    this.g.ctx.lineTo(this.g.w2, this.g.h2)
                    this.g.ctx.lineTo(this.g.w, this.g.h2+this.g.h2/6)

                    this.g.ctx.fill();

                    this.g.ctx.restore();
                }
            } else {

                this.g.ctx.fillStyle = this.g[`alphaR${i+1}`];
                this.g.ctx.fillRect(this.g.w - scaleFactorX - xdiff, y1 + scaleFactorY+ydiff, xdiff, this.g.h - scaleFactorY - ydiff - scaleFactorY - ydiff)

                this.g.ctx.line(this.g.w - scaleFactorX, y1 + scaleFactorY + ydiff, this.g.w - scaleFactorX - xdiff, y1 + scaleFactorY + ydiff)
                this.g.ctx.line(this.g.w - scaleFactorX, this.g.h - scaleFactorY - ydiff, this.g.w - scaleFactorX - xdiff, this.g.h - scaleFactorY - ydiff)
            }
            
            
            if(currentRoom[1] === 1 || i === (rooms-1)) {

                this.g.ctx.fillStyle = currentRoom[3]
                this.g.ctx.fillRect(xdiff + scaleFactorX, ydiff + scaleFactorY, this.g.w -2*scaleFactorX - 2*xdiff, this.g.h-2*scaleFactorY - 2*ydiff);
                this.g.ctx.fillStyle = this.g[`alphaR${i+1}`]
                this.g.ctx.fillRect(xdiff + scaleFactorX, ydiff + scaleFactorY, this.g.w -2*scaleFactorX - 2*xdiff, this.g.h-2*scaleFactorY - 2*ydiff);
                this.g.ctx.strokeRect(xdiff + scaleFactorX, ydiff + scaleFactorY, this.g.w -2*scaleFactorX - 2*xdiff, this.g.h-2*scaleFactorY - 2*ydiff);    

                this.drawWallDecorations(currentRoom, i);

                // Current room is a wall forward or as far forward as we want to draw, no need to dry and draw anything more
                break;
            }

        }

        this.g.navigation.update();

    },

    drawWallDecorations: function(room, distance) {
        // Write text message
        if(room[5] != 0) {
            if(room[5].startsWith("code")) {
                
                this.codeContainer.style.display="block";
                this.codeInput.innerHTML = this.currentCode[room[5]][2]();

                if(distance === 0) {
                    this.codeOverlay.style.display = 'none'
                    this.codeContainer.style.opacity = `1`
                    this.codeContainer.style.transform = `translate(-50%,-50%) scale(1)`
                } else {
                    this.codeOverlay.style.display = 'block'
                    this.codeContainer.style.opacity = `${1-0.4*distance}`
                    this.codeContainer.style.transform = `translate(-50%,-50%) scale(${1-0.4*distance})`
                }
            } else {
                this.msg.innerText = room[5];
                
                this.msg.classList.remove("glitchanimation")

                this.msgContainer.style.display="block";
                this.msgContainer.style.opacity = `${1-0.4*distance}`
                this.msgContainer.style.transform = `translate(-50%,-50%) scale(${1-0.4*distance})`
                
                if(distance === 0) {
                    this.msg.classList.add("glitchanimation")
                }
            }
        }
    },
}