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
const totalDuration = 210;
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


// 지도
let map;
let mapInitialized = false;
let musicLocations = []; // JSON 데이터 저장 변수
let currentInfoWindow = null; // 현재 열린 정보창 추적

// 이미지 프리로드 및 검증 함수
function preloadAndValidateImage(url) {
return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(url);
    img.src = url;
});
}

// 커스텀 클러스터 렌더러 클래스
class PhotoClusterRenderer {
render({ count, position, markers }, stats, map) {

    // 유효한 이미지를 가진 마커들만 필터링
    const validMarkers = markers.filter(marker => {
    const icon = marker.getIcon();
    return icon && icon.url && icon.url.trim() !== '';
    });

    if (validMarkers.length === 0) {
    console.warn('유효한 이미지를 가진 마커가 없습니다.');
    return null;
    }

    const randomMarker = validMarkers[Math.floor(Math.random() * validMarkers.length)];
    const representativeImage = randomMarker.getIcon().url;

    // 클러스터 HTML 엘리먼트 생성
    const div = document.createElement('div');
    div.className = 'cluster-photo-marker';
    div.innerHTML = `<div class="cluster-count">${count.toLocaleString()}</div>`;
    div.style.opacity = '0';

    // 이미지 프리로드 후 표시
    preloadAndValidateImage(representativeImage)
    .then(validUrl => {
        div.style.backgroundImage = `url('${validUrl}')`;
        div.style.opacity = '1';
    })
    .catch(invalidUrl => {
        console.error('이미지 로드 실패:', invalidUrl);
        // 이미지 로드 실패 시 다른 유효한 마커의 이미지 시도
        if (validMarkers.length > 1) {
        const alternativeMarker = validMarkers[Math.floor(Math.random() * validMarkers.length)];
        const alternativeImage = alternativeMarker.getIcon().url;
        
        preloadAndValidateImage(alternativeImage)
            .then(validUrl => {
            div.style.backgroundImage = `url('${validUrl}')`;
            div.style.opacity = '1';
            })
            .catch(() => {
            // 모든 이미지 로드 실패 시 클러스터 숨김
            div.style.display = 'none';
            console.error('모든 대체 이미지 로드 실패');
            });
        } else {
        div.style.display = 'none';
        }
    });

    // OverlayView로 지도 위에 추가
    const overlay = new google.maps.OverlayView();
    overlay.div = div;
    overlay.position = position;

    overlay.onAdd = function () {
    this.getPanes().overlayMouseTarget.appendChild(div);
    };

    overlay.draw = function () {
    const projection = this.getProjection();
    const point = projection.fromLatLngToDivPixel(position);

    if (point) {
        div.style.position = 'absolute';
        div.style.transform = `translate(${point.x - 40}px, ${point.y - 40}px)`;
        div.style.left = '0px';
        div.style.top = '0px';
    }
    };

    overlay.onRemove = function () {
    if (div.parentNode) div.parentNode.removeChild(div);
    };

    overlay.setMap(map);
    return overlay;
}
}


function initMap() {
if (mapInitialized) return;

// 지도 초기화 
map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.5665, lng: 126.9780 },
    zoom: 3,
    styles: [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [{"color": "#242f3e"}]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{"color": "#242f3e"}]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#746855"}]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{"color": "#17263c"}]
    }
    ]
});

    fetch("../data/1_에쁠킬라_musicLocations.json")
    .then(res => res.json())
    .then(data => {

        const imagePromises = data.locations.map(location => 
        preloadAndValidateImage(location.image)
            .then(() => ({ ...location, valid: true }))
            .catch(() => {
            console.warn('이미지 로드 실패:', location.image);
            return { ...location, valid: false };
            })
        );

        Promise.all(imagePromises).then(validatedLocations => {
        // 유효한 이미지만 가진 위치만 마커 생성
        const markers = validatedLocations
            .filter(location => location.valid)
            .map(location => {
            const markerDiv = document.createElement('div');
            markerDiv.className = 'cluster-photo-marker';
            markerDiv.style.width = '80px';
            markerDiv.style.height = '80px';
            markerDiv.innerHTML = `<div class="cluster-count">1</div>`;
            markerDiv.style.opacity = '0';

            // 이미지 프리로드 후 표시
            preloadAndValidateImage(location.image)
                .then(validUrl => {
                markerDiv.style.backgroundImage = `url('${validUrl}')`;
                markerDiv.style.opacity = '1';
                })
                .catch(() => {
                console.error('마커 이미지 로드 실패:', location.image);
                markerDiv.style.display = 'none';
                });

            // 커스텀 오버레이 생성
            const overlay = new google.maps.OverlayView();
            overlay.location = location;
            overlay.div = markerDiv;
            overlay.position = new google.maps.LatLng(location.lat, location.lng);

            overlay.onAdd = function () {
                this.getPanes().overlayMouseTarget.appendChild(markerDiv);
                
                // 클릭 이벤트 추가
                markerDiv.addEventListener('click', () => {
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }

                const infoWindow = new google.maps.InfoWindow({
                    content: `
                    <div class="info-window">
                        <button class="info-window-close" onclick="if(window.currentInfoWindow) window.currentInfoWindow.close()">✕</button>
                        <h3>${location.title}</h3>
                        <p><strong>${location.artist}</strong></p>
                        <p>📍 ${location.location}</p>
                    </div>
                    `,
                    position: overlay.position
                });
                
                // 기본 닫기 버튼 숨기기
                google.maps.event.addListener(infoWindow, 'domready', function() {
                    const iwOuter = document.querySelector('.gm-style-iw-c');
                    const iwCloseBtn = document.querySelector('.gm-style-iw-chr > button');
                    if (iwCloseBtn) {
                    iwCloseBtn.style.display = 'none';
                    }
                    if (iwOuter) {
                    iwOuter.style.padding = '0';
                    iwOuter.style.background = 'transparent';
                    iwOuter.style.boxShadow = 'none';
                    }
                });
                
                infoWindow.open(map);
                currentInfoWindow = infoWindow; 
                window.currentInfoWindow = infoWindow; 
                });
            };

            overlay.draw = function () {
                const projection = this.getProjection();
                const point = projection.fromLatLngToDivPixel(overlay.position);

                if (point) {
                markerDiv.style.position = 'absolute';
                markerDiv.style.transform = `translate(${point.x - 40}px, ${point.y - 40}px)`;
                markerDiv.style.left = '0px';
                markerDiv.style.top = '0px';
                }
            };

            overlay.onRemove = function () {
                if (markerDiv.parentNode) markerDiv.parentNode.removeChild(markerDiv);
            };

            overlay.setMap(map);

            // 더미 마커 반환 
            const dummyMarker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map: null, 
                icon: {
                url: location.image,
                scaledSize: new google.maps.Size(1, 1), 
                anchor: new google.maps.Point(0, 0)
                }
            });

            return dummyMarker;
            });

        if (markers.length === 0) {
            console.error('유효한 마커가 없습니다.');
            return;
        }

        // 클러스터 생성 
        new markerClusterer.MarkerClusterer({ 
            map, 
            markers,
            renderer: new PhotoClusterRenderer(),
            minimumClusterSize: 2 
        });

        mapInitialized = true;
        });
    })
    .catch(err => console.error("지도 데이터 로드 실패:", err));
}
// Google Maps API 로드 완료 후 자동으로 initMap 호출
window.initMap = initMap;

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
