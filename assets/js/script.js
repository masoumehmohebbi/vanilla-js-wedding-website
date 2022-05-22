let $ = document

const menu = $.querySelector(".menu"),
      navbar = $.querySelector(".navbar"),
      navlistMobile = $.querySelector('.nav-list-mobile'),
      mainNavLink = $.querySelectorAll('.main-nav-link')

const lightLogo = $.querySelector('.light_logo'),
      darkLogo = $.querySelector('.dark_logo')
      darkLogoMobile = $.querySelector('.dark_logo_mobile')

const loaderElem = $.querySelector('.loader')

const SMenueSpans = $.querySelectorAll('#container-rsvp span'),
      SMenue = $.querySelector('.S_Menue'),
      containerRsvp = $.querySelector('#container-rsvp')

// Loading window ---
window.addEventListener('load',()=>{
  loaderElem.classList.add('hidden')
})

//Mobile-Navbar ---
menu.addEventListener("click", () => {
  navlistMobile.style.opacity ="1"
  navlistMobile.classList.toggle("change");
});

//--- Stickey-Menue ---
window.addEventListener("scroll", () => {
  if (window.pageYOffset > navbar.offsetTop) {
      navbar.classList.add("sticky");

      mainNavLink.forEach(item =>{
        item.style.color="#282828"

        item.addEventListener('mouseover', ()=>{
          item.style.color="#70A076"
        })
        item.addEventListener('mouseout', ()=>{
          item.style.color="#282828"
        })
      })
      if (matchMedia("(min-width: 768px)").matches) {
          darkLogo.style.display ="block"
          lightLogo.style.display ="none"
      }if (matchMedia("(min-width: 576px)").matches) {
        darkLogo.style.display ="block"
        // darkLogo.style.maxHeight ="5.75rem"
        lightLogo.style.display ="none"
    }
 } else {
      navbar.classList.remove("sticky");
      
      mainNavLink.forEach(item =>{
        item.style.color="#EEE"

        item.addEventListener('mouseover', ()=>{
          item.style.color="#EEE"
        })
        item.addEventListener('mouseout', ()=>{
          item.style.color="#EEE"
        })
      })
      
      if (matchMedia("(min-width: 576px)").matches) {
        lightLogo.style.display ="none"
        darkLogo.style.display ="block"
      }
      if (matchMedia("(min-width: 768px)").matches) {
        lightLogo.style.display ="block"
        darkLogo.style.display ="none"
      }     
 }
  // --- Back_To_Top_Icon ---
  const whenWhereSection = $.querySelector('.when-where-section')
  const backToTopContainer = $.querySelector('.backtotop-container')

  if (window.pageYOffset > whenWhereSection.offsetTop) {
    backToTopContainer.classList.add('show')
  }else{
    backToTopContainer.classList.remove('show')
  }
});

// S-Menue__Rotate---
SMenueSpans.forEach(item =>{
  containerRsvp.addEventListener('mouseover', ()=>{
    item.style.transform= "rotate(" +  360 + "deg)"
    item.style.transition= "all .3s ease-in-out"
  })
  containerRsvp.addEventListener('mouseout', ()=>{
    item.style.transform= "rotate(" + - 360 + "deg)"
    item.style.transition= "all .3s ease-in-out"
  })
})

// --- Music_Website ---
const musicIcon = $.querySelector('.music-icon'),
      playerElem = $.querySelector('.player')
let   flagDisplay = true

musicIcon.addEventListener("click",()=>{
  if (flagDisplay) {
    playerElem.style.display = "block"
    flagDisplay = false
  }else{
    playerElem.style.display = "none"
    flagDisplay = true
  }
})
// Music:
const title = $.getElementById("title"),
      artist = $.getElementById("artist"),
      music = $.querySelector("audio"),
      currentTimeEl = $.getElementById("current-time"),
      durationEl = $.getElementById("duration"),
      progress = $.getElementById("progress"),
      progressContainer = $.getElementById("progress-container"),
      playBtn = $.getElementById("play"),
      background = $.getElementById("background");

