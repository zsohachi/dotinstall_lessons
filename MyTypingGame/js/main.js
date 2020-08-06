'use strict'

{

    // 複数の単語をセット
    const words = [
        'apple',
        'sky',
        'blue',
        'set',
    ]
    

    
    // // wordの中から単語をランダムに選ぶ
    // let word = words[Math.floor(Math.random() * words.length)];

    // // 打つべき文字のインデックス
    // // 今何番目の文字を打つべきかを loc
    // // loc はあとで値を再代入していくので let で宣言
    // let loc = 0;

    // // 結果を示す変数
    // let score = 0;
    // let miss = 0;

    // 上の初期化処理はゲーム開始時にも呼ばれるので変数宣言のみに変更
    let word;
    let loc;
    let score;
    let miss;


    // タイマー処理
    // 3秒で設定　3ミリ秒x1000
    const timeLimit = 3 * 1000;
    // ゲーム開始時刻を保持
    let startTime;

    // ゲームが始まっているかどうかを管理
    let isPlaying = false;

    const target = document.getElementById('target');

    // score や miss を表示するための要素を取得
    const scoreLabel = document.getElementById('score');
    const missLabel = document.getElementById('miss');
    // timer を取得
    const timerLabel = document.getElementById('timer');


    // 正解した場合に _ に変える
    function updateTarget(){
        // 最初から loc 番目までを _ で埋める

        // _ を格納していくための 変数
        let placeholder = '';

        // loc と同じ数の _ を placeholder に連結
        for(let i = 0; i < loc; i++){
            placeholder += '_';
        }
        // target を更新
        // placeholder 以降に関しては word のインデックスが loc 番目以降の文字を表示したいので、
        // 部分文字列を取得するための substring() というメソッドを使ってあげます。
        target.textContent = placeholder + word.substring(loc);
        // substring() に引数をひとつだけ渡してあげると、その位置から最後までの部分文字列を返してくれる
        // loc 以降の文字を表示

    }

    // 残り時間を表示するための関数
    function updateTimer(){
        // 残り時間を計算
        // ゲームが始まった時刻に制限時間を足して、そこから現在の時刻を引いてあげれば算出できる
        const timeLeft = startTime + timeLimit - Date.now();
        // 表示するときは秒単位にしたいので、timeLeft を1000 で割ってあげて、
        // さらに小数点以下を 2 桁まで表示したいので toFixed() を使う
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);

        // 残り時間のカウントダウン
        // 残り時間は 0.01 秒の単位まで表示することにしたので、 
        // 10 ミリ秒後にこの updateTimer() の処理を呼んでね、としてあげれば
        // 結果的に updateTimer() の中でまた setTimeout() が呼ばれるので、くり返し処理が行われる
        const timeoutId = setTimeout(() => {
            updateTimer();
        }, 10);

        // 残り時間が 0 より小さくなったときにはゲームを終了させる
        if(timeLeft < 0){
            // ゲーム終了
            isPlaying = false;
            // キャンセルするには setTimeout() の返り値を使う
            //  timeoutId という定数名で受け取って、 clearTimeout() に渡す
            clearTimeout(timeoutId);

            // アラートを出す前に timerLabel.textContent を 0.00だとできない
            timerLabel.textContent = '0.00';
            // ブラウザの仕様によってこちらのアラートの処理が終わるまで画面描画処理がブロックされてしまうことが原因

            // // これを防ぐには、アラートの処理を少し遅らせてしまえば良いので setTimeout() を使う
            setTimeout(() => {
                // 残り時間0になったらゲームオーバー表示
                // alert('Game Over');

                // 結果表示に変更
                showResult();
            }, 100);

            // リプレイ
            target.textContent = 'click to replay';

        }
    }

    // 結果表示の関数
    function showResult(){
        // どれだけ正確に打てたか
        const accuracy = score / (score + miss) * 100;
        alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)} % accuracy`);
    }

    // スタートの処理
    // ウインドウでクリックしたらwordを表示
    window.addEventListener('click',() => {
        // ゲームがすでに始まっているときは updateTimer() が走らないようにする
        if(isPlaying === true){
            return;
        }
        
        isPlaying = true;

        // リプレイ時の値リセット処理
        loc = 0;
        score = 0;
        miss = 0;
        scoreLabel.textContent = score;
        missLabel.textContent = miss;
        word = words[Math.floor(Math.random() * words.length)];


        target.textContent = word;
        // スタートしたときの時間を保持
        startTime = Date.now();
        // 残り時間を表示するための関数
        updateTimer();
    });

    // window.addEventListener('keydown', (e) =>{
    // アロー関数を書くときに引数がひとつだけだったら、 () は省略できるのでこのように書いてあげても OK です。
    window.addEventListener('keydown', e =>{
        // console.log(e.key);

        // ゲームが始まっていない状態で何らかの文字を打つと、
        // miss としてカウントされてしまったり、正解として処理が進んでしまったりします。

        // keydown のイベントで isPlaying が true ではなかったら、
        // つまりゲームが始まっていなかったら以降の処理をしたくないので return;
        if(isPlaying !== true){
            return;
        }

        // word の loc 番目の文字がタイプされた、こちらの e.key と同じかどうかをここで判定
        // word の loc 番目の文字アクセス
        if(e.key === word[loc]){
            // console.log('score');

            // 正解だったときは次の文字に進めたいので loc を 1 つ増やす
            loc++;

            // 次の単語にいく処理
            // キーを打っていって loc を更新したあとに、
            // もし loc が今打つべき単語 word の文字数と一緒になったら次の単語にいくタイミングなので、 
            // if 文
            if(loc === word.length){
                word = words[Math.floor(Math.random() * words.length)];
                loc = 0;
            }

            // 正解した場合に _ に変える
            updateTarget();

            // 正解したときに score を増やす
            score++;
            scoreLabel.textContent = score;
        } else {
            // console.log('miss');
            miss++;
            missLabel.textContent = miss;
        }
    });


}