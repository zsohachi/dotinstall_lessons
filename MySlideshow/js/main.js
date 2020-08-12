'use strict'

{
    const images = [
        'img/pic00.png',
        'img/pic01.png',
        'img/pic02.png',
        'img/pic03.png',
        'img/pic04.png',
        'img/pic05.png',
        'img/pic06.png',
        'img/pic07.png',
    ];

    let currentIndex = 0;

    // #main の img を取得
    const mainImage = document.getElementById('main');
    // #main の src属性を追加
    mainImage.src = images[currentIndex];

    // サムネイルのセット

    // これは forEach() の機能なのですが、 forEach() のこちらで渡す引数を 2 つにすると、
    // この配列の中でこの image が何番目であるかを 2 番目の引数である index で表現できるようになるので、
    // それを処理で使っていきたいと思います。
    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;

        const li = document.createElement('li');
        // image が何番目であるかの index が currentIndex と同じだったら 
        // li に対して current クラスを付ける
        if(index === currentIndex){
            li.classList.add('current');
        }

        // サムネイルをクリックしたら、メインのほうにその画像が反映されるようにする
        li.addEventListener('click', () =>{
            mainImage.src = image;

            // サムネイルをクリックしたときに、current クラスも移動させる
            // 現在 current クラスがついている li 要素から current クラスを取り除く
            const thumbnails = document.querySelectorAll('.thumbnails > li');
            thumbnails[currentIndex].classList.remove('current');
            currentIndex = index;

            // thumbnails の更新された currentIndex 番目に対して current クラスを付ける
            thumbnails[currentIndex].classList.add('current');

        });

        li.appendChild(img);
        document.querySelector('.thumbnails').appendChild(li);
    });


    // next ボタン
    const next = document.getElementById('next');
    next.addEventListener('click', () => {
        // 何番目のサムネイルかを指定してあげればいいのですが、
        // とりあえず target 番目としてあげて、target に対して、次のサムネイルなので
        // currentIndex に 1 を足した数字を代入
        let target = currentIndex + 1;
        // 最後まできたところでクリックしたら最初に戻す
        if(target === images.length){
            target = 0;
            // targetに再代入するのでtargetをletにする
        }
        // 要素に対して click() というメソッドを呼んであげれば、
        // その要素がクリックされた時の処理を実行してくれます。
        document.querySelectorAll('.thumbnails > li')[target].click();
    })

    // prev ボタン
    const prev = document.getElementById('prev');
    prev.addEventListener('click', () => {
        let target = currentIndex - 1;
        // target が最初の要素より前にきたら、つまり 0 より小さくなったら最後に飛ばす
        if(target < 0){
            // 最後は images.length - 1で指定できる
            target = images.length -1;
        }
        document.querySelectorAll('.thumbnails > li')[target].click();
    })

    // clearTimeout() には setTimeout() の返り値が必要なのですが、
    // それを管理するために変数が必要なので、このあたりで timeoutId という変数を宣言
    let timeoutId;

    // 一定時間ごとに画像を次のものに差し替える処理
    function playSlideshow(){
        // まずは次の画像にいきたいので、 next をクリックしたときと同じ処理をするように 
        // next.click() とする
        // 画像を切り替えるこちらの next.click() の処理は、 
        // Play ボタンを押した 1 秒後に実行されるほうが自然かと思うので、 
        // 下に移動させる
        // next.click();
        // これを一定時間ごとにくり返せば良いので setTimeout() を使う
        // 1秒ごと、1000ミリ秒で指定
        timeoutId = setTimeout(() => {
        // timeoutId で setTimeout() の返り値を受け取って、 clearTimeout() に渡す
            next.click();
            playSlideshow();
        }, 1000);
    }

    // Pause
    // Play ボタンを押すと、スライドショーが始まるのと同時に、テキストが Pause に変わるようにする
    let isPlaying = false;

    // play ボタン
    const play = document.getElementById('play');
    play.addEventListener('click', () => {
        // Play ボタンがクリックされたときに isPlaying が false だったら再生が始まる
        if(isPlaying === false){
            // 一定時間ごとに画像を次のものに差し替える処理
            playSlideshow();
            play.textContent = 'Pause';
        } else {
            // setTimeout() で始めたスライドショーを止めたいので clearTimeout() を使う
            // timeoutId で setTimeout() の返り値を受け取って、 clearTimeout() に渡す
            clearTimeout(timeoutId);
            play.textContent = 'Play';
        }

        // Pause を押したらスライドショーが停止して、テキストが Play に戻るようにする
        // 否定の演算子を使って値を反転させる
        isPlaying = !isPlaying;
    });


}