// 전체 노래 데이터
const allSongs = [
    { title: "Don't Look Back In Anger", artist: "Oasis", image: "../src/img/1_DontLookBackInAnger.jpg", playCount: 43, lastPlayed: new Date('2025-12-02'), addedDate: new Date('2025-11-05') },
    { title: "좋은 밤 좋은 꿈", artist: "SG 워너비", image: "../src/img/1_좋은밤좋은꿈.jpg", playCount: 60, lastPlayed: new Date('2025-12-02'), addedDate: new Date('2025-11-05') },
    { title: "에피소드", artist: "이무진", image: "../src/img/1_에피소드.jpg", playCount: 102, lastPlayed: new Date('2025-12-01'), addedDate: new Date('2025-11-05') },
    { title: "Trip", artist: "릴러말즈 (Feat. Hannah)", image: "../src/img/1_Trip.jpg", playCount: 13, lastPlayed: new Date('2025-12-01'), addedDate: new Date('2025-08-15') },
    { title: "How Sweet", artist: "NewJeans", image: "../src/img/1_howsweet.png", playCount: 43, lastPlayed: new Date('2025-12-01'), addedDate: new Date('2025-10-05') },
    { title: "한 페이지가 될 수 있게", artist: "Day6", image: "../src/img/1_한페이지가될수있게_.jpg", playCount: 80, lastPlayed: new Date('2025-12-01'), addedDate: new Date('2025-11-05') },
    { title: "Get Up", artist: "NewJeans", image: "../src/img/1_GETUP.jpg", playCount: 44, lastPlayed: new Date('2025-11-30'), addedDate: new Date('2025-07-15') },
    { title: "꿈의 버스", artist: "Day6", image: "../src/img/1_꿈의버스.jpg", playCount: 55, lastPlayed: new Date('2025-11-30'), addedDate: new Date('2024-08-10') },
    { title: "Please Please Please", artist: "Sabrina Carpenter", image: "../src/img/1_please.png", playCount: 29, lastPlayed: new Date('2025-11-29'), addedDate: new Date('2025-09-28') },
    { title: "ETA", artist: "NewJeans", image: "../src/img/1_GETUP.jpg", playCount: 88, lastPlayed: new Date('2025-11-29'), addedDate: new Date('2025-07-15') },
    { title: "사랑", artist: "최유리", image: "../src/img/1_사랑.jpg", playCount: 52, lastPlayed: new Date('2025-11-28'), addedDate: new Date('2025-11-05') },
    { title: "Leave Before You Love Me", artist: "Marshmello, Jonas Brothers", image: "../src/img/1_LeaveBeforeYouLoveMe.jpg", playCount: 28, lastPlayed: new Date('2025-11-27'), addedDate: new Date('2025-10-25') },
    { title: "Love Wins All", artist: "IU", image: "../src/img/1_lovewinsall.png", playCount: 31, lastPlayed: new Date('2025-11-27'), addedDate: new Date('2025-09-25') },
    { title: "Siren", artist: "RIIZE", image: "../src/img/1_siren.png", playCount: 33, lastPlayed: new Date('2025-11-26'), addedDate: new Date('2025-10-05') },
    { title: "Lose My Mind", artist: "Don Toliver (feat. Doja Cat)", image: "../src/img/1_Lose_My_Mind.jpg", playCount: 28, lastPlayed: new Date('2025-11-26'), addedDate: new Date('2025-10-25') },
    { title: "비 오는 날 듣기 좋은 노래", artist: "에픽하이 (Feat. Colde)", image: "../src/img/1_비오는날에듣기좋은노래.jpg", playCount: 43, lastPlayed: new Date('2025-11-25'), addedDate: new Date('2025-11-05') },
    { title: "Cool With You", artist: "NewJeans", image: "../src/img/1_GETUP.jpg", playCount: 34, lastPlayed: new Date('2025-11-25'), addedDate: new Date('2025-07-15') },
    { title: "Smart", artist: "LE SSERAFIM", image: "../src/img/1_smart.png", playCount: 36, lastPlayed: new Date('2025-11-24'), addedDate: new Date('2025-10-08') },
    { title: "Cruel Summer", artist: "Taylor Swift", image: "../src/img/1_lover.jpg", playCount: 39, lastPlayed: new Date('2025-11-24'), addedDate: new Date('2025-07-25') },
    { title: "눈사람", artist: "아티스트", image: "../src/img/1_눈사람.jpg", playCount: 19, lastPlayed: new Date('2025-11-23'), addedDate: new Date('2025-10-20') },
    { title: "Super Shy", artist: "NewJeans", image: "../src/img/1_GETUP.jpg", playCount: 45, lastPlayed: new Date('2025-11-23'), addedDate: new Date('2025-07-15') },
    { title: "Love on the Canvas", artist: "소희", image: "../src/img/1_Love_on_the_canvas.jpg", playCount: 12, lastPlayed: new Date('2025-11-22'), addedDate: new Date('2025-08-10') },
    { title: "Supernova", artist: "aespa", image: "../src/img/1_supernova.png", playCount: 41, lastPlayed: new Date('2025-11-21'), addedDate: new Date('2025-11-03') },
    { title: "너에게 못했던 내 마지막 말은", artist: "다비치", image: "../src/img/1_너에게못했던내마지막말은.jpg", playCount: 12, lastPlayed: new Date('2025-11-20'), addedDate: new Date('2025-11-05') },
    { title: "Celebrity", artist: "IU", image: "../src/img/1_celebrity.png", playCount: 34, lastPlayed: new Date('2025-11-19'), addedDate: new Date('2025-07-20') },
    { title: "Bubble Gum", artist: "NewJeans", image: "../src/img/1_howsweet.png", playCount: 63, lastPlayed: new Date('2025-11-18'), addedDate: new Date('2025-10-05') },
    { title: "NewJeans", artist: "NewJeans", image: "../src/img/1_GETUP.jpg", playCount: 10, lastPlayed: new Date('2025-11-17'), addedDate: new Date('2025-07-15') },
    { title: "Tell Us Bout Yourself", artist: "백예린", image: "../src/img/1_tellusboutyourself.jpg", playCount: 15, lastPlayed: new Date('2025-11-16'), addedDate: new Date('2025-10-12') },
    { title: "We Don't Talk Anymore", artist: "Charlie Puth", image: "../src/img/1_we.png", playCount: 16, lastPlayed: new Date('2025-11-15'), addedDate: new Date('2025-10-15') },
    { title: "Youth", artist: "다섯", image: "../src/img/1_Youth.jpg", playCount: 24, lastPlayed: new Date('2025-11-14'), addedDate: new Date('2025-08-20') },
    { title: "Kill Bill", artist: "SZA", image: "../src/img/1_SOS.jpg", playCount: 18, lastPlayed: new Date('2025-11-13'), addedDate: new Date('2025-10-25') },
    { title: "ASAP", artist: "NewJeans", image: "../src/img/1_GETUP.jpg", playCount: 48, lastPlayed: new Date('2025-11-12'), addedDate: new Date('2025-07-15') },
];

