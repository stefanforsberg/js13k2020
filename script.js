import * as songs from './song.js';

let g = {
    w: 500,
    h: 250,
    w2: 500/2,
    h2: 250/2,
    pos: 0,
    dir: 2,
    room: [
        [1,0,1,1, "#898989",0,0,0,"You should not be here"],
        [1,1,1,0, "#898989","You should not be here","code10",0,0],
        [1,0,1,0, "#e7fbbd",0,0,0,0],
        [1,1,1,0, "#898989",0,0,0,0],
        [1,1,1,0, "#bee5c7",0,0,0,0]
    ],
    code: {
        code10: ["c10","404", ()=> {
                return generateSelect([4])+generateSelect([0])+generateSelect([4]);
            },()=> {
                return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
            }, () => {
                g.room[1][1] = 0;
                g.room[1][4] = "#e7fbbd";
            }],
        c30: ["c30","404", ()=> {
                return generateSelect([0,1,2,3,4,5,6,7,8,9])+generateSelect([0,1,2,3,4,5,6,7,8,9])+generateSelect([0,1,2,3,4,5,6,7,8,9]);
            },()=> {
                return Array.prototype.map.call(document.getElementsByTagName("select"), (s) => s.value).reduce((t, v) => t + v, "");
            }, () => {
                g.room[3][1] = 0;
                g.room[3][4] = "#bee5c7";
            }],
    },
    alphaR0: "rgba(0,0,0,0)",
    alphaR1: "rgba(0,0,0,0.2)",
    alphaR2: "rgba(0,0,0,0.9)",
};

function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function generateSelect(options) {
    return `<select>${options.reduce( (p,c) => p + `<option>${c}</option>`, "")}</select>`
}

function setCanvas() {
    let h = window.innerHeight - 30;
    let w = window.innerWidth -30;

    if(h > 800) {
        h = 800;
    } 

    if(w > 800) {
        w = 800;
    }

    g.w = w;
    g.w2 = w/2;
    g.h = h;
    g.h2 = h/2

    g.c = document.getElementById("canvas");

    g.c.width = w;
    g.c.height = h; 

    g.xdiff = Math.round(g.w > g.h ? g.w/10 : g.w/8);
    g.ydiff = Math.round(g.w > g.h ? g.h/8 : g.h/15);
}

ready(() => {

    var player = new CPlayer();
    player.init(songs.song);

    

    g.c = document.getElementById("canvas");

    setCanvas();

    g.ctx = g.c.getContext("2d");
    g.msg = document.getElementById("message")
    g.msgContainer = document.getElementById("messagecontainer")
    g.codeContainer = document.getElementById("codecontainer");
    g.codeInput = document.getElementById("code");

    document.getElementById("solve").addEventListener("click", () => {
        
        const c = g.code[`code${g.pos}${g.dir}`];
        if(c[3]() === c[1]) {
            c[4]();
            g.code[`c${g.pos}${g.dir}`] = undefined;
            drawRoom();
            // correct
        } else {
            // wrong code
        };
    })

    g.c.addEventListener("click", (e) => {

        // setTimeout(() => {
        //     player.generate();
        //     var wave = player.createWave();
        //     const audio = document.getElementById("asong");
        //     audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
        //     audio.load();
        //     audio.play();
        // }, 1000);

        const x = e.offsetX;
        const y = e.offsetY;

        if(x < g.xdiff) {
            g.dir--;
            if(g.dir < 0) { g.dir = 3}
        } else if(x > g.w-g.xdiff) {
            g.dir++;
            if(g.dir > 3) { g.dir = 0}
        } else {
            const r = getRoom();
            if(r[1] === 0) {
                g.pos += (g.dir === 0 ? 1 : -1);
            }
        }

        console.log("pos: " + g.pos)

        drawRoom();

        // g.ctx.font = "30px Arial";
        // g.ctx.fillStyle = "red";
        // g.ctx.fillText(`${e.clientX - c.offsetLeft + g.w2},${e.clientY - c.offsetTop + g.h2}`, 10, 50);
    })


    g.ctx.line = function(x1,y1,x2,y2) {
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.stroke();
    }

    g.ctx.drawWall = function(x1,y1,x2,y2,x3,y3,x4,y4,fill,a1,a2) {
        g.ctx.beginPath();

        g.ctx.moveTo(x1,y1);
        g.ctx.lineTo(x2,y2);
        g.ctx.lineTo(x3,y3);
        g.ctx.lineTo(x4,y4);
        g.ctx.lineTo(x1,y1);

        var grd = g.ctx.createLinearGradient(x1, y1, x2, y1);
        grd.addColorStop(0, a1);
        grd.addColorStop(1, a2);
        g.ctx.fillStyle = fill;
        g.ctx.fill();
        g.ctx.fillStyle = grd;
        g.ctx.fill();

        g.ctx.line(x1,y1,x2,y2)
        g.ctx.line(x3,y3,x4,y4)
    }

    drawRoom();

});

