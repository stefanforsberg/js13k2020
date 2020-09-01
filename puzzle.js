export const puzzle = {
    init: function(g) {
        this.g = g;
        this.no01 = document.getElementById("no01")
        this.no02 = document.getElementById("no02")

        const fontSize = g.w > g.h ? Math.floor(g.h/2) : Math.floor(g.w/2)

        this.no01.style.fontSize = `${fontSize}px`;
        this.no02.style.fontSize = `${fontSize}px`;
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