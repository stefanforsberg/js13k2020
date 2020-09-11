export const navigation = {
    init: function(g) {

        this.nav = g.gei("navigation")
        this.nav.style.bottom = `${g.ydiff}px`
        this.nav.style.height = `${Math.floor(1.5*g.ydiff)}px`
    
        Array.from(this.nav.getElementsByTagName("svg")).forEach(svg => {
            svg.setAttribute("width", `${Math.floor(2*g.ydiff)}`)
            svg.setAttribute("height", `${Math.floor(2*g.ydiff)}`)
        })

        this.left = g.gei("nav-left")
        this.right = g.gei("nav-right")
        this.forward = g.gei("nav-forward")

        this.right.innerHTML = this.left.innerHTML;

        this.left.style.opacity = 1
        this.right.style.opacity = 1

        this.g = g;
        this.left.addEventListener("click", (e) => {
            g.room.turnLeft();
        });

        this.right.addEventListener("click", (e) => {
            g.room.turnRight();
        });

        this.forward.addEventListener("click", (e) => {
            g.room.moveForward();
        });


    },

    remove: function() {
        this.nav.style.display = 'none';
    },

    update: function() {

        this.forward.style.opacity = 1

        const r = this.g.room.getRoom();

        if(r[1] > 0) {
            this.forward.style.opacity = 0
        }
    }
}

