    const playableTracks = [
      { title: "Smart", artist: "LE SSERAFIM", image: "../src/img/1_smart.png" },
      { title: "눈사람", artist: "정승환", image: "../src/img/1_눈사람.jpg" },
      { title: "Trip", artist: "릴러말즈", image: "../src/img/1_Trip.jpg" },
      { title: "한페이지가 될 수 있게", artist: "DAY6", image: "../src/img/1_한페이지가될수있게_.jpg" },
      { title: "좋은밤 좋은꿈", artist: "너드커넥션", image: "../src/img/1_좋은밤좋은꿈.jpg" },
      { title: "Lover", artist: "Taylor Swift", image: "../src/img/1_lover.jpg" },
      { title: "너에게 못했던 내 마지막 말은", artist: "다비치", image: "../src/img/1_너에게못했던내마지막말은.jpg" }
    ];

    let currentIndex = 0;
    let isPlaying = false;
    let currentTime = 0;
    const totalDuration = 210;
    let playTimer = null;

    const nowPlayingImg = document.querySelector('.now-playing-image');
    const nowPlayingTitle = document.querySelector('.now-playing-info h4');
    const nowPlayingArtist = document.querySelector('.now-playing-info p');
    const progressFilled = document.querySelector('.progress-filled');
    const currentTimeSpan = document.querySelectorAll('.time')[0];
    const totalTimeSpan = document.querySelectorAll('.time')[1];
    const playBtn = document.querySelector('.control-btn.play-btn');

    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return m + ':' + (s < 10 ? '0' + s : s);
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
          pause();
          return;
        }
        updateProgress();
      }, 500);
    }

    function play() {
      isPlaying = true;
      document.querySelector('.icon-play').style.display = 'none';
      document.querySelector('.icon-pause').style.display = 'inline';
      startPlayTimer();
    }

    function pause() {
      isPlaying = false;
      document.querySelector('.icon-play').style.display = 'inline';
      document.querySelector('.icon-pause').style.display = 'none';
      if (playTimer) clearInterval(playTimer);

      const currentBtn = document.querySelectorAll('.playlist-card .play-button')[currentIndex];
      if (currentBtn) {
        currentBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>`;
      }
    }

    function selectTrack(index) {
      if (index < 0 || index >= playableTracks.length) return;
      currentIndex = index;
      const track = playableTracks[index];

      nowPlayingImg.src = track.image;
      nowPlayingTitle.textContent = track.title;
      nowPlayingArtist.textContent = track.artist;

      currentTime = 0;
      updateProgress();
      document.querySelectorAll('.playlist-card .play-button').forEach(btn => {
        btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>`;
      });

      const currentBtn = document.querySelectorAll('.playlist-card .play-button')[index];
      if (currentBtn) {
        currentBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg>`;
      }

      play();
    }

    document.querySelectorAll('.playlist-card .play-button').forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectTrack(index);
      });
    });

    // 재생 버튼
    playBtn.addEventListener('click', () => {
      if (!isPlaying) play();
      else pause();
    });

    // 이전/다음 버튼
    document.querySelector('.prev-btn').addEventListener('click', () => {
      const nextIndex = (currentIndex - 1 + playableTracks.length) % playableTracks.length;
      selectTrack(nextIndex);
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % playableTracks.length;
      selectTrack(nextIndex);
    });

    // 시간 설정
    totalTimeSpan.textContent = formatTime(totalDuration);
    currentTimeSpan.textContent = formatTime(0);

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
      window.location.href = "1_에쁠킬라_Login.html";
    }

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
