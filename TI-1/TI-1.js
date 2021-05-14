//*****Железнодорожная изгородь*****//

function fillMatrix(width, height){
    let rail = [];
    for (let i = 0; i < height; i++) {
        rail[i] = [];
        for (let j = 0; j < width; j++)
        {
            rail[i][j] = '_';
        }
    }
    return rail;
}

function EncryptRailFence(text, key){
    let result = "";
    let rail = fillMatrix(text.length, key);
    let flag = false;
    let row = 0, col = 0;

    for (let i = 0; i < text.length; i++) {
        if (row == 0 || row == key - 1) flag = !flag;

        rail[row][col++] = text[i];
        if(flag) {
            row++;
        }
        else {
            row--;
        }
    }
        for (let i = 0; i < key; i++){
            for(let j = 0; j < text.length; j++){
                if (rail[i][j] != '_'){
                    result += rail[i][j];
                }
            }
}
        return result;
}


function DecryptRailFence(text, key) {
    let result = "";
    let rail = fillMatrix(text.length, key);

    let flag = false;
    let row = 0, col = 0;
    for (let i = 0; i < text.length; i++) {
        if (row == 0) flag = true;
        if (row == key - 1) flag = false;
        rail[row][col++] = '*';
        if (flag){
            row++;
        }
        else {
            row--;
        }
    }
    let ind = 0;

    for (let i = 0; i < key; i++){
        for(let j = 0; j < text.length; j++){
            if ((rail[i][j] == '*') && (ind < text.length)){
                rail[i][j] = text[ind++];
            }
        }
    }
    row = 0;
    col = 0;
    for (let i = 0; i < text.length; i++){
        if (row == 0) flag = true;
        if (row == key - 1) flag = false;
        if (rail [row][col] != '*') result += rail[row][col++];
        if (flag) {
            row++;
        }
        else{
           row --
        }
    }
    return result;
}

//*****Столбчатый метод*****//



function GetKeyNum(key, flag) {
    key = key.toLowerCase();
    let arr = [];
    arr = key.split('');
    for (let i = 0; i < arr.length; i++){

        arr[i] = {num : i, ind: arr[i], lett : arr[i]};
    }
    arr.sort((prev, next) => {
    if (prev.lett < next.lett) return -1;
    if (prev.lett < next.lett) return 1;
    });

    if(flag == 'encrypt') {
            for (let i = 0; i < arr.length; i++){
                arr[i] = arr[i].num;
            }
    }

    if(flag == 'decrypt') {

        for (let i = 0; i < arr.length; i++){
            arr[i].ind = i;
        }
        arr.sort((prev, next) => {
            if (prev.num < next.num) return -1;
            if (prev.num < next.num) return 1;

        });
        for (let i = 0; i < arr.length; i++){
            arr[i] = arr[i].ind;
        }
    }
    return arr;
}



    function ColEncrypt (text, key) {
    let col = key.length;
    let row = 0;
    tempr = "";
    while (tempr.length < text.length) {
        tempr += key;
        row++;
    }
    let matrix = []
        while (text.length % col !=0){
        text += '*'
        }
        let ind = 0;
        let m = 0;
        while (ind < text.length){
            let n = 0;
            matrix[m] = [];
            while (n < col && ind < text.length){
                matrix[m][n] = text[ind];
                n++;
                ind++;
            }
            m++;
        }
        let result = "";
        let keyNum = GetKeyNum(key, 'encrypt');

        for (let i = 0; i < keyNum.length; i++){
            let num = keyNum[i];
            for (let j = 0; j < row; j++) {
                result += matrix[j][num];
            }
        }
        return result;
    }


    function ColDecrypt(text, key){

        let col = key.length;
        let keyNum = GetKeyNum(key, 'decrypt');
        let row = text.length / col;
        let matrix = [];
        let matrix2 = [];
        let m = 0;
        let ind = 0;
        for (let i = 0; i < row; i++){
            matrix[i] = [];
            matrix2[i] = [];
        }

        while (ind < text.length){
            let n = 0;
            while (n < row){
                matrix [n][m] =text[ind];
                n++;
                ind++;
            }
            m++
        }
      for (let i = 0; i < col; i++){
          let num = keyNum[i];
          for (let j = 0; j < row; j++){
              matrix2[j][i] = matrix [j][num];
          }
      }
      let result =  "";
      for (let i = 0; i < row; i++){
          for (let j = 0; j < col; j++){
              if (matrix2[i][j] != '*') result += matrix2[i][j];
          }
      }
      return result;

    }


//****Решетка****//



function Rotate(matrix){
    let TMatrix = [];
for (let i =0; i < matrix.length; i++){
    TMatrix[i] = [];
}
    for (let i = 0; i < matrix.length; i++)
    {

        for (let j = 0; j < matrix.length; j++)
        {
            TMatrix[j][ matrix.length - 1 - i] = matrix[i][j];
        }
    }

    matrix = TMatrix;
    return matrix;

}



