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

        // 환영 메시지 이름 표시
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
          welcomeMessage.textContent = `${user.name}님, 오늘도 음악을 즐길 준비 되셨나요?`;
        }

        // 사용자 이름 표시
        const userDetailsName = document.querySelector('.user-details h2');
        if (userDetailsName) {
          userDetailsName.textContent = user.name;
        }

        // 사용자 이메일 표시
        const userDetailsId = document.querySelector('.user-details p');
        if (userDetailsId) {
          userDetailsId.textContent = user.email;
        }

        // 가입일 표시
        const userDetailsJoinDate = document.querySelectorAll('.user-details p')[1];
        if (userDetailsJoinDate && user.loginTime) {
          const joinDate = new Date(user.loginTime);
          const year = joinDate.getFullYear();
          const month = joinDate.getMonth() + 1;
          const day = joinDate.getDate();
          userDetailsJoinDate.textContent = `가입일: ${year}년 ${month}월 ${day}일`;
        }
      }
    })();

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


    /* 3. 앨범 재생 함수 */

    function playAlbum(artist, title) {
      document.getElementById("playerTitle").textContent = title;
      document.getElementById("playerArtist").textContent = artist;
      alert(`🎵 '${title}' 재생을 시작합니다!`);
    }


    /* 4. 전체보기 버튼 */

    function viewAllLiked() {
      window.location.href = "1_에쁠킬라_LikedAlbums.html";
    }

    function viewAllOffline() {
      window.location.href = "1_에쁠킬라_OfflineMusic.html";
    }


    /* 5. 플레이/일시정지 토글 */

    const playPauseBtn = document.getElementById("playPauseBtn");
    let isPlaying = false;

    playPauseBtn.addEventListener("click", () => {
      isPlaying = !isPlaying;
      playPauseBtn.textContent = isPlaying ? "⏸" : "▶";
    });


    /* 6. 가짜 진행바 애니메이션 */

    const progressBar = document.getElementById("playerProgress");

    function animateProgress() {
      let width = 0;
      setInterval(() => {
        if (isPlaying) {
          width += 1;
          if (width > 100) width = 0;
          progressBar.style.width = width + "%";
        }
      }, 500);
    }

    animateProgress();