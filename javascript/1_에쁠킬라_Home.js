// 페이지 로드 시 로그인 확인
(function () {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = '/html/1_에쁠킬라_Login.html';
    }
})();

// 랜덤 문구 표시 (새로 고침하거나 다른 페이지 갔다가 돌아올 때마다 달라짐)
(function () {
    const phrases = [
        '그곳에서 들었던 그 노래, 기억하시나요? ',
        '미래의 나에게 음악을 선물하세요. ',
        '친구와 함께 듣는 음악은 특별하죠! ',
        '당신의 음악 여정을 기록하세요. ',
        '시간을 담은 음악 편지, 타임캡슐 ',
    ];

    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const phraseElement = document.querySelector('.random-phrase');
    if (phraseElement) {
        phraseElement.textContent = randomPhrase;
    }
})();

// 재생 가능한 "트랙" 목록
const playableTracks = [];
const trackElements = []; // 각 트랙에 해당하는 DOM 요소 저장

// 지금 재생 중인 인덱스
let currentIndex = -1;

// 재생 상태
let isPlaying = false;
let currentTime = 0;
const totalDuration = 210;
let playTimer = null;

// 플레이어 바 요소
const nowPlayingImg = document.querySelector('.now-playing-image');
const nowPlayingTitle = document.querySelector('.now-playing-title');
const nowPlayingArtist = document.querySelector('.now-playing-artist');
const progressFilled = document.querySelector('.progress-filled');
const currentTimeSpan = document.querySelector('.current-time');
const totalTimeSpan = document.querySelector('.total-time');

// 버튼
const prevBtn = document.querySelector('.prev-btn');
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');
const iconPlay = document.querySelector('.icon-play');
const iconPause = document.querySelector('.icon-pause');

// 시간 포맷 함수
function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' + s : s);
}

// 진행바 그리기
function updateProgress() {
    const percent = (currentTime / totalDuration) * 100;
    progressFilled.style.width = Math.min(percent, 100) + '%';
    currentTimeSpan.textContent = formatTime(currentTime);
}

// 재생 시작
function startPlayTimer() {
    if (playTimer) clearInterval(playTimer);
    playTimer = setInterval(() => {
        if (!isPlaying) return;
        currentTime += 0.5;
        if (currentTime >= totalDuration) {
            currentTime = totalDuration;
            updateProgress();
            pause();
            return;
        }
        updateProgress();
    }, 500);
}

function play() {
    if (currentIndex === -1 && playableTracks.length > 0) {
        selectTrack(0);
    }
    isPlaying = true;
    iconPlay.style.display = 'none';
    iconPause.style.display = 'inline';
    updateSmallButtonsUI();
    startPlayTimer();
}

function pause() {
    isPlaying = false;
    iconPlay.style.display = 'inline';
    iconPause.style.display = 'none';
    updateSmallButtonsUI();
    if (playTimer) clearInterval(playTimer);
}

function selectTrack(index) {
    if (index < 0 || index >= playableTracks.length) return;
    currentIndex = index;
    const track = playableTracks[index];

    nowPlayingImg.src = track.image;
    nowPlayingImg.alt = track.title;
    nowPlayingTitle.textContent = track.title;
    nowPlayingArtist.textContent = track.artist || '';

    currentTime = 0;
    updateProgress();
    play();
    updateSmallButtonsUI();
}

function prevTrack() {
    if (playableTracks.length === 0) return;
    const nextIndex =
        (currentIndex - 1 + playableTracks.length) % playableTracks.length;
    selectTrack(nextIndex);
}

function nextTrack() {
    if (playableTracks.length === 0) return;
    const nextIndex = (currentIndex + 1) % playableTracks.length;
    selectTrack(nextIndex);
}

// 재생 가능한 요소 수집

// 최근 재생한 곡
document
    .querySelectorAll('.section-recent .recent-song-item')
    .forEach((item) => {
        const imgEl = item.querySelector('.recent-song-img');
        const titleEl = item.querySelector('.recent-song-title');
        const artistEl = item.querySelector('.recent-song-artist');
        const playBtn = item.querySelector('.recent-play-btn');

        const trackData = {
            title: titleEl ? titleEl.textContent.trim() : 'Unknown',
            artist: artistEl ? artistEl.textContent.trim() : '',
            image: imgEl ? imgEl.getAttribute('src') : '',
        };
        const trackIndex = playableTracks.length;
        playableTracks.push(trackData);
        trackElements.push({ element: item, playBtn: playBtn });

        item.addEventListener('click', (e) => {
            if (!e.target.closest('.recent-play-btn')) {
                selectTrack(trackIndex);
            }
        });

        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                selectTrack(trackIndex);
            });
        }
    });

// 음악 차트
document.querySelectorAll('.section-chart .chart-item').forEach((item) => {
    const imgEl = item.querySelector('.chart-img');
    const titleEl = item.querySelector('.chart-title');
    const artistEl = item.querySelector('.chart-artist');
    const playBtn = item.querySelector('.chart-play-btn');

    const trackData = {
        title: titleEl ? titleEl.textContent.trim() : 'Unknown',
        artist: artistEl ? artistEl.textContent.trim() : '',
        image: imgEl ? imgEl.getAttribute('src') : '',
    };
    const trackIndex = playableTracks.length;
    playableTracks.push(trackData);
    trackElements.push({ element: item, playBtn: playBtn });

    item.addEventListener('click', (e) => {
        if (!e.target.closest('.chart-play-btn')) {
            selectTrack(trackIndex);
        }
    });

    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectTrack(trackIndex);
        });
    }
});

