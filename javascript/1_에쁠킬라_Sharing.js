/* ==================== 전역 변수 ==================== */
let currentUser = null;
const MAX_USERS = 20;
let currentUsers = [];
let isSharingActive = false; // 쉐어링 세션 활성화 여부
let isHost = false; // 내가 호스트인지 여부

// 샘플 사용자 데이터
const sampleUsers = [
{ id: 'ahsy_u', name: '소윤' },
{ id: 'byeonwooseok', name: '변우석' },
{ id: 'chuuo3o', name: '김지우' },
{ id: 'd.o.hkyungsoo', name: '도경수' },
{ id: 'eunwo.o_c', name: '차은우' },
{ id: 'faker', name: '이상혁' },
{ id: 'gyuuujin', name: '규진' },
{ id: 'ha._.noory', name: '주하늘' },
{ id: 'iam_noonsong', name: '눈송이' },
{ id: 'jungkook', name: '정국' },
{ id: 'kwonttotto', name: '권또또' },
{ id: 'loeweruby', name: '김지민' },
{ id: 'moonjiwonn_', name: '문지원' },
{ id: 'na_onion', name: '박나언' },
{ id: 'o.eann', name: '이안' },
{ id: 'parkseojun', name: '박서준' },
{ id: 'queen.chu_s', name: '이미주' },
{ id: 'raireyoung', name: '홍지영' },
{ id: 'song_d', name: '송은석' },
{ id: 'taeyeon_ss', name: '김태연' },
{ id: 'uuuuuuu_haru', name: '하루' },
{ id: 'v', name: '김태형' },
{ id: 'woozico', name: '우지호' },
{ id: 'xeesoxee', name: '한소희' },
{ id: 'y_eunniii', name: '지예은' },
{ id: 'zinooo', name: '이진우' }
];

/* ==================== 현재 재생 중인 곡 카드 업데이트 ==================== */
function updateNowPlayingCard() {
const cardAlbumImage = document.getElementById('cardAlbumImage');
const cardTrackTitle = document.getElementById('cardTrackTitle');
const cardTrackArtist = document.getElementById('cardTrackArtist');
const cardProgressBar = document.getElementById('cardProgressBar');

if (!cardAlbumImage || !cardTrackTitle || !cardTrackArtist || !cardProgressBar) return;

const currentTrack = playableTracks[currentTrackIndex];

// 카드 정보 업데이트
cardAlbumImage.src = currentTrack.image;
cardTrackTitle.textContent = currentTrack.title;
cardTrackArtist.textContent = currentTrack.artist;

// 진행률 업데이트
const progress = (currentTime / totalDuration) * 100;
cardProgressBar.style.width = `${progress}%`;
}

