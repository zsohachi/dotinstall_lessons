'use strict'

{

    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    // startTime はブロックの外でも使っていくので、外でも宣言する
    // 再代入していくので let
    let startTime;
    // タイムアウト用の id 
    let timeoutId;
    // タイマーが走っていた時間を保持
    let elapsedTime = 0;

    function countUp(){
        // console.log(Date.now() - startTime);

            // ミリ秒なので、分や秒にしてわかりやすく
            const d = new Date(Date.now() - startTime + elapsedTime);
            const m = String(d.getMinutes()).padStart(2, '0');
            const s = String(d.getSeconds()).padStart(2,'0');
            const ms = String(d.getMilliseconds()).padStart(3,'0');
            timer.textContent = `${m}:${s}.${ms}`;

        // setTimeout() を使って 10 ミリ秒後にこの countUp() 自身を呼び出す
        timeoutId = setTimeout(() => {
            countUp();
        }, 10);
        // 10 ミリ秒後にこちらの処理が走るので、この countUp() のなかでも console.log() が呼ばれて、結果として 10 ミリ秒ごとに現在時刻と startTime の差が表示されていく
    
    }

    // ストップウォッチのボタンの状態
    // Initial
    // start 有効
    // stop 無効
    // reset 無効

    // Running
    // start 無効
    // stop 有効
    // reset 無効

    // Stopped
    // start 有効
    // stop 無効
    // reset　有効


    // 有効 .disabled=false
    // 無効 .disabled=true

    // button 要素で作っていたときにはコードで適宜無効化できていたが、 
    // div 要素を使う場合には disabled プロパティを使うことができません。
    // クラスを付けたり外したりすることでスタイルを付けながら制御していきましょう。
    // inactiveクラスで設定

    // Initial
    function setButtonStateInitial(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.add('inactive');
    }

    // Running
    function setButtonStateRunning(){
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        reset.classList.add('inactive');
    }

    // Stopped
    function setButtonStateStopped(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');
    }


    // ページ読み込み時にInitialを読み込む
    setButtonStateInitial();


    start.addEventListener('click',() => {
        // ボタンに inactive クラスがついていたらそれぞれの処理をしないようにしてあげましょう。
        // Start の classList に inactive が含まれていたら
        // それ以降の処理をしたくないので return;
        if(start.classList.contains('inactive') === true){
            return;
        }
        
        // startが押されたときにRunningを読み込む
        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });

    // ストップ
    stop.addEventListener('click',() => {
        // Stop の classList に inactive が含まれていたら
        // それ以降の処理をしたくないので return;
        if(stop.classList.contains('inactive') === true){
            return;
        }

        // stopが押されたときにStoppedを読み込む
        setButtonStateStopped();

        // タイムアウト用の id が必要
        clearTimeout(timeoutId);

        // elapsedTime = タイマーが走っていた時間を保持
        // Stop をクリックした時刻を Date.now() 
        // Start をクリックした時刻は startTime
        elapsedTime += Date.now() - startTime;
        // elapsedTime が直近のタイマーが走っていた時間しか保持していないからなので、
        // += としてあげてタイマーが走っていた時間を全て足し上げるようにしてあげましょう

    });

    // リセット
    reset.addEventListener('click', () => {
        // Reset の classList に inactive が含まれていたら
        // それ以降の処理をしたくないので return;
        if(reset.classList.contains('inactive') === true){
            return;
        }

        // resetが押されたときにInitialを読み込む
        setButtonStateInitial();

        timer.textContent = '00:00:000';

        // Stop してから Reset を押して、また Start すると前回 Stop した状態から始まってしまう
        // elapesedTimeをリセット
        elapsedTime = 0;
    });

}





