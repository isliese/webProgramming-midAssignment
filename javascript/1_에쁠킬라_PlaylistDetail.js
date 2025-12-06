/* 프로필 드롭다운 열기/닫기 */
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

//로그아웃 버튼
function handleLogout() {
    alert('로그아웃 되었습니다!');
    window.location.href = '1_에쁠킬라_Login.html';
}
// 열기 버튼 (추가 버튼)
const openPopupBtn = document.getElementById('openAddPopup');
// 오버레이 + 팝업
const popupOverlay = document.getElementById('popupOverlay');
const popupContainer = document.getElementById('popupContainer');

// 팝업 열기
openPopupBtn.addEventListener('click', () => {
    popupOverlay.style.display = 'block';
    popupContainer.style.display = 'block';
});

// 팝업 닫기 (추가 화면 안의 취소버튼)
document.addEventListener('click', (e) => {
    if (e.target.id === 'closeAdd') {
        popupOverlay.style.display = 'none';
        popupContainer.style.display = 'none';
    }
});

// 오버레이 클릭 → 닫기
popupOverlay.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    popupContainer.style.display = 'none';
});

// 캐러셀 로직
const track = document.getElementById('carouselTrack');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
const slideCount = 2;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 50}%)`;
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateCarousel();
});

dots.forEach((dot) => {
    dot.addEventListener('click', () => {
        currentIndex = Number(dot.dataset.index);
        updateCarousel();
    });
});

// 검색 버튼 (현재는 알림만)
document.getElementById('searchBtn').addEventListener('click', () => {
    alert('검색 기능은 추후 구현 예정입니다 :)');
});

// 좋아요 하트 클릭 애니메이션
const heartBtn = document.querySelector('.heart-btn');

heartBtn.addEventListener('click', () => {
    heartBtn.classList.toggle('liked');
});

// 재생 상태 및 타이머 관리
let isPlaying = false;
let playTimer = null;
let currentTime = 0; 
const totalTime = 210; 

// 시간을 MM:SS 형식으로 변환
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 프로그레스 바 및 시간 업데이트
function updateProgress() {
    const progressBar = document.querySelector('.progress-filled');
    const currentTimeEl = document.querySelector('.current-time');

    const percentage = (currentTime / totalTime) * 100;
    progressBar.style.width = `${percentage}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

// 재생 시작
function startPlayback() {
    isPlaying = true;
    playTimer = setInterval(() => {
        currentTime++;
        if (currentTime >= totalTime) {
            currentTime = 0; // 곡 끝나면 처음으로
        }
        updateProgress();
    }, 1000);
}

// 재생 정지
function pausePlayback() {
    isPlaying = false;
    if (playTimer) {
        clearInterval(playTimer);
        playTimer = null;
    }
}

// 모든 버튼의 아이콘 업데이트 - 현재 재생 중인 곡만 || 표시
function updateAllPlayIcons(playing) {
    // 1. 트랙 리스트의 재생 버튼들 업데이트
    document.querySelectorAll('.track-play-btn').forEach((btn, index) => {
        const playIcon = btn.querySelector('.icon-play');
        const pauseIcon = btn.querySelector('.icon-pause');

        // 현재 재생 중인 곡의 인덱스와 일치하는 버튼만 상태 변경
        if (index === musicIndex && playing) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });

    // 2. 하단 재생바의 재생 버튼 업데이트
    const playerPlayBtn = document.querySelector(
        '.player-controls .play-toggle'
    );
    if (playerPlayBtn) {
        const playerPlayIcon = playerPlayBtn.querySelector('.icon-play');
        const playerPauseIcon = playerPlayBtn.querySelector('.icon-pause');

        if (playing) {
            playerPlayIcon.style.display = 'none';
            playerPauseIcon.style.display = 'block';
        } else {
            playerPlayIcon.style.display = 'block';
            playerPauseIcon.style.display = 'none';
        }
    }

    // 3. 메인 재생 버튼 업데이트
    const mainPlayBtn = document.querySelector(
        '.playlist-header .play-main-btn'
    );
    if (mainPlayBtn) {
        const mainPlayIcon = mainPlayBtn.querySelector('.icon-play');
        const mainPauseIcon = mainPlayBtn.querySelector('.icon-pause');

        if (mainPlayIcon && mainPauseIcon) {
            if (playing) {
                mainPlayIcon.style.display = 'none';
                mainPauseIcon.style.display = 'block';
            } else {
                mainPlayIcon.style.display = 'block';
                mainPauseIcon.style.display = 'none';
            }
        }
    }
}

