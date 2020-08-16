function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(() => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(40, 25);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(350, 0);
    ctx.lineTo(310, 25);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.lineTo(40, 475);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(350, 500);
    ctx.lineTo(310, 475);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(40, 25, 270, 450);
    ctx.stroke();
});