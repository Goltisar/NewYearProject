const lamps = document.querySelectorAll("#garland-btn");
const star = document.querySelector(".red-star");

sequence = [...Array(lamps.length).keys()];
let pointer = 0;
let isFirstClick = true;
let startTime = new Date().getTime();

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
}
sequence.shuffle();

function restart(){
    for(let lamp of lamps){
        lamp.style.background = "gray";
    }
    pointer = 0;
    sequence.shuffle();
    console.log(sequence);
    isFirstClick = true;
}

function blink(){
    let op = 0.1;
    let timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        star.style.opacity = op;
        op += 0.1;
    }, 20);
    setTimeout(function() {
        let timer1 = setInterval(function () {
            if (op < 0.1){
                clearInterval(timer1);
            }
            star.style.opacity = op;
            op -= 0.1;
        }, 20);
    }, 200);
}

for(let lamp of lamps){
    lamp.addEventListener("click", () => {
        if(isFirstClick){
            startTime = new Date().getTime();
            isFirstClick = false;
        }
        let currLamp = sequence[pointer];
        if(parseInt(lamp.classList[0].slice(4)) === currLamp){
            lamp.style.background = "transparent";
            pointer++;
        }
        else if (lamp.style.background != "transparent"){
            blink();
            for(let lamp of lamps){
                lamp.style.background = "gray";
            }
            pointer = 0;
        }
        if (pointer === lamps.length){
            let time = (new Date().getTime() - startTime) / 1000;
            pointer = 0;
            document.body.dispatchEvent(new CustomEvent('finish', { 'detail': `Вы прошли! Ваше время: ${Math.floor(time)} сек.` }));
        }
    })
}