//  트랙 정보 수집 (track-add 제외)
const trackItems = document.querySelectorAll('.track-item');
let tracks = [];

// track-item 중에서 실제 곡만 수집
trackItems.forEach((item, index) => {
    const thumbnail = item.querySelector('.track-thumbnail');
    if (!thumbnail) return; // 추가 버튼(track-add)은 건너뜀

    tracks.push({
        img: thumbnail.src,
        title: item.querySelector('.track-details h4').innerText,
        artist: item.querySelector('.track-details p').innerText,
    });
});

// 하단 플레이어 요소
const nowImg = document.querySelector('.now-playing-image');
const nowTitle = document.querySelector('.now-playing-title');
const nowArtist = document.querySelector('.now-playing-artist');

let musicIndex = -1;

// 플레이어 업데이트 함수

function updatePlayerBar() {
    const t = tracks[musicIndex];
    nowImg.src = t.img;
    nowTitle.innerText = t.title;
    nowArtist.innerText = t.artist;

    // 곡 변경 시 시간 초기화
    currentTime = 0;
    updateProgress();

    // 재생 중이었다면 계속 재생
    if (isPlaying) {
        updateAllPlayIcons(true);
    } else {
        updateAllPlayIcons(false);
    }
}

// 개별 트랙 재생 버튼
document.querySelectorAll('.track-play-btn').forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();

        // 같은 곡 클릭 시 재생/일시정지 토글
        if (musicIndex === i && musicIndex !== -1) {
            if (isPlaying) {
                pausePlayback();
                updateAllPlayIcons(false);
            } else {
                startPlayback();
                updateAllPlayIcons(true);
            }
        } else {
            // 다른 곡 클릭 시 또는 처음 클릭 시 곡 변경 및 재생
            musicIndex = i;
            updatePlayerBar();
            // 재생 중이 아닐 때만 재생 시작
            if (!isPlaying) {
                startPlayback();
            }
            updateAllPlayIcons(true);
        }
    });
});

// 플레이리스트 메인 재생 버튼
const mainPlayBtn = document.querySelector('.playlist-header .play-main-btn');

if (mainPlayBtn) {
    mainPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지

        // 재생 중이면 일시정지
        if (isPlaying) {
            pausePlayback();
            updateAllPlayIcons(false);
        } else {
            // 일시정지 상태면 재생 시작
            // 현재 곡이 없으면 첫 번째 곡으로 설정
            if (tracks.length > 0 && musicIndex === -1) {
                musicIndex = 0;
                updatePlayerBar();
            }

            startPlayback();
            updateAllPlayIcons(true);
        }
    });
}

// 하단 재생바의 재생 버튼
const playerPlayBtn = document.querySelector('.player-controls .play-toggle');
if (playerPlayBtn) {
    playerPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (isPlaying) {
            pausePlayback();
            updateAllPlayIcons(false);
        } else {
            // 일시정지 상태면 재생 시작
            if (tracks.length > 0) {
                if (musicIndex === -1) {
                    musicIndex = 0;
                    updatePlayerBar();
                }
                startPlayback();
                updateAllPlayIcons(true);
            }
        }
    });
}

document.querySelector('.next-btn').addEventListener('click', () => {
    if (musicIndex === -1) {
        musicIndex = 0;
    } else {
        musicIndex = (musicIndex + 1) % tracks.length;
    }
    updatePlayerBar();
    // 재생 중이었으면 계속 재생
    if (isPlaying) {
        currentTime = 0;
        updateProgress();
    }
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    if (musicIndex === -1) {
        musicIndex = tracks.length - 1;
    } else {
        musicIndex = (musicIndex - 1 + tracks.length) % tracks.length;
    }
    updatePlayerBar();
    // 재생 중이었으면 계속 재생
    if (isPlaying) {
        currentTime = 0;
        updateProgress();
    }
});

