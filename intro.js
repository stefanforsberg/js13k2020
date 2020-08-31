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

        this.title = document.getElementById("title")
        this.title.innerText = "Finding Paige"
        
    },

    draw: function(newtime) {

    },

    stop: function() {
        this.drawing = false;
        this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);
        this.paige.style.display = 'none';
        this.title.style.display = 'none';
    }
}