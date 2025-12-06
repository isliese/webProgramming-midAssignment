document.addEventListener("DOMContentLoaded", () => {

    // 0) 로그인 체크 
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('로그인이 필요한 서비스입니다.');
        window.location.href = '../html/1_에쁠킬라_Login.html';
        return;
    }

    const user = JSON.parse(loggedInUser);


    // 1) 전체 노래 데이터
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

    // 2) 플레이어 상태 변수
    let playerQueue = [...allSongs];
    let currentIndex = 0;
    let isPlaying = false;
    let currentTime = 0;
    const totalDuration = 210;
    let playTimer = null;
    let currentPlayingSong = null;


    // 3) DOM 요소
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


    // 4) 재생 관련 함수
    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? "0" + s : s}`;
    }

    function updateProgress() {
        const percent = (currentTime / totalDuration) * 100;
        progressFilled.style.width = `${Math.min(percent, 100)}%`;
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
        iconPlay.style.display = "none";
        iconPause.style.display = "inline";
        startPlayTimer();
        updateRecordItemIcons();
    }

    function pause() {
        isPlaying = false;
        iconPlay.style.display = "inline";
        iconPause.style.display = "none";
        if (playTimer) clearInterval(playTimer);
        updateRecordItemIcons();
    }

    function selectTrack(index) {
        if (index < 0 || index >= playerQueue.length) return;

        currentIndex = index;
        const track = playerQueue[index];
        currentPlayingSong = track;

        nowPlayingImg.src = track.image;
        nowPlayingImg.alt = track.title;
        nowPlayingTitle.textContent = track.title;
        nowPlayingArtist.textContent = track.artist || "";

        currentTime = 0;
        updateProgress();
        play();
    }

    function prevTrack() {
        if (playerQueue.length === 0) return;
        selectTrack((currentIndex - 1 + playerQueue.length) % playerQueue.length);
    }

    function nextTrack() {
        if (playerQueue.length === 0) return;
        selectTrack((currentIndex + 1) % playerQueue.length);
    }


    // 5) 재생기록 렌더링 관련 함수
    function filterByPeriod(songs, period) {
        if (period === "today") return songs.slice(0, 12);
        if (period === "week") return songs.slice(0, 21);
        if (period === "month") return songs.slice(0, 34);
        return songs;
    }

    function sortSongs(songs, type) {
        const sorted = [...songs];

        if (type === "playcount") return sorted.sort((a, b) => b.playCount - a.playCount);
        if (type === "recent") return sorted.sort((a, b) => b.lastPlayed - a.lastPlayed);
        if (type === "added") return sorted.sort((a, b) => b.addedDate - a.addedDate);
        if (type === "alphabetical") return sorted.sort((a, b) => a.title.localeCompare(b.title, "ko"));

        return sorted;
    }

    function updateRecordItemIcons() {
        document.querySelectorAll(".record-item").forEach(item => {
            const itemTitle = item.querySelector(".record-info h3").textContent;

            if (currentPlayingSong && itemTitle === currentPlayingSong.title) {
                if (isPlaying) item.classList.add("playing");
                else item.classList.remove("playing");
            } else {
                item.classList.remove("playing");
            }
        });
    }


    function renderRecordList() {
        const period = document.querySelector(".record-tab.active").dataset.period;
        const sortType = document.getElementById("sortSelect").value;

        let filteredSongs = filterByPeriod(allSongs, period);
        filteredSongs = sortSongs(filteredSongs, sortType);

        const recordList = document.getElementById("recordList");
        recordList.innerHTML = "";

        filteredSongs.forEach((song, i) => {
            const item = document.createElement("div");
            item.className = "record-item";

            item.innerHTML = `
                <img src="${song.image}" class="record-thumb" />
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

            item.addEventListener("click", (e) => {
                if (!e.target.closest(".record-play-btn")) {
                    if (currentPlayingSong && currentPlayingSong.title === song.title && isPlaying) pause();
                    else if (currentPlayingSong && currentPlayingSong.title === song.title && !isPlaying) play();
                    else {
                        const insertIndex = currentIndex + 1;
                        playerQueue.splice(insertIndex, 0, song);
                        selectTrack(insertIndex);
                    }
                }
            });

            const playButton = item.querySelector(".record-play-btn");
            if (playButton) {
                playButton.addEventListener("click", (e) => {
                    e.stopPropagation();

                    if (currentPlayingSong && currentPlayingSong.title === song.title && isPlaying) pause();
                    else if (currentPlayingSong && currentPlayingSong.title === song.title && !isPlaying) play();
                    else {
                        const insertIndex = currentIndex + 1;
                        playerQueue.splice(insertIndex, 0, song);
                        selectTrack(insertIndex);
                    }
                });
            }

            recordList.appendChild(item);
        });

        updateRecordItemIcons();
    }


    // 6) 이벤트 등록
    if (playBtn) playBtn.addEventListener("click", () => isPlaying ? pause() : play());
    if (prevBtn) prevBtn.addEventListener("click", prevTrack);
    if (nextBtn) nextBtn.addEventListener("click", nextTrack);

    document.querySelectorAll(".record-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".record-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            renderRecordList();
        });
    });

    document.getElementById("sortSelect").addEventListener("change", renderRecordList);


    // 7) 달력 기능
    let currentCalendarYear = new Date().getFullYear();
    let currentCalendarMonth = new Date().getMonth();

    const calendarPopup = document.getElementById("calendarPopup");
    const calendarCloseBtn = document.getElementById("calendarCloseBtn");
    const filterBtn = document.querySelector(".filter-btn");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const currentMonthDisplay = document.getElementById("currentMonth");
    const calendarGrid = document.getElementById("calendarGrid");

    if (filterBtn) filterBtn.addEventListener("click", () => {
        calendarPopup.classList.add("active");
        renderCalendar();
    });

    if (calendarCloseBtn) calendarCloseBtn.addEventListener("click", () => {
        calendarPopup.classList.remove("active");
    });

    if (calendarPopup) calendarPopup.addEventListener("click", (e) => {
        if (e.target === calendarPopup) calendarPopup.classList.remove("active");
    });

    if (prevMonthBtn) prevMonthBtn.addEventListener("click", () => {
        currentCalendarMonth--;
        if (currentCalendarMonth < 0) {
            currentCalendarMonth = 11;
            currentCalendarYear--;
        }
        renderCalendar();
    });

    if (nextMonthBtn) nextMonthBtn.addEventListener("click", () => {
        currentCalendarMonth++;
        if (currentCalendarMonth > 11) {
            currentCalendarMonth = 0;
            currentCalendarYear++;
        }
        renderCalendar();
    });

    function renderCalendar() {
        const year = currentCalendarYear;
        const month = currentCalendarMonth;

        const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
        currentMonthDisplay.textContent = `${year}년 ${monthNames[month]}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const firstDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const dayHeaders = calendarGrid.querySelectorAll(".calendar-day-header");
        calendarGrid.innerHTML = "";
        dayHeaders.forEach(h => calendarGrid.appendChild(h));

        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        const todayDate = today.getDate();

        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const d = document.createElement("div");
            d.className = "calendar-day other-month";
            d.textContent = prevMonthLastDay - i;
            calendarGrid.appendChild(d);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const day = document.createElement("div");
            day.className = "calendar-day";
            day.textContent = d;

            if (isCurrentMonth && d === todayDate) day.classList.add("today");

            day.addEventListener("click", () => {
                document.querySelectorAll(".calendar-day.selected").forEach(s => s.classList.remove("selected"));
                day.classList.add("selected");
            });

            calendarGrid.appendChild(day);
        }

        const remain = 42 - (firstDayOfWeek + daysInMonth);
        for (let d = 1; d <= remain; d++) {
            const day = document.createElement("div");
            day.className = "calendar-day other-month";
            day.textContent = d;
            calendarGrid.appendChild(day);
        }
    }


    // 8) 프로필 드롭다운
    const userProfile = document.querySelector(".user-profile");
    const profileDropdown = document.querySelector(".profile-dropdown");
    const closeProfile = document.querySelector(".profile-close-btn");
    const logoutBtn = document.querySelector(".logout-btn");

    if (userProfile && profileDropdown) {
        userProfile.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.style.display =
                profileDropdown.style.display === "block" ? "none" : "block";
        });
    }

    if (closeProfile) {
        closeProfile.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.style.display = "none";
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("loggedInUser");
            window.location.href = "../html/1_에쁠킬라_Login.html";
        });
    }

    document.addEventListener("click", () => {
        if (profileDropdown) profileDropdown.style.display = "none";
    });

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


    // 9) 초기에 렌더링
    currentTimeSpan.textContent = formatTime(0);
    document.querySelector(".total-time").textContent = formatTime(totalDuration);
    renderRecordList();

});