const songs = [
  {
    path:
      "assets/media/Parson James - Waiting Game (Acoustic).mp3",
    displayName: "Waiting Game",
    artist: "Parson James",
    cover:
      "assets/images/Capture.JPG",
  },
];

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
}
let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

// --- banner-slider-header- --
let lis = document.querySelectorAll(".liElem"),
    circle = document.querySelectorAll(".circle"),
    num = 1

circle[0].style.backgroundColor = "transparent"
lis[0].style.display = "block";

let classli = 0;
circle.forEach(function(x){
    x.setAttribute("num", classli);
    classli++;
})
circle.forEach(function(x){
    x.addEventListener("click", function(){
        let num = x.getAttribute("num");
        clearInterval(inte);
        lis.forEach(function(x){
            x.style.display = "none";
        });
        circle.forEach(function(x){
            x.style.backgroundColor = "#fff";
        });
        lis[num].style.display = "block";
        circle[num].style.backgroundColor = "#70A076"
    })
})
let inte = setInterval(function(){
    if(num == lis.length){
        num = 0;
    }
    lis.forEach(function(x){
        x.style.display = "none";
    });
    circle.forEach(function(x){
        x.style.backgroundColor = "#9e9a9a";
    })
    lis[num].style.display = "block";

    circle[num].style.backgroundColor = "#70A076"
    num++;
},6000);   //3000

// --- CountDown Wedding ---
let endDate = new Date("Jan 20, 2023 00:00:00").getTime();
let x = setInterval(function() {
    let now = new Date().getTime();
    let distance = endDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    $.querySelector('.countdown-day').innerHTML = ("0" + days).slice(-2);  
    $.querySelector('.countdown-hour').innerHTML = ("0" + hours).slice(-2);
    $.querySelector('.countdown-minute').innerHTML = ("0" + minutes).slice(-2);
    $.querySelector('.countdown-second').innerHTML = ("0" + seconds).slice(-2);
    if (distance < 0) {
        clearInterval(x);
        $.getElementById("countContainer").innerHTML = "EXPIRED";
    }
}, 1000);

 
/* Slider-best_Momets */
let slideIndexTow = 0;
showSlidesBestMoment();

function showSlidesBestMoment() {
  let j,
      slidesTwo = $.getElementsByClassName("mySlides-bestMoments"),
      dotsTwo = $.getElementsByClassName("dot-bestMoments");

  for (j = 0; j < slidesTwo.length; j++) {
    slidesTwo[j].style.display = "none";  
  }
  slideIndexTow++;
  if (slideIndexTow > slidesTwo.length) {slideIndexTow = 1}    
  for (j = 0; j < dotsTwo.length; j++) {
    dotsTwo[j].className = dotsTwo[j].className.replace(" active-bestMoments", "");
  }
  slidesTwo[slideIndexTow-1].style.display = "block";  
  dotsTwo[slideIndexTow-1].className += " active-bestMoments";
  setTimeout(showSlidesBestMoment, 4000)
} 

// --- section-bestFriends _ Switch Form's Tabs
const groomsMenTab = document.querySelector('.groomsMen-tab'),
      brideMaidsTab = document.querySelector('.brideMaids-tab')

const groomsMenForm = document.querySelector('.groomsMen-form'),
      brideMaidsForm = document.querySelector('.brideMaids-form')

  groomsMenTab.addEventListener('click',e =>{
  groomsMenTab.style.borderBottomColor="#70A076"
  brideMaidsTab.style.borderBottomColor="transparent"
 
  brideMaidsForm.style.display = 'none'
  groomsMenForm.style.display = 'block'
  groomsMenForm.style.display = 'flex'

})
brideMaidsTab.addEventListener('click',e =>{
  groomsMenTab.style.borderBottomColor="transparent"
  brideMaidsTab.style.borderBottomColor="#70A076"
  brideMaidsForm.style.display = 'block'
  brideMaidsForm.style.display = 'flex'
  groomsMenForm.style.display    = 'none'
})

