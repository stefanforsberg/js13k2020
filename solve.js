export const solve = {

    init(g, callback) {

        this.g = g;
        this.fpsInterval = 1000 / 60;
        this.now = window.performance.now();
        this.i = 0;
        this.drawing = true;

        this.lengthx = this.g.w - 2*this.g.xdiff
        this.lengthy = this.g.h - 2*this.g.ydiff

        this.currentLengthx = 0;
        this.currentLengthy = 0;

        this.speedx = this.lengthx / 10;
        this.speedy = this.lengthy / 10;

        this.g.ctxe.strokeStyle = "#f3f3f3"

        this.g.ce.style.display = 'block'

        this.callback = callback;
    },

    draw: function(newtime) {

        if(!this.drawing) {
            this.g.ctxe.clearRect(0, 0, this.g.w, this.g.h);
            this.g.ce.style.display = 'none'
            this.callback();
            return;
        }

        if(!newtime) {
            newtime = window.performance.now()

            let prevx
            let prevy

            

            // for(var i = 0; i < 200; i++) {
            //     let x = this.g.w2-this.g.xdiff + Math.floor(Math.random() * 2*this.g.xdiff) + 1  
            //     let y = this.g.h2-this.g.ydiff + Math.floor(Math.random() * 2*this.g.ydiff) + 1 

            //     console.log(x + "; " + y)

            //     this.g.ctxe.strokeStyle = `rgba(255,255,255,${1*Math.random()})`
                
            //     this.g.ctxe.line(x, y, this.g.w2, this.g.h2)

            //     if(Math.random() > 0.8) {
            //         if(prevx) {
            //             this.g.ctxe.line(x, y, prevx, prevy)
            //         }
            //     }

            //     prevx = x;
            //     prevy = y;
            // }

            // prevx = undefined;
            // prevy = undefined;


            for(var i = 0; i < 100; i++) {
                console.log(this.g.h2 +","+ this.g.w2)
                 
                this.g.ctxe.strokeStyle = `rgba(255,255,255,${0.8*Math.random()})`

                const x = this.g.xdiff + 2*Math.random()*(this.g.w2-this.g.xdiff); //  2*this.g.xdiff+Math.random()*(this.g.w-4*this.g.xdiff);
                const y = this.g.ydiff + 2*Math.random()*(this.g.h2-this.g.ydiff); // 2*this.g.ydiff+Math.random()*(this.g.h-4*this.g.ydiff)

                const k = (y-this.g.h2)/(x - this.g.w2);

                this.g.ctxe.line(x, y, this.g.w2, this.g.h2)
               
                // for(var i2 = 0; i2 < 4; i2++) {
                //     this.g.ctxe.strokeStyle = `rgba(255,255,255,${0.3*Math.random()})`
                //     this.g.ctxe.line(x+Math.random()*i2, y-i2+2*Math.random()*i2, x, y)
                // }

                for(var i3 = 0; i3 < 40; i3++) {
                    this.g.ctxe.strokeStyle = `rgba(255,255,255,${0.1*Math.random()})`
                    this.g.ctxe.line(x-i3+2*Math.random()*i3, y-i3+2*Math.random()*i3, x, y)
                }

                if(Math.random() > 0.6) {
                    if(prevx) {
                        this.g.ctxe.beginPath();
                        this.g.ctxe.fillStyle = `rgba(255,255,255,${0.1*Math.random()})`
                        this.g.ctxe.moveTo(this.g.w2, this.g.h2);
                        this.g.ctxe.lineTo(x, y);
                        this.g.ctxe.lineTo(prevx, prevy);
                        this.g.ctxe.fill();
                    } 
                }
                
                prevx = x;
                prevy = y;
            }

            for(var i = 0; i < 40; i++) {
                const x = this.g.xdiff + 2*Math.random()*(this.g.w2-this.g.xdiff)
                const y = this.g.ydiff + 2*Math.random()*(this.g.h2-this.g.ydiff);
                this.g.ctxe.strokeStyle = `rgba(255,255,255,${0.4})`
                this.g.ctxe.line(x-i+2*Math.random()*i, y-i+2*Math.random()*i, x, y)
            }
        }

        

        const elapsed = newtime - this.now;
    
        if(this.drawing) {
            window.requestAnimationFrame(this.draw.bind(this));
        } else {
            console.log("not anymore")
            
        }
        
        this.g.ctxe.strokeStyle = `rgba(255,255,255,1)`

        if (elapsed > this.fpsInterval) {
            this.now  = newtime - (elapsed % this.fpsInterval);
            
            this.currentLengthx +=this.speedx;
            this.currentLengthy +=this.speedy;

            if(this.currentLengthx > this.lengthx) {
                this.currentLengthx = this.lengthx;
                this.drawing = false;
            }

            if(this.currentLengthy > this.lengthy) {
                this.currentLengthy = this.lengthy;
            }



            this.g.ctxe.beginPath();
            this.g.ctxe.moveTo(this.g.xdiff, this.g.ydiff);
            this.g.ctxe.lineTo(this.g.xdiff + this.currentLengthx, this.g.ydiff);
            this.g.ctxe.stroke();

            this.g.ctxe.beginPath();
            this.g.ctxe.moveTo(this.g.w- this.g.xdiff, this.g.h - this.g.ydiff);
            this.g.ctxe.lineTo(this.g.w- this.g.xdiff - this.currentLengthx, this.g.h - this.g.ydiff);
            this.g.ctxe.stroke();

            this.g.ctxe.beginPath();
            this.g.ctxe.moveTo(this.g.xdiff, this.g.h - this.g.ydiff);
            this.g.ctxe.lineTo(this.g.xdiff, this.g.h - this.g.ydiff - this.currentLengthy);
            this.g.ctxe.stroke();

            this.g.ctxe.beginPath();
            this.g.ctxe.moveTo(this.g.w-this.g.xdiff, this.g.ydiff);
            this.g.ctxe.lineTo(this.g.w-this.g.xdiff, this.g.ydiff + this.currentLengthy);
            this.g.ctxe.stroke();
            


            // this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);

            for(var i = 0; i < 20; i++) {
                const x = this.g.xdiff + 2*Math.random()*(this.g.w2-this.g.xdiff)
                const y = this.g.ydiff + 2*Math.random()*(this.g.h2-this.g.ydiff);
                this.g.ctxe.strokeStyle = `rgba(255,255,255,${0.4})`
                this.g.ctxe.line(x-i+2*Math.random()*i, y-i+2*Math.random()*i, x, y)
            }

            console.log((this.speedx / this.lengthx))
            this.g.ctxe.fillStyle = `rgba(255,255,255,0.04)`
            this.g.ctxe.fillRect(this.g.xdiff,this.g.ydiff,this.g.w-this.g.xdiff*2,this.g.h-this.g.ydiff*2);
            
        }
    },

    stop: function() {
        this.drawing = false;
        this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);
    }
}