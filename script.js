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

    const firsts = document.querySelectorAll('.icon-first');
    firsts.forEach(first => {
        first.src = getRandomIconUrl();
    });
  
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
  
            // データ取得後に検索フォームのイベントリスナーを設定
            const searchForm = document.getElementById('search-form');
            if (searchForm) {
                searchForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    const additiveName = document.getElementById('additive-name').value.trim();
                    if (additiveName) {
                        displayResults(additiveName);
                    } else {
                        alert('添加物名を入力してください。');
                    }
                });
            }
        })
        .catch(error => {
            console.error('添加物データの取得エラー:', error);
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
        const inputName = additiveName.toLowerCase().trim();
  
        // 部分一致で添加物を検索
        const result = additivesData.find(item => {
            return item.name.toLowerCase().includes(inputName) ||
                   (item.alias1 && item.alias1.toLowerCase().includes(inputName)) ||
                   (item.alias2 && item.alias2.toLowerCase().includes(inputName)) ||
                   (item.alias3 && item.alias3.toLowerCase().includes(inputName)) ||
                   (item.alias4 && item.alias4.toLowerCase().includes(inputName)) ||
                   (item.alias5 && item.alias5.toLowerCase().includes(inputName)) ||
                   (item.alias6 && item.alias6.toLowerCase().includes(inputName)) ||
                   (item.alias7 && item.alias7.toLowerCase().includes(inputName)) ||
                   (item.alias8 && item.alias8.toLowerCase().includes(inputName)) ||
                   (item.alias9 && item.alias9.toLowerCase().includes(inputName)) ||
                   (item.alias10 && item.alias10.toLowerCase().includes(inputName));
        });
  
        // 結果を確認するためのログ
        console.log("検索結果:", result);
  
        // 結果表示用の要素を取得
        const additiveTitle = document.getElementById('additive-title');
        const additiveBenefits = document.getElementById('additive-benefits');
        const additiveDemerits = document.getElementById('additive-demerits');
        const additiveReferences = document.getElementById('additive-references');
        const additiveAliasElements = [];
        for (let i = 1; i <= 10; i++) {
            additiveAliasElements.push(document.getElementById(`additive-alias${i}`));
        }
  
        if (additiveTitle && additiveBenefits && additiveDemerits && additiveReferences && additiveAliasElements.every(el => el !== null)) {
            if (result) {
                additiveTitle.textContent = result.name || '情報なし';
  
                // メリットの表示（リスト形式）
                if (Array.isArray(result.benefits)) {
                    additiveBenefits.innerHTML = '';
                    result.benefits.forEach(benefit => {
                        const benefitItem = document.createElement('li');
                        benefitItem.textContent = `${benefit}`;
                        additiveBenefits.appendChild(benefitItem);
                    });
                } else {
                    additiveBenefits.textContent = result.benefits || '情報なし';
                }
  
                // デメリットの表示（リスト形式）
                if (Array.isArray(result.demerits)) {
                    additiveDemerits.innerHTML = '';
                    result.demerits.forEach(demerit => {
                        const demeritItem = document.createElement('li');
                        demeritItem.textContent = `${demerit}`;
                        additiveDemerits.appendChild(demeritItem);
                    });
                } else {
                    additiveDemerits.textContent = result.demerits || '情報なし';
                }

                //参考の表示（リスト形式）
                if (Array.isArray(result.references)) {
                    additiveReferences.innerHTML = '';
                    result.references.forEach(reference => {
                        const referenceItem = document.createElement('li');
                        referenceItem.textContent = `${reference}`;
                        additiveReferences.appendChild(referenceItem);
                    });
                } else {
                    additiveReferences.textContent = result.references || '情報なし';
                }
  
                // alias の表示
                for (let i = 1; i <= 10; i++) {
                    const aliasKey = `alias${i}`;
                    additiveAliasElements[i - 1].textContent = result[aliasKey] || 'なし';
                }
            } else {
                additiveTitle.textContent = '該当する添加物が見つかりませんでした。';
                additiveBenefits.textContent = '';
                additiveDemerits.textContent = '';
                additiveReferences.textContent = '';
                additiveAliasElements.forEach(el => el.textContent = 'なし');
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