// 요즘 많이 듣는 노래
document.querySelectorAll('.section-top-songs .song-card').forEach((card) => {
    const imgEl = card.querySelector('.song-cover img');
    const titleEl = card.querySelector('.song-title');
    const artistEl = card.querySelector('.song-artist');
    const playBtnSimple = card.querySelector('.play-button-simple');

    const trackData = {
        title: titleEl ? titleEl.textContent.trim() : 'Unknown',
        artist: artistEl ? artistEl.textContent.trim() : '',
        image: imgEl ? imgEl.getAttribute('src') : '',
    };
    const trackIndex = playableTracks.length;
    playableTracks.push(trackData);
    trackElements.push({ element: card, playBtn: playBtnSimple });

    card.addEventListener('click', (e) => {
        selectTrack(trackIndex);
    });

    if (playBtnSimple) {
        playBtnSimple.addEventListener('click', (e) => {
            e.stopPropagation();
            selectTrack(trackIndex);
        });
    }
});

// 최신 앨범 / 무드별 트랙
document.querySelectorAll('.card').forEach((card) => {
    const imgEl = card.querySelector('.card-front img');
    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    const albumTitleEl = card.querySelector(
        '.card-front h3, .card-front .card-year'
    );
    const defaultAlbumTitle = albumTitleEl
        ? albumTitleEl.textContent.trim()
        : '';

    const trackLis = card.querySelectorAll('.card-back .track-list li');
    trackLis.forEach((li) => {
        const text = li.textContent.trim();
        if (!text) return;

        let title = text;
        let artist = '';
        const parts = text.split(' - ');
        if (parts.length >= 2) {
            title = parts[0].trim();
            artist = parts.slice(1).join(' - ').trim();
        } else {
            artist = defaultAlbumTitle;
        }

        const trackData = {
            title,
            artist,
            image: imgSrc,
        };
        const trackIndex = playableTracks.length;
        playableTracks.push(trackData);
        trackElements.push({ element: li, playBtn: null });

        li.style.cursor = 'pointer';
        li.addEventListener('click', (e) => {
            e.stopPropagation();
            selectTrack(trackIndex);
        });
    });
});

// 버튼 이벤트 연결
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        play();
    } else {
        pause();
    }
});

prevBtn.addEventListener('click', () => {
    prevTrack();
});

nextBtn.addEventListener('click', () => {
    nextTrack();
});

// 초기 시간 셋업
currentTimeSpan.textContent = formatTime(0);
totalTimeSpan.textContent = formatTime(totalDuration);

function updateSmallButtonsUI() {
    trackElements.forEach((trackEl, index) => {
        const { playBtn } = trackEl;

        if (!playBtn) return;

        const svg = playBtn.querySelector('svg');
        if (!svg) return;

        if (index === currentIndex && isPlaying) {
            // 정지 아이콘
            svg.innerHTML = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';
        } else {
            // 재생 아이콘
            svg.innerHTML = '<path d="M8 5v14l11-7z"/>';
        }
    });

    // 요즘 많이 듣는 노래의 아이콘 처리
    document
        .querySelectorAll('.section-top-songs .song-card')
        .forEach((card, i) => {
            const playIcon = card.querySelector('.icon-small-play');
            const pauseIcon = card.querySelector('.icon-small-pause');

            // 이 카드의 실제 인덱스 찾기
            const cardIndex = trackElements.findIndex(
                (el) => el.element === card
            );

            if (cardIndex === currentIndex && isPlaying) {
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'inline';
            } else {
                if (playIcon) playIcon.style.display = 'inline';
                if (pauseIcon) pauseIcon.style.display = 'none';
            }
        });
}

// 사용자 프로필 드롭다운
const userProfile = document.querySelector('.user-profile');
const profileDropdown = document.querySelector('.profile-dropdown');
const profileCloseBtn = document.querySelector('.profile-close-btn');
const logoutBtn = document.querySelector('.logout-btn');

if (userProfile && profileDropdown) {
    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = profileDropdown.style.display === 'block';
        profileDropdown.style.display = isVisible ? 'none' : 'block';
    });
}

if (profileCloseBtn) {
    profileCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.style.display = 'none';
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sessionStorage.removeItem('isLoggedIn');
        alert('로그아웃되었습니다.');
        window.location.href = '/html/1_에쁠킬라_Login.html';
    });
}

document.addEventListener('click', (e) => {
    if (userProfile && !userProfile.contains(e.target)) {
        if (profileDropdown) {
            profileDropdown.style.display = 'none';
        }
    }
});

// 로그인 체크 + 사용자 이름 표시
(function checkLogin() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        alert('로그인이 필요한 서비스입니다.');
        window.location.href = '../html/1_에쁠킬라_Login.html';
    } else {
        const user = JSON.parse(loggedInUser);
        const profileNickname = document.querySelector('.profile-nickname');
        if (profileNickname) {
            profileNickname.textContent = user.name + '님';
        }
    }
})();