// 플레이어 큐
let playerQueue = [...allSongs];
let currentIndex = 0;
let isPlaying = false;
let currentTime = 0;
const totalDuration = 210;
let playTimer = null;
let currentPlayingSong = null; // 현재 재생 중인 곡 추적

// DOM 요소
const nowPlayingImg = document.querySelector('.now-playing-image');
const nowPlayingTitle = document.querySelector('.now-playing-title');
const nowPlayingArtist = document.querySelector('.now-playing-artist');
const progressFilled = document.querySelector('.progress-filled');
const currentTimeSpan = document.querySelector('.current-time');
const prevBtn = document.querySelector('.prev-btn');
const playBtn = document.querySelector('.play-btn');
const nextBtn = document.querySelector('.next-btn');
const iconPlay = document.querySelector('.icon-play');
const iconPause = document.querySelector('.icon-pause');

// 시간 포맷
function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' + s : s);
}

// 진행바 업데이트
function updateProgress() {
    const percent = (currentTime / totalDuration) * 100;
    progressFilled.style.width = Math.min(percent, 100) + '%';
    currentTimeSpan.textContent = formatTime(currentTime);
}

// 재생 타이머
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
    if (currentIndex === -1 && playerQueue.length > 0) {
        selectTrack(0);
    }
    isPlaying = true;
    iconPlay.style.display = 'none';
    iconPause.style.display = 'inline';
    startPlayTimer();
    
    // record-item 아이콘 업데이트
    updateRecordItemIcons();
}

function pause() {
    isPlaying = false;
    iconPlay.style.display = 'inline';
    iconPause.style.display = 'none';
    if (playTimer) clearInterval(playTimer);
    
    // record-item 아이콘 업데이트
    updateRecordItemIcons();
}

function updateRecordItemIcons() {
    document.querySelectorAll('.record-item').forEach(item => {
        const itemTitle = item.querySelector('.record-info h3').textContent;
        if (currentPlayingSong && itemTitle === currentPlayingSong.title) {
            if (isPlaying) {
                item.classList.add('playing');
            } else {
                item.classList.remove('playing');
            }
        } else {
            item.classList.remove('playing');
        }
    });
}

