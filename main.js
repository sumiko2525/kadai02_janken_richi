// main.js の内容

window.addEventListener('DOMContentLoaded', () => {
  // ② を非表示、① を表示（既にデフォルトなら不要）
  document.getElementById("bear-logo").style.display = 'block';
  document.getElementById("container").style.display = 'none';

  // 2秒後にロゴを消してメインを表示
  setTimeout(() => {
    document.getElementById("bear-logo").style.display = 'none';
    document.getElementById("container").style.display = 'block';
  }, 2000); // 2000ミリ秒＝2秒
});

// HTML 要素を JavaScript から参照（借りてくる）
// くまちゃん画像の <img id="bear"> 要素
const bearImg = document.getElementById('bear');
// 吹き出しの <div id="speech"> 要素
const speech = document.getElementById('speech');
// 勝敗結果を表示する <div id="result"> 要素
const resultDiv = document.getElementById('result');

const winCountEl  = document.getElementById('win-count');
const loseCountEl = document.getElementById('lose-count');
const rateEl      = document.getElementById('win-rate');
 
const potsDiv     = document.getElementById('honey-pots');

let rounds    = 0;
let winCount  = 0;
let loseCount = 0;

// じゃんけんの手を表す配列
// インデックス 0 → "goo", 1 → "choki", 2 → "paa"
const hands = ['goo', 'choki', 'paa'];
// 吹き出しに表示する日本語ラベル
const labels = ['ぐー！', 'ちょき！', 'ぱー！'];

// ボタン（グー・チョキ・パー）をすべて取得して、クリック時に処理を登録
document.querySelectorAll('.buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    // クリックされたボタンの data-hand 属性の値を数値化
    // 0,1,2 のいずれか（ユーザーの選択）
    const user = Number(btn.dataset.hand);

    // コンピュータの手をランダムに決定（0〜2）
    const comp = Math.floor(Math.random() * 3);

    // くまちゃんの画像ファイルを切り替え
    // bear_goo.png, bear_choki.png, bear_paa.png のいずれか
    bearImg.src = `images/bear_${hands[comp]}.png`;

    // 吹き出しに対応するラベル（ぐー！/ちょき！/ぱー！）をセット
    speech.textContent = labels[comp];
    // CSS の .show クラスを付与して、表示アニメーション
    speech.classList.add('show');
    // 800ms 後に .show を外して非表示に戻す
    setTimeout(() => speech.classList.remove('show'), 800);

    // 勝敗判定ロジック
    // (user - comp + 3) % 3 で結果を 0,1,2 のいずれかにまとめる
    const diff = (user - comp + 3) % 3;
    let message;
    if (diff === 0)
      message = 'あいこ！';
    else if (diff === 1)
      message = 'くまちゃんの勝ち！🎉';
    else
      message = 'あなたの勝ち🐻';

    // 判定結果を画面に表示
    resultDiv.textContent = message;

    // クリックされたら…
    if (rounds >= 10) return;  // 10回以降は無視

    // …勝敗判定後に…
    if (diff === 1) winCount++;
    else if (diff === 2) loseCount++;



rounds++;
updateStats();  // ← 追加

    function updateStats() {
  winCountEl.textContent  = winCount;
  loseCountEl.textContent = loseCount;
  const rate = Math.round((winCount / rounds) * 100) || 0;
  rateEl.textContent      = rate;

  // 例：勝率10%ごとにポット1個
  const pots = Math.floor(rate / 10);
  renderPots(pots);
}

function renderPots(n) {
  potsDiv.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const img = document.createElement('img');
    img.src = 'images/honey_pot.png';
    img.alt = 'はちみつポット';
    potsDiv.appendChild(img);
  }
}

  });
});


