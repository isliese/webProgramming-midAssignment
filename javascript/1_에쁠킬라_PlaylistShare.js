function copyLink() {
    const url = document.getElementById('playlistUrl').innerText;

    //navigator.clipboard 사용 가능 여부 체크
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                alert('링크가 복사되었습니다!');
            })
            .catch(() => {
                // 실패 시 대체 방식
                fallbackCopy(url);
            });
    } else {
        //clipboard API 미지원 → fallback
        fallbackCopy(url);
    }
}

function fallbackCopy(text) {
    //임시 input 생성
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();

    try {
        document.execCommand('copy');
        alert('링크가 복사되었습니다!');
    } catch (e) {
        alert('복사에 실패했습니다. 직접 복사해주세요.');
    }

    document.body.removeChild(tempInput);
}

//재생/일시정지 토글 기능 (모든 재생 버튼 공통)
document.querySelectorAll('.play-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
        const playIcon = btn.querySelector('.icon-play');
        const pauseIcon = btn.querySelector('.icon-pause');

        const isPlaying = pauseIcon.style.display === 'block';

        if (isPlaying) {
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
        } else {
            pauseIcon.style.display = 'block';
            playIcon.style.display = 'none';
        }
    });
});

//하단재생바 오른쪽/왼쪽 버튼 누를 시 변경
//플레이리스트 트랙 데이터
const tracks = [
    {
        title: "Don't Look Back in Anger",
        artist: 'Oasis',
        img: '../src/img/1_DontLookBackInAnger.jpg',
        duration: '3:30',
    },

    {
        title: 'Smart',
        artist: 'LE SSERAFIM',
        img: '../src/img/1_smart.png',
        duration: '2:46',
    },
    {
        title: 'Siren',
        artist: 'RIIZE',
        img: '../src/img/1_siren.png',
        duration: '2:28',
    },
    {
        title: 'ETA',
        artist: 'NewJeans',
        img: '../src/img/1_GETUP.jpg',
        duration: '2:31',
    },
    {
        title: 'How Sweet',
        artist: 'NewJeans',
        img: '../src/img/1_howsweet.png',
        duration: '3:38',
    },
    {
        title: 'Supernova',
        artist: 'aespa',
        img: '../src/img/1_supernova.png',
        duration: '2:59',
    },
    {
        title: 'Love wins all',
        artist: 'IU',
        img: '../src/img/1_lovewinsall.png',
        duration: '4:31',
    },
];

let currentTrackIndex = 0;

function updatePlayerBar() {
    const track = tracks[currentTrackIndex];

    document.querySelector('.now-playing-image').src = track.img;
    document.querySelector('.now-playing-title').textContent = track.title;
    document.querySelector('.now-playing-artist').textContent = track.artist;
    document.querySelector('.total-time').textContent = track.duration;
}

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    updatePlayerBar();
});

document.querySelector('.next-btn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updatePlayerBar();
});

//페이지 로드 시 처음 재생바 초기화
updatePlayerBar();