function selectTrack(index) {
    if (index < 0 || index >= playerQueue.length) return;
    currentIndex = index;
    const track = playerQueue[index];
    currentPlayingSong = track; // 현재 재생 중인 곡 저장

    nowPlayingImg.src = track.image;
    nowPlayingImg.alt = track.title;
    nowPlayingTitle.textContent = track.title;
    nowPlayingArtist.textContent = track.artist || '';

    currentTime = 0;
    updateProgress();
    play();
}

function prevTrack() {
    if (playerQueue.length === 0) return;
    const nextIndex = (currentIndex - 1 + playerQueue.length) % playerQueue.length;
    selectTrack(nextIndex);
}

function nextTrack() {
    if (playerQueue.length === 0) return;
    const nextIndex = (currentIndex + 1) % playerQueue.length;
    selectTrack(nextIndex);
}

// 필터링 및 정렬 함수
function filterByPeriod(songs, period) {
    if (period === 'today') {
        return songs.slice(0, 12);
    } else if (period === 'week') {
        return songs.slice(0, 21);
    } else if (period === 'month') {
        return songs.slice(0, 34);
    }
    return songs;
}

function sortSongs(songs, sortType) {
    const sorted = [...songs];
    
    if (sortType === 'playcount') {
        // 많이 들은 순
        return sorted.sort((a, b) => b.playCount - a.playCount);
    } else if (sortType === 'recent') {
        // 최근 들은 순
        return sorted.sort((a, b) => b.lastPlayed - a.lastPlayed);
    } else if (sortType === 'added') {
        // 최근 추가된 순
        return sorted.sort((a, b) => b.addedDate - a.addedDate);
    } else if (sortType === 'alphabetical') {
        // 가나다순
        return sorted.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
    }
    return sorted;
}

// 재생기록 렌더링
function renderRecordList() {
    const period = document.querySelector('.record-tab.active').dataset.period;
    const sortType = document.getElementById('sortSelect').value;
    
    let filteredSongs = filterByPeriod(allSongs, period);
    filteredSongs = sortSongs(filteredSongs, sortType);
    
    const recordList = document.getElementById('recordList');
    recordList.innerHTML = '';
    
    filteredSongs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = 'record-item';
        item.innerHTML = `
            <img src="${song.image}" class="record-thumb" alt="${song.title}">
            <div class="record-info">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
            </div>
            <button class="record-play-btn">
                <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 5h4v14H6zm8 0h4v14h-4z"/>
                </svg>
            </button>
        `;
        
        // 아이템 클릭 시 재생/일시정지 토글
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.record-play-btn')) {
                // 이미 재생 중인 곡이면 일시정지
                if (currentPlayingSong && currentPlayingSong.title === song.title && isPlaying) {
                    pause();
                } else if (currentPlayingSong && currentPlayingSong.title === song.title && !isPlaying) {
                    // 일시정지된 곡이면 재생
                    play();
                } else {
                    // 새로운 곡 재생
                    const insertIndex = currentIndex + 1;
                    playerQueue.splice(insertIndex, 0, song);
                    selectTrack(insertIndex);
                }
            }
        });
        
        // 재생 버튼 클릭
        const playButton = item.querySelector('.record-play-btn');
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // 이미 재생 중인 곡이면 일시정지
            if (currentPlayingSong && currentPlayingSong.title === song.title && isPlaying) {
                pause();
            } else if (currentPlayingSong && currentPlayingSong.title === song.title && !isPlaying) {
                // 일시정지된 곡이면 재생
                play();
            } else {
                // 새로운 곡 재생
                const insertIndex = currentIndex + 1;
                playerQueue.splice(insertIndex, 0, song);
                selectTrack(insertIndex);
            }
        });
        
        recordList.appendChild(item);
    });
    
    // 렌더링 후 아이콘 상태 업데이트
    updateRecordItemIcons();
}

// 탭 전환
document.querySelectorAll('.record-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.record-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderRecordList();
    });
});

// 정렬 변경
document.getElementById('sortSelect').addEventListener('change', renderRecordList);

// 플레이어 버튼 이벤트
playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        play();
    } else {
        pause();
    }
});

prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// 프로필 드롭다운
const userProfile = document.querySelector('.user-profile');
const profileDropdown = document.querySelector('.profile-dropdown');
const profileCloseBtn = document.querySelector('.profile-close-btn');
const logoutBtn = document.querySelector('.logout-btn');

userProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = profileDropdown.style.display === 'block';
    profileDropdown.style.display = isVisible ? 'none' : 'block';
});

profileCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.style.display = 'none';
});

logoutBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    alert('로그아웃되었습니다.');
    profileDropdown.style.display = 'none';
});

document.addEventListener('click', (e) => {
    if (!userProfile.contains(e.target)) {
        profileDropdown.style.display = 'none';
    }
});

// 초기 렌더링
currentTimeSpan.textContent = formatTime(0);
document.querySelector('.total-time').textContent = formatTime(totalDuration);
renderRecordList();


    // 로그인 체크 + 사용자 이름 표시
(function checkLogin() {
const loggedInUser = sessionStorage.getItem('loggedInUser');

if (!loggedInUser) {
// 로그인 정보가 없으면 로그인 페이지로 리다이렉트
alert('로그인이 필요한 서비스입니다.');
window.location.href = '1_에쁠킬라_Login.html';
} else {

const user = JSON.parse(loggedInUser);

// 프로필 드롭다운의 닉네임 표시
const profileNickname = document.querySelector('.profile-nickname');
if (profileNickname) {
profileNickname.textContent = user.name + '님';
}
}
})();
// 달력 기능
let currentCalendarYear = new Date().getFullYear();
let currentCalendarMonth = new Date().getMonth();

const calendarPopup = document.getElementById('calendarPopup');
const calendarCloseBtn = document.getElementById('calendarCloseBtn');
const filterBtn = document.querySelector('.filter-btn');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const currentMonthDisplay = document.getElementById('currentMonth');
const calendarGrid = document.getElementById('calendarGrid');

// 달력 버튼 클릭 시 팝업 열기
filterBtn.addEventListener('click', () => {
    calendarPopup.classList.add('active');
    renderCalendar();
});

// 닫기 버튼
calendarCloseBtn.addEventListener('click', () => {
    calendarPopup.classList.remove('active');
});

// 오버레이 클릭 시 닫기
calendarPopup.addEventListener('click', (e) => {
    if (e.target === calendarPopup) {
        calendarPopup.classList.remove('active');
    }
});

// 이전 달
prevMonthBtn.addEventListener('click', () => {
    currentCalendarMonth--;
    if (currentCalendarMonth < 0) {
        currentCalendarMonth = 11;
        currentCalendarYear--;
    }
    renderCalendar();
});

// 다음 달
nextMonthBtn.addEventListener('click', () => {
    currentCalendarMonth++;
    if (currentCalendarMonth > 11) {
        currentCalendarMonth = 0;
        currentCalendarYear++;
    }
    renderCalendar();
});

// 달력 렌더링
function renderCalendar() {
    const year = currentCalendarYear;
    const month = currentCalendarMonth;
    
    // 월 표시
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    currentMonthDisplay.textContent = `${year}년 ${monthNames[month]}`;
    
    // 해당 월의 첫 날과 마지막 날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    // 이전 달의 마지막 날
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // 요일 헤더 유지하면서 날짜들만 다시 생성
    const dayHeaders = calendarGrid.querySelectorAll('.calendar-day-header');
    calendarGrid.innerHTML = '';
    dayHeaders.forEach(header => calendarGrid.appendChild(header));
    
    // 오늘 날짜
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();
    
    // 이전 달의 날짜들 (회색)
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = prevMonthLastDay - i;
        calendarGrid.appendChild(day);
    }
    
    // 현재 달의 날짜들
    for (let date = 1; date <= daysInMonth; date++) {
        const day = document.createElement('div');
        day.className = 'calendar-day';
        day.textContent = date;
        
        // 오늘 날짜 표시
        if (isCurrentMonth && date === todayDate) {
            day.classList.add('today');
        }
        
        // 날짜 클릭 이벤트
        day.addEventListener('click', () => {
            // 기존 선택 제거 (모든 날짜에서)
            document.querySelectorAll('.calendar-day.selected').forEach(d => {
                d.classList.remove('selected');
            });
            
            // 새로운 선택
            day.classList.add('selected');
            
            // 여기에 날짜 선택 후 동작 추가 가능
            console.log(`선택된 날짜: ${year}년 ${month + 1}월 ${date}일`);
        });
        
        calendarGrid.appendChild(day);
    }
    
    // 다음 달의 날짜들 (회색)
    const remainingDays = 42 - (firstDayOfWeek + daysInMonth); // 6주 표시
    for (let date = 1; date <= remainingDays; date++) {
        const day = document.createElement('div');
        day.className = 'calendar-day other-month';
        day.textContent = date;
        calendarGrid.appendChild(day);
    }
}