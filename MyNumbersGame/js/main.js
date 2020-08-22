'use strict'

{
    // パネルを作るクラス
    class Panel{
        // Gameクラスのインスタンスをgameで受け取る
        constructor(game){
            this.game = game;
            this.el = document.createElement('li');
            // ゲーム開始時はボタンが押された状態なのでpressedをつける
            this.el.classList.add('pressed');

            // li 要素にイベントを設定
            this.el.addEventListener('click', () =>{
                this.check();
            });
        }

        // setupクラスからアクセスするためのメソッド化
        // オブジェクト思考のカプセル化
        getEl(){
            return this.el;
        }

        // panelクラスのactivateメソッド
        activate(num){
            // pressedクラスを外す
            this.el.classList.remove('pressed');
            // li 要素に num をセットしたいので、 textContent を num で設定
            this.el.textContent = num;
        }

        check(){
            // currentNum と押し込んだパネルの数値が合っているか比較
            // this.el.textContent は文字列なので、 parseInt() で数値にしてあげて、比較する。
            // Gameクラスのインスタンスが使えるようになったので書き換え
            // if(currentNum === parseInt(this.el.textContent, 10)){
            
            // if(this.game.currentNum === parseInt(this.el.textContent, 10)){
            // この書き方はプロパティに直接アクセスする形になるので好ましくない
            // メソッド経由でアクセスする
            // getCurrentNum()メソッドを作成
            if(this.game.getCurrentNum() === parseInt(this.el.textContent, 10)){
                // もし一致していたら、つまり正解だったら、押し込まれる
                // pressed クラスを付ける
                this.el.classList.add('pressed');
                // 次の数値を選べるように currentNum を 1 増やす
                // currentNum++;

                // Gameクラスのインスタンスが使えるようになったので
                // addCurrentNum()メソッドに書き換え
                this.game.addCurrentNum();

                // タイマーを止める
                // 全部パネルを押し込んだときに止めればいいので、 
                // check() の中で currentNum を更新したあとに、条件分岐する
                // currentNum が 4 だったらタイマーを止めればいいので 
                // clearTimeout() としてあげて timeoutId を渡す
                // if(currentNum === 4){

                // Gameクラスのインスタンスが使えるようになったので
                // getCurrentNum()メソッドに書き換え
                // if(this.game.getCurrentNum() === 4){        
                
                // GameクラスのgetLevelメソッドを使うことにしたので書き換え
                if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
                    // clearTimeout(timeoutId);
                    
                    // Gameクラスのインスタンスが使えるようになったので
                    // getTimeoutId()メソッドに書き換え
                    clearTimeout(this.game.getTimeoutId());
                }
            }
        }
    }

    // パネルを管理するクラス
    class Board{
        // Gameクラスのインスタンスを受け取る
        // gameという名前で受け取る
        constructor(game){
            // gameをPanelクラスに渡す
            // this.gameに対してgameを渡す
            this.game = game;
            // パネルを管理したいので、とりあえずプロパティで配列として持っておく
            this.panels = [];
            // パネルを 4 枚作りたいので、ループで回す
            // for(let i = 0; i < 4; i++){
            
            // GameクラスのgetLevelメソッドを使うことにしたので書き換え
            // level数値の２乗
            for (let i = 0; i < this.game.getLevel() ** 2; i++) {
                // pushでパネルを作る
                // Panelクラスを作るときにthis.gameを渡す
                // これでGameクラスのインスタンスをBoardクラス経由でPanelクラスに渡せる
                this.panels.push(new Panel(this.game));
            }
            // パネルを 4 つをページに追加 メソッドにまとめる
            this.setup();
        }

        // setupメソッド
        setup(){
            // setup() の中でしか使わないので、プロパティにする必要はなくて const で定数で宣言
            const board = document.getElementById('board');
            this.panels.forEach(panel => {
                // board.appendChild(panel.el);
                // 今回追加するのは li 要素なので、 
                // panel の el プロパティを追加してあげればよいのですけれども、
                // 実はクラスのプロパティに外部から直接アクセスしないほうがよいとされているので、
                // こちらのプロパティはメソッド経由で取得するようにしてあげたほうがいいでしょう。
                board.appendChild(panel.getEl());
            });
        }

        // ボタンをクリックしたらゲームが始まる
        // パネルから pressed クラスを外して、数値を配置する
        activate(){
            // 数値をランダムにする
            // const nums = [0, 1, 2, 3];

            // GameクラスのgetLevelメソッドを使うことにしたので書き換え
            const nums = [];
            for(let i = 0; i < this.game.getLevel() ** 2; i++){
                nums.push(i);
            }

            // それぞれのパネルに対して、処理をしたいので forEach() で回す
            this.panels.forEach(panel => {
                // numsからランダムに取り出す　spliceで
                // splice() の返り値はひとつでも配列になるので、 [0] を付けて中身を取り出してあげる必要がある
                const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
                // panel のほうにも activate するという意味で、同名のメソッドを作る
                panel.activate(num);
            });
        }
    }

    // runtimerもメソッドにしてGameクラスの中に入れる
    // タイマーを走らせる
    // function runTimer(){
    //     const timer = document.getElementById('timer');
    //     // 現在の時刻から START ボタンを押したときの時刻を引いてあげるのですが、
    //     // ミリ秒単位なので 1000 で割ってあげて、小数点以下 2 桁までを表示するために toFixed() を使う
    //     timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2);

    //     // setTimeout() で この runTimer() 自身を呼び出していけばいいので、 10 ミリ秒後に呼び出す
    //     timeoutId = setTimeout(() => {
    //         runTimer();
    //     },10);
    // }


    // ゲーム全体に関する処理も Game というクラスにまとめる
    class Game{
        constructor(level){
            // 難易度の数値をlevelプロパティで受け取る
            this.level = level;

            // パネルクラスのインスタンス
            // const board = new Board();

            // // ボタンを 0 からクリックすることで、押し込んでいけるようにする
            // // 今押し込むべき数値を currentNum で保持
            // // let currentNum = 0;

            // // START ボタンを押して 0, 1 としたあとに、また START ボタンを押して 0 を押そうとすると、うまく押せない
            // // currentNum をリセットしていないから
            // // したがって、 currentNum は START ボタンを押すたびにリセットされるべきなので、こちらは宣言だけにしてあげて、
            // //  START ボタンを押したときに currentNum は 0 になるようにする
            // let currentNum;

            // // タイマー処理
            // let startTime;

            // // 全てのパネルを押したらタイマーが止まるようにする
            // let timeoutId;

            // このあたりをGameくらすのプロパティにする
            // 値が決まっていないものに関しては undefinedにする

            // BoardクラスのコンストラクターにGameクラスのインスタンスを渡す
            // thisで渡す
            this.board = new Board(this);
            this.currentNum = undefined;
            this.startTime = undefined;
            this.timeoutId = undefined;

            // ボタンをクリックしたらゲームが始まる
            const btn = document.getElementById('btn');
            btn.addEventListener('click', () =>{

                // // START ボタンを何度かクリックしたあとにクリアしても、タイマーが止まらない問題の対処
                // // ボタンを押すたびにタイマーが走ってしまうから
                // // START ボタンを押したときに timeoutId を調べる
                // // もし timeoutId が undefined でなければ、つまりすでにタイマーが走っていたら、それを止める
                // if(typeof timeoutId !== 'undefined'){
                //     clearTimeout(timeoutId);
                // }
                // //  START ボタンを押したときに currentNum は 0 になるようにする
                // currentNum = 0;

                // board.activate();

                // // ボタンを押したときの時刻を保持しておいて、タイマーを更新
                // startTime = Date.now();
                // // タイマーを走らせる
                // runTimer();

                // このあたりの処理をstart()メソッドにまとめる
                this.start();
            });

            this.setup();
        }

        // container の幅を動的に変更
        setup(){
            const container = document.getElementById('container');
                // 50px * 2 + 10px * 2
                // containerのwith算出式
                // container.style.width = 50 * this.level + 10 * 2 + 'px';

            // 50と10を定数化
            const PANEL_WIDTH = 50;
            const BOARD_PADDING = 10;
            container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
        }

        start(){
            // プロパティやメソッドには this をつける必要があるのでつける
               if(typeof this.timeoutId !== 'undefined'){
                    clearTimeout(this.timeoutId);
                }

                this.currentNum = 0;
                this.board.activate();

                this.startTime = Date.now();
                this.runTimer();
        }

        // runTimer() もメソッドにする
        // メソッドなのでfunctionはいらない
        runTimer(){
            const timer = document.getElementById('timer');
            // 現在の時刻から START ボタンを押したときの時刻を引いてあげるのですが、
            // ミリ秒単位なので 1000 で割ってあげて、小数点以下 2 桁までを表示するために toFixed() を使う
            timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
    
            // setTimeout() で この runTimer() 自身を呼び出していけばいいので、 10 ミリ秒後に呼び出す
            this.timeoutId = setTimeout(() => {
                this.runTimer();
            },10);
        }

        // Gameクラスのインスタンスが使えるようになったので
        // メソッドを作成
        addCurrentNum(){
            this.currentNum++;
        }

        getCurrentNum(){
            return this.currentNum;
        }

        getTimeoutId(){
            return this.timeoutId;
        }

        // Boardクラスのパネルの数やnumsの数値をいじることになるが、
        // 直接プロパティにアクセスするのは好ましくないので
        // getLevelメソッドを作成
        getLevel(){
            return this.level;
        }

    }

    // constructor() を実行していきたいので、インスタンスを作るために new Game(); 
    // new Game() に数値を渡すことで、ゲームの難易度をコントロールする仕様に
    new Game(5);

    // 2 x 2 なら 2を入力
    // コンストラクターでこの2を受け取る
}

