
document.addEventListener("DOMContentLoaded", () => {
    const volumeSlider = document.querySelector(".volume-slider");
    const volumeFilled = document.querySelector(".volume-filled");
    const volumeIcon = document.querySelector(".volume-icon");

    if (!volumeSlider || !volumeFilled || !volumeIcon) return;

    let volume = 0.7; // 초기 볼륨 (UI only)

    // 볼륨 UI 업데이트 함수
    function updateVolumeUI(v) {
        v = Math.max(0, Math.min(1, v));
        volume = v;

        // 슬라이더 채움
        volumeFilled.style.width = (v * 100) + "%";

        // 아이콘 변경
        if (v === 0) {
            volumeIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12l3.5 3.5-1.5 1.5L15 13.5l-3.5 3.5-1.5-1.5L13.5 12 10 8.5l1.5-1.5L15 10.5l3.5-3.5 1.5 1.5z"/>
                    <path d="M3 9v6h4l5 5V4L7 9H3z"/>
                </svg>
            `;
        } else {
            volumeIcon.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
            `;
        }
    }

    // 초기 UI 설정
    updateVolumeUI(volume);

    // 클릭 이벤트
    volumeSlider.addEventListener("click", (e) => {
        const rect = volumeSlider.getBoundingClientRect();
        const newVolume = (e.clientX - rect.left) / rect.width;
        updateVolumeUI(newVolume);
    });

    // 드래그 기능
    let isDragging = false;

    volumeSlider.addEventListener("mousedown", (e) => {
        isDragging = true;
        const rect = volumeSlider.getBoundingClientRect();
        const newVolume = (e.clientX - rect.left) / rect.width;
        updateVolumeUI(newVolume);
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const rect = volumeSlider.getBoundingClientRect();
        const newVolume = (e.clientX - rect.left) / rect.width;
        updateVolumeUI(newVolume);
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // 아이콘 클릭 → 음소거 / 복원
    volumeIcon.addEventListener("click", () => {
        if (volume > 0) {
            updateVolumeUI(0);
        } else {
            updateVolumeUI(0.7);
        }
    });
});


//  재생 진행바도 드래그되면 좋을 것 같아서 추가해요 

document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.querySelector(".progress");
    const progressFilled = document.querySelector(".progress-filled");

    if (!progressBar || !progressFilled) return;

    let progress = 0.0; // 초기 재생 위치 (UI-only)

    function updateProgressUI(p) {
        p = Math.max(0, Math.min(1, p));
        progress = p;
        progressFilled.style.width = (p * 100) + "%";
    }

    // 초기 UI 세팅
    updateProgressUI(progress);

    // 클릭 이동
    progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const newProgress = (e.clientX - rect.left) / rect.width;
        updateProgressUI(newProgress);
    });

    // 드래그 이동
    let progressDragging = false;

    progressBar.addEventListener("mousedown", (e) => {
        progressDragging = true;
        const rect = progressBar.getBoundingClientRect();
        const newProgress = (e.clientX - rect.left) / rect.width;
        updateProgressUI(newProgress);
    });

    document.addEventListener("mousemove", (e) => {
        if (!progressDragging) return;
        const rect = progressBar.getBoundingClientRect();
        const newProgress = (e.clientX - rect.left) / rect.width;
        updateProgressUI(newProgress);
    });

    document.addEventListener("mouseup", () => {
        progressDragging = false;
    });
});

