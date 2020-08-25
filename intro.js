export const intro = {

    init(g, callback) {
        this.g = g;
        this.fpsInterval = 1000 / 5;
        this.now = window.performance.now();
        this.i = 0;
        this.drawing = true;

        document.getElementById("paige").addEventListener("click", callback);
    },

    draw: function(newtime) {

        if(!newtime) {
            newtime = window.performance.now()
        }

        // this.now = newtime;
        const elapsed = newtime - this.now;
    
        // if enough time has elapsed, draw the next frame
    
        if(this.drawing) {
            window.requestAnimationFrame(this.draw.bind(this));
        }
        

        if (elapsed > this.fpsInterval) {
            this.now  = newtime - (elapsed % this.fpsInterval);
    
            

            const x1 = this.g.w2 - (this.g.w2 / 2) + Math.floor(Math.random()*5)
            const y1 = this.g.h2 - (this.g.h2 / 2) + Math.floor(Math.random()*5)

            this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);

            const rooms = 3;
            for(var i = 0; i < rooms; i++) {
                this.g.ctx.strokeStyle = `rgba(255,255,255,${0.7-i*0.2})`;

                const scaleFactorX = i*x1/4;
                const scaleFactorY = i*y1/4;

                this.g.ctx.beginPath();
                this.g.ctx.moveTo(x1+scaleFactorX, y1 +scaleFactorY + Math.floor(Math.random()*5))
                this.g.ctx.lineTo(x1*3 -scaleFactorX, y1  +scaleFactorY + Math.floor(Math.random()*5));
                this.g.ctx.lineTo(x1*3-scaleFactorX, y1*3 -scaleFactorY + Math.floor(Math.random()*5));
                this.g.ctx.lineTo(x1 +scaleFactorX, y1*3 - scaleFactorY + Math.floor(Math.random()*5));
                this.g.ctx.lineTo(x1 +scaleFactorX, y1 + scaleFactorY + Math.floor(Math.random()*5))
                this.g.ctx.stroke();
               
                this.g.ctx.fillStyle = `rgba(0,0,0,0.3)`;
                this.g.ctx.fillRect(x1+scaleFactorX, y1 +scaleFactorY, x1*2-scaleFactorX*2, y1*2-scaleFactorY*2)
            }
        }
    },

    stop: function() {
        this.drawing = false;
        document.getElementById("paige").style.display = 'none';
        document.getElementById("title").style.display = 'none';
    }
}