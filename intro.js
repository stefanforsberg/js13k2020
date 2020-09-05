export const intro = {

    init(g, callback) {
        this.g = g;
        this.fpsInterval = 1000 / 5;
        this.now = window.performance.now();
        this.i = 0;
        this.drawing = true;

        this.paige = document.getElementById("paige")
        this.paige.style.display = 'block';
        this.paige.addEventListener("click", callback);

        this.msgContainer = document.getElementById("messagecontainer")

        this.msgContainer.style.display = "block"
        this.msgContainer.style.top = "70%"

        this.msgContainer.style.width = Math.floor(0.8*(g.w-(g.xdiff*2))) + "px";

        this.title = document.getElementById("title")
        this.title.innerHTML = "<p class='titleanimation2'>Finding Paige</p>";
    },

    draw: function(newtime) {

    },

    stop: function() {
        this.drawing = false;
        this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);
        this.paige.style.display = 'none';
        this.title.style.display = 'none';
        this.msgContainer.style.top = "50%"
    }
}