function getRoom(relativePos = 0) {

    if(relativePos != 0) {
        if(g.dir === 0) relativePos = g.pos + 1;

        if(g.dir === 2) relativePos = g.pos - 1;
    } else {
        relativePos = g.pos;
    }

    const r = g.room[relativePos];
    switch(g.dir) {
        case 0:
            return [r[0],r[1],r[2], r[4], r[5],r[6],r[7]];
        case 1:
            return [r[1],r[2],r[3], r[4], r[6],r[7],r[8]];
        case 2:
            return [r[2],r[3],r[0], r[4], r[7],r[8],r[5]];            
        case 3:
            return [r[3],r[0],r[1], r[4], r[8],r[5],r[6]];
    }
}

function getNextRoomColor() {

    const nextRoomIndex = (g.dir === 0 || g.dir === 3) ? g.pos+1 : g.pos-1;

    return g.room[nextRoomIndex][4]
}

function getNextNextRoomColor() {

    let nextNextRoomIndex = (g.dir === 0 || g.dir === 3) ? g.pos+2 : g.pos-2;

    if(nextNextRoomIndex >= g.room.length) {
        nextNextRoomIndex = nextNextRoomIndex-1;
    } else if(nextNextRoomIndex <= 0) {
        nextNextRoomIndex = 0;
    }

    return g.room[nextNextRoomIndex][4]
}

