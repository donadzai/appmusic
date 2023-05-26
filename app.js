var data = [
    {
        name: "Tie Me Down",
        singer: "Gryffin, Elley Duhe",
        path: "songs/1. Tie Me Down.mp3",
        image: "https://cdn.pixabay.com/photo/2014/11/21/03/24/mountains-540115_1280.jpg"
    },
    {
        name: "To the Moon",
        singer: "hooligan",
        path: "songs/2. to the moon.mp3",
        image: "https://cdn.pixabay.com/photo/2018/09/19/23/03/sunset-3689760_1280.jpg"
    },
    {
        name: "Talking to the Moon",
        singer: "Bruno Mars",
        path: "songs/3. Talking to the Moon.mp3",
        image: "https://pixabay.com/vi/photos/beautiful-nature-h%c3%acnh-n%e1%bb%81n-hd-218591/"
    },
    {
        name: "Shadow Of The Sun",
        singer: "Max Elto",
        path: "songs/4. Shadow-Of-The-Sun.mp3",
        image: "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
        name: "Love yourself",
        singer: "Justin Bieber",
        path: "songs/5. Love yourself.mp3",
        image: "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
        name: "Love Is Gone",
        singer: "Dylan Matthew",
        path: "songs/6. Love Is Gone Acoustic.mp3",
        image: "https://cdn.pixabay.com/photo/2023/05/03/12/45/bird-7967577_960_720.jpg"
    },
    {
        name: "Double Take",
        singer: "dhruv",
        path: "songs/7. Double Take.mp3",
        image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
]


var $ = document.querySelector.bind(document);

var listSong = $('.song-list');
var audio = $('.audio');
var currentIndex = 0;
var isPlaying = false;
var isRandom = false;
var isRepeat = false;
var imgSong = $('.song-img');
var songName = $('.song-name');
var songSinger = $('.song-singer');
var url = currentSongTitle(data).image;
var audio = $('.audio');
var playBtn = $('.btn-play');
var player = $('.player');
var progress = $('input');
var animateImg = imgSong.animate([{ 'transform': 'rotate(360deg)'}], {duration: 5000, iterations: Infinity,})
animateImg.pause();

var nextBtn = $('.btn-next-song');
var prevBtn = $('.btn-prev-song');
var randomBtn = $('.btn-random');
var repeatBtn = $('.btn-repeat')



// khởi động ứng dụng

function start() {
    renderSong(data);
    loadCurrentSong();
}

start()

// Vị trí định nghĩa các hàm
//1. render ra list song

function renderSong(data) {
    var result = data.map(function(song) {
        return `
            <li class="list-item">${song.name}</li>
        `
    })

    var html = result.join('')

    listSong.innerHTML = html;
}

//2. lấy giữ liệu của bài hát có index = ...?

function currentSongTitle(data) {
    return data[currentIndex];
}


// 3. load ra nội dung gồm ảnh, img, name , singer tương ứng.
function loadCurrentSong() {
    imgSong.style.backgroundImage = `url('${url}')`;
    songName.innerText = currentSongTitle(data).name;
    songSinger.innerText = currentSongTitle(data).singer;
    audio.src = currentSongTitle(data).path;
}


// 4. Xử lý next bài tiếp theo
function nextSong() {
    currentIndex++;
    if(currentIndex >= data.length) {
        currentIndex = 0
    }
    loadCurrentSong()
}


// 5. Xử lý prev bài trước đó
function prevSong() {
    currentIndex = currentIndex-1;
    if(currentIndex < 0) {
        currentIndex = data.length - 1;
    }
    loadCurrentSong()
}

// 6. Xử lý sự kiện random

function randomSong() {
    var newIndex
    do{
        var newIndex = Math.floor(Math.random() * data.length);
    } while (newIndex === currentIndex) /// nếu newIndex mà = currentIndex thì tiếp tục lặp.
    currentIndex = newIndex; // vẫn thay thế index/ var currentIndex = newIndex => ghi đè
    loadCurrentSong();
}

// 7. Xử lý sự kiện repeat

function repeatSong() {
    currentIndex;
    loadCurrentSong();
}

// Ghi các sự kiện

//1. Sự kiện chạy bài hát và dừng bài hát.
playBtn.onclick = function() {
    audio.play();
    if(isPlaying) {
        audio.pause();
        animateImg.pause();
    } else{
        audio.play();
        animateImg.play();
    }

    audio.onplay = function() {
        isPlaying = true;
        player.classList.add('playing');
    }

    audio.onpause = function() {
        isPlaying = false;
        player.classList.remove('playing');
    }
}

// 2. Sự kiện tua bài hát

// Sự kiện thể hiện tiến độ bài hát
audio.ontimeupdate = function() {
    if(audio.duration) {
        var result = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = result;
    }
}

// sự kiện cho chức năng tua bài hát

progress.onchange = function() {
    var newLocation = progress.value / 100 * audio.duration;
    audio.currentTime = newLocation
}

// Sự kiện next song

nextBtn.onclick = function() {
    if(isRandom) {
        randomSong();
        audio.play();
    } else if(isRepeat) {
        repeatSong();
        audio.play();
    } else{
        nextSong();
        audio.play();
    }
    
    audio.onplay = function() {
        isPlaying = true;
        player.classList.add('playing');
    }

    audio.onpause = function() {
        isPlaying = false;
        player.classList.remove('playing');
    }
}

// Sự kiện prev song

prevBtn.onclick = function() {
    if(isRandom) {
        randomSong()
        audio.play();
    }else if(isRepeat) {
        repeatSong();
        audio.play();
    } else{
        prevSong();
        audio.play();
    }
    
    audio.onplay = function() {
        isPlaying = true;
        player.classList.add('playing');
    }

    audio.onpause = function() {
        isPlaying = false;
        player.classList.remove('playing');
    }
}

// Xử lý sự kiện random

randomBtn.onclick = function() {
    isRandom = !isRandom;
    randomBtn.classList.toggle('active', isRandom);
}

// Xử lý sự kiện repeat

repeatBtn.onclick = function() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
}

// Xử lý khi phát hết bài hát.

audio.onended = function() {
    if(isRandom) {
        randomSong();
        audio.play();
    } else if(isRepeat) {
        repeatSong();
        audio.play();
    } else{
        nextSong();
        audio.play();
    }
    
    audio.onplay = function() {
        isPlaying = true;
        player.classList.add('playing');
    }

    audio.onpause = function() {
        isPlaying = false;
        player.classList.remove('playing');
    }
}

