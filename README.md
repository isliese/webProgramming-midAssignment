# webProgramming-midAssignment
웹프로그래밍 중간과제

* 각 html 파일의 title은 `SoundLetter - 페이지 이름` 으로 해주세요!

* layout.css 파일 참조는 `<link rel="stylesheet" href="layout.css">`로 하시면 돼요

* player-bar class 아래처럼 바꿔주세요!
```
<div class="player-bar">
        <div class="now-playing">
            <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=100" alt="Now Playing" class="now-playing-image">
            <div class="now-playing-info">
                <h4>Don't Look Back in Anger</h4>
                <p>Oasis</p>
            </div>
        </div>

        <div class="player-controls">
            <div class="control-buttons">
                <button class="control-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                    </svg>
                </button>
                <button class="control-btn play">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </button>
                <button class="control-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                    </svg>
                </button>
            </div>
            <div class="progress-bar">
                <span class="time">2:15</span>
                <div class="progress">
                    <div class="progress-filled"></div>
                </div>
                <span class="time">4:48</span>
            </div>
        </div>

        <div class="volume-control">
            <svg class="volume-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
            <div class="volume-slider">
                <div class="volume-filled"></div>
            </div>
        </div>
    </div>
```