function drawRoom() {

    console.log("drawing room")

    g.msgContainer.style.display="none";
    g.codeContainer.style.display="none";
    g.ctx.clearRect(0, 0, g.w, g.h);

    const r = getRoom();

    g.ctx.fillStyle = r[3];
    g.ctx.fillRect(0, 0, g.w, g.h);

    let xdiff = Math.round(g.w > g.h ? g.w/10 : g.w/8);
    let ydiff = Math.round(g.w > g.h ? g.h/8 : g.h/15);

    // Ceiling
    var grd = g.ctx.createLinearGradient(0, 0, 0, ydiff);
    grd.addColorStop(0, g.alphaR0);
    grd.addColorStop(1, g.alphaR1);
    g.ctx.fillStyle = grd;
    g.ctx.fillRect(0, 0, g.w, ydiff);

    // Floor
    var grd = g.ctx.createLinearGradient(0, g.h, 0, g.h-ydiff);
    grd.addColorStop(0, g.alphaR0);
    grd.addColorStop(1, g.alphaR1);
    g.ctx.fillStyle = grd;
    g.ctx.fillRect(0, g.h-ydiff, g.w, ydiff);

    // left view
    if(r[0] === 0) {
        g.ctx.line(0,ydiff,xdiff,ydiff)
        g.ctx.line(0,g.h-ydiff,xdiff,g.h-ydiff)

        g.ctx.fillStyle = g.alphaR1
        g.ctx.fillRect(0,ydiff,xdiff,g.h-ydiff*2)

    } else {
        g.ctx.drawWall(0,0,xdiff, ydiff, xdiff,g.h-ydiff,0,g.h, r[3],g.alphaR0,g.alphaR1)

        if(r[4] != 0) {
            
            g.ctx.save();

            const aa = ydiff/1.5;
            const bb = ydiff/3;

            g.ctx.translate(0,g.h2)

            g.ctx.beginPath();

            g.ctx.moveTo(0,-aa);
            g.ctx.lineTo(xdiff/2, -bb);
            g.ctx.lineTo(xdiff/2, bb);
            g.ctx.lineTo(0, aa);

            var grd = g.ctx.createLinearGradient(0, -aa, 0, aa);
            grd.addColorStop(0, "rgba(0,0,0,0.4)");
            grd.addColorStop(1, "rgba(0,0,0,0.6)");
            g.ctx.fillStyle = grd;
            g.ctx.fill();
            g.ctx.stroke();

            g.ctx.restore();
        }
    }

    // center view
    if(r[1] === 0) {
        // // draw room one step forward

        const nextRoom = getRoom(1)
        
        var grd = g.ctx.createLinearGradient(xdiff, ydiff, xdiff, ydiff+ydiff);
        grd.addColorStop(0, g.alphaR1);
        grd.addColorStop(1, g.alphaR2);
        g.ctx.fillStyle = nextRoom[3]
        g.ctx.fillRect(xdiff, ydiff, g.w-xdiff*2, ydiff);
        g.ctx.fillStyle = grd;
        g.ctx.fillRect(xdiff, ydiff, g.w-xdiff*2, ydiff);

        var grd = g.ctx.createLinearGradient(xdiff, g.h-ydiff, xdiff, g.h-ydiff*2);
        grd.addColorStop(0, g.alphaR1);
        grd.addColorStop(1, g.alphaR2);
        g.ctx.fillStyle = nextRoom[3]
        g.ctx.fillRect(xdiff, g.h-ydiff*2, g.w-xdiff*2, ydiff);
        g.ctx.fillStyle = grd;
        g.ctx.fillRect(xdiff, g.h-ydiff*2, g.w-xdiff*2, ydiff);

        // left wall
        g.ctx.drawWall(xdiff,ydiff,xdiff+xdiff, ydiff+ydiff, xdiff+xdiff,g.h-ydiff-ydiff,xdiff,g.h-ydiff, nextRoom[3],g.alphaR1,g.alphaR2)

        if(nextRoom[4] != 0) {
            
            g.ctx.save();

            const aa = ydiff/2.5;
            const bb = ydiff/4;

            g.ctx.translate(xdiff*1.25,g.h2)

            g.ctx.beginPath();

            g.ctx.moveTo(0,-aa);
            g.ctx.lineTo(xdiff/2, -bb);
            g.ctx.lineTo(xdiff/2, bb);
            g.ctx.lineTo(0, aa);

            var grd = g.ctx.createLinearGradient(0, -aa, 0, aa);
            grd.addColorStop(0, "rgba(0,0,0,0.4)");
            grd.addColorStop(1, "rgba(0,0,0,0.6)");
            g.ctx.fillStyle = grd;
            g.ctx.fill();
            g.ctx.stroke();

            g.ctx.restore();
        }

        // right wall
        g.ctx.drawWall(g.w-xdiff, ydiff,g.w-xdiff-xdiff,ydiff+ydiff, g.w-xdiff-xdiff,g.h-ydiff-ydiff,g.w-xdiff,g.h-ydiff, nextRoom[3],g.alphaR1,g.alphaR2)

        // Room two steps ahead
        g.ctx.fillStyle = getNextNextRoomColor();
        g.ctx.fillRect(xdiff*2,ydiff*2,g.w-xdiff*4,g.h-ydiff*4)
        g.ctx.fillStyle = g.alphaR2
        g.ctx.fillRect(xdiff*2,ydiff*2,g.w-xdiff*4,g.h-ydiff*4)

    } else {
        // A wall is in front of us
        g.ctx.fillStyle = g.alphaR1,g.alphaR1
        g.ctx.fillRect(xdiff, ydiff, g.w-2*xdiff, g.h-2*ydiff);

        // Write text message
        if(r[5] != 0) {
            if(r[5].startsWith("code")) {
                g.codeInput.innerHTML = g.code[r[5]][2]();
                g.codeContainer.style.display="block";
            } else {
                g.msg.innerText = r[5];
                g.msgContainer.style.display="block";
            }
        }

        // Write code message

    }

    // right view
    if(r[2] === 0) {
        g.ctx.line(g.w,ydiff,g.w-xdiff,ydiff)
        g.ctx.line(g.w,g.h-ydiff,g.w-xdiff,g.h-ydiff)

        g.ctx.fillStyle = g.alphaR1
        g.ctx.fillRect(g.w-xdiff,ydiff,xdiff,g.h-ydiff*2)
    } else {

        g.ctx.drawWall(g.w, 0,g.w-xdiff,ydiff, g.w-xdiff,g.h-ydiff,g.w,g.h, r[3],g.alphaR0,g.alphaR1)

        if(r[6] != 0) {
            
            g.ctx.beginPath();

            g.ctx.moveTo(g.w,g.h2-ydiff/2);
            g.ctx.lineTo(g.w-xdiff+xdiff/2, g.h2-ydiff/3);
            g.ctx.lineTo(g.w-xdiff+xdiff/2,g.h2+ydiff/3);
            g.ctx.lineTo(g.w, g.h2+ydiff/2);
            g.ctx.lineTo(g.w,g.h2-ydiff/2);

            var grd = g.ctx.createLinearGradient(0, g.h2-ydiff, 0, g.h2+ydiff);
            grd.addColorStop(0, "rgba(0,0,0,0.4)");
            grd.addColorStop(1, "rgba(0,0,0,0.6)");
            g.ctx.fillStyle = grd;
            g.ctx.fill();
            g.ctx.stroke();
        }
        
    }

    g.ctx.beginPath();
    g.ctx.rect(xdiff, ydiff, g.w-2*xdiff, g.h-2*ydiff);
    g.ctx.stroke();

    
    // const t = g.text[`t${g.pos}${g.dir}`];
    // if(t) {
    //    g.msg.innerText = t;
    //    g.msgContainer.style.display="block";
    // }

    // const c = g.code[`c${g.pos}${g.dir}`];

    // if(c) {
    //     g.codeInput.innerHTML = c[2]();
    //     g.codeContainer.style.display="block";
    // }
}

