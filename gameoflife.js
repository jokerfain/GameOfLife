var heigth = process.argv[2] || 50
var width = process.argv[3] || heigth
var deley = process.argv[4] || 500
var board = new Array()


function genBoard() {
    for (let i = 0; i < heigth; i++) {
        board[i] = new Array()
        for (let j = 0; j < width; j ++){
            if (Math.random() > 0.5){
                board[i][j] = 1;
            }
            else { 
                board[i][j] = 0; 
            }
        }
    }
}
function printBoard(){
    var st = ''
    for (let i = 0; i < heigth; i++) {
        for (let j = 0; j < width; j ++){
            if (board[i][j]){
                st += '*';
            }
            else{
                st += ' ';
            }
        }
        st += '\n';
    }
    console.log(st);
}
function nextGen(){
    next_board = new Array()
    for (let i = 0; i < heigth; i++) {
        next_board[i] = new Array()
        for (let j = 0; j < width; j ++){
            if (alive(i, j)){
                next_board[i][j] = 1;
                
            }
            else { 
                next_board[i][j] = 0; 
            }
        }
    }
    board = next_board
}
function countNeighboards(i, j){
    var count = 0;
    
    if (board[i + 1]){
        if ( board[i + 1][j + 1] ) { count++; }
        if ( board[i + 1][j] ) { count++; }
    }
    if ( board[i][j + 1] ) { count++; }
    if (j > 0){
        if ( board[i][j - 1] ) { count++; }
        if (board[i + 1]){
            if ( board[i + 1][j - 1] ) { count++; }
        }
    }
    if (i > 0){
        if ( board[i - 1][j] ) { count++; }
        if ( board[i - 1][j + 1] ) { count++; }
        if (j > 0){
            if ( board[i - 1][j - 1] ) { count++; }
        }
    }
    return count
}
function alive(i, j){
    neighboards = countNeighboards(i, j)
    if (board[i][j] && (neighboards == 2 || neighboards == 3)){
        return true;
    }
    else if (board[i][j] && (neighboards > 2 || neighboards > 3)){
        return false;
    }
    else if (!board[i][j] && neighboards == 3){
        return true;
    } 
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
        }
    }
}
function lifeLoop(){
    genBoard();
    sleep(1000);
    console.log(board);
    while (true) {
        console.clear();
        printBoard();
        nextGen();
        sleep(deley); 
    }

}

lifeLoop();
