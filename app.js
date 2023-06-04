var data = [
    {
        name: "Tie Me Down",
        singer: "Gryffin, Elley Duhe",
        path: "songs/1. Tie Me Down.mp3",
        image: "img/1.Tie\ Me\ Down.jpg"
    },
    {
        name: "To the Moon",
        singer: "hooligan",
        path: "songs/2. to the moon.mp3",
        image: "img/2.\ To\ the\ Moon.jpg"
    },
    {
        name: "Talking to the Moon",
        singer: "Bruno Mars",
        path: "songs/3. Talking to the Moon.mp3",
        image: "img/3.\ Talking\ to\ the\ Moon.jpg"
    },
    {
        name: "Shadow Of The Sun",
        singer: "Max Elto",
        path: "songs/4. Shadow-Of-The-Sun.mp3",
        image: "img/4.\ Shadow\ Of\ The\ Sun.jpg"
    },
    {
        name: "Love yourself",
        singer: "Justin Bieber",
        path: "songs/5. Love yourself.mp3",
        image: "img/5.\ Love\ yourself.jpg"
    },
    {
        name: "Love Is Gone",
        singer: "Dylan Matthew",
        path: "songs/6. Love Is Gone Acoustic.mp3",
        image: "img/6.\ Love\ Is\ Gone.jpg"
    },
    {
        name: "Double Take",
        singer: "dhruv",
        path: "songs/7. Double Take.mp3",
        image: "img/7.\ Double\ Take.jpg"
    }
]



// đặt biến
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

var listSong = $('.song-list');
var img = $('.song-img');
var songName = $('.song-name');
var singerName = $('.song-singer');
var audio = $('.audio');
var playBtn = $('.player');
var songClick = $('.song-list');
var nextBtn = $('.btn-next-song');
var prevBtn = $('.btn-prev-song');
var randomBtn = $('.btn-random');
var repeatBtn = $('.btn-repeat');
var process = $('input');



var currentIndex = 0;
var isPlaying = false;
var isRandom = false;
var isRepeat = false;
var keyframes = [
    { transform: "rotate(0)" },
    { transform: "rotate(360deg)" },
];

var options = {
    duration: 5000,
    iterations: Infinity,
};
  
var animate = img.animate(keyframes, options);

animate.pause();



// viết hàm


function start() {
    renderSong();
    loadCurretSong();
}

start();
// 1. render list nhạc
function renderSong() {
    var result = data.map(function (element, index) {
        return `
            <li class="list-item ${currentIndex === index ? 'active' : ''}" data-index="${index}">${element.name}</li>      
        `
    })
    var html = result.join('');
    listSong.innerHTML = html;
}

// 2. llấy ra dữ liệu bài đầu tiên
function currentSong() {
    return data[currentIndex];
}

// 3. Load ra bài hiện tại
function loadCurretSong() {
    var imgData = currentSong().image;
    var nameSongData = currentSong().name;
    var nameSingerData = currentSong().singer;
    img.style.backgroundImage = `url('${imgData}')`;
    songName.innerText = `${nameSongData}`;
    singerName.innerText = `${nameSingerData}`;
    audio.src = currentSong().path;
}

// 4. random song
function randomSong() {
    var newCurrentIndex;
    do {
        newCurrentIndex = Math.floor(Math.random() * data.length);
    }while(newCurrentIndex === currentIndex);

    currentIndex = newCurrentIndex;
    loadCurretSong();
    renderSong();
}


// viết events

// 1. Bật tắt bài hát
playBtn.onclick = function() {
    if(isPlaying) {
        audio.pause();
        animate.pause();
    }else {
        audio.play();
        animate.play();
    }

    audio.onplay =function() {
        isPlaying = true;
        playBtn.classList.add('playing');
    }

    audio.onpause =function() {
        isPlaying = false;
        playBtn.classList.remove('playing');
    }
}

/// 2. click vào bài nào thì play bài đó.

songClick.onclick = function(e) {
    var result = e.target.getAttribute("data-index");
    currentIndex = +result;
    loadCurretSong();
    audio.play();
    animate.play();
    playBtn.classList.add('playing');
    isPlaying = true;
    renderSong();
}

//3. nexxt bài hát tiếp theo
nextBtn.onclick = function() {
    if(isRandom) {
        randomSong();
        playBtn.classList.add('playing');
        isPlaying = true;
        audio.play();
        animate.play();
    } else if(isRepeat) {
        loadCurretSong();
        audio.play();
        playBtn.classList.add('playing');
        isPlaying = true;
        animate.play();
    } else {
        currentIndex++;
        if(currentIndex > data.length - 1) {
            currentIndex = 0;
        }
        loadCurretSong();
        renderSong();
        audio.play();
        playBtn.classList.add('playing');
        isPlaying = true;
        animate.play();
    }
}

//4. prev bài hát phía trước
prevBtn.onclick = function() {
    if(isRandom) {
        randomSong();
        playBtn.classList.add('playing');
        isPlaying = true;
        audio.play();
        animate.play();
    } else if(isRepeat) {
        loadCurretSong();
        playBtn.classList.add('playing');
        isPlaying = true;
        animate.play();
        audio.play();
    } else {
        currentIndex--;
        if(currentIndex < 0) {
            currentIndex = data.length - 1;
        }
        loadCurretSong();
        renderSong();
        audio.play();
        playBtn.classList.add('playing');
        isPlaying = true;
        animate.play();
    }
}

//5. random bài hát
randomBtn.onclick = function() {
    isRandom = !isRandom;
    randomBtn.classList.toggle('active', isRandom);
    if($('.box.btn-repeat.active')) {
        $('.box.btn-repeat.active').classList.remove('active');
    }
}

//6. repeat bài hát
repeatBtn.onclick = function() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
    if($('.box.btn-random.active')) {
        $('.box.btn-random.active').classList.remove('active')
    }
}

// 7. tua bài hát

audio.ontimeupdate = function() {
    if(audio.duration) {
        var result = Math.floor(audio.currentTime / audio.duration * 100);
        process.value = result;
    }
}

audio.onended = function() {
    nextBtn.click();
}

process.onchange = function(e) {
    var currentPercent =  e.target.value;
    audio.currentTime = currentPercent / 100 * audio.duration;
}

