'use strict'

{

    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    // クイズが出題される順番もシャッフル
    // quizSet に代入する手前で、この配列 shuffle() に入れる 
    const quizSet = shuffle([
        // 問題文　キー: q
        // 回答選択肢　キー: c 配列
        // 正解が必ず最初の要素、インデックスが 0 番目の要素になるようなルール
        {q: '世界で一番大きな湖は？', c: ['カスピ海','カリブ海','琵琶湖'] },
        {q: '2の8乗は？', c: ['256','64','128'] },
        {q: '次のうち、最初にリリースされた言語は？', c: ['Python','JavaScript','HTML'] },
    ]);

    // 今何問目のクイズを解いているか
    let currentNum = 0;

    // 一度回答したあとに他の選択肢も選べないようにする
    let isAnswered;

    // 正答数の管理
    let score = 0;


    // シャッフル
    function shuffle(arr){
        // ランダムに選ぶ範囲の終点のインデックス
        // let i =  arr.length - 1;

        // i が 最後の要素のインデックスである状態から始めたいので、
        // まずはこちらをカットしてこちらに入れてあげつつ、 
        // i が 0 より大きい間 i を 1 ずつ減らしながら処理してあげる、
        // とすれば前回見たようなアルゴリズムを実現できるかと思います。
        
        // i を 1 ずつ前にずらしながらループ処理
        for(let i =  arr.length - 1; i >0; i--){
            // 範囲の中からランダムに選ぶ要素のインデックス
            const j = Math.floor(Math.random() * (i + 1));
            // arr[i] と arr[j] を分割代入で入れ替える
            [arr[j],arr[i]] = [arr[i],arr[j]] 
        }
        return arr;
    }

    // 正誤判定処理
    function checkAnswer(li){
        // 一度回答したあとに他の選択肢も選べないようにする
            // if(isAnswered === true){
        // 省略形
        if(isAnswered){
            return;
        }
        isAnswered = true;
        // li 要素の textContent が正解かどうかを調べる
        // 正解は quizSet の currentNum 番目の c の最初の要素、つまり 0 番目と一緒だったら正解になります
        if(li.textContent === quizSet[currentNum].c[0]){
            // console.log('correct');
            li.classList.add('correct');

            // 正答数を増やす
            score++;
        } else {
            // console.log('wrong');
            li.classList.add('wrong');
        }

        // Next を押すと次の質問に進めるようにする
        // 選択肢を選んだら、のボタンから disabled クラスを外して青いボタンになるようにする
        btn.classList.remove('disabled');
    }

    // 画面描画の処理をまとめる
    function setQuiz(){
        // 一度回答したあとに他の選択肢も選べないようにする
        isAnswered = false;

        // 問題データを入れる
        question.textContent = quizSet[currentNum].q;

        // Nextボタンを押した後、前の問題の選択肢が残ってしまうことの対策
        // 一度全部の選択肢を消す
        // choices の最初の子要素がある限り choices の最初の子要素を消す
        while(choices.firstChild){
            choices.removeChild(choices.firstChild);
        }
        // while ですが、このように () の中に単一のオブジェクトを入れる場合、それが false や null でない限り、こちらの {} （ブロック）の中の処理をくり返してくれます。
        // なので、このように書くと choices.firstChild の値が null になるまでループが回って、結果的に choices の子要素が全て消えてくれるはずです。

        // 選択肢をシャッフルして定数に代入
        // 選択肢がシャッフルされるのと同時に Console に表示した元の選択肢もシャッフルされてしまっています。
        // 配列やオブジェクトを引数にすると、値のコピーが関数に渡されるのではなくて参照が渡されるので、渡した引数を関数の中で書き換えてしまうと、引数にした大元の配列も書き換えられてしまう
        // そうなると選択肢の最初の要素を正解にしていたのくずれてしまって、あとで正誤判定ができなくなってしまいます。   
        // const shuffledChoices = shuffle(quizSet[currentNum].c);
    
        // shuffledChoices で使うquizSet[currentNum].cだけをシャッフルしたい
        // quizSet[currentNum].cそのものは固定
    
        // shuffle() に渡すのは、 quizSet の配列の値のコピー
        // スプレッド演算子を使う
        // 配列の前に ... のように書くと、この配列の要素を展開してくれるのですが、
        // これを [] （大括弧）の中に書くことで新しい配列を作ることができます。
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        // console.log(quizSet[currentNum].c);
        shuffledChoices.forEach(choice =>{
            const li = document.createElement('li');
            li.textContent = choice;

            // 正誤判定 li をクリックしたときに実行されるようにする
            li.addEventListener('click', () => {
                checkAnswer(li);
            });

            choices.appendChild(li);
        });

        // 最後の問題のときにはボタンのテキストを Next ではなくて Show Score にする
        // setQuiz() のところで、もし currentNum が quizSet.length よりひとつ小さい値、つまり最後の問題だったら
        if(currentNum === quizSet.length - 1){
            btn.textContent = 'Show Score';
        }
    }

    setQuiz();

    // Next ボタンをクリックしたときの処理
    btn.addEventListener('click', () => {
        // 一度回答するとボタンが青くなるのですが、
        // そのあとの問題で回答していなくてもボタンが青いままなのを対策する
        // ボタンをクリックしたときに disabled クラスが付いていたら、そのあとの処理をしない
        if(btn.classList.contains('disabled')){
            return;
        }
        // btn をクリックして次の問題にいくときには btn をグレーに戻す
        btn.classList.add('disabled');

        // 最後の問題に答えたあとに、スコアが表示されるようにする
        if(currentNum === quizSet.length - 1){
            // console.log(`Score: ${score} / ${quizSet.length}`);
            scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
            // Show Score を押したときに、result 領域が出てくるようにする
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }

    });
}