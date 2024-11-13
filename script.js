let periodicBannerVisible = false; // 定期広告の表示状態を管理するフラグ
let currentImageIndex = 0;
const images = ["名称未設定 2.png", "パイモン選挙ポスター.png"];

function showPeriodicBanner() {
    const periodicBanner = document.getElementById('periodic-banner');
    const periodicBannerImage = document.getElementById('periodic-banner-image');
    periodicBannerImage.src = images[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % images.length;

    periodicBanner.style.display = 'flex';
    periodicBanner.classList.remove('hidden');
    periodicBanner.classList.add('visible');
    periodicBannerVisible = true;
}

function closePeriodicBanner() {
    const periodicBanner = document.getElementById('periodic-banner');
    periodicBanner.classList.remove('visible');
    periodicBanner.classList.add('hidden');
    setTimeout(() => {
        periodicBanner.style.display = 'none';
        periodicBannerVisible = false;
        setTimeout(() => {
            if (!periodicBannerVisible) {
                showPeriodicBanner();
            }
        }, 9000); // .9秒後に再表示のためのチェック
    }, 100); // アニメーション完了までの待機
}

function closeBanner() {
    const bannerContainer = document.querySelector('.banner-container');
    bannerContainer.style.display = 'none';
    setTimeout(() => {
        bannerContainer.style.display = 'inline-block';
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(showPeriodicBanner, 1000); // 1秒後に初めて表示
    setInterval(() => {
        if (!periodicBannerVisible) {
            showPeriodicBanner();
        }
    }, 8000); // 8秒ごとにチェックして表示
});

// タイピング目標の文字列
const targetStrings = ["mannkosekkusuonani"];

// 各要素を取得
const targetElements = [document.getElementById('target1'), document.getElementById('target2')];
const inputFields = [document.getElementById('inputField1'), document.getElementById('inputField2')];
const feedbackElements = [document.getElementById('feedback1'), document.getElementById('feedback2')];
const speedElements = [document.getElementById('speed1'), document.getElementById('speed2')];
const incorrectSounds = [new Audio('incorrect.mp3'), new Audio('incorrect.mp3')];

let startTime = [null, null]; // 開始時間を配列で保持

// 各入力フィールドにイベントリスナーを追加
inputFields.forEach((inputField, index) => {
    inputField.addEventListener('input', () => {
        const inputText = inputField.value.trim();

        if (startTime[index] === null) {
            startTime[index] = new Date();
        }

        if (inputText === targetStrings[index]) {
            feedbackElements[index].textContent = "CORRECT";
            feedbackElements[index].classList.remove('incorrect');
            feedbackElements[index].classList.add('correct');

            const endTime = new Date();
            const timeTaken = (endTime - startTime[index]) / 1000;
            const speed = (inputText.length / timeTaken).toFixed(2);
            speedElements[index].textContent = `speed: ${speed} C/s`;

            inputField.disabled = true;

            setTimeout(() => {
                inputField.value = '';
                inputField.disabled = false;
                feedbackElements[index].textContent = '';
                speedElements[index].textContent = '';
                startTime[index] = null;
                inputField.focus();
            }, 1000);
        } else {
            feedbackElements[index].textContent = "";
            for (let i = 0; i < inputText.length; i++) {
                if (inputText[i] !== targetStrings[index][i]) {
                    feedbackElements[index].textContent = "you missed";
                    feedbackElements[index].classList.remove('correct');
                    feedbackElements[index].classList.add('incorrect');

                    incorrectSounds[index].play();
                    inputField.value = '';
                    startTime[index] = null;
                    break;
                }
            }
        }
    });
});

