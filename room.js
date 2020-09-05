export const room = {
    init: function(g) {

        this.g = g;

        this.xdiff = Math.round(g.w > g.h ? g.w/10 : g.w/8);
        this.ydiff = Math.round(g.w > g.h ? g.h/8 : g.h/15);

        this.msg = document.getElementById("message")
        this.msgContainer = document.getElementById("messagecontainer")
        this.codeContainer = document.getElementById("codecontainer");
        this.codeOverlay = document.getElementById("codeoverlay");
        this.codeInput = document.getElementById("code");
        this.teleportcontainer = document.getElementById("teleportcontainer");
        this.body = document.getElementById("body");

        this.colorRed = "#F57A8D"
        this.colorBlue = "#68D0F7"
        

        this.startRoom = [
            [1,0,1,1, "#898989",0,0,0,"You should not be here"],
            [1,0,1,0, "#898989",0,0,0,0],
            [1,1,1,0, "#898989",0,"code20Start",0,0],
            [1,0,1,0, "#898989",0,0,0,0],
            [1,1,1,0, "#898989",0,"code40Start",0,0],
            [1,0,1,0, "#898989",0,0,0,0],
            [1,0,1,0, "#898989",0,0,"Andrea was always such a square",0],
            [1,1,1,0, "#898989",0,"code70Start",0,0],
            [1,0,1,0, "#898989",0,0,"It was always so weird how they name our cat Charlie",0],
            [1,0,-1,0, "#898989","My best friends lived on Ceadar Street...",0,this.colorRed,0],
            [-3,0,1,0, "#898989",this.colorBlue,0,"... Main Street and Oxcrowl Street",0],
            [1,1,1,0, "#898989",0,"code110Start",0,0],
            [1,0,1,0, "#898989",0,0,0,0],
            [1,0,1,0, "#898989","Peter<br/>He/Him",0,0,0],
            [1,1,1,0, "#898989",0,"code140Start",0,0],
            [1,1,1,0, "#898989",0,"The end of beta ^^",0,0],
        ]

        this.redRoom = [
            [1,0,1,1, this.colorRed,0,0,0,0],
            [1,0,1,0, this.colorRed,0,0,"Ceadar Street<br/>F0: Karen<br/>F1: Amanda<br/>F2: Joanne<br/>F3: Oliver<br/>F4: Isla<br/>",0],
            [1,0,1,0, this.colorRed,0,0,0,0],
            [1,0,1,0, this.colorRed,"Help me<br/>. . . - - - . . .",0,0,0],
            [1,1,1,0, this.colorRed,0,"code4Red",0,0],
            [1,0,1,0, this.colorRed,0,0,0,0],
            [-2,1,1,0, this.colorRed,"#898989",0,0,0],
        ],

        this.blueRoom = [
            [1,0,1,1, this.colorBlue,0,0,0,0],
            [1,0,1,0, this.colorBlue,0,0,"Main Street<br/>F0: Callum<br/>F1: Reece<br/>F2: Damian<br/>F3: Patricia<br/>F4: Samantha<br/>",0],
            [1,0,1,0, this.colorBlue,"Oxcrowl Street<br/>F0: Jake<br/>F1: John<br/>F2: Margaret<br/>F3: Susan<br/>F4: Sophie<br/>",0,0,0],
            [1,0,1,0, this.colorBlue,0,0,0,0],
            [1,0,1,0, this.colorBlue,"That pervert Mr Andrews was always looking at my legs",0,0,0],
            [1,1,1,0, this.colorBlue,0,"code5Blue",0,0],
            [1,0,1,0, this.colorBlue,0,0,0,0],
            [-2,1,1,0, this.colorBlue,"#898989",0,0,0],
        ],



        this.startRoomCode = {
            code20Start: ["c20",51512, ()=> {
                    return (this.generateSelect([4])+this.generateSelect([0])+this.generateSelect([4])).replace(/<select>/g, "<select style='width:33%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[2][1] = 0;
                }],
            code40Start: ["c40",51512, ()=> {
                    const choices = Array.from(Array(10).keys());
                    return (this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)).replace(/<select>/g, "<select style='width:33%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[4][1] = 0;
                }],
            code70Start: ["c70",46908944, ()=> {
                    const choices = Array.from(Array(21).keys());
                    return ("<p class='title'>Andrea</p>" + this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)).replace(/<select>/g, "<select style='width:33%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[7][1] = 0;
                }],

            code110Start: ["c110",-146555803
            , ()=> {
                    const choices = ["Reece", "Margaret", "John", "Damian", "Sophie", "Karen", "Callum", "Susan", "Amanda", "Patricia", "Isla", "Samantha", "Joanne", "Oliver", ];
                    return (`${this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)}`).replace(/<select>/g, "<select style='width:100%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[11][1] = 0;
                }],

            code140Start: ["c140",-1199325762, ()=> {
                    const choices = Array.from(Array(2).keys());
                    const select = this.generateSelect(choices).replace(/<select>/g, "<select style='width:25%'>");
                    return `<p class='title'>Peter</p>${select+select+select+select}<br />${select+select+select+select}<br />${select+select+select+select}`;
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[14][1] = 0;
                }],

            code4Red: ["code4Red",-1191407169, ()=> {
                    const choices = [".","_"];
                    return (`${this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)}<br/>${this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)}<br/>${this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)+this.generateSelect(choices)}`).replace(/<select>/g, "<select style='width:20%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[4][1] = 0;
                }],

            code5Blue: ["code5Blue",1517551447, ()=> {
                    return (`<p class='title'>Mr Andrews</p>${this.generateSelect(["Flamingo","King Crab","Horse","Peter","Scorpion"])+this.generateSelect(["Sea star","Black Widow","Elephant","Peter","Rattlesnake"])+this.generateSelect(["Cockroach","Charlie","Cobra","Molly","Penguin", "Bullshark"])}`).replace(/<select>/g, "<select style='width:100%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[4][1] = 0;
                }],
        },

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
        console.log(r)

        if(r[1] < 1) {

            if(r[1] === -1) {
                this.body.style.backgroundColor = this.colorRed;
                this.currentRoom = this.redRoom;
                this.g.pos = 0;
                this.g.dir = 0;
            } else if(r[1] === -2) {
                this.body.style.backgroundColor = "#898989";
                this.currentRoom = this.startRoom;
                this.g.pos = 9;
                this.g.dir = 3;
            } else if(r[1] === -3) {
                this.body.style.backgroundColor = this.colorBlue;
                this.currentRoom = this.blueRoom;
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

        this.msgContainer.style.display="none";
        this.codeContainer.style.display="none";
        this.teleportcontainer.style.display="none";
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
                
                
                if(i === 0) {
                    this.g.ctx.fillStyle = currentRoom[3]
                    this.g.ctx.fillRect(x1+scaleFactorX,ydiff,xdiff,this.g.h-2*ydiff)
                }

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

                if(i === 0) {
                    this.g.ctx.fillStyle = currentRoom[3]
                    this.g.ctx.fillRect(this.g.w-xdiff,ydiff,xdiff,this.g.h-2*ydiff)
                }

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
                console.log("room 1 : " + room[1])
                if(room[1] < 0) {
                    // Teleport
                    this.teleportcontainer.style.backgroundColor = room[5];
                    this.teleportcontainer.style.display="block";
                } else {
                    this.msg.innerHTML = room[5];
                
                    this.msg.classList.remove("glitchanimation")
    
                    this.msgContainer.style.display="block";
                    this.msgContainer.style.opacity = `${1-0.4*distance}`
                    this.msgContainer.style.transform = `translate(-50%,-50%) scale(${1-0.4*distance})`
                    
                    if(distance === 0) {
                        this.msg.classList.add("glitchanimation")
                    }
                }
                

                
            }
        }
    },
}