// スマートフォン判定
if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  alert('このアプリはスマートフォン専用です。スマートフォンからアクセスしてください。');
  throw new Error('スマートフォン以外のデバイスでの利用は制限されています。');
}

// カメラ映像を表示
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');
const ocrResult = document.getElementById('ocrResult');
const additiveInfo = document.getElementById('additiveInfo');

// 外側カメラを指定
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(error => {
    console.error('カメラにアクセスできません:', error);
    alert('カメラにアクセスできません。ブラウザの設定を確認してください。');
  });

// 撮影ボタンの機能
captureButton.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.style.display = 'block';

  // OCR処理
  Tesseract.recognize(canvas, 'jpn', {
    logger: info => console.log(info)
  }).then(({ data: { text } }) => {
    ocrResult.textContent = text.trim();
    searchAdditiveInfo(text.trim());
  }).catch(error => {
    console.error('OCR処理中にエラーが発生しました:', error);
    alert('OCR処理中にエラーが発生しました。');
  });
});

// 添加物情報の検索
function searchAdditiveInfo(ocrText) {
  fetch('食品添加物データ.json')
    .then(response => response.json())
    .then(data => {
      const additive = data.find(item => ocrText.includes(item.添加物名));
      if (additive) {
        additiveInfo.innerHTML = `
          <h3>${additive.添加物名}</h3>
          <p><strong>メリット:</strong> ${additive.メリット}</p>
          <p><strong>デメリット:</strong> ${additive.デメリット}</p>
          <p><a href="${additive.関連リンク}" target="_blank">詳細を見る</a></p>
        `;
      } else {
        additiveInfo.innerHTML = '<p>該当する添加物が見つかりませんでした。</p>';
      }
    })
    .catch(error => {
      console.error('添加物データの読み込み中にエラーが発生しました:', error);
      alert('添加物データの読み込み中にエラーが発生しました。');
    });
}


