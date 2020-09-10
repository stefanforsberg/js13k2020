export const navigation = {
    init: function(g) {

        this.nav = document.getElementById("navigation")
        this.nav.style.bottom = `${g.ydiff}px`
        this.nav.style.height = `${Math.floor(1.5*g.ydiff)}px`
    
        Array.from(this.nav.getElementsByTagName("svg")).forEach(svg => {
            svg.setAttribute("width", `${Math.floor(2*g.ydiff)}`)
            svg.setAttribute("height", `${Math.floor(2*g.ydiff)}`)
        })

        document.getElementById("nav-left").style.opacity = 1
        document.getElementById("nav-right").style.opacity = 1

        this.g = g;
        document.getElementById("nav-left").addEventListener("click", (e) => {
            g.room.turnLeft();
        });

        document.getElementById("nav-right").addEventListener("click", (e) => {
            g.room.turnRight();
        });

        document.getElementById("nav-forward").addEventListener("click", (e) => {
            g.room.moveForward();
        });


    },

    remove: function() {
        this.nav.style.display = 'none';
    },

    update: function() {

        document.getElementById("nav-forward").style.opacity = 1

        const r = this.g.room.getRoom();

        if(r[1] > 0) {
            document.getElementById("nav-forward").style.opacity = 0
        }
    }
}

