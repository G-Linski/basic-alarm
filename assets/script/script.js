

const clock = document.querySelector('.clock');
const body = document.querySelector('body');
//Alarm
const alarmSound = new Audio('./assets/audio/alarm.mp3');
alarmSound.type = 'audio/mp3';
const alarmButton = document.querySelector('.alarm-button');
const alarm = document.querySelector('.alarm');
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const bell = document.querySelector('.bell');
const alarmTime = new Date(0,0,0);

let alarmSet = false;
let wakeHour = -1;
let wakeMinute = -1;
let delay = false;

//Clock Display Functions
function formatTime(hours, minutes){
  let h = hours.toString();
  let m = minutes.toString();

  if (h.length === 1){
    h = '0'+h;
  }
  if (m.length === 1){
    m = '0'+m;
  }
  return h, m;
}

function resetAlarm(){
  alarmSet = false;
  bell.style.visibility = "hidden";
  alarm.innerHTML = "";
  
}

//Short Parse
function p(x){
  return parseInt(x);
}

//Delay if Same Time
function delayReset(){
  delay = false;
}

//Display on Clock and Alarm
function displayTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours,minutes = formatTime(hours,minutes);
  clock.innerText =  hours + ":" + minutes;
  
  console.log(delay);
  if(sameTime(hours,wakeHour,minutes,wakeMinute) && alarmSet && !delay){
    alarmSound.play();
    setTimeout(resetAlarm, 8000);
    delayReset();

  }
}


//Are Times Equal
function sameTime(h1,h2,m1,m2){
  if (p(h1) === p(h2)){
    if(p(m1)===p(m2)){
      return true;
    }
  }
  return false;
  }




//Alarm Functions
function validateTime(hours,minutes){
  let check1 = false;
  let check2 = false;
  let h = parseInt(hours);
  let m = parseInt(minutes);

  if (h >= 0 && h <= 23){
    check1 = true;
  }
  if (m >= 0 && m <= 60){
    check2 = true;
  }
  // console.log(check1, check2);
  // console.log(h, m);
  // console.log(23 >= 0 && 23 <= 23);
  return (check1 && check2);
}

alarmButton.addEventListener('click',function(){
  wakeHour = hoursInput.value;
  wakeMinute = minutesInput.value;
  if(validateTime(wakeHour,wakeMinute)){

    wakeHour,wakeMinute = formatTime(wakeHour,wakeMinute);
    alarm.innerHTML = wakeHour + ":" + wakeMinute;
    alarmSet = true;
    bell.style.visibility = "visible";

    const currentTime = new Date();
    let h1 = currentTime.getHours();
    let m1 = currentTime.getMinutes();
    if(sameTime(h1,wakeHour,m1,wakeMinute)){
      delay = true;
      setTimeout(delayReset, 60000);
    }
    



  }

  else {
    hoursInput.value = '';
    minutesInput.value = '';
  }
  
  
});




window.addEventListener('onload', displayTime());
setInterval(displayTime, 1000);



















