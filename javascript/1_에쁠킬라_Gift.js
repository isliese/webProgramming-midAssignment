/* ==================== 유효성 검사 및 보내기 기능 ==================== */
const sendBtn = document.getElementById('sendBtn');
const recipientInput = document.getElementById('recipientInput');
const messageInput = document.getElementById('messageInput');
const popupToggle = document.getElementById('popup-toggle');
const alertMessage = document.getElementById('alertMessage');
const alertText = document.getElementById('alertText');

function showAlert(message) {
    alertText.textContent = message;
    alertMessage.classList.add('show');

    setTimeout(() => {
        alertMessage.classList.remove('show');
    }, 3000);
}

function validateInputs() {
    const recipient = recipientInput.value.trim();
    const message = messageInput.value.trim();

    recipientInput.classList.remove('error');
    messageInput.classList.remove('error');

    if (!recipient && !message) {
        recipientInput.classList.add('error');
        messageInput.classList.add('error');
        showAlert('받는 사람과 메시지를 모두 입력하세요.');
        recipientInput.focus();
        return false;
    }

    if (!recipient) {
        recipientInput.classList.add('error');
        showAlert('받는 사람을 입력하세요.');
        recipientInput.focus();
        return false;
    }

    if (!message) {
        messageInput.classList.add('error');
        showAlert('메시지를 입력하세요.');
        messageInput.focus();
        return false;
    }

    return true;
}

sendBtn.addEventListener('click', () => {
    if (validateInputs()) {
        popupToggle.checked = true;
    }
});

recipientInput.addEventListener('input', () => {
    recipientInput.classList.remove('error');
});
messageInput.addEventListener('input', () => {
    messageInput.classList.remove('error');
});

/* ==================== 재생바 관련 ==================== */
const playableTracks = [
    { title: "Don't Look Back In Anger", artist: "Oasis", image: "../src/img/1_DontLookBackInAnger.jpg" },
    { title: "좋은 밤 좋은 꿈", artist: "SG 워너비", image: "../img/1_좋은밤좋은꿈.jpg" },
    { title: "에피소드", artist: "이무진", image: "../img/1_에피소드.jpg" },
    { title: "Trip", artist: "릴러말즈 (Feat. Hannah)", image: "../img/1_Trip.jpg" },
    { title: "How Sweet", artist: "NewJeans", image: "../img/1_howsweet.png" },
    { title: "한 페이지가 될 수 있게", artist: "Day6", image: "../img/1_한페이지가될수있게_.jpg" },
    { title: "Get Up", artist: "NewJeans", image: "../img/1_GETUP.jpg" },
    { title: "꿈의 버스", artist: "Day6", image: "../img/1_꿈의버스.jpg" },
    { title: "Please Please Please", artist: "Sabrina Carpenter", image: "../img/1_please.png" },
    { title: "ETA", artist: "NewJeans", image: "../img/1_GETUP.jpg" },
    { title: "사랑", artist: "최유리", image: "../img/1_사랑.jpg" },
    { title: "Leave Before You Love Me", artist: "Marshmello, Jonas Brothers", image: "../img/1_LeaveBeforeYouLoveMe.jpg" },
    { title: "Love Wins All", artist: "IU", image: "../img/1_lovewinsall.png" },
    { title: "Siren", artist: "RIIZE", image: "../img/1_siren.png" },
    { title: "Lose My Mind", artist: "Don Toliver (feat. Doja Cat)", image: "../img/1_Lose_My_Mind.jpg" },
    { title: "비 오는 날 듣기 좋은 노래", artist: "에픽하이 (Feat. Colde)", image: "../img/1_비오는날에듣기좋은노래.jpg" },
    { title: "Cool With You", artist: "NewJeans", image: "../img/1_GETUP.jpg" },
    { title: "Smart", artist: "LE SSERAFIM", image: "../img/1_smart.png" },
    { title: "Cruel Summer", artist: "Taylor Swift", image: "../img/1_lover.jpg" },
    { title: "눈사람", artist: "아티스트", image: "../img/1_눈사람.jpg" },
    { title: "Super Shy", artist: "NewJeans", image: "../img/1_GETUP.jpg" },
    { title: "Love on the Canvas", artist: "소희", image: "../img/1_Love_on_the_canvas.jpg" },
    { title: "Supernova", artist: "aespa", image: "../img/1_supernova.png" },
    { title: "너에게 못했던 내 마지막 말은", artist: "다비치", image: "../img/1_너에게못했던내마지막말은.jpg" },
    { title: "Celebrity", artist: "IU", image: "../img/1_celebrity.png" },
    { title: "Bubble Gum", artist: "NewJeans", image: "../img/1_howsweet.png" },
    { title: "NewJeans", artist: "NewJeans", image: "../img/1_GETUP.jpg" },
    { title: "Tell Us Bout Yourself", artist: "백예린", image: "../img/1_tellusboutyourself.jpg" },
    { title: "We Don't Talk Anymore", artist: "Charlie Puth", image: "../img/1_we.png" },
    { title: "Youth", artist: "다섯", image: "../img/1_Youth.jpg" },
    { title: "Kill Bill", artist: "SZA", image: "../img/1_SOS.jpg" },
    { title: "ASAP", artist: "NewJeans", image: "../img/1_GETUP.jpg" }
];

let currentIndex = 0;
let isPlaying = false;
let currentTime = 0;
const totalDuration = 210;
let playTimer = null;

const nowPlayingImg = document.getElementById('nowPlayingImg');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const nowPlayingArtist = document.getElementById('nowPlayingArtist');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const iconPlay = document.querySelector('.icon-play');
const iconPause = document.querySelector('.icon-pause');
const progressFilled = document.getElementById('progressFilled');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.getElementById('totalTime');

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

function updateProgress() {
    const percent = (currentTime / totalDuration) * 100;
    progressFilled.style.width = Math.min(percent, 100) + '%';
    currentTimeSpan.textContent = formatTime(currentTime);
}

function startPlayTimer() {
    if (playTimer) clearInterval(playTimer);
    playTimer = setInterval(() => {
        if (!isPlaying) return;
        currentTime += 0.5;
        if (currentTime >= totalDuration) {
            currentTime = totalDuration;
            updateProgress();
            nextTrack();
        } else {
            updateProgress();
        }
    }, 500);
}

function updateNowPlaying() {
    const track = playableTracks[currentIndex];
    nowPlayingImg.src = track.image;
    nowPlayingTitle.textContent = track.title;
    nowPlayingArtist.textContent = track.artist;
}

function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        startPlayTimer();
    } else {
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        if (playTimer) {
            clearInterval(playTimer);
            playTimer = null;
        }
    }
}

function prevTrack() {
    currentIndex = (currentIndex - 1 + playableTracks.length) % playableTracks.length;
    currentTime = 0;
    updateNowPlaying();
    updateProgress();
}

function nextTrack() {
    currentIndex = (currentIndex + 1) % playableTracks.length;
    currentTime = 0;
    updateNowPlaying();
    updateProgress();
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

totalTimeSpan.textContent = formatTime(totalDuration);
updateNowPlaying();
