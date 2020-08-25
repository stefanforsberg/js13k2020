export const navigation = {
    init: function(g) {

        document.getElementById("nav-left").style.opacity = 1
        document.getElementById("nav-right").style.opacity = 1

        this.g = g;
        document.getElementById("nav-left").addEventListener("click", (e) => {
            g.dir--;
            if(g.dir < 0) { g.dir = 3}
            this.update();
        });

        document.getElementById("nav-right").addEventListener("click", (e) => {
            g.dir++;
            if(g.dir > 3) { g.dir = 0}
            this.update();
        });

        document.getElementById("nav-forward").addEventListener("click", (e) => {
            
            const r = g.getRoom();
            if(r[1] === 0) {
                g.pos += (g.dir === 0 ? 1 : -1);
            }
            this.update();
        });


    },
    update: function() {
        document.getElementById("nav-forward").style.opacity = 1

        this.g.drawRoom();
        
        const r = this.g.getRoom();
        if(r[1] !== 0) {
            document.getElementById("nav-forward").style.opacity = 0
        }
    }
}

