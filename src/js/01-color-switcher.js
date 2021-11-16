

const bodyRef = document.querySelector('body');
const btrRef = document.querySelectorAll('button');


[...btrRef].forEach(item => {
    item.addEventListener('click', abdateValue);
    
});
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let activeBtr = false;
function abdateValue(e) {
     //console.log();
    if (e.target.dataset.hasOwnProperty("start") && activeBtr === false) {
        
        timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
    
        }, 1000);
        activeBtr = true;
    }
    if (e.target.dataset.hasOwnProperty('stop')) {
        clearInterval(timerId);
        activeBtr = false;
    }
};



