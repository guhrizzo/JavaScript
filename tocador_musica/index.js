// Javascript da página

//variaveis
const asYouWere = {
    songName : 'As You Were',
    artist : 'Tracktribe',
    file: 'as_you_were',
    liked: false,
}
const boomBapFlick = {
    songName : 'Boom Bap Flick',
    artist : 'Quincas Moreira',
    file: 'boom_bap_flick',
    liked: false,
}
const cantHide = {
    songName : "Can\'t Hide",
    artist : 'Otis Mcdonald',
    file: 'cant_hide',
    liked: false,
}

const playlist = JSON.parse(localStorage.getItem('playlist')) ?? [
asYouWere,
boomBapFlick,
cantHide
];

let sortedplaylist = [...playlist];

let index = 0;

const songName = document.getElementById('song-name');

const song = document.getElementById('audio');

const play = document.getElementById('play');

const bandName = document.getElementById('band-name')

const cover = document.getElementById('cover')

const next = document.getElementById('next')

const previous = document.getElementById('previous')

const currentProgress = document.getElementById('current_progress')

const progress_container = document.getElementById('progress_container')

const repeat = document.getElementById('repeat')

const shuffleBotton = document.getElementById('shuffle')

const songTime = document.getElementById('song-time')

const totalTime = document.getElementById('total-time')

const likebutton = document.getElementById('like')

let Isplaying = false;
let IsShuffle = false;
let repeatOn = false;

//funções
//song.play()
function playsong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play()
    Isplaying = true;
}

//song.pause()
function pausesong() {
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    Isplaying = false;
}

//play/pause
function playPauseDecider() {
    if(Isplaying === true) {
        pausesong()
    } else {
        playsong()
    }
}

function likeButtonRender(){
    if(sortedplaylist[index].liked === true){
        likebutton.querySelector('.bi').classList.remove('bi-heart')
        likebutton.querySelector('.bi').classList.add('bi-heart-fill')
        likebutton.classList.add('button-active')
    } else{
        likebutton.querySelector('.bi').classList.add('bi-heart')
        likebutton.querySelector('.bi').classList.remove('bi-heart-fill')
        likebutton.classList.remove('button-active')
    }
}

//carregar
function LoadSong() {
    cover.src = `imagens/${sortedplaylist[index].file}.webp`
    song.src = `musicas/${sortedplaylist[index].file}.mp3`
    songName.innerText = sortedplaylist[index].songName;
    bandName.innerText = sortedplaylist[index].artist;
    likeButtonRender();
}

//som anterior
function previousSong(){
    if(index === 0) {
        index = sortedplaylist.length - 1;
    } else {
        index -= 1;
    }
    LoadSong();
    playsong();
}

//próximo som
function nextSong(){
    if(index === sortedplaylist.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    LoadSong();
    playsong();
}

function updateProgress(){
    song.currentTime
    song.duration
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    updatecurrentTime()
}

function jumpto(event){
    const width = progress_container.clientWidth;
    const clickPosition = event.offsetX;
    const jumptoTime = (clickPosition/width)*song.duration;
    song.currentTime = jumptoTime;
    //alert(song.currentTime);
}

function shuffleArray(preshuffleArray){
    const size = preshuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
       let randomIndex = Math.floor(Math.random()*size);
       let aux = preshuffleArray[currentIndex];
       preshuffleArray[currentIndex] = preshuffleArray[randomIndex];
       preshuffleArray[randomIndex] = aux;
       currentIndex -= 1
    }
}

function shuffleButtonClick() {
    if(IsShuffle === false){
        IsShuffle = true;
        shuffleArray(sortedplaylist);
        shuffleBotton.classList.add('button-active')
    } 
    else {
        IsShuffle = false;
        sortedplaylist = [...playlist];
        shuffleBotton.classList.remove('button-active')
    }
}

function repeatButtonClicked() {
    if(repeatOn === false){
        repeatOn = true
        repeat.classList.add('button-active')
    } else {
        repeatOn = false
        repeat.classList.remove('button-active')
    }
}

function nextOrRepeat(){
    if (repeatOn === false){
        nextSong();
    } else {
        playsong();
    }
}

function toHHMM55(originalNumber){
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60)
    let secs = Math.floor(originalNumber - hours * 3600 - min*60)
    return (`${hours.toString().padStart(2, "0")}:${min.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`)
}

function updatecurrentTime(){
    songTime.innerText = toHHMM55(song.currentTime);
}

function updateTotalTime(){
    
    totalTime.innerText = toHHMM55(song.duration);
}

function likeButtonClicked() {
    if(sortedplaylist[index].liked === false) {
        sortedplaylist[index].liked = true;
    } else {
        sortedplaylist[index].liked = false;
    }
    likeButtonRender()
    localStorage.setItem('playlist', JSON.stringify(playlist))
}

LoadSong();

//escutar eventos
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progress_container.addEventListener('click', jumpto);
shuffleBotton.addEventListener('click', shuffleButtonClick);
repeat.addEventListener('click', repeatButtonClicked)
likebutton.addEventListener('click', likeButtonClicked)