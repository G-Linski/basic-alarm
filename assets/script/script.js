

const clock = document.querySelector('.clock');
//Alarm
const alarmSound = new Audio('./assets/audio/alarm.mp3');
alarmSound.type = 'audio/mp3';
const alarmButton = document.querySelector('.alarm-button');
// const alarm = document.querySelector('.alarm-box p');
const alarm = document.querySelector('.alarm');
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const body = document.querySelector('body');
const bell = document.querySelector('.bell');

const alarmTime = new Date(0,0,0);
let alarmSet = false;
let wakeHour = -1;
let wakeMinute = -1;



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

function displayTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  hours,minutes = formatTime(hours,minutes);
  clock.innerText =  hours + ":" + minutes;



  if (p(hours) === p(wakeHour) && p(minutes) === p(wakeMinute) && alarmSet){
    alarmSound.play();
    setTimeout(resetAlarm, 8000);

  }
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
  }

  else {
    hoursInput.value = '';
    minutesInput.value = '';
  }
  
  
});



// alarmButton.addEventListener('click',function(){
//   let wakeHour = hoursInput.value;
//   let wakeMinute = minutesInput.value;
//   clock.innerText = wakeHour;
//   console.log(wakeHour);
// })



window.addEventListener('onload', displayTime());
setInterval(displayTime, 1000);



















