export const solve = {

    init(g, callback) {

        this.g = g;
        this.fpsInterval = 1000 / 60;


        this.g.ctxe.strokeStyle = "#f3f3f3"

        this.no01 = document.getElementById("no01")
        this.no02 = document.getElementById("no02")

        const fontSize = g.w > g.h ? Math.floor(g.h/2) : Math.floor(g.w/2)

        this.no01.style.fontSize = `${fontSize}px`;
        this.no02.style.fontSize = `${fontSize}px`;

        this.callback = callback;

        document.getElementById("solve").addEventListener("click", () => {

            const room = g.room.getRoom();

            const c = g.room.currentCode[room[5]];

            if(c[3]().hashCode() === c[1] || true) {
                // correct
    
                g.ce.style.display = 'block'

                c[4]();
                g.room.currentRoom[g.pos][6] = 0
                g.navigation.update();

                g.audioSuccessSound.play();

                g.room.drawRoom();
    
                g.solve.setupDraw();
                g.solve.draw();


            } else {
                this.fail();
                g.audioErrorSound.play();
                // wrong code
            };
        })

        String.prototype.hashCode = function(){
            var hash = 0;
            if (this.length == 0) return hash;
            for (let i = 0; i < this.length; i++) {
                let char = this.charCodeAt(i);
                hash = ((hash<<5)-hash)+char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        }

    },

    setupDraw: function() {
        this.i = 0;
        this.drawing = true;

        this.lengthx = this.g.w - 2*this.g.xdiff
        this.lengthy = this.g.h - 2*this.g.ydiff

        this.currentLengthx = 0;
        this.currentLengthy = 0;

        this.speedx = this.lengthx / 10;
        this.speedy = this.lengthy / 10;

        this.now = window.performance.now();
    },

    draw: function(newtime) {

        if(!this.drawing) {
            this.g.ctxe.clearRect(0, 0, this.g.w, this.g.h);
            this.g.ce.style.display = 'none'

            return;
        }

        if(!newtime) {
            newtime = window.performance.now()

            let prevx
            let prevy

            for(var i = 0; i < 100; i++) {
                 
                this.g.ctxe.strokeStyle = `rgba(255,255,255,${0.8*Math.random()})`

                const x = this.g.xdiff + 2*Math.random()*(this.g.w2-this.g.xdiff);
                const y = this.g.ydiff + 2*Math.random()*(this.g.h2-this.g.ydiff);

                const k = (y-this.g.h2)/(x - this.g.w2);

                this.g.ctxe.line(x, y, this.g.w2, this.g.h2)
               
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
    },

    fail: function() {
        this.no01.style.display = 'block';
        this.no02.style.display = 'block';

        setTimeout(() => {
            this.no01.style.display = 'none';
            this.no02.style.display = 'none';
        },500)
    }
}