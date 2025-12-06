/* 1. 프로필 드롭다운 열기/닫기 */
    const userProfile = document.getElementById("userProfile");
    const profileDropdown = document.getElementById("profileDropdown");
    const closeProfile = document.getElementById("closeProfile");

    userProfile.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle("active");
    });

    closeProfile.addEventListener("click", (e) => {
    e.stopPropagation();
    profileDropdown.classList.remove("active");
    });

    document.addEventListener("click", () => {
    profileDropdown.classList.remove("active");
    });

    /* 2. 로그아웃 버튼 */
    function handleLogout() {
    alert("로그아웃 되었습니다!");
    window.location.href = "../html/1_에쁠킬라_Login.html";
    }

    // 재생바 기능 구현
    /* 1. 재생 가능한 트랙 목록*/
    const playableTracks = [
    { title: "Celebrity", artist: "아이유", image: "../src/img/1_celebrity.png" },
    { title: "눈사람", artist: "정승환", image: "../src/img/1_눈사람.jpg" },
    { title: "Trip", artist: "릴러말즈", image: "../src/img/1_Trip.jpg" },
    { title: "한페이지가 될 수 있게", artist: "DAY6", image: "../src/img/1_한페이지가될수있게_.jpg" },
    { title: "좋은밤 좋은꿈", artist: "너드커넥션", image: "../src/img/1_좋은밤좋은꿈.jpg" },
    { title: "Lover", artist: "Taylor Swift", image: "../src/img/1_lover.jpg" },
    { title: "너에게 못했던 내 마지막 말은", artist: "다비치", image: "../src/img/1_너에게못했던내마지막말은.jpg" }
    ];

    /* 2. 재생 상태 변수*/
    let currentIndex = 0;
    let isPlaying = false;
    let currentTime = 0;
    const totalDuration = 210; // 3분 30초 = 210초
    let playTimer = null;

    /* 3. DOM 요소 참조*/
    const nowPlayingImg = document.querySelector('.now-playing-image');
    const nowPlayingTitle = document.querySelector('.now-playing-info h4');
    const nowPlayingArtist = document.querySelector('.now-playing-info p');
    const progressFilled = document.querySelector('.progress-filled');

    const timeSpans = document.querySelectorAll('.time');
    const currentTimeSpan = timeSpans[0];
    const totalTimeSpan = timeSpans[1];

    const playBtn = document.querySelector('.control-btn.play-btn');

    /* 4. 유틸 – 시간 포맷*/
    function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' + s : s);
    }

    /* 5. 진행 바 업데이트*/
    function updateProgress() {
    const percent = (currentTime / totalDuration) * 100;
    progressFilled.style.width = Math.min(percent, 100) + '%';
    currentTimeSpan.textContent = formatTime(currentTime);
    }

    /* 6. 타이머 시작*/
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

    /* 7. 재생*/
    function play() {
    isPlaying = true;
    document.querySelector('.icon-play').style.display = 'none';
    document.querySelector('.icon-pause').style.display = 'inline';
    startPlayTimer();
    }

    /* 8. 일시정지*/
    function pause() {
    isPlaying = false;
    document.querySelector('.icon-play').style.display = 'inline';
    document.querySelector('.icon-pause').style.display = 'none';
    if (playTimer) clearInterval(playTimer);
    }

    /* 9. 트랙 선택*/
    function selectTrack(index) {
    if (index < 0 || index >= playableTracks.length) return;

    currentIndex = index;
    const track = playableTracks[index];

    nowPlayingImg.src = track.image;
    nowPlayingTitle.textContent = track.title;
    nowPlayingArtist.textContent = track.artist;

    currentTime = 0;
    updateProgress();

    play();
    }

    /* 10. 버튼 이벤트 등록*/
    playBtn.addEventListener('click', () => {
    if (!isPlaying) play();
    else pause();
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
    selectTrack((currentIndex - 1 + playableTracks.length) % playableTracks.length);
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
    selectTrack((currentIndex + 1) % playableTracks.length);
    });

    /* 11. 초기 시간 세팅*/
    totalTimeSpan.textContent = formatTime(totalDuration);
    currentTimeSpan.textContent = formatTime(0);

    /* 12. 초기 렌더링 설정*/
    currentTime = 0;
    progressFilled.style.width = '0%';
    currentTimeSpan.textContent = formatTime(0);
    totalTimeSpan.textContent = formatTime(totalDuration);

    // 로그인 체크 + 사용자 이름 표시
