'use strict';

{
    // ビンゴシート
    // B列　1-15
    // I列　16-30
    // N列　31-45（真ん中にfree）
    // G列　45-60
    // O列　61-75

    function createColumn(col){

            // const source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    
            // ループで置き換える
            const source = [];
            for (let i = 0; i < 15; i++){
                // 1...15
                // source[i] = i + 1 + 15 * 0;
                // 16...30
                // source[i] = i + 1 + 15 * 1;
                // 31...45
                // source[i] = i + 1 + 15 * 2;
                source[i] = i + 1 + 15 * col;
            }


            // 0 から 14 までのランダムな整数値を求める
            // Math.floor(Math.random() * (14 + 1))
            // Math.floor(Math.random() * souce.length)

            // ランダムな位置から 5 つの要素を取り出して、新しい配列を作る

            // splice() 
            // 1 個取り出すたびに、その値は元配列から削除する
            // シートに表示される数値の重複を防ぐ
            
            // B 列の数値
            
            // const b = [];
            
            const column = [];
            
            //  b[0] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
            //  b[1] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
            //  b[2] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
            //  b[3] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
            //  b[4] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
            // splice() の返り値は複数になることもあるので、要素が 1 つでも配列になってしまう
            // 要素を取り出したい場合は、[0] を付ける

            //  ループで置き換える
            for (let i = 0; i < 5; i++){
                // b[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
                column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
            }

            return column;

    }


    //  console.log(b);


    function createColumns(){
        const columns = [];
        // columns[0] = createColumn(0);
        // columns[1] = createColumn(1);
        // columns[2] = createColumn(2);
        // columns[3] = createColumn(3);
        // columns[4] = createColumn(4);
        
        for(let i = 0; i < 5; i++){
            columns[i] = createColumn(i);
        }
        columns[2][2] = 'FREE';
        return columns;
    }


    // function createBingo(columns){
    //     const bingo = [];
    //     for(let row = 0; row < 5; row++){
    //         bingo[row] = [];
    //         for(let col = 0; col < 5; col++){
    //             bingo[row][col] = columns[col][row];
    //         }
    //     }
    //     // console.table(bingo);
    //     return bingo;
    // }


    // function renderBingo(bingo){
    //     for(let row = 0; row < 5; row++){
    //         const tr = document.createElement('tr');
    //         for(let col = 0; col < 5; col++){
    //             const td = document.createElement('td');
    //             td.textContent = bingo[row][col];
    //             tr.appendChild(td);        
    //         }
    
    //         document.querySelector('tbody').appendChild(tr);
    //     }

    // }


    function renderBingo(columns){
        for(let row = 0; row < 5; row++){
            const tr = document.createElement('tr');
            for(let col = 0; col < 5; col++){
                const td = document.createElement('td');
                td.textContent = columns[col][row];
                tr.appendChild(td);        
            }
    
            document.querySelector('tbody').appendChild(tr);
        }

    }

    const columns = createColumns();
    // const bingo = createBingo(columns);
    // renderBingo(bingo);
    renderBingo(columns);

}
