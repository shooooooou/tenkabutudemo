// script.js

// 添加物データを格納する配列を初期化
let additivesData = [];

// additives.jsonファイルからデータを取得
fetch('additives.json')
    .then(response => response.json())
    .then(data => {
        additivesData = data;
    })
    .catch(error => {
        console.error('添加物データの取得エラー:', error);
    });

// 検索フォームの送信処理
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const additiveName = document.getElementById('additive-name').value.trim();
    if (additiveName) {
        displayResults(additiveName);
    } else {
        alert('添加物名を入力してください。');
    }
});

// 検索結果を表示する関数
function displayResults(additiveName) {
    const inputName = additiveName.toLowerCase();

    // 部分一致で添加物を検索
    const result = additivesData.find(item =>
        item.name.toLowerCase().includes(inputName) ||
        (item.alias && item.alias.toLowerCase().includes(inputName))
    );

    if (result) {
        document.getElementById('additive-title').textContent = `添加物名：${result.name}`;
        document.getElementById('additive-alias').textContent = result.alias || 'なし';
        document.getElementById('additive-benefits').textContent = result.benefits || '情報なし';
        document.getElementById('additive-demerits').textContent = result.demerits || '情報なし';
    } else {
        document.getElementById('additive-title').textContent = '該当する添加物が見つかりませんでした。';
        document.getElementById('additive-alias').textContent = '';
        document.getElementById('additive-benefits').textContent = '';
        document.getElementById('additive-demerits').textContent = '';
    }

    // 検索ページを非表示にして結果ページを表示
    document.getElementById('search-page').style.display = 'none';
    document.getElementById('results-page').style.display = 'block';

    // 結果ページをトップにスクロール
    window.scrollTo(0, 0);
}

// ホームボタンのクリック処理
document.getElementById('home-button').addEventListener('click', function() {
    // 検索入力をクリア
    document.getElementById('additive-name').value = '';

    // 結果ページを非表示にして検索ページを表示
    document.getElementById('results-page').style.display = 'none';
    document.getElementById('search-page').style.display = 'block';

    // 検索ページをトップにスクロール
    window.scrollTo(0, 0);
});

// ロゴのアニメーション処理
document.addEventListener("DOMContentLoaded", function() {
    const logo = document.querySelector(".logo img");

    let position = -100; // 初期位置（左端）
    let direction = 1; // アニメーションの方向

    function animateLogo() {
        position += direction;

        if (position >= 0 && position <= 100) {
            logo.style.opacity = 1;
        } else {
            logo.style.opacity = 0;
        }

        if (position > 100) {
            direction = -1; // 左方向に戻る
        } else if (position < -100) {
            direction = 1; // 右方向に進む
        }

        logo.style.transform = `translateX(${position}%)`;

        requestAnimationFrame(animateLogo);
    }

    animateLogo();
});
