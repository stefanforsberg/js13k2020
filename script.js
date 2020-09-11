import * as songs from './song.js';
import { intro } from './intro.js';
import { solve } from './solve.js';
import { navigation} from './navigation.js';
import { room } from './room.js'
import {CPlayer} from './player_small'

let g = {
    w: 500,
    h: 250,
    w2: 500/2,
    h2: 250/2,
    pos: 0,
    dir: 0,
    chaos: {
        level: 1,
        updateTime: 10000,
        colorChance: 0.001
    },
    
    alphaR0: "rgba(0,0,0,0)",
    alphaR1: "rgba(0,0,0,0.2)",
    alphaR2: "rgba(0,0,0,0.7)",
    alphaR3: "rgba(0,0,0,0.9)",
    
    increaseChaos: function() {
        this.chaos.level++;

        if(this.chaos.level < 4) {
            this.chaos.colorChance = 0.001
            this.chaos.updateTime = 3000;
        } else if(this.chaos.level < 10) {
            this.chaos.colorChance = 0.01
            this.chaos.updateTime = 800;
        } else  {
            this.chaos.colorChance = 0.04
            this.chaos.updateTime = 200;
        }
    },

    gei: function(id) {
        return document.getElementById(id);
    }
};

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}



function setCanvas() {
    let h = window.innerHeight - 20;
    let w = window.innerWidth - 20;

    if(h > 800) {
        h = 800;
    } 

    if(w > 800) {
        w = 800;
    }

    g.w = w;
    g.w2 = Math.floor(w/2);
    g.h = h;
    g.h2 = Math.floor(h/2);

    g.c.width = w;
    g.c.height = h; 

    g.ce.width = w;
    g.ce.height = h; 

    g.xdiff = Math.round(g.w > g.h ? g.w/10 : g.w/8);
    g.ydiff = Math.round(g.w > g.h ? g.h/8 : g.h/15);


}

function preloadAudio(player, cb) {

    const done = player.generate() >= 1

    if(done) {
        const wave = player.createWave()
        const blob = new Blob([wave], {type: "audio/wav"})
        const url = window.URL.createObjectURL(blob)        
        cb(url)
    } else {
        setTimeout(() => {return preloadAudio(player, cb)}, 100)
    }
}

function startGame () {

    g.ctx = g.c.getContext("2d");
    g.ctxe = g.ce.getContext("2d");

    room.init(g);

    g.room = room;

    g.intro = intro;

    intro.init(g, () => {

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();

        g.audioSong.loop = true;
        g.audioSong.play();

        intro.stop();

        g.ctx.strokeStyle = `rgba(0,0,0,1)`;

        navigation.init(g);

        g.navigation = navigation;

        solve.init(g)

        g.solve = solve;

        g.room.drawRoom(true);
    });
}

ready(() => {

    var player = new CPlayer();

    g.c = g.gei("canvas");
    g.ce = g.gei("canvaseffect");

    setCanvas();

    player.init(songs.song);
    

    g.audioSong = new Audio();
    g.audioErrorSound = new Audio();
    g.audioSuccessSound = new Audio();

    preloadAudio(player, (url) => {
        g.audioSong.src = url;

        player.init(songs.errorsound);

        preloadAudio(player, (url) => {
            g.audioErrorSound.src = url

            player.init(songs.successsound);

            preloadAudio(player, (url) => {
                g.audioSuccessSound.src = url
    
                startGame();
            })
        })
        
    });
});