/* ==================== 재생바 관련 (PlayRecord와 동일) ==================== */
const playableTracks = [
{ title: "Don't Look Back In Anger", artist: "Oasis", image: "../src/img/1_DontLookBackInAnger.jpg" },
{ title: "좋은 밤 좋은 꿈", artist: "SG 워너비", image: "../src/img/1_좋은밤좋은꿈.jpg" },
{ title: "에피소드", artist: "이무진", image: "../src/img/1_에피소드.jpg" },
{ title: "Trip", artist: "릴러말즈 (Feat. Hannah)", image: "../src/img/1_Trip.jpg" },
{ title: "How Sweet", artist: "NewJeans", image: "../src/img/1_howsweet.png" },
{ title: "한 페이지가 될 수 있게", artist: "Day6", image: "../src/img/1_한페이지가될수있게_.jpg" },
{ title: "Get Up", artist: "NewJeans", image: "../src/img/1_GETUP.jpg" },
{ title: "꿈의 버스", artist: "Day6", image: "../src/img/1_꿈의버스.jpg" },
{ title: "Please Please Please", artist: "Sabrina Carpenter", image: "../src/img/1_please.png" },
{ title: "ETA", artist: "NewJeans", image: "../src/img/1_GETUP.jpg" },
{ title: "사랑", artist: "최유리", image: "../src/img/1_사랑.jpg" },
{ title: "Leave Before You Love Me", artist: "Marshmello, Jonas Brothers", image: "../src/img/1_LeaveBeforeYouLoveMe.jpg" },
{ title: "Love Wins All", artist: "IU", image: "../src/img/1_lovewinsall.png" },
{ title: "Siren", artist: "RIIZE", image: "../src/img/1_siren.png" },
{ title: "Lose My Mind", artist: "Don Toliver (feat. Doja Cat)", image: "../src/img/1_Lose_My_Mind.jpg" },
{ title: "비 오는 날 듣기 좋은 노래", artist: "에픽하이 (Feat. Colde)", image: "../src/img/1_비오는날에듣기좋은노래.jpg" },
{ title: "Cool With You", artist: "NewJeans", image: "../src/img/1_GETUP.jpg" },
{ title: "Smart", artist: "LE SSERAFIM", image: "../src/img/1_smart.png" },
{ title: "Cruel Summer", artist: "Taylor Swift", image: "../src/img/1_lover.jpg" },
{ title: "눈사람", artist: "아티스트", image: "../src/img/1_눈사람.jpg" },
{ title: "Super Shy", artist: "NewJeans", image: "../src/img/1_GETUP.jpg" },
{ title: "Love on the Canvas", artist: "소희", image: "../src/img/1_Love_on_the_canvas.jpg" },
{ title: "Supernova", artist: "aespa", image: "../src/img/1_supernova.png" },
{ title: "너에게 못했던 내 마지막 말은", artist: "다비치", image: "../src/img/1_너에게못했던내마지막말은.jpg" },
{ title: "Celebrity", artist: "IU", image: "../src/img/1_celebrity.png" },
{ title: "Bubble Gum", artist: "NewJeans", image: "../src/img/1_howsweet.png" },
{ title: "NewJeans", artist: "NewJeans", image: "../src/img/1_GETUP.jpg" },
{ title: "Tell Us Bout Yourself", artist: "백예린", image: "../src/img/1_tellusboutyourself.jpg" },
{ title: "We Don't Talk Anymore", artist: "Charlie Puth", image: "../src/img/1_we.png" },
{ title: "Youth", artist: "다섯", image: "../src/img/1_Youth.jpg" },
{ title: "Kill Bill", artist: "SZA", image: "../src/img/1_SOS.jpg" },
{ title: "ASAP", artist: "NewJeans", image: "../src/img/1_GETUP.jpg" }
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

// 카드 진행률도 업데이트
const cardProgressBar = document.getElementById('cardProgressBar');
if (cardProgressBar) {
    cardProgressBar.style.width = Math.min(percent, 100) + '%';
}
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
    return;
    }
    updateProgress();
}, 500);
}

function play() {
if (playableTracks.length === 0) return;
if (currentIndex === -1) {
    selectTrack(0);
}
isPlaying = true;
iconPlay.style.display = 'none';
iconPause.style.display = 'inline';
startPlayTimer();
}

function pause() {
isPlaying = false;
iconPlay.style.display = 'inline';
iconPause.style.display = 'none';
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
updateNowPlayingCard(); // 카드 업데이트 추가
updateSharingStatus(); // 쉐어링 상태 업데이트 추가
play();
}

function prevTrack() {
if (playableTracks.length === 0) return;
const nextIndex = (currentIndex - 1 + playableTracks.length) % playableTracks.length;
selectTrack(nextIndex);
}

function nextTrack() {
if (playableTracks.length === 0) return;
const nextIndex = (currentIndex + 1) % playableTracks.length;
selectTrack(nextIndex);
}

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

currentTimeSpan.textContent = formatTime(0);
totalTimeSpan.textContent = '3:30';

/* ==================== 프로필 드롭다운 ==================== */
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

function handleLogout() {
alert("로그아웃 되었습니다!");
window.location.href = "../html/1_에쁠킬라_Login.html";
}

