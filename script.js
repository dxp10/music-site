const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'antitila_-_fortecya_bahmut',
        displayName: 'Фортеця Бахмут',
        artist: 'Antitila',
    },
    {
        name: 'yarmak_-_hai_nam_brate_poschastit',
        displayName: 'Хай Нам Брате Пощастить',
        artist: 'Yarmak',
    },
    {
        name: 'barabanda_list_do_mami_cover',
        displayName: 'Лист До Мами',
        artist: 'BARABANDA',
    },
    {
        name: 'parfeniuk_-_provela_ekskursiyu',
        displayName: 'Провела екскурсію',
        artist: 'Parfeniuk',
    },
    {
        name: 'skofka_chuti_gimn_cover',
        displayName: 'Чути гімн',
        artist: 'Skofka',
    },
    {
        name: 'Брате мій, вставай!',
        displayName: 'Брате мій, вставай!',
        artist: 'Tabakov',
    },
    {
        name: 'oleksandr_ponomar_ov_-_na_zemli_v_povitri_і_na_mori_(feat._mihailo_homa__taras_topolya__yurii_gorbunov)',
        displayName: 'На Землі В Повітрі І На Морі',
        artist: 'Олександр Пономарьов, Михайло Хома, Тарас Тополя, Юрій Горбунов',
    },
    {
        name: 'BURLA_Molitva_soldata',
        displayName: 'Молитва солдата',
        artist: 'BURLA',
    },
    {
        name: 'Моя країна',
        displayName: 'Моя країна',
        artist: 'Yarmak',
    },
    {
        name: 'Мене вже немає',
        displayName: 'Мене вже немає',
        artist: 'Тартак',
    },
    {
        name: 'Не забудем і не пробачим',
        displayName: 'Не забудем і не пробачим ',
        artist: 'Skofka',
    },
     {
        name: 'myusli_ua_-_ostanovit__vi_cyu_hu..nyu',
        displayName: 'Остановіть Ви Цю Ху..ню! ',
        artist: 'МЮСЛІ UA',
    },
     {
        name: 'brykulets-perestan',
        displayName: 'Перестань ',
        artist: 'BRYKULETS',
    },
    {
        name: 'kalush_skofka_dodomu_cover',
        displayName: 'Додому ',
        artist: 'Kalush,Skofka',
    },
    {
        name: 'Ой На Ой',
        displayName: 'Ой На Ой ',
        artist: 'Skofka',
    },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.webp`;
}

//  Current Song
let songIndex = 0;

// Previous Song
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;
    if (songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e){
    if (isPlaying){
        const{duration, currentTime} = e.srcElement;

        // Update progess bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay Switching duration Element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}


// Set Progress Bar
function setProgressBar(e){
    const width = this.clientWidth
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);