// --- section textSlider ---
let containerTextSlider = $.querySelectorAll('.container-textSlider p'),
    counter = 0,
     old = 0

let sliderInterval = setInterval(() =>{
  old = counter -1
  if (counter == containerTextSlider.length) {
    counter=0
  }
    containerTextSlider[counter].style.display="block"
    counter+=1
    
    if (!(containerTextSlider[old] == undefined)) {
      containerTextSlider[old].style.display="none"
    }
},2000)

// --- EventSection-slider ---
let lisEvent = $.querySelectorAll(".liElem-event"),
    circleEvent = $.querySelectorAll(".circle-event"),
     numEvent = 1;

circleEvent[0].style.backgroundColor = "transparent"
lisEvent[0].style.display = "block";

let classliEvent = 0;
circleEvent.forEach(function(x){
    x.setAttribute("numEvent", classliEvent);
    classliEvent++;
})

circleEvent.forEach(function(x){
    x.addEventListener("click", function(){
        let numEvent = x.getAttribute("numEvent");
        clearInterval(inteEvent);
        lisEvent.forEach(function(x){
            x.style.display = "none";
        });
        circleEvent.forEach(function(x){
            x.style.backgroundColor = "#9e9a9a";
        });
        lisEvent[numEvent].style.display = "block";
        circleEvent[numEvent].style.backgroundColor = "#70A076"
    })
})
let inteEvent = setInterval(function(){
  if(numEvent == lisEvent.length){
      numEvent = 0;
  }
  lisEvent.forEach(function(x){
      x.style.display = "none";
  });
  circleEvent.forEach(function(x){
      x.style.backgroundColor = "#9e9a9a";
  })
  lisEvent[numEvent].style.display = "block";

  circleEvent[numEvent].style.backgroundColor = "#70A076"
  numEvent++;
},3000);   //3000

// next and previous button
let arrowLeft= $.querySelector('.fa-chevron-circle-left')
let arrowRight= $.querySelector('.fa-chevron-circle-right')

arrowRight.addEventListener('click',()=>{
  // console.log("right",numEvent)
    clearInterval(inteEvent);
    lisEvent.forEach(function(x){
        x.style.display = "none";
    });
    circleEvent.forEach(function(x){
      x.style.backgroundColor = "#9e9a9a";
    });

    if(numEvent == 3){
      numEvent = 0;
      lisEvent[numEvent].style.display = "block";
      circleEvent[numEvent].style.backgroundColor = "#70A076"
      
    }else{
      lisEvent[numEvent].style.display = "block";
      circleEvent[numEvent].style.backgroundColor = "#70A076"
    }
    numEvent++
})
arrowLeft.addEventListener('click',()=>{
  clearInterval(inteEvent);
  lisEvent.forEach(function(x){
      x.style.display = "none";
  });
  
  circleEvent.forEach(function(x){
  x.style.backgroundColor = "#9e9a9a";
  });
  numEvent--

  if(numEvent == -1){
      numEvent = 2;
      lisEvent[numEvent].style.display = "block";

      circleEvent[numEvent].style.backgroundColor = "#70A076"
    
  }else{
      lisEvent[numEvent].style.display = "block";
      circleEvent[numEvent].style.backgroundColor = "#70A076"
  }
})

// (function (d) {
//   var w = d.documentElement.offsetWidth,
//       t = d.createTreeWalker(d.body, NodeFilter.SHOW_ELEMENT),
//       b;
//   while (t.nextNode()) {
//       b = t.currentNode.getBoundingClientRect();
//       if (b.right > w || b.left < 0) {
//           t.currentNode.style.setProperty('outline', '1px dotted red', 'important');
//           console.log(t.currentNode);
//       }
//   };
// }(document));