/* ==================== 로그인 체크 ==================== */
(function checkLogin() {
const loggedInUser = sessionStorage.getItem('loggedInUser');

if (!loggedInUser) {
    alert('로그인이 필요한 서비스입니다.');
    window.location.href = '../html/1_에쁠킬라_Login.html';
} else {
    const user = JSON.parse(loggedInUser);
    currentUser = user;
    
    const profileNickname = document.querySelector('.profile-nickname');
    if (profileNickname) {
    profileNickname.innerHTML = user.name + '님';
    }
    
    // 본인 이름으로 Sharing Place 표시
    const sharingPlaceInfo = document.getElementById('sharingPlaceInfo');
    const sharingPlaceHost = document.getElementById('sharingPlaceHost');
    if (sharingPlaceHost) sharingPlaceHost.textContent = user.name;
    if (sharingPlaceInfo) sharingPlaceInfo.classList.add('active');
    
    // DOM이 완전히 로드된 후 사용자 추가
    setTimeout(() => {
    console.log('로그인 사용자 추가:', user.name);
    addUser(user.name, true);
    }, 100);
}
})();

/* ==================== 팝업 관리 ==================== */
function openPopup() {
const popupOverlay = document.getElementById('popupOverlay');
popupOverlay.classList.add('active');
showChoiceScreen();
}

function closePopup() {
const popupOverlay = document.getElementById('popupOverlay');
popupOverlay.classList.remove('active');
setTimeout(() => {
    showChoiceScreen();
    const joinUrlInput = document.getElementById('joinUrlInput');
    const joinIdInput = document.getElementById('joinIdInput');
    const inviteSearchInput = document.getElementById('inviteSearchInput');
    const popupSearchResults = document.getElementById('popupSearchResults');
    if (joinUrlInput) joinUrlInput.value = '';
    if (joinIdInput) joinIdInput.value = '';
    if (inviteSearchInput) inviteSearchInput.value = '';
    if (popupSearchResults) popupSearchResults.innerHTML = '';
}, 300);
}

function showChoiceScreen() {
const popupTitle = document.getElementById('popupTitle');
const popupChoiceContainer = document.getElementById('popupChoiceContainer');
const popupJoinContainer = document.getElementById('popupJoinContainer');
const popupInviteContainer = document.getElementById('popupInviteContainer');

if (popupTitle) popupTitle.textContent = '쉐어링';
if (popupChoiceContainer) popupChoiceContainer.classList.remove('hidden');
if (popupJoinContainer) popupJoinContainer.classList.remove('active');
if (popupInviteContainer) popupInviteContainer.classList.remove('active');
}

function showJoinScreen() {
const popupTitle = document.getElementById('popupTitle');
const popupChoiceContainer = document.getElementById('popupChoiceContainer');
const popupJoinContainer = document.getElementById('popupJoinContainer');
const popupInviteContainer = document.getElementById('popupInviteContainer');
const joinUrlInput = document.getElementById('joinUrlInput');

if (popupTitle) popupTitle.textContent = '참가하기';
if (popupChoiceContainer) popupChoiceContainer.classList.add('hidden');
if (popupJoinContainer) popupJoinContainer.classList.add('active');
if (popupInviteContainer) popupInviteContainer.classList.remove('active');
setTimeout(() => { if (joinUrlInput) joinUrlInput.focus(); }, 100);
}

function showInviteScreen() {
const popupTitle = document.getElementById('popupTitle');
const popupChoiceContainer = document.getElementById('popupChoiceContainer');
const popupJoinContainer = document.getElementById('popupJoinContainer');
const popupInviteContainer = document.getElementById('popupInviteContainer');
const inviteSearchInput = document.getElementById('inviteSearchInput');

if (popupTitle) popupTitle.textContent = '초대하기';
if (popupChoiceContainer) popupChoiceContainer.classList.add('hidden');
if (popupJoinContainer) popupJoinContainer.classList.remove('active');
if (popupInviteContainer) popupInviteContainer.classList.add('active');
setTimeout(() => { if (inviteSearchInput) inviteSearchInput.focus(); }, 100);
}