/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*-
*
* Copyright (c) 2011-2013 Marcus Geelnard
*
* This software is provided 'as-is', without any express or implied
* warranty. In no event will the authors be held liable for any damages
* arising from the use of this software.
*
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
*
* 1. The origin of this software must not be misrepresented; you must not
*    claim that you wrote the original software. If you use this software
*    in a product, an acknowledgment in the product documentation would be
*    appreciated but is not required.
*
* 2. Altered source versions must be plainly marked as such, and must not be
*    misrepresented as being the original software.
*
* 3. This notice may not be removed or altered from any source
*    distribution.
*
*/

"use strict";

var CPlayer = function() {

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    // Oscillators
    var osc_sin = function (value) {
        return Math.sin(value * 6.283184);
    };

    var osc_saw = function (value) {
        return 2 * (value % 1) - 1;
    };

    var osc_square = function (value) {
        return (value % 1) < 0.5 ? 1 : -1;
    };

    var osc_tri = function (value) {
        var v2 = (value % 1) * 4;
        if(v2 < 2) return v2 - 1;
        return 3 - v2;
    };

    var getnotefreq = function (n) {
        // 174.61.. / 44100 = 0.003959503758 (F3)
        return 0.003959503758 * Math.pow(2, (n - 128) / 12);
    };

    var createNote = function (instr, n, rowLen) {
        var osc1 = mOscillators[instr.i[0]],
            o1vol = instr.i[1],
            o1xenv = instr.i[3],
            osc2 = mOscillators[instr.i[4]],
            o2vol = instr.i[5],
            o2xenv = instr.i[8],
            noiseVol = instr.i[9],
            attack = instr.i[10] * instr.i[10] * 4,
            sustain = instr.i[11] * instr.i[11] * 4,
            release = instr.i[12] * instr.i[12] * 4,
            releaseInv = 1 / release,
            arp = instr.i[13],
            arpInterval = rowLen * Math.pow(2, 2 - instr.i[14]);

        var noteBuf = new Int32Array(attack + sustain + release);

        // Re-trig oscillators
        var c1 = 0, c2 = 0;

        // Local variables.
        var j, j2, e, t, rsample, o1t, o2t;

        // Generate one note (attack + sustain + release)
        for (j = 0, j2 = 0; j < attack + sustain + release; j++, j2++) {
            if (j2 >= 0) {
                // Switch arpeggio note.
                arp = (arp >> 8) | ((arp & 255) << 4);
                j2 -= arpInterval;

                // Calculate note frequencies for the oscillators
                o1t = getnotefreq(n + (arp & 15) + instr.i[2] - 128);
                o2t = getnotefreq(n + (arp & 15) + instr.i[6] - 128) * (1 + 0.0008 * instr.i[7]);
            }

            // Envelope
            e = 1;
            if (j < attack) {
                e = j / attack;
            } else if (j >= attack + sustain) {
                e -= (j - attack - sustain) * releaseInv;
            }

            // Oscillator 1
            t = o1t;
            if (o1xenv) {
                t *= e * e;
            }
            c1 += t;
            rsample = osc1(c1) * o1vol;

            // Oscillator 2
            t = o2t;
            if (o2xenv) {
                t *= e * e;
            }
            c2 += t;
            rsample += osc2(c2) * o2vol;

            // Noise oscillator
            if (noiseVol) {
                rsample += (2 * Math.random() - 1) * noiseVol;
            }

            // Add to (mono) channel buffer
            noteBuf[j] = (80 * rsample * e) | 0;
        }

        return noteBuf;
    };


    //--------------------------------------------------------------------------
    // Private members
    //--------------------------------------------------------------------------

    // Array of oscillator functions
    var mOscillators = [
        osc_sin,
        osc_square,
        osc_saw,
        osc_tri
    ];

    // Private variables set up by init()
    var mSong, mLastRow, mCurrentCol, mNumWords, mMixBuf;


    //--------------------------------------------------------------------------
    // Initialization
    //--------------------------------------------------------------------------

    this.init = function (song) {
        // Define the song
        mSong = song;

        // Init iteration state variables
        mLastRow = song.endPattern;
        mCurrentCol = 0;

        // Prepare song info
        mNumWords =  song.rowLen * song.patternLen * (mLastRow + 1) * 2;

        // Create work buffer (initially cleared)
        mMixBuf = new Int32Array(mNumWords);
    };


    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    // Generate audio data for a single track
    this.generate = function () {
        // Local variables
        var i, j, b, p, row, col, n, cp,
            k, t, lfor, e, x, rsample, rowStartSample, f, da;

        // Put performance critical items in local variables
        var chnBuf = new Int32Array(mNumWords),
            instr = mSong.songData[mCurrentCol],
            rowLen = mSong.rowLen,
            patternLen = mSong.patternLen;

        // Clear effect state
        var low = 0, band = 0, high;
        var lsample, filterActive = false;

        // Clear note cache.
        var noteCache = [];

         // Patterns
         for (p = 0; p <= mLastRow; ++p) {
            cp = instr.p[p];

            // Pattern rows
            for (row = 0; row < patternLen; ++row) {
                // Execute effect command.
                var cmdNo = cp ? instr.c[cp - 1].f[row] : 0;
                if (cmdNo) {
                    instr.i[cmdNo - 1] = instr.c[cp - 1].f[row + patternLen] || 0;

                    // Clear the note cache since the instrument has changed.
                    if (cmdNo < 16) {
                        noteCache = [];
                    }
                }

                // Put performance critical instrument properties in local variables
                var oscLFO = mOscillators[instr.i[15]],
                    lfoAmt = instr.i[16] / 512,
                    lfoFreq = Math.pow(2, instr.i[17] - 9) / rowLen,
                    fxLFO = instr.i[18],
                    fxFilter = instr.i[19],
                    fxFreq = instr.i[20] * 43.23529 * 3.141592 / 44100,
                    q = 1 - instr.i[21] / 255,
                    dist = instr.i[22] * 1e-5,
                    drive = instr.i[23] / 32,
                    panAmt = instr.i[24] / 512,
                    panFreq = 6.283184 * Math.pow(2, instr.i[25] - 9) / rowLen,
                    dlyAmt = instr.i[26] / 255,
                    dly = instr.i[27] * rowLen & ~1;  // Must be an even number

                // Calculate start sample number for this row in the pattern
                rowStartSample = (p * patternLen + row) * rowLen;

                // Generate notes for this pattern row
                for (col = 0; col < 4; ++col) {
                    n = cp ? instr.c[cp - 1].n[row + col * patternLen] : 0;
                    if (n) {
                        if (!noteCache[n]) {
                            noteCache[n] = createNote(instr, n, rowLen);
                        }

                        // Copy note from the note cache
                        var noteBuf = noteCache[n];
                        for (j = 0, i = rowStartSample * 2; j < noteBuf.length; j++, i += 2) {
                          chnBuf[i] += noteBuf[j];
                        }
                    }
                }

                // Perform effects for this pattern row
                for (j = 0; j < rowLen; j++) {
                    // Dry mono-sample
                    k = (rowStartSample + j) * 2;
                    rsample = chnBuf[k];

                    // We only do effects if we have some sound input
                    if (rsample || filterActive) {
                        // State variable filter
                        f = fxFreq;
                        if (fxLFO) {
                            f *= oscLFO(lfoFreq * k) * lfoAmt + 0.5;
                        }
                        f = 1.5 * Math.sin(f);
                        low += f * band;
                        high = q * (rsample - band) - low;
                        band += f * high;
                        rsample = fxFilter == 3 ? band : fxFilter == 1 ? high : low;

                        // Distortion
                        if (dist) {
                            rsample *= dist;
                            rsample = rsample < 1 ? rsample > -1 ? osc_sin(rsample*.25) : -1 : 1;
                            rsample /= dist;
                        }

                        // Drive
                        rsample *= drive;

                        // Is the filter active (i.e. still audiable)?
                        filterActive = rsample * rsample > 1e-5;

                        // Panning
                        t = Math.sin(panFreq * k) * panAmt + 0.5;
                        lsample = rsample * (1 - t);
                        rsample *= t;
                    } else {
                        lsample = 0;
                    }

                    // Delay is always done, since it does not need sound input
                    if (k >= dly) {
                        // Left channel = left + right[-p] * t
                        lsample += chnBuf[k-dly+1] * dlyAmt;

                        // Right channel = right + left[-p] * t
                        rsample += chnBuf[k-dly] * dlyAmt;
                    }

                    // Store in stereo channel buffer (needed for the delay effect)
                    chnBuf[k] = lsample | 0;
                    chnBuf[k+1] = rsample | 0;

                    // ...and add to stereo mix buffer
                    mMixBuf[k] += lsample | 0;
                    mMixBuf[k+1] += rsample | 0;
                }
            }
        }

        // Next iteration. Return progress (1.0 == done!).
        mCurrentCol++;
        return mCurrentCol / mSong.numChannels;
    };

    // Create a WAVE formatted Uint8Array from the generated audio data
    this.createWave = function() {
        // Create WAVE header
        var headerLen = 44;
        var l1 = headerLen + mNumWords * 2 - 8;
        var l2 = l1 - 36;
        var wave = new Uint8Array(headerLen + mNumWords * 2);
        wave.set(
            [82,73,70,70,
             l1 & 255,(l1 >> 8) & 255,(l1 >> 16) & 255,(l1 >> 24) & 255,
             87,65,86,69,102,109,116,32,16,0,0,0,1,0,2,0,
             68,172,0,0,16,177,2,0,4,0,16,0,100,97,116,97,
             l2 & 255,(l2 >> 8) & 255,(l2 >> 16) & 255,(l2 >> 24) & 255]
        );

        // Append actual wave data
        for (var i = 0, idx = headerLen; i < mNumWords; ++i) {
            // Note: We clamp here
            var y = mMixBuf[i];
            y = y < -32767 ? -32767 : (y > 32767 ? 32767 : y);
            wave[idx++] = y & 255;
            wave[idx++] = (y >> 8) & 255;
        }

        // Return the WAVE formatted typed array
        return wave;
    };

    // Get n samples of wave data at time t [s]. Wave data in range [-2,2].
    this.getData = function(t, n) {
        var i = 2 * Math.floor(t * 44100);
        var d = new Array(n);
        for (var j = 0; j < 2*n; j += 1) {
            var k = i + j;
            d[j] = t > 0 && k < mMixBuf.length ? mMixBuf[k] / 32768 : 0;
        }
        return d;
    };
};

    // // This music has been exported by SoundBox. You can use it with
    // // http://sb.bitsnbites.eu/player-small.js in your own product.

    // // See http://sb.bitsnbites.eu/demo.html for an example of how to
    // // use it in a demo.

    // // Song data
    // var song = {
    //     songData: [
    //       { // Instrument 0
    //         i: [
    //         2, // OSC1_WAVEFORM
    //         100, // OSC1_VOL
    //         128, // OSC1_SEMI
    //         0, // OSC1_XENV
    //         3, // OSC2_WAVEFORM
    //         201, // OSC2_VOL
    //         128, // OSC2_SEMI
    //         0, // OSC2_DETUNE
    //         0, // OSC2_XENV
    //         0, // NOISE_VOL
    //         5, // ENV_ATTACK
    //         6, // ENV_SUSTAIN
    //         58, // ENV_RELEASE
    //         0, // ARP_CHORD
    //         0, // ARP_SPEED
    //         0, // LFO_WAVEFORM
    //         195, // LFO_AMT
    //         6, // LFO_FREQ
    //         1, // LFO_FX_FREQ
    //         2, // FX_FILTER
    //         135, // FX_FREQ
    //         0, // FX_RESONANCE
    //         0, // FX_DIST
    //         32, // FX_DRIVE
    //         147, // FX_PAN_AMT
    //         6, // FX_PAN_FREQ
    //         121, // FX_DELAY_AMT
    //         6 // FX_DELAY_TIME
    //         ],
    //         // Patterns
    //         p: [1],
    //         // Columns
    //         c: [
    //           {n: [123,,135,130,123,,123,,130,131,128,,123,,123,130,135,,135,,123,131,130,,126,,138,,137,,130],
    //            f: []}
    //         ]
    //       },
    //     ],
    //     rowLen: 5513,   // In sample lengths
    //     patternLen: 32,  // Rows per pattern
    //     endPattern: 0,  // End pattern
    //     numChannels: 1  // Number of channels
    //   };
  