// // 로그인 체크 + 사용자 이름 표시
// (function checkLogin() {
//     const loggedInUser = sessionStorage.getItem('loggedInUser');

//     if (!loggedInUser) {
//         // 로그인 정보가 없으면 로그인 페이지로 리다이렉트
//         alert('로그인이 필요한 서비스입니다.');
//         window.location.href = '1_에쁠킬라_Login.html';
//     } else {
//         const user = JSON.parse(loggedInUser);

//         // 프로필 드롭다운의 닉네임 표시
//         const profileNickname = document.querySelector('.profile-nickname');
//         if (profileNickname) {
//             profileNickname.textContent = user.name + '님';
//         }
//     }
// })();

const trackListContainer = document.querySelector(
    '.track-list-container.right'
);

function updateTrackNumbers() {
    const trackItems = trackListContainer.querySelectorAll('.track-item');
    trackItems.forEach((item, idx) => {
        const numSpan = item.querySelector('.track-number');
        if (numSpan) numSpan.innerText = idx + 1;
    });
}

document.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.song-item');

        // 앨범 이미지 URL 추출
        const cover = item.querySelector('.song-cover').style.backgroundImage;
        const coverUrl = cover.replace('url("', '').replace('")', '');

        const title = item.querySelector('.song-title').innerText;
        const artist = item.querySelector('.song-artist').innerText;

        // ----- 새로운 track-item 생성 -----
        const newTrack = document.createElement('div');
        newTrack.classList.add('track-item');

        newTrack.innerHTML = `
                    <div style="position: relative; text-align: center">
                        <span class="track-number"></span>
                        <button class="track-play-btn play-toggle">
                            <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                                <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                            </svg>
                        </button>
                    </div>

                    <div class="track-info">
                        <img src="${coverUrl}" alt="Track" class="track-thumbnail" />
                        <div class="track-details">
                            <h4>${title}</h4>
                            <p>${artist}</p>
                        </div>
                    </div>

                    <div class="track-right">
                        <div class="track-duration">3:00</div>
                        <div class="more">
                            <img alt="더보기" width="20" height="8"
                                src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='14' viewBox='0 0 60 14'><circle cx='7' cy='7' r='5' fill='%23b3b3b3'/><circle cx='30' cy='7' r='5' fill='%23b3b3b3'/><circle cx='53' cy='7' r='5' fill='%23b3b3b3'/></svg>" />
                        </div>
                    </div>
                `;

        // ----- track-add 앞에 넣기 -----
        const addButton = document
            .getElementById('openAddPopup')
            .closest('.track-add');
        trackListContainer.insertBefore(newTrack, addButton);

        // 번호 다시 매기기
        updateTrackNumbers();

        // ----- tracks 배열에 추가 -----
        tracks.push({
            img: coverUrl,
            title: title,
            artist: artist,
        });

        const newIndex = tracks.length - 1;

        // 재생 버튼 기능 연결
        const playBtn = newTrack.querySelector('.track-play-btn');
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            // 같은 곡 클릭 시 재생/일시정지 토글
            if (musicIndex === newIndex) {
                if (isPlaying) {
                    pausePlayback();
                    updateAllPlayIcons(false);
                } else {
                    startPlayback();
                    updateAllPlayIcons(true);
                }
            } else {
                // 다른 곡 클릭 시 곡 변경 및 재생
                musicIndex = newIndex;
                updatePlayerBar();
                // 재생 중이 아닐 때만 재생 시작
                if (!isPlaying) {
                    startPlayback();
                }
                updateAllPlayIcons(true);
            }
        });

        // 토스트 메시지
        const toast = document.getElementById('toast');
        toast.innerText = '플레이리스트에 추가되었습니다.';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1500);
    });
});