function submitJoin() {
const joinUrlInput = document.getElementById('joinUrlInput');
const joinIdInput = document.getElementById('joinIdInput');
const urlValue = joinUrlInput ? joinUrlInput.value.trim() : '';
const idValue = joinIdInput ? joinIdInput.value.trim() : '';

if (!urlValue && !idValue) {
    alert('URL 또는 호스트 사용자 ID를 입력하세요.');
    return;
}

let hostName = '';
if (urlValue) {
    // URL에서 호스트 이름 추출 (예시)
    hostName = '호스트';
} else {
    // ID에서 @ 제거
    hostName = idValue.replace('@', '');
}

// 쉐어링 세션 활성화 (참가자로서)
isSharingActive = true;
isHost = false;

// Sharing Place 정보 표시
const sharingPlaceInfo = document.getElementById('sharingPlaceInfo');
const sharingPlaceHost = document.getElementById('sharingPlaceHost');
if (sharingPlaceHost) sharingPlaceHost.textContent = hostName;
if (sharingPlaceInfo) sharingPlaceInfo.classList.add('active');

// 쉐어링 상태 업데이트
updateSharingStatus();

closePopup();
}

function copyInviteLink() {
// 실제로는 서버에서 생성된 URL을 사용해야 함
const inviteUrl = `https://soundletter.com/share/${Math.random().toString(36).substring(7)}`;

// 클립보드에 복사
navigator.clipboard.writeText(inviteUrl).then(() => {
    alert('URL이 복사되었습니다!');
}).catch(() => {
    // 구형 브라우저 대응
    const textarea = document.createElement('textarea');
    textarea.value = inviteUrl;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('URL이 복사되었습니다!');
});
}

function searchInviteUsers() {
const inviteSearchInput = document.getElementById('inviteSearchInput');
const popupSearchResults = document.getElementById('popupSearchResults');
const searchTerm = inviteSearchInput ? inviteSearchInput.value.toLowerCase().trim() : '';

if (searchTerm.length === 0) {
    if (popupSearchResults) popupSearchResults.innerHTML = '';
    return;
}

const filtered = sampleUsers.filter(user => 
    (user.id.toLowerCase().includes(searchTerm) || user.name.includes(searchTerm)) &&
    !currentUsers.some(cu => cu.name === user.name)
);

if (filtered.length > 0 && popupSearchResults) {
    popupSearchResults.innerHTML = filtered.map(user => `
    <div class="popup-user-item">
        <div class="popup-user-avatar">
        <svg viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        </div>
        <div class="popup-user-name">${user.name} (@${user.id})</div>
        <button class="popup-add-btn" onclick="addUserFromPopup('${user.name}')">초대</button>
    </div>
    `).join('');
} else if (popupSearchResults) {
    popupSearchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: #b3b3b3;">검색 결과가 없습니다.</div>';
}
}

/* ==================== 쉐어링 기능 ==================== */
let usersDisplay = null;

// DOM 로드 후 usersDisplay 초기화
document.addEventListener('DOMContentLoaded', function() {
usersDisplay = document.getElementById('usersDisplay');
console.log('DOMContentLoaded - usersDisplay:', usersDisplay);
});

// 즉시 초기화도 시도
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
    usersDisplay = document.getElementById('usersDisplay');
});
} else {
usersDisplay = document.getElementById('usersDisplay');
}

function addUser(userName, isCurrentUser = false) {
if (currentUsers.length >= MAX_USERS) {
    alert('최대 20명까지만 추가할 수 있습니다.');
    return false;
}

if (currentUsers.some(user => user.name === userName)) {
    if (!isCurrentUser) {
    return false; // 이미 추가된 사용자
    }
    return false;
}

currentUsers.push({ name: userName, isCurrentUser });
renderUsers();

return true; // 성공
}

function removeUser(userName) {
currentUsers = currentUsers.filter(user => user.name !== userName);

// 다른 사용자(isCurrentUser가 false)가 모두 제거되면 쉐어링 세션 비활성화
const otherUsersCount = currentUsers.filter(user => !user.isCurrentUser).length;
if (otherUsersCount === 0) {
    isSharingActive = false;
    isHost = false;
    console.log('❌ 쉐어링 세션 비활성화됨 - 다른 사용자 없음');
}

renderUsers();
}

