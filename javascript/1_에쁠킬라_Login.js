const loginForm = document.getElementById('loginForm');
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

// 비밀번호 보기/숨기기
togglePasswordBtn.addEventListener('click', () => {
    const eyeOpen = togglePasswordBtn.querySelector('.eye-open');
    const eyeClosed = togglePasswordBtn.querySelector('.eye-closed');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        passwordInput.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
});

// 로그인 폼 제출
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요.');
        return;
    }

    // sessionstorage에서 회원가입된 사용자 목록 가져오기
    const users = JSON.parse(sessionStorage.getItem('users')) || [];

    // 이메일과 비밀번호 확인
    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        // sessionStorage에 저장
        sessionStorage.setItem(
            'loggedInUser',
            JSON.stringify({
                name: user.name,
                email: user.email,
                loginTime: new Date().toISOString(),
            })
        );

        sessionStorage.setItem('isLoggedIn', 'true');

        alert(`환영합니다, ${user.name}님!`);
        window.location.href = '../html/1_에쁠킬라_Home.html';
      } else {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
});

/* 1. 프로필 드롭다운 열기/닫기 */
const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');
const closeProfile = document.getElementById('closeProfile');

userProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('active');
});

closeProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.remove('active');
});

document.addEventListener('click', () => {
    profileDropdown.classList.remove('active');
});

    /* 2. 로그아웃 버튼 */
    function handleLogout() {
      alert("로그아웃 되었습니다!");
      sessionStorage.removeItem('loggedInUser');
      sessionStorage.removeItem('isLoggedIn');
      window.location.href = "../html/1_에쁠킬라_Login.html";
    }