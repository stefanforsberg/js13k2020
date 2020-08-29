export const room = {
    init: function(g) {
        this.g = g;

        this.xdiff = Math.round(g.w > g.h ? g.w/10 : g.w/8);
        this.ydiff = Math.round(g.w > g.h ? g.h/8 : g.h/15);
    },

    drawRoom: function() {

        this.g.msgContainer.style.display="none";
        this.g.codeContainer.style.display="none";
        this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);

        const rooms = 3;

        for(var i = 0; i < rooms; i++) {

            const currentRoom = this.g.getRoom(i);

            const scaleFactorX = i*this.xdiff;
            const scaleFactorY = i*this.ydiff;

            const x1 = 0;
            const y1 = 0;

            // Ceiling
            this.g.ctx.fillStyle = currentRoom[3];
            this.g.ctx.fillRect(x1+scaleFactorX, y1 +scaleFactorY, this.g.w - 2*scaleFactorX, this.ydiff);

            var grd = this.g.ctx.createLinearGradient(x1+scaleFactorX, y1 + scaleFactorY, x1+scaleFactorX, scaleFactorY + this.ydiff);
            grd.addColorStop(0, this.g[`alphaR${i}`]);
            grd.addColorStop(1, this.g[`alphaR${i+1}`]);
            this.g.ctx.fillStyle = grd;
            this.g.ctx.fillRect(x1+scaleFactorX, y1 +scaleFactorY, this.g.w - 2*scaleFactorX, this.ydiff);

            // Floor

            this.g.ctx.fillStyle = currentRoom[3];
            this.g.ctx.fillRect(x1+scaleFactorX, this.g.h - this.ydiff - scaleFactorY, this.g.w - 2*scaleFactorX, this.ydiff);

            var grd = this.g.ctx.createLinearGradient(0, this.g.h -scaleFactorY, 0, this.g.h - scaleFactorY -this.ydiff);
            grd.addColorStop(0, this.g[`alphaR${i}`]);
            grd.addColorStop(1, this.g[`alphaR${i+1}`]);
            this.g.ctx.fillStyle = grd;
            this.g.ctx.fillRect(x1+scaleFactorX, this.g.h - this.ydiff - scaleFactorY, this.g.w - 2*scaleFactorX, this.ydiff);


            this.g.ctx.beginPath();
            this.g.ctx.moveTo(x1+scaleFactorX, y1 +scaleFactorY)
            this.g.ctx.lineTo(this.g.w -scaleFactorX, y1  +scaleFactorY);
            this.g.ctx.lineTo(this.g.w-scaleFactorX, this.g.h -scaleFactorY);
            this.g.ctx.lineTo(x1 +scaleFactorX, this.g.h  - scaleFactorY);
            this.g.ctx.lineTo(x1 +scaleFactorX, y1 + scaleFactorY)
            this.g.ctx.stroke();

            // Left part of room
            if(currentRoom[0] === 1) {
                this.g.ctx.line(x1+scaleFactorX, y1 +scaleFactorY, x1+scaleFactorX + this.xdiff, y1 +scaleFactorY + this.ydiff)
                this.g.ctx.line(x1+scaleFactorX, this.g.h - scaleFactorY, x1+scaleFactorX + this.xdiff, this.g.h - scaleFactorY - this.ydiff)

                this.g.ctx.drawWall(x1+scaleFactorX,y1+scaleFactorY, x1+scaleFactorX + this.xdiff, y1+scaleFactorY + this.ydiff, x1 +scaleFactorX + this.xdiff, this.g.h - scaleFactorY- this.ydiff, x1 + scaleFactorX, this.g.h - scaleFactorY, currentRoom[3], this.g[`alphaR${i}`], this.g[`alphaR${i+1}`])

                // Has text written on wall
                if(currentRoom[4] !== 0) {

                    this.g.ctx.save();
                    this.g.ctx.rect(x1+scaleFactorX, 0, x1+scaleFactorX + this.xdiff, this.g.h);
                    this.g.ctx.clip();

                    this.g.ctx.beginPath();
                    this.g.ctx.fillStyle = "rgba(0,0,0,0.3)"
                    this.g.ctx.moveTo(0, this.g.h2-this.g.h2/6)
                    this.g.ctx.lineTo(this.g.w2, this.g.h2)
                    this.g.ctx.lineTo(0, this.g.h2+this.g.h2/6)

                    this.g.ctx.fill();

                    this.g.ctx.restore();
                }
                
            } else {
                
                this.g.ctx.line(x1+scaleFactorX, y1 + scaleFactorY+this.ydiff, x1+scaleFactorX + this.xdiff, y1 +scaleFactorY + this.ydiff)

            }

            if(currentRoom[2] === 1) {
                this.g.ctx.line(this.g.w - scaleFactorX, y1 + scaleFactorY, this.g.w - scaleFactorX - this.xdiff, y1 + scaleFactorY + this.ydiff)
                this.g.ctx.line(this.g.w - scaleFactorX, this.g.h - scaleFactorY, this.g.w - scaleFactorX - this.xdiff, this.g.h - scaleFactorY - this.ydiff)

                this.g.ctx.drawWall(this.g.w - scaleFactorX, y1+scaleFactorY , this.g.w - scaleFactorX - this.xdiff, scaleFactorY + this.ydiff, this.g.w - scaleFactorX - this.xdiff, this.g.h -scaleFactorY - this.ydiff,this.g.w - scaleFactorX, this.g.h - scaleFactorY, currentRoom[3],this.g[`alphaR${i}`], this.g[`alphaR${i+1}`])
            } else {
                this.g.ctx.line(this.g.w - scaleFactorX, y1 + scaleFactorY + this.ydiff, this.g.w - scaleFactorX - this.xdiff, y1 + scaleFactorY + this.ydiff)
            }
            
            
            if(currentRoom[1] === 1 || i === (rooms-1)) {

                this.g.ctx.fillStyle = currentRoom[3]
                this.g.ctx.fillRect(this.xdiff + scaleFactorX, this.ydiff + scaleFactorY, this.g.w -2*scaleFactorX - 2*this.xdiff, this.g.h-2*scaleFactorY - 2*this.ydiff);
                this.g.ctx.fillStyle = this.g[`alphaR${i+1}`]
                this.g.ctx.fillRect(this.xdiff + scaleFactorX, this.ydiff + scaleFactorY, this.g.w -2*scaleFactorX - 2*this.xdiff, this.g.h-2*scaleFactorY - 2*this.ydiff);
                this.g.ctx.strokeRect(this.xdiff + scaleFactorX, this.ydiff + scaleFactorY, this.g.w -2*scaleFactorX - 2*this.xdiff, this.g.h-2*scaleFactorY - 2*this.ydiff);    

                this.drawWallDecorations(currentRoom, i);

                // Current room is a wall forward or as far forward as we want to draw, no need to dry and draw anything more
                break;
            }

        }
    },

    drawWallDecorations: function(room, distance) {
        // Write text message
        if(room[5] != 0) {
            if(room[5].startsWith("code")) {
                
                this.g.codeContainer.style.display="block";
                this.g.codeInput.innerHTML = this.g.code[room[5]][2]();

                if(distance === 0) {
                    this.g.codeOverlay.style.display = 'none'
                    this.g.codeContainer.style.opacity = `1`
                    this.g.codeContainer.style.transform = `translate(-50%,-50%) scale(1)`
                } else {
                    this.g.codeOverlay.style.display = 'block'
                    this.g.codeContainer.style.opacity = `${1-0.4*distance}`
                    this.g.codeContainer.style.transform = `translate(-50%,-50%) scale(${1-0.4*distance})`
                }
            } else {
                this.g.msg.innerText = room[5];
                
                this.g.msg.classList.remove("glitchanimation")

                this.g.msgContainer.style.display="block";
                this.g.msgContainer.style.opacity = `${1-0.4*distance}`
                this.g.msgContainer.style.transform = `translate(-50%,-50%) scale(${1-0.4*distance})`
                
                if(distance === 0) {
                    this.g.msg.classList.add("glitchanimation")
                }
            }
        }
    }
}