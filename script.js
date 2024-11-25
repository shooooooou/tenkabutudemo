document.addEventListener('DOMContentLoaded', function() {
  // アイコン画像のURLリスト
  const iconUrls = [
      'https://i.imgur.com/jbioOWG.png',
      'https://i.imgur.com/8nLKnBU.png',
      'https://i.imgur.com/ltHyUbG.png',
      'https://i.imgur.com/d4ibqun.png',
      'https://i.imgur.com/BFWeYRR.png',
      'https://i.imgur.com/TaJI3RD.png',
  ];

  // ランダムにアイコンを選ぶ関数
  function getRandomIconUrl() {
      const randomIndex = Math.floor(Math.random() * iconUrls.length);
      return iconUrls[randomIndex];
  }

  // すべてのアイコン要素にランダムなアイコンを設定
  const icons = document.querySelectorAll('.info-icon');
  icons.forEach(icon => {
      icon.src = getRandomIconUrl();
  });

  // 添加物データを格納する配列を初期化
  let additivesData = [];

  // additives.jsonファイルからデータを取得（GitHub Pagesの外部URLから取得）
  fetch('https://shooooooou.github.io/tenkabutudemo/additives.json')
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

  // ホームボタンのクリック処理
  const homeButton = document.getElementById('back-button');
  if (homeButton) {
      homeButton.addEventListener('click', function() {
          // 検索入力をクリア
          document.getElementById('additive-name').value = '';

          // 結果ページを非表示にして検索ページを表示
          document.getElementById('results-page').style.display = 'none';
          document.getElementById('search-page').style.display = 'block';

          // 検索ページをトップにスクロール
          window.scrollTo(0, 0);
      });
  }

  // 検索結果を表示する関数
  function displayResults(additiveName) {
      const inputName = additiveName.toLowerCase();

      // 部分一致で添加物を検索
      const result = additivesData.find(item =>
          item.name.toLowerCase().includes(inputName) ||
          (item.alias && item.alias.toLowerCase().includes(inputName))
      );

      // 結果表示用の要素を取得
      const additiveTitle = document.getElementById('additive-title');
      const additiveAlias = document.getElementById('additive-alias');
      const additiveBenefits = document.getElementById('additive-benefits');
      const additiveDemerits = document.getElementById('additive-demerits');

      if (additiveTitle && additiveAlias && additiveBenefits && additiveDemerits) {
          if (result) {
              additiveTitle.textContent = `${result.name}`;
              additiveAlias.textContent = `${result.alias || 'なし'}`;
              additiveBenefits.textContent = `${result.benefits || '情報なし'}`;
              additiveDemerits.textContent = `${result.demerits || '情報なし'}`;
          } else {
              additiveTitle.textContent = '該当する添加物が見つかりませんでした。';
              additiveAlias.textContent = '';
              additiveBenefits.textContent = '';
              additiveDemerits.textContent = '';
          }

          // 検索ページを非表示にして結果ページを表示
          const searchPage = document.getElementById('search-page');
          const resultsPage = document.getElementById('results-page');

          if (searchPage && resultsPage) {
              searchPage.style.display = 'none';
              resultsPage.style.display = 'block';

              // 結果ページをトップにスクロール
              window.scrollTo(0, 0);
          }
      } else {
          console.error('検索結果の表示用要素が見つかりませんでした。');
      }
  }
});
