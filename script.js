// script.js

document.addEventListener("DOMContentLoaded", function () {
    // ページのコンテンツがロードされたら実行

    // additives.jsonファイルからデータを取得
    fetch('additives.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('JSONファイルの読み込みに失敗しました');
            }
            return response.json();
        })
        .then(data => {
            additivesData = data;
        })
        .catch(error => {
            console.error('添加物データの取得エラー:', error);
        });

    // 検索フォームの送信処理
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const additiveName = document.getElementById('additive-name').value.trim();
            if (additiveName) {
                displayResults(additiveName);
            } else {
                alert('添加物名を入力してください。');
            }
        });
    }

    // ホームボタンのクリック処理
    const homeButton = document.getElementById('home-button');
    if (homeButton) {
        homeButton.addEventListener('click', function () {
            document.getElementById('additive-name').value = '';
            document.getElementById('results-page').style.display = 'none';
            document.getElementById('search-page').style.display = 'block';
            window.scrollTo(0, 0);
        });
    }
});

// 検索結果を表示する関数
function displayResults(additiveName) {
    const inputName = additiveName.toLowerCase();
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

    document.getElementById('search-page').style.display = 'none';
    document.getElementById('results-page').style.display = 'block';
    window.scrollTo(0, 0);
}
