const App = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  //const replay = document.querySelector(".replay");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  //Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display");

  const outlineLength = outline.getTotalLength();

  //duration

  const timeSelect = document.querySelectorAll(".time-select button");
  console.log(timeSelect);

  let fakeDuration = 600;

  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;

  //song changes

  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      songPlaying(song);
    });
  });

  //time select

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  //play sound

  play.addEventListener("click", () => {
    songPlaying(song);
  });

  const songPlaying = (song) => {
    if (song.paused) {
      video.play();
      song.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  //animate

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsTime = fakeDuration - currentTime;
    let seconds = Math.floor(elapsTime % 60);
    let minutes = Math.floor(elapsTime / 60);

    //animate the circle

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //animate the text

    timeDisplay.innerText = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

App();
