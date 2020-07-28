'use strict'

console.clear();

{

    // 2020 年の 7月のカレンダーをまず作る
    // let year = 2020;
    // let month = 6; // 7月　JavaScript では、月は 0 から始まる


    // 今日の日付
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    
    
    
    
    
    
    // 今月１日
    // new Date(year, month, 1)
    // 前月末日
    // new Date(year, month, 0)

    // 前月末日を求める
    // d = new Date(year, month, 0).getDate()

    // 前月の日付個数 n をどう求めるか
    // 今月の 1 日が週の何日目にあたるか
    // getDay() 　日曜日が 0 、月曜日が 1 
    // 今月 1 日のオブジェクトを使って表現
    // new Date(year, month 1).getDay()
    // 前月残りの日の個数と一致する => n 
    // n = new Date(year, month, 1).getDay()


    // 前月取得
    function getCalendarHead(){
        const dates = [];
        // 前月末日を求める
        const d = new Date(year, month, 0).getDate();
        // 前月の残りの日の個数を求める
        const n = new Date(year, month, 1).getDay();
        // d から 1 日ずつさかのぼりつつ n 日分の日付が欲しい
        for(let i = 0; i < n; i++){
            // 30
            // 29,30
            // 28,29,30
            // ループを回す度に先頭に数値を入れていきたい unshift()
            // d - iで先頭にいれる数値が求められる
            dates.unshift({
                // dateはオブジェクト配列
                date: d - i,
                isToday: false,
                isDisabled: true,
            })

        }

        return dates;

    }



    // 翌月取得
    function getCalendarTail() {
        const dates = [];
        // month+1 翌月
        // 0 前月末日
        // 上２つ合わせて当月のことになる
        // getDay()　日付個数
        // 当月末日の曜日が何番目にくるか = 個数
        const lastDay = new Date(year, month + 1, 0).getDay();
        
        // 1 日から 6 日までの配列をループで作る
        // 末日が月曜日だったら 1 引いて、 1 から 6 に満たないまでのループ、
        // 火曜日だったら 2 引いて、 5 に満たないまでのループにしないといけない
        // lastDayとして上で求める    
        for (let i = 1; i < 7 - lastDay; i++) {
          dates.push({
            // オブジェクトにしたので他のプロパティも追加
            date: i,
            isToday: false,
            isDisabled: true,
          });
        }
    
        return dates;
      }


    // 日付部分
    // 今月分
    function getCalendarBody(){
        const dates = [];  // date: 日付  day: 曜日
        // JavaScript では date が日付、 day は曜日を意味する

        // datesに 1 日から末日までの日付を入れる
        // 末日は翌月 1日の 1日前という意味で、
        // 翌月の 0日目を指定することで、今月の末日を取得することができる
        const lastDate = new Date(year, month + 1, 0).getDate();

        for(let i = 1; i <= lastDate; i++){
            // date プロパティ 日付
            // isToday プロパティは today クラスをつけるかどうか、真偽値で保持
            // disabled プロパティ　前月翌月用　真偽値で保持
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });
        }

        // 今日の日付だけ isToday を true で上書き

        // year と month が今のものか調べる。
        // year が today の getFullYear() と同じ、かつ、 month が today の getMonth() と同じだったら、
        // 今日の日付を太字にする
        if(year === today.getFullYear() && month === today.getMonth()){

        // 今日の日付が dates の何番目の要素かですが、
        // インデックスが 0 から始まるので、今日が 27 日だったら 26 番目の要素になるので、
        //  -1 する 
        dates[today.getDate() - 1].isToday = true;

        }




        return dates;
    }


    function clearCalendar(){
        // createCalender() するたびに tbody の中身をクリア
        const tbody = document.querySelector('tbody');

        // tbody の最初の子要素がある限り、 tbody からその最初の子要素を削除する
        while(tbody.firstChild){
            tbody.removeChild(tbody.firstChild);
        }
    }


    function renderTitle(){
        // 年月部分の表示
        const title = `${year}/${String(month + 1).padStart(2, '0')}`; // 2 桁で表示してね、それに満たなかったら 0 の文字列で埋めてね
        // 月が 1 桁のときは最初に 0 を足す
        // padStart() 
        // padStart() は文字列にしか使えないので String() でいったん文字列にしてからpadStart() を使っていきます。
        
        document.getElementById('title').textContent = title;
    }


    function renderWeeks(){
        const dates = [
            // 全ての要素を 1 つの配列の中で展開して欲しいのでスプレッド構文を使う
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarTail(),
        ];

        // 週ごとの配列を作るための空の配列
        const weeks = [];
        // 何週あるか
        const weeksCount = dates.length / 7;

        // 週ごとの配列を作る
        for(let i = 0; i < weeksCount; i++){
            weeks.push(dates.splice(0, 7));
        }

        // console.log(weeks);

        // htmlに描画
        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td');

                td.textContent = date.date;
                // todayクラスとdisabledクラスを条件に応じてつける
                if(date.isToday){
                    td.classList.add('today');
                }
                if(date.isDisabled){
                    td.classList.add('disabled');
                }

                // trに対してtdをつける
                tr.appendChild(td);

            });

             console.log(weeks);

            // tbodyを取得してtrをつける
            document.querySelector('tbody').appendChild(tr);

            // console.log(weeks);

        });
    }



    // 全体の描画
    function createCalendar(){

        clearCalendar();
        renderTitle();
        renderWeeks();
    }


    // 前月への移動
    // クリックしたら、月を 1 引いてあげて、カレンダーを再描画
    document.getElementById('prev').addEventListener('click', () => {
        // 年をまたいだら year のほうも操作する
        month--;
        if (month < 0) {
          year--;
          month = 11; // 12月
        }
        // カレンダーの再描画
        createCalendar();
    });




    // 翌月への移動
    // クリックしたら、月を 1 足して、カレンダーを再描画
    document.getElementById('next').addEventListener('click', () => {
        month++;
        // 年をまたいだら year のほうも操作する
        // monthが12月=11 を越したら
        if (month > 11) {
          year++;
          month = 0; // 1月
        }
        // カレンダーの再描画
        createCalendar();
      });


    // 今日への移動
    // todayをクリックしたら、今日の月に戻る
    document.getElementById('today').addEventListener('click', () => {
        year = today.getFullYear();
        month = today.getMonth();

        // カレンダーの再描画
        createCalendar();
      });




    createCalendar();


    
    // getCalendarHead();
    // getCalendarBody();
    // getCalendarTail();
}



