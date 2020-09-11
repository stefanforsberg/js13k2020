export const intro = {

    init(g, callback) {
        this.g = g;
        this.showingIntro = true;

        this.g.paige = g.gei("paige")
        this.g.paige.style.opacity = "1"

        this.g.eye = g.gei("eye");

        this.introText = g.gei("introtext")

        this.msgContainer = g.gei("messagecontainer")

        this.msgContainer.style.width = Math.floor(0.8*(g.w-(g.xdiff*2))) + "px";

        this.title = g.gei("title")

        this.title.style.top = '15%';
        
        this.title.innerHTML = "<p class='titleanimation2'>Finding Paige</p>";

        this.g.paige.addEventListener("click", () => {

            if(!this.showingIntro) {
                return;
            }
            
            this.showingIntro = false;

            this.title.style.display = 'none';

            this.msgContainer.style.display = "block"

            this.introText.style.display = 'block'
            this.msgContainer.style.background = "rgba(0,0,0,0.8)"
            
            this.introText.addEventListener("click", () => {

                this.msgContainer.style.background = ""

                this.title.style.top = '50%';
                this.introText.style.display = 'none'
                callback();
            });
            
        });


    },

    outro: function() {
        this.title.style.top = '15%';
        this.title.innerText = "THANK YOU"
        this.title.style.display = 'block';

        this.g.solve.setupDraw();
        this.g.solve.draw();

        this.g.eye.style.display = 'block'
        this.g.paige.style.display = 'none'
    },

    stop: function() {
        this.g.ctx.clearRect(0, 0, this.g.w, this.g.h);
        this.g.paige.style.display = 'none';
        this.title.style.display = 'none';
        this.msgContainer.style.top = "50%"
    }
}