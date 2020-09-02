export const navigation = {
    init: function(g) {

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

            // console.log("forward: " + g.pos + ", " + g.dir)

            // const r = g.room.getRoom();
            // if(r[1] === 0) {
            //     g.pos += (g.dir === 0 ? 1 : -1);
            // }
            // this.update();
        });


    },
    update: function() {

        document.getElementById("nav-forward").style.opacity = 1

        const r = this.g.room.getRoom();
        if(r[1] !== 0) {
            document.getElementById("nav-forward").style.opacity = 0
        }
    }
}