(function checkLogin() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (!loggedInUser) {
    // 로그인 정보가 없으면 로그인 페이지로 리다이렉트
    alert('로그인이 필요한 서비스입니다.');
    window.location.href = '../html/1_에쁠킬라_Login.html';
    } else {

    const user = JSON.parse(loggedInUser);

    // 프로필 드롭다운의 닉네임 표시
    const profileNickname = document.querySelector('.profile-nickname');
    if (profileNickname) {
        profileNickname.textContent = user.name + '님';
    }
    }
})();

const capsules = [
{
    name: "2024년 여름 추억",
    image: "../src/img/1_lover.jpg",
    tracks: 15,
    unlockDate: "2024-06-17"
},
{
    name: "생일 선물",
    image: "../src/img/1_SOS.jpg",
    tracks: 12,
    unlockDate: "2026-03-15"
},
{
    name: "2024년 봄 플레이리스트",
    image: "../src/img/1_GETUP.jpg",
    tracks: 18,
    unlockDate: "2024-04-01"
},
{
    name: "새해에는 진짜 운동하자",
    image: "../src/img/1_Lose_My_Mind.jpg",
    tracks: 22,
    unlockDate: "2026-01-01"
},
{
    name: "내년 크리스마스",
    image: "../src/img/1_tellusboutyourself.jpg",
    tracks: 25,
    unlockDate: "2026-12-25"
}
];

function getDaysUntil(dateString) {
    const today = new Date();
    const unlock = new Date(dateString);
    const diff = unlock - today;

    return Math.ceil(diff / (1000 * 60 * 60 * 24)); // 일수
    }
capsules.sort((a, b) => {
    const d1 = getDaysUntil(a.unlockDate);
    const d2 = getDaysUntil(b.unlockDate);

    // 이미 열린건 뒤로 보냄
    if (d1 < 0 && d2 >= 0) return 1;
    if (d1 >= 0 && d2 < 0) return -1;

    // 둘 다 안 열렸으면 빠른순 정렬
    return d1 - d2;
    });




const capsuleGrid = document.querySelector('.capsule-grid');
capsuleGrid.innerHTML = ""; // 기존 카드 지우기

capsules.forEach(capsule => {
const daysLeft = getDaysUntil(capsule.unlockDate);
const opened = daysLeft < 0;

const cardHTML = `
<div class="capsule-card ${opened ? "capsule-unlocked" : ""}">
    <div class="capsule-card-inner">
    <div class="capsule-front ${opened ? "" : "capsule-locked"}">
        ${opened ? "" : `
        <div class="lock-overlay">
        <svg viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/>
        </svg>
        </div>
        `}
        <img src="${capsule.image}" class="capsule-cover" />
        <div class="capsule-info">
        <div class="capsule-name">${capsule.name}</div>
        <div class="capsule-meta">${capsule.tracks}곡 • 나에게</div>
        <div class="capsule-date">
            ${opened ? "열렸습니다" : `${capsule.unlockDate} 열립니다`}
        </div>
        </div>
    </div>

    <div class="capsule-back">
        <div class="capsule-countdown">
        ${opened ? "열렸습니다!" : `${daysLeft}일`}
        </div>
        <div class="capsule-countdown-label">
        ${opened ? "클릭하여 열람하기" : "남았습니다"}
        </div>
        <div class="capsule-unlock-date">
            ${opened ? `${capsule.unlockDate}에 열렸습니다` : `${capsule.unlockDate}에 열립니다`}
        </div>

    </div>
    </div>
</div>
`;

capsuleGrid.insertAdjacentHTML("beforeend", cardHTML);
});