function  RotateEncrypt(text) {
    let result = "";
    let size = 5;
    let k = 0;
    let matrix = [];


    let times = Math.round(text.length / (size * size));

    if (times == 0) {
        times = 1;
    } else {
        times = text.length / (size * size) + 1;
    }
    if (text.length != 25) {
        text += 'a';
    }

    for (let i = 1; i <= times; i++) {


    let grid = [
        [0, 2, 0, 4, 1],
        [2, 5, 6, 5, 0],
        [3, 6, 0, 0, 3],
        [4, 0, 6, 5, 4],
        [1, 0, 3, 2, 1]
    ];

    matrix = InitMatrix(matrix);

    matrix = FillMatrix(matrix, grid, text, k);
    result = MatrixToStr(matrix, result);
    k += 25;
}
        return result;
}

function MatrixToStr(matrix, result){
    for (let i = 0; i < matrix.length; i++)
    {
        for (let j = 0; j < matrix.length; j++)
        {
            result += matrix[i][j];
        }
    }
    return result;
}


function FillMatrix(matrix, grid, text, k){

        for (let time = 1; time < 5; time++) {
            for (let i = 0; i < matrix.length; i++) {
                let j = 0;
                while (j < matrix.length && k < text.length) {
                    if (grid[i][j] == 0) {
                        matrix[i][j] = text[k++];
                    }
                    j++;
                }
            }

            grid[2][2] = 7;
            if (time != 4) {
                grid = Rotate(grid);
            }
        }
return matrix;
}



function InitMatrix(matrix){
        let c;

        for (let i = 0; i < 5; i++){
            matrix[i] = [];
            for (let  j = 0; j < 5; j++){
                c = 'а';
                matrix[i][j] = c;
            }
        }
return matrix;
}

function RotateDecrypt(text){
    let result = "";
    let size = 5;
    let k = 0;
    let matrix = [];
    let times = text.length % (size * size);

    if (times == 0){
        times = 1;
    }
    else{
        times = text.length / (size * size + 1)
    }
    for (let i = 1; i <= times; i++) {

        let grid = [
            [0, 2, 0, 4, 1],
            [2, 5, 6, 5, 0],
            [3, 6, 0, 0, 3],
            [4, 0, 6, 5, 4],
            [1, 0, 3, 2, 1]
        ];
        matrix = StrToMatrix(matrix, text, k);
        result = FillStr(matrix, grid, text, result);
        k += 25;
    }
    return result;
}

function FillStr(matrix, grid, text, result){
    let c;
    let flag = true;
    for (let time = 1; time <=4; time++){
        for (let i = 0; i < matrix.length; i++){
            for (let j = 0; j < matrix.length; j++){
                if (grid[i][j] == 0){
                    c = matrix[i][j];
                    if (c =='a'){
                        flag = !flag;
                    }
                    if (flag){
                        result += c;
                    }
                }
            }
        }
       grid[2][2] = 7;
        if (time !=4){
            grid = Rotate(grid);
        }
    }
    return result;
}



function StrToMatrix(matrix, text, k){
    for (let i = 0; i < 5; i++){
        let j = 0;
        matrix[i] = [];
        while (j < 5 && k < text.length){
            matrix[i][j] = text[k];
            j++;
            k++;
        }
    }
    return matrix
}



CaesarEncrypt('Тексяю', 2);

function CaesarEncrypt  (text, key) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c.match(/[а-я]/i)) {
            let code = text.charCodeAt(i);
            if (code >= 1040 && code <= 1071) {
                c = String.fromCharCode(((code - 1040 + key) % 32) + 1040);
            }

            else if (code >= 1072 && code <= 1103) {
                c = String.fromCharCode(((code - 1072 + key) % 32) + 1072);
            }
        }

        result += c;
    }

    return result;
}

function CaesarDecrypt  (text, key) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        if (c.match(/[а-я]/i)) {
            let code = text.charCodeAt(i);
            if ((code -1040 - key) < 0 || code - 1072 - key <0){
                c = String.fromCharCode(((code - 1040 - key) % 32) + 1040 + 32);

            }
            else if (code >= 1040 && code <= 1071) {
                c = String.fromCharCode(((code - 1040 - key) % 32) + 1040);

            }

            else if (code >= 1072 && code <= 1103) {
                c = String.fromCharCode(((code - 1072 - key) % 32) + 1072);
            }
        }

        result += c;
    }

    return result;
}




function ToEncrypt(){
    let text = document.getElementById('input');
    let method = document.getElementsByClassName('method');
    let key = document.getElementById('key').value;
    let result ="";

    for (let i = 0; i < method.length; i++){
        if (method[i].checked){
            method = i;
        }
     if (method == 0){
         result = EncryptRailFence(text.value, key);
     }
        if (method == 1){
            result = ColEncrypt (text.value, key);
        }
        if (method == 2){
            result = RotateEncrypt(text.value);
        }
        if (method == 3){
            key = Number.parseInt(key);
            result = CaesarEncrypt(text.value, key );
        }

    }
    text.value =  result;
}

function ToDecrypt(){
    let text = document.getElementById('input');
    let method = document.getElementsByClassName('method');
    let key = document.getElementById('key').value;
    let result ="";

    for (let i = 0; i < method.length; i++){
        if (method[i].checked){
            method = i;
        }
        if (method == 0){
            result = DecryptRailFence(text.value, key);
        }
        if (method == 1){
            result = ColDecrypt (text.value, key);
        }
        if (method == 2){
            result = RotateDecrypt(text.value);
        }
        if (method == 3){
            key = Number.parseInt(key);
            result = CaesarDecrypt(text.value, key );
        }

    }
    text.value =  result;
}
