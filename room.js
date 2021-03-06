export const room = {
    init: function(g) {

        this.g = g;

        this.xdiff = Math.round(g.w > g.h ? g.w/10 : g.w/8);
        this.ydiff = Math.round(g.w > g.h ? g.h/8 : g.h/15);

        this.msg = g.gei("message")
        this.msgContainer = g.gei("messagecontainer")
        this.codeContainer = g.gei("codecontainer");
        this.codeOverlay = g.gei("codeoverlay");
        this.codeInput = g.gei("code");
        this.teleportcontainer = g.gei("teleportcontainer");
        this.body = g.gei("body");

        this.cr = "#F57A8D"
        this.cb = "#68D0F7"
        this.cg = "#898989"
        

        this.startRoom = [
            [1,0,1,1, this.cg,0,0,0,"You should not be here"],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,1,1,0, this.cg,0,"code20Start",0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,1,1,0, this.cg,0,"code40Start",0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,"Andrea was always such a square",0],
            [1,1,1,0, this.cg,"3 square is 9","code70Start",0,0],
            [1,0,1,0, this.cg,0,0,"It was always so weird how they name our cat Charlie",0],
            [1,0,-1,0, this.cg,"My best friends lived on Ceadar Street, Main Street and Oxcrowl Street",0,this.cr,0],
            [-3,0,1,0, this.cg,this.cb,0,0,0],
            [1,1,1,0, this.cg,0,"code110Start",0,0],
            [1,1,1,0, this.cg,0,"code120Start",0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,"My step dad Harry basically raised me. My dad is half the man he is.",0,"In some ways Harry and Andrea were very similar",0],
            [1,1,1,0, this.cg,0,"code150Start",0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,"Peter<br/>He/Him",0,0,0],
            [1,1,1,0, this.cg,0,"code210Start",0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,"To the north I faced 1000 fears",0,0,0],
            [1,0,1,0, this.cg,"To the south I faced 1 fear",0,0,0],
            [1,0,1,0, this.cg,"To the west I faced 100 fears",0,0,0],
            [1,0,1,0, this.cg,"To the east I faced 10000 fears",0,0,0],
            [1,1,-10,0, this.cg,0,"My fears","#000000",0],
            [1,0,1,1, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,1,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,0,1,0, this.cg,0,0,0,0],
            [1,1,1,0, this.cg,0,0,0,0],
        ]

        this.redRoom = [
            [1,0,1,1, this.cr,0,0,0,0],
            [1,0,1,0, this.cr,0,0,"Ceadar Street<br/>F0: Karen<br/>F1: Amanda<br/>F2: Joanne<br/>F3: Oliver<br/>F4: Isla<br/>",0],
            [1,0,1,0, this.cr,0,0,0,0],
            [1,0,-2,0, this.cr,"Help me<br/>. . . - - - . . .",0,this.cg,0],
            [1,1,1,0, this.cr,0,"code4Red",0,0],
            [1,1,1,0, this.cr,0,"Red color is unlocked",0,0],
        ],

        this.blueRoom = [
            [1,0,1,1, this.cb,0,0,0,0],
            [1,0,1,0, this.cb,0,0,"Main Street<br/>F0: Callum<br/>F1: Reece<br/>F2: Damian<br/>F3: Patricia<br/>F4: Samantha<br/>",0],
            [1,0,1,0, this.cb,"Oxcrowl Street<br/>F0: Jake<br/>F1: John<br/>F2: Margaret<br/>F3: Susan<br/>F4: Sophie<br/>",0,0,0],
            [1,0,-2,0, this.cb,0,0,this.cg,0],
            [1,0,1,0, this.cb,"That pervert Mr Andrews was always looking at my legs",0,0,0],
            [1,1,1,0, this.cb,0,"code5Blue",0,0],
            [1,1,1,0, this.cb,0,"Blue color is unlocked",0,0],
        ],

        this.blackRoom = [0,0,0,0, "#000000"]; 


        this.startRoomCode = {
            code20Start: ["c20",[51512], ()=> {
                    return (this.generateSelect([4])+this.generateSelect([0])+this.generateSelect([4])).replace(/<select>/g, "<select style='width:33%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[2][1] = 0;
                }],
            code40Start: ["c40",[51512], ()=> {
                    const choices = Array.from(Array(10).keys());
                    const select = this.generateSelect(choices);
                    return (select+select+select).replace(/<select>/g, "<select style='width:33%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[4][1] = 0;
                }],
            code70Start: ["c70",[46908944,49588], ()=> {
                    const choices = Array.from(Array(21).keys());
                    const select = this.generateSelect(choices)
                    return ("<p class='title'>Andrea</p>" + select+select+select).replace(/<select>/g, "<select style='width:33%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[7][1] = 0;
                }],
            code110Start: ["c110",[51512], ()=> {
                    const choices01 = this.redRoom[4][1] === 1 ? ["Red"] : ["4"];
                    const choices02 = this.blueRoom[5][1] === 1 ? ["Blue"] : ["0"];

                    return (`${this.generateSelect(choices01)+this.generateSelect(choices02)+this.generateSelect(["4"])}`).replace(/<select>/g, "<select style='width:100%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[11][1] = 0;
                }],
            code120Start: ["c120",[-146555803], ()=> {
                    const choices = ["Reece", "Margaret", "John", "Damian", "Sophie", "Karen", "Callum", "Susan", "Amanda", "Patricia", "Isla", "Samantha", "Joanne", "Oliver", ];
                    const select = this.generateSelect(choices);
                    return (`<p class='title'>Friends</p>${select+select+select}`).replace(/<select>/g, "<select style='width:100%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[12][1] = 0;
                }],
                code150Start: ["c150",[1513197,49587]
            , ()=> {
                    const choices = Array.from(Array(21).keys());
                    const select = this.generateSelect(choices);
                    return (`<p class='title'>Harry / ? / Dad</p>${select+select+select}`).replace(/<select>/g, "<select style='width:100%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[15][1] = 0;
                }],

            code210Start: ["c210",[1169578626], ()=> {
                    const choices = Array.from(Array(2).keys());
                    const select = this.generateSelect(choices).replace(/<select>/g, "<select style='width:25%'>");
                    return `<p class='title'>Peter</p>${select+select+select+select}<br />${select+select+select+select}<br />${select+select+select+select}`;
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[21][1] = 0;
                }],

            code4Red: ["code4Red",[-1191407169], ()=> {
                    const choices = [".","_"];
                    const select = this.generateSelect(choices);
                    const row = select+select+select+select+select;
                    return (`${row}<br/>${row}<br/>${row}`).replace(/<select>/g, "<select style='width:20%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[4][1] = 0;
                }],

            code5Blue: ["code5Blue",[1517551447], ()=> {
                    return (`<p class='title'>Mr Andrews</p>${this.generateSelect(["Flamingo","King Crab","Horse","Peter","Scorpion"])+this.generateSelect(["Sea star","Black Widow","Elephant","Peter","Rattlesnake"])+this.generateSelect(["Cockroach","Charlie","Cobra","Molly","Penguin", "Bullshark"])}`).replace(/<select>/g, "<select style='width:100%'>");
                },()=> {
                    return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
                }, () => {
                    g.room.currentRoom[5][1] = 0;
                }],
        },

        this.currentCode = this.startRoomCode;
        this.currentRoom = this.startRoom;

        g.ctx.line = g.ctxe.line = function(x1,y1,x2,y2) {
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
    

    },

    generateSelect: function(options) {
        return `<select>${options.reduce( (p,c) => p + `<option>${c}</option>`, "")}</select>`
    },

    turnLeft: function() {
        this.g.dir--;
        if(this.g.dir < 0) { this.g.dir = 3}

        this.drawRoom(true);
    },

    turnRight: function() {
        this.g.dir++;
        if(this.g.dir > 3) { this.g.dir = 0}

        this.drawRoom(true);
    },

    moveForward: function() {

        if(this.currentRoom === this.blackRoom) {
            switch(this.g.dir) {
                case 0: 
                    this.fearCount += 1000;
                    break;
                case 1: 
                    this.fearCount += 10000;
                    break;
                case 2: 
                    this.fearCount += 1;
                    break;
                case 3: 
                    this.fearCount += 100;
                    break;                    
            }

            if(this.fearCount === 404) {
                this.body.style.backgroundColor = this.cg;
                this.currentRoom = this.startRoom;
                this.g.pos = 28;
                this.g.dir = 0;

                this.drawRoom(true);
            }

            if(this.fearCount > 404) {
                this.g.solve.fail();

                this.body.style.backgroundColor = this.cg;
                this.currentRoom = this.startRoom;
                this.g.pos = 27;
                this.g.dir = 0;
                this.currentRoom[27][6] = `I faced ${this.fearCount} fears.`

                this.drawRoom(true);
            }

            return;
        }

        const r = this.getRoom();

        if(r[1] < 1) {

            if(r[1] === -1) {
                this.body.style.backgroundColor = this.cr;
                this.currentRoom = this.redRoom;
                this.g.pos = 0;
                this.g.dir = 0;
            } else if(r[1] === -2) {
                this.body.style.backgroundColor = this.cg;
                this.currentRoom = this.startRoom;
                this.g.pos = 9;
                this.g.dir = 3;
            } else if(r[1] === -3) {
                this.body.style.backgroundColor = this.cb;
                this.currentRoom = this.blueRoom;
                this.g.pos = 0;
                this.g.dir = 0;
            } else if(r[1] === -10) {
                this.fearCount = 0;
                this.body.style.backgroundColor = "#000000";
                this.currentRoom = this.blackRoom;
                this.g.pos = 0;
                this.g.dir = 0;
            }else {
                this.g.pos += (this.g.dir === 0 ? 1 : -1);
            }

            if(this.g.pos >= 28) {

                const percent = 28/this.g.pos;

                this.g.paige.style.display = 'block';

                this.g.paige.style.opacity = 2*(1-percent);

                this.g.c.style.transform = `rotate(${56-2*this.g.pos}deg) scale(${percent})`

                if(this.g.pos === 37) {
                    this.g.intro.outro();
                    this.g.navigation.remove();
                    this.g.c.style.opacity='0'
                    return;
                }
            }

            this.drawRoom(true);
        }

        
    },

    getRoom: function(relativePos = 0) {

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

    drawRoom: function(update) {

        if(update) {
            this.msgContainer.style.display="none";
            this.codeContainer.style.display="none";
            this.teleportcontainer.style.display="none";
        }

        if(this.currentRoom === this.blackRoom) {
            this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);
            return;
        }

        this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);

        const rooms = 3;

        for(var i = 0; i < rooms; i++) {

            const currentRoom = this.getRoom(i);

            const xdiff = this.xdiff;
            const ydiff = this.ydiff;

            const scaleFactorX = i*xdiff;
            const scaleFactorY = i*ydiff;

            if(i == 2) {
                xdiff = Math.floor(xdiff * 0.7)
                ydiff = Math.floor(ydiff * 0.7)
            }

            xdiff = xdiff + Math.floor( (-1*this.g.chaos.level + 2*this.g.chaos.level)*Math.random()*0.3*this.g.chaos.level);
            ydiff = ydiff + Math.floor( (-1*this.g.chaos.level + 2*this.g.chaos.level)*Math.random()*0.2*this.g.chaos.level);

            // Ceiling
            this.g.ctx.fillStyle = this.getWallColor(currentRoom[3]);
            this.g.ctx.fillRect(scaleFactorX, scaleFactorY, this.g.w - 2*scaleFactorX, ydiff);

            var grd = this.g.ctx.createLinearGradient(scaleFactorX,  scaleFactorY, scaleFactorX, scaleFactorY + ydiff);
            grd.addColorStop(0, this.g[`alphaR${i}`]);
            grd.addColorStop(1, this.g[`alphaR${i+1}`]);
            this.g.ctx.fillStyle = grd;
            this.g.ctx.fillRect(scaleFactorX, scaleFactorY, this.g.w - 2*scaleFactorX, ydiff);

            // Floor

            this.g.ctx.fillStyle = this.getWallColor(currentRoom[3]);
            this.g.ctx.fillRect(scaleFactorX, this.g.h - ydiff - scaleFactorY, this.g.w - 2*scaleFactorX, ydiff);

            var grd = this.g.ctx.createLinearGradient(0, this.g.h -scaleFactorY, 0, this.g.h - scaleFactorY -ydiff);
            grd.addColorStop(0, this.g[`alphaR${i}`]);
            grd.addColorStop(1, this.g[`alphaR${i+1}`]);
            this.g.ctx.fillStyle = grd;
            this.g.ctx.fillRect(scaleFactorX, this.g.h - ydiff - scaleFactorY, this.g.w - 2*scaleFactorX, ydiff);


            this.g.ctx.beginPath();
            this.g.ctx.moveTo(scaleFactorX, scaleFactorY)
            this.g.ctx.lineTo(this.g.w -scaleFactorX, scaleFactorY);
            this.g.ctx.lineTo(this.g.w-scaleFactorX, this.g.h -scaleFactorY);
            this.g.ctx.lineTo(scaleFactorX, this.g.h  - scaleFactorY);
            this.g.ctx.lineTo(scaleFactorX,  scaleFactorY)
            this.g.ctx.stroke();

            let color = this.getWallColor(currentRoom[3]);

            // Left part of room
            if(currentRoom[0] === 1) {

                this.g.ctx.line(scaleFactorX, scaleFactorY, scaleFactorX + xdiff, scaleFactorY + ydiff)
                this.g.ctx.line(scaleFactorX, this.g.h - scaleFactorY, scaleFactorX + xdiff, this.g.h - scaleFactorY - ydiff)

                this.g.ctx.drawWall(scaleFactorX,scaleFactorY, scaleFactorX + xdiff, scaleFactorY + ydiff, scaleFactorX + xdiff, this.g.h - scaleFactorY- ydiff, scaleFactorX, this.g.h - scaleFactorY, color, this.g[`alphaR${i}`], this.g[`alphaR${i+1}`])

                // Has something on wall
                if(currentRoom[4] !== 0) {

                    let clipStart = i === 0 ? 0 : scaleFactorX + xdiff/(10/i);
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
                    this.g.ctx.fillStyle = color
                    this.g.ctx.fillRect(scaleFactorX,ydiff,xdiff,this.g.h-2*ydiff)
                }

                this.g.ctx.fillStyle = this.g[`alphaR${i+1}`];
                this.g.ctx.fillRect(scaleFactorX,  scaleFactorY+ydiff, xdiff, this.g.h - scaleFactorY - ydiff - scaleFactorY - ydiff)
                
                this.g.ctx.line(scaleFactorX,  scaleFactorY+ydiff, scaleFactorX + xdiff, scaleFactorY + ydiff)
                this.g.ctx.line(scaleFactorX, this.g.h - scaleFactorY - ydiff, scaleFactorX + xdiff, this.g.h - scaleFactorY - ydiff)
            }


            color = this.getWallColor(currentRoom[3])

            // RIght part 
            if(currentRoom[2] === 1) {

                this.g.ctx.line(this.g.w - scaleFactorX,  scaleFactorY, this.g.w - scaleFactorX - xdiff,  scaleFactorY + ydiff)
                this.g.ctx.line(this.g.w - scaleFactorX, this.g.h - scaleFactorY, this.g.w - scaleFactorX - xdiff, this.g.h - scaleFactorY - ydiff)

                this.g.ctx.drawWall(this.g.w - scaleFactorX, scaleFactorY , this.g.w - scaleFactorX - xdiff, scaleFactorY + ydiff, this.g.w - scaleFactorX - xdiff, this.g.h -scaleFactorY - ydiff,this.g.w - scaleFactorX, this.g.h - scaleFactorY, color,this.g[`alphaR${i}`], this.g[`alphaR${i+1}`])

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
                    this.g.ctx.fillStyle = color
                    this.g.ctx.fillRect(this.g.w-xdiff,ydiff,xdiff,this.g.h-2*ydiff)
                }

                this.g.ctx.fillStyle = this.g[`alphaR${i+1}`];
                this.g.ctx.fillRect(this.g.w - scaleFactorX - xdiff,  scaleFactorY+ydiff, xdiff, this.g.h - scaleFactorY - ydiff - scaleFactorY - ydiff)

                this.g.ctx.line(this.g.w - scaleFactorX,  scaleFactorY + ydiff, this.g.w - scaleFactorX - xdiff,  scaleFactorY + ydiff)
                this.g.ctx.line(this.g.w - scaleFactorX, this.g.h - scaleFactorY - ydiff, this.g.w - scaleFactorX - xdiff, this.g.h - scaleFactorY - ydiff)
            }
            
            // Front
            color = this.getWallColor(currentRoom[3])
            
            if(currentRoom[1] === 1 || i === (rooms-1)) {

                this.g.ctx.fillStyle = color
                this.g.ctx.fillRect(xdiff + scaleFactorX, ydiff + scaleFactorY, this.g.w -2*scaleFactorX - 2*xdiff, this.g.h-2*scaleFactorY - 2*ydiff);
                this.g.ctx.fillStyle = this.g[`alphaR${i+1}`]
                this.g.ctx.fillRect(xdiff + scaleFactorX, ydiff + scaleFactorY, this.g.w -2*scaleFactorX - 2*xdiff, this.g.h-2*scaleFactorY - 2*ydiff);
                this.g.ctx.strokeRect(xdiff + scaleFactorX, ydiff + scaleFactorY, this.g.w -2*scaleFactorX - 2*xdiff, this.g.h-2*scaleFactorY - 2*ydiff);    

                if(update) {
                    this.drawWallDecorations(currentRoom, i);
                }

                // Current room is a wall forward or as far forward as we want to draw, no need to dry and draw anything more
                break;
            }

        }

        if(update) {
            this.g.navigation.update();
        }

        if(!this.timeout && this.g.chaos.level > 0) {
            this.timeout = setTimeout(() => {
                clearTimeout(this.timeout);
                this.timeout = undefined;
                this.drawRoom(false);
            }, this.g.chaos.updateTime);
        }
        

    },

    getWallColor: function(roomColor) {
        let color = roomColor;

        if(Math.random() < this.g.chaos.colorChance ) {
            color = "#" + Math.floor(Math.random()*16777215).toString(16);
        }

        return color;
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