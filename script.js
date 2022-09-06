document.querySelector('#clock').innerText= "17:59"
const circle= document.getElementsByTagName('circle')[0]

let tmp;
let pause_sb;
let pause_lb;
let animationProgress= [25, 5, 15]
// pomodoro
let pomodoro= document.querySelector('#pomodoro')
let min= pomodoro.value == "" ? 25 : Number(pomodoro.value) 
let sec= 0
let saveProgressTp= 0
function count() {
   
   if (sec == 0) {
      min--
      sec= 60
   } else {
      sec--
      //console.log(sec)
   }
   document.querySelector('#clock').innerText= `${min}:${sec <= 9 ? "0"+sec : sec}`
   
   if (min == 0 && sec == 0) {
      clearInterval(tmp)
      sound()
      min= pomodoro.value == "" ? 25 : Number(pomodoro.value)
      saveProgressTp= 0
      return
   }
   if (saveProgressTp < 974) {
      circle.style.strokeDashoffset-= 974 / (60 * animationProgress[0])
      saveProgressTp+= 974 / (60 * animationProgress[0])
   }
}

let tPomodoro= document.querySelector('#tPomodoro')
tPomodoro.addEventListener("click", () => {
   clearInterval(tmp)
   clearInterval(pause_sb)
   clearInterval(pause_lb)
   tPomodoro.style.background= circle.style.stroke
   removeBackground(sBreak, lBreak)
   circle.style.strokeDashoffset= 0
   animationProgress[0]= pomodoro.value == "" ? 25 : Number(pomodoro.value) 
   circle.style.strokeDashoffset-= saveProgressTp
   
   tmp= setInterval( function() {
      count()
   }, 1000)
}) 

 // Pausa curta
let shortBreak= document.querySelector('#shortBreak')
let minSb= shortBreak.value == "" ? 5 : Number(shortBreak.value)
let secSb= 0
let saveProgressSb= 0
function pauseSb() {
   
   if (secSb == 0) {
      minSb--
      secSb= 60
   } else {
      secSb--
   }

   document.querySelector('#clock').innerHTML= `${minSb}:${secSb <= 9 ? "0"+secSb : secSb}`
   
   if (minSb == 0 && secSb == 0) {
      clearInterval(pause_sb)
      sound()
      minSb= shortBreak.value == "" ? 5 : Number(shortBreak.value)
      saveProgressSb= 0
      return
   }
   if (saveProgressSb < 974) {
      circle.style.strokeDashoffset-= 974 /(60 * animationProgress[1])
      saveProgressSb+= 974 / (60 * animationProgress[1])
   }
}
 
let sBreak= document.querySelector('#sBreak')
sBreak.addEventListener("click", () => {
   clearInterval(tmp)
   clearInterval(pause_lb)
   clearInterval(pause_sb)
   document.querySelector('#clock').innerText= `${shortBreak.value}:00`
   circle.style.strokeDashoffset= 0
   animationProgress[1]= shortBreak.value == "" ? 5 : Number(shortBreak.value)
   circle.style.strokeDashoffset-= saveProgressSb
   
   sBreak.style.background= circle.style.stroke
   removeBackground(tPomodoro, lBreak)
   
   pause_sb= setInterval( function() {
      pauseSb()
   }, 1000)
})

// Pausa longa
let longBreak= document.querySelector('#longBreak')
let minLb= longBreak.value == "" ? 15 : Number(longBreak.value)
let secLb= 0
let saveProgressLb= 0
function pauseLb() {
      
   if (secLb == 0) {
      minLb--
      secLb= 60
   } else {
      secLb--
   }
   document.querySelector('#clock').innerHTML= `${minLb}:${secLb <= 9 ? "0"+secLb : secLb}`
   
   if (minLb == 0 && secLb == 0) {
      clearInterval(pause_lb)
      sound()
      minLb= longBreak.value == "" ? 15 : Number(longBreak.value)
      saveProgressLb= 0
      return
   }
   if (saveProgressLb < 974) {
      circle.style.strokeDashoffset-= 974 /(60 * animationProgress[2])
      saveProgressLb+= 974 / (60 * animationProgress[2])
   }
}

let lBreak= document.querySelector('#lBreak')
lBreak.addEventListener("click", () => {
   clearInterval(tmp)
   clearInterval(pause_sb)
   clearInterval(pause_lb)
   document.querySelector('#clock').innerText= `${longBreak.value}:00`
   circle.style.strokeDashoffset= 0   
   animationProgress[2]= longBreak.value == "" ? 15 : Number(longBreak.value)
   circle.style.strokeDashoffset-= saveProgressLb
   
   lBreak.style.background= circle.style.stroke
   removeBackground(tPomodoro, sBreak)
   
   pause_lb= setInterval( function() {
      pauseLb()
   }, 1000)
})

//Pause
document.querySelector('.time').addEventListener("click", () => {
   clearInterval(tmp)
   clearInterval(pause_sb)
   clearInterval(pause_lb)
   // conf pra remover o background dos elementos
   tPomodoro.style.background= ""
   document.querySelector('#sBreak').style.background= ""
   document.querySelector('#lBreak').style.background= ""
})

//mostrar a central de configurações 
let openSet= document.querySelector('#openSet')
openSet.addEventListener("click", () => {
   clearInterval(pause_sb)
   clearInterval(tmp)
   clearInterval(pause_lb)
   document.querySelector('.settings').style.visibility= "visible"
})

let closeSet= document.querySelector('#closeSet')
closeSet.addEventListener("click", () => {
   document.querySelector('.settings').style.visibility= "hidden"
})

// aplicar as configurações.
document.querySelector('#apply').addEventListener("click", () => {
   clearInterval(tmp)
   clearInterval(pause_sb)
   clearInterval(pause_lb)
   //aplicar pomodoro
   let time= document.querySelector('#pomodoro').value
   document.querySelector('#clock').innerText= `${time}:00`
   document.querySelector('.settings').style.visibility= "hidden"
  
   min= pomodoro.value == "" ? 25 : Number(pomodoro.value)
   minSb= shortBreak.value == "" ? 5 : Number(shortBreak.value)
   minLb= longBreak.value == "" ? 15 : Number(longBreak.value)
   sec= 0
   secLb= 0
   secSb= 0
   
   animationProgress[0]= pomodoro.value == "" ? 25 : Number(pomodoro.value)
   animationProgress[1]= shortBreak.value == "" ? 5 : Number(shortBreak.value)
   animationProgress[2]= longBreak.value == "" ? 15 : Number(longBreak.value)
   
   circle.style.strokeDashoffset= 0
   saveProgressLb= 0
   saveProgressSb= 0
   saveProgressTp= 0
   tmp= setInterval( function() {
      count()
   }, 1000)
})

// MUDAR FONT
let font= document.getElementsByName('font')
let fontApp= document.querySelector('#font')

font[0].addEventListener("click", () => {
   fontApp.style= "font-family: 'serif';"
})
font[1].addEventListener("click", () => {
   fontApp.style= "font-family: 'Manrope', sans-serif;"
})
font[2].addEventListener("click", () => {
   fontApp.style= "font-family: 'Oswald', sans-serif;"
})

// MUDAR COR
let col= document.getElementsByClassName('color')
const color= ["#ff7d7d" , "cyan", "#aa62ff"]
//Cor vermelha
col[0].addEventListener("click", () => {
   circle.style.stroke= color[0]
})
//Cor ciano
col[1].addEventListener("click", () => {
   circle.style.stroke= color[1]
})
//Cor roxa
col[2].addEventListener("click", () => {
   circle.style.stroke= color[2]
})
function removeBackground(t1,t2) {
   t1.style.background= ""
   t2.style.background= ""
}

// VALIDAÇÃO INPUT
let inputVali= document.getElementsByName('input')
for (let i= 0; i < inputVali.length; i++) {
   inputVali[i].addEventListener("keyup", () => {
      if (Number(inputVali[i].value) > 60) {
         inputVali[i].value= 60
      }
   })
}

function sound() {
   const toque= new Audio('toque/toquePomodoroApp.mp3')
   toque.play()
}