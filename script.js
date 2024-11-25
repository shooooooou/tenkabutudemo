/* styles.css */

/* ベースのスタイル */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  color: #333;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* コンテナのスタイル */
.container {
  max-width: 400px;
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

/* ヘッダーとタイトルのデザイン */
.header {
  margin-bottom: 20px;
}

.title {
  font-size: 1.8em; /* 少し小さくする */
  font-weight: bold;
  margin: 20px 0;
  color: #333;
  display: inline-block; /* アンダーライン用に幅を設定するためにインラインブロックに */
}

/* ロゴのデザイン */
.logo {
  margin-bottom: 20px;
  animation: logoMove 4s infinite ease-in-out; /* アニメーションの追加 */
}

.logo img {
  width: 40px;
  height: auto;
}

/* ロゴアニメーションの定義 */
@keyframes logoMove {
  0% {
    transform: translateX(-100%);
    width:50%;
    opacity: 0; /* 左端で透明度0% */
  }
  25% {
    transform: translateX(0);
    width:100%;
    opacity: 1; /* 中央で透明度100% */
  }
  50% {
    transform: translateX(100%);
    width:50%;
    opacity: 0; /* 右端で透明度0% */
  }
  75% {
    transform: translateX(0);
     width:100%;
    opacity: 1; /* 中央で透明度100% */
  }
  100% {
    transform: translateX(-100%);
    width:50%;
    opacity: 0; /* 左端に戻って透明度0% */
  }
}

/* 検索フォームのスタイル */
#search-form {
  width: 100%;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 1em;
  margin-bottom: 5px;
  color: #555;
}

.form-group input[type="text"] {
  width: 100%;
  padding: 12px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #fff;
  transition: border-color 0.3s;
}

.form-group input[type="text"]:focus {
  border-color: #78C4A0;
  outline: none;
}

/* 検索ボタンのスタイル */
.search-button {
  width: 100%;
  padding: 15px;
  font-size: 1em;
  background-color: #78C4A0;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}

.search-button:hover {
  background-color: #66b08c;
}

.search-button:active {
  transform: scale(0.98);
}

/* レスポンシブデザイン */
@media (min-width: 600px) {
  h1 {
    font-size: 2.5em;
  }

  .search-button {
    width: auto;
    padding: 15px 30px;
  }
}

/* 2ページ目の検索結果ページのスタイル */
.results-header {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #66b08c;
  padding: 10px;
  margin-bottom: 20px;
  position: relative;
  height: 40px;
}

.back-button {
  position: absolute;
  left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.back-button img {
  width: 30px;
  height: 30px;
}

.results-title {
  font-size: 1em;
  font-weight: bold;
  color: #fff;
  margin: 0;
  text-align: center;
  flex-grow: 1;
}


.result-card {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.additive-title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
  text-decoration: underline;
}

.additive-info {
  text-align: left;
  font-size: 1em;
  margin-bottom: 10px;
}

.additional-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.merit{
  color: #d63f03;
}

.demerit{
  color: #002fb0;
}

.info-item {
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: #f5f5f5;
  box-sizing: border-box;
}

.info-icon {
  flex-shrink: 0;
  width: 20px; /* アイコンの幅を固定 */
  height: 20px;
  margin-right: 20px; /* テキストとの余白を設定 */
}

.info-text-container {
  width: 100%;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  align-items: right;
  background-color: #f9f9f9;
  box-sizing: border-box;
}


.info-text {
  font-size: 1em;
  font-weight: bold;
  color: #555;
}