function renderUsers() {
console.log('renderUsers 호출됨');
console.log('currentUsers:', currentUsers);
console.log('usersDisplay:', usersDisplay);

if (!usersDisplay) {
    console.error('usersDisplay 요소를 찾을 수 없음!');
    return;
}

usersDisplay.innerHTML = '';

currentUsers.forEach((user, index) => {
    console.log(`사용자 ${index} 렌더링:`, user.name);
    
    const userCircle = document.createElement('div');
    userCircle.className = 'user-profile-circle';
    userCircle.setAttribute('data-position', index);
    
    userCircle.innerHTML = `
    <div class="user-profile-avatar">
        <img src="../src/img/1_profile.png" alt="${user.name}" 
            style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
    </div>
    <div class="user-profile-name">${user.name}</div>
    ${!user.isCurrentUser ? `
        <div class="user-profile-remove" onclick="removeUser('${user.name}')">
        <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
        </div>
    ` : ''}
    `;

    usersDisplay.appendChild(userCircle);
    console.log(`사용자 ${index} DOM 추가 완료`);
});

console.log('renderUsers 완료, 총 사용자 수:', currentUsers.length);
console.log('usersDisplay.children.length:', usersDisplay.children.length);

// 쉐어링 상태 업데이트
updateSharingStatus();
}

function addUserFromPopup(userName) {
console.log('=== addUserFromPopup 시작 ===');
console.log('userName:', userName);
console.log('현재 currentUsers:', currentUsers);
console.log('현재 isSharingActive:', isSharingActive);

// 이미 추가된 사용자인지 먼저 확인
if (currentUsers.some(user => user.name === userName)) {
    alert(`${userName}님은 이미 초대된 사용자입니다.`);
    return;
}

// 다른 사람(isCurrentUser가 false인 사람)을 처음 초대하는 경우 쉐어링 세션 활성화
const otherUsersCount = currentUsers.filter(user => !user.isCurrentUser).length;
console.log('현재 다른 사용자 수:', otherUsersCount);

if (otherUsersCount === 0) {
    isSharingActive = true;
    isHost = true;
    console.log('✅ 쉐어링 세션 활성화됨 (호스트) - 첫 번째 다른 사용자 초대');
}

// 사용자 추가
const success = addUser(userName, false);
console.log('addUser 결과:', success);
console.log('추가 후 currentUsers.length:', currentUsers.length);
console.log('추가 후 isSharingActive:', isSharingActive);

if (success) {
    // 명시적으로 한 번 더 업데이트 호출
    console.log('🔄 명시적으로 updateSharingStatus 호출');
    setTimeout(() => {
        updateSharingStatus();
    }, 100);
    
    alert(`${userName}님을 초대했습니다!`);
    closePopup();
} else {
    alert('초대에 실패했습니다.');
}
console.log('=== addUserFromPopup 종료 ===');
}

// 전역으로 명시적 할당
window.addUserFromPopup = addUserFromPopup;

// 쉐어링 상태 업데이트 함수
function updateSharingStatus() {
const sharingStatus = document.getElementById('sharingStatus');
const nowPlayingTitle = document.getElementById('nowPlayingTitle');

console.log('updateSharingStatus 호출됨');
console.log('isSharingActive:', isSharingActive);
console.log('isHost:', isHost);
console.log('currentUsers.length:', currentUsers.length);

const otherUsersCount = currentUsers.filter(user => !user.isCurrentUser).length;
console.log('다른 사용자 수:', otherUsersCount);
console.log('sharingStatus 요소:', sharingStatus);

if (!sharingStatus) {
    console.error('sharingStatus 요소를 찾을 수 없음!');
    return;
}

// 쉐어링 세션이 활성화되어 있고,
// (참가자 모드이거나 OR 호스트 모드에서 다른 사용자가 있을 때) 표시
if (isSharingActive && (!isHost || otherUsersCount > 0)) {
    console.log('✅ 쉐어링 상태 표시 활성화');
    sharingStatus.textContent = 'Sharing 중 . . .';
    sharingStatus.classList.add('active');
} else {
    console.log('❌ 쉐어링 상태 표시 비활성화');
    sharingStatus.classList.remove('active');
}
}

renderUsers();