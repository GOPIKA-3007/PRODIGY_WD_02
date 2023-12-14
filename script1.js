let startBtn = document.getElementById('start'); 
let stopBtn = document.getElementById('stop'); 
let resetBtn = document.getElementById('reset'); 
let lapButton = document.getElementById('lapButton');
let lapList = document.getElementById('lapList');

let hour = 0; 
let minute = 0; 
let second = 0; 
let count = 0; 
let lapTimes = [];
let timer; // Added a timer variable to control the stopwatch

let startTime; // Track the start time
let elapsedTime = 0; // Track elapsed time

startBtn.addEventListener('click', function () { 
  if (!timer) {
    timer = setInterval(stopWatch, 10);
    startTime = Date.now() - elapsedTime; // Set the start time
  }
}); 

stopBtn.addEventListener('click', function () { 
  if (timer) {
    clearInterval(timer);
    timer = null;
    elapsedTime = Date.now() - startTime; // Calculate elapsed time
  }
}); 

resetBtn.addEventListener('click', function () { 
  clearInterval(timer);
  timer = null;
  hour = 0; 
  minute = 0; 
  second = 0; 
  count = 0; 
  elapsedTime = 0; // Reset elapsed time
  lapTimes = [];
  lapList.innerHTML = ''; // Clear lap times
  document.getElementById('hr').innerHTML = "00"; 
  document.getElementById('min').innerHTML = "00"; 
  document.getElementById('sec').innerHTML = "00"; 
  document.getElementById('count').innerHTML = "00"; 
}); 

lapButton.addEventListener('click', takeLap);

function takeLap() {
  if (timer) {
    const lapTime = formatTime(elapsedTime); // Calculate lap time
    lapTimes.push(lapTime);
    
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    lapList.appendChild(lapItem);
  }
}

function stopWatch() { 
  if (timer) { 
    elapsedTime = Date.now() - startTime; // Calculate elapsed time
  
    count = Math.floor((elapsedTime % 1000) / 10); 
    second = Math.floor((elapsedTime / 1000) % 60); 
    minute = Math.floor((elapsedTime / (1000 * 60)) % 60); 
    hour = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24); 

    // Format time and display
    let hrString = hour < 10 ? "0" + hour : hour; 
    let minString = minute < 10 ? "0" + minute : minute; 
    let secString = second < 10 ? "0" + second : second; 
    let countString = count < 10 ? "0" + count : count; 

    document.getElementById('hr').innerHTML = hrString; 
    document.getElementById('min').innerHTML = minString; 
    document.getElementById('sec').innerHTML = secString; 
    document.getElementById('count').innerHTML = countString; 
  } 
}

function formatTime(ms) {
  let count = Math.floor((ms % 1000) / 10); 
  let sec = Math.floor((ms / 1000) % 60); 
  let min = Math.floor((ms / (1000 * 60)) % 60); 
  let hr = Math.floor((ms / (1000 * 60 * 60)) % 24); 

  let hrString = hr < 10 ? "0" + hr : hr; 
  let minString = min < 10 ? "0" + min : min; 
  let secString = sec < 10 ? "0" + sec : sec; 
  let countString = count < 10 ? "0" + count : count; 

  return `${hrString}:${minString}:${secString}.${countString}`;
}
