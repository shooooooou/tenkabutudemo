// script.js
document.getElementById('goButton').addEventListener('click', function() {
    const urlInput = document.getElementById('urlInput').value; // ユーザーが入力したURL
    const iframe = document.getElementById('webView'); // iframe要素
  
    // URLを確認し、適切な形式に変換する
    let url = urlInput.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
  
    // iframeのsrcに設定
    iframe.src = url;
  });
  // script.js

let additivesData = [];

// JSONデータを読み込む
fetch('食品添加物データ.json')
  .then(response => response.json())
  .then(data => {
    additivesData = data;
    console.log('データが読み込まれました:', additivesData);
  })
  .catch(error => console.error('データの読み込みに失敗しました:', error));

// 検索機能を追加
document.getElementById('goButton').addEventListener('click', function() {
  const query = document.getElementById('urlInput').value.trim();
  const resultContent = document.getElementById('resultContent');

  // 検索結果をクリア
  resultContent.innerHTML = '';

  // データを検索
  const results = additivesData.filter(item => item.添加物名 && item.添加物名.includes(query));

  if (results.length > 0) {
    results.forEach(item => {
      const resultHTML = `
        <h4>${item.添加物名}</h4>
        <p><strong>メリット:</strong> ${item.メリット}</p>
        <p><strong>デメリット:</strong> ${item.デメリット}</p>
        <p><a href="${item.関連リンク}" target="_blank">詳細を見る</a></p>
      `;
      resultContent.innerHTML += resultHTML;
    });
  } else {
    resultContent.innerHTML = '<p>該当する添加物が見つかりませんでした。</p>';
  }
});
// カメラ映像を表示
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('captureButton');

// カメラにアクセス
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(error => {
    console.error('カメラにアクセスできません:', error);
  });

// 撮影ボタンの機能
captureButton.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.style.display = 'block'; // 撮影した画像を表示
});
// OCR実行ボタンを追加
const ocrButton = document.createElement('button');
ocrButton.textContent = 'OCR解析';
ocrButton.id = 'ocrButton';
document.getElementById('camera').appendChild(ocrButton);

// OCR結果を検索に利用
ocrButton.addEventListener('click', () => {
  const canvas = document.getElementById('canvas');
  if (!canvas.style.display || canvas.style.display === 'none') {
    alert('まず画像を撮影してください！');
    return;
  }

  // OCR解析
  Tesseract.recognize(canvas, 'jpn', {
    logger: info => console.log(info), // 進行状況を表示
  }).then(({ data: { text } }) => {
    const cleanText = text.replace(/\s+/g, '').trim(); // 空白や改行を削除
    console.log('検索用テキスト:', cleanText); // 確認用ログ

    // 検索実行
    const resultContent = document.getElementById('resultContent');
    resultContent.innerHTML = ''; // 検索結果をクリア

    const results = additivesData.filter(item => item.添加物名 && item.添加物名.includes(cleanText));
    if (results.length > 0) {
      results.forEach(item => {
        const resultHTML = `
          <h4>${item.添加物名}</h4>
          <p><strong>メリット:</strong> ${item.メリット}</p>
          <p><strong>デメリット:</strong> ${item.デメリット}</p>
          <p><a href="${item.関連リンク}" target="_blank">詳細を見る</a></p>
        `;
        resultContent.innerHTML += resultHTML;
      });
    } else {
      resultContent.innerHTML = '<p>該当する添加物が見つかりませんでした。</p>';
    }
  }).catch(error => {
    console.error('OCR解析中にエラーが発生しました:', error);
  });
});
