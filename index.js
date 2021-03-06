/*
Crude program to find fancy serial numbers of dollar bills and how rare they are
Created by Aaron Siems
*/

const fs = require('fs');
const upper = 199999999; //Largest Serial number possible

var number = 100000000; //serial number variable, must have the 1 at front for comparision functions
var total = 0; //total results that match the queue
var results = []; //matches array


function clearResults(){ // reset variables
    results = [];
    total = 0;
    number = 100000000;
}

function resultsTxt(){
    if(!(fs.existsSync('results.txt'))){
        console.log('Results file not found creating new one');
        var results = fs.createWriteStream('results.txt');
        results.once('open', function(fd) {
            results.write('Results file\n');
            results.end();
        });
        console.log('Created new results file');
    } else {
        console.log('Results file found, deleting and re-creating...')
        fs.unlinkSync('results.txt');
        var results = fs.createWriteStream('results.txt');
        results.once('open', function(fd) {
            results.write('Results file\n');
            results.end();
        });
        console.log('Created new results file');
    }
}

function quadDoubles(){ //find quad doubles ie 11223344
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating quad doubles');
    while (number<upper){
        number++;
        numStr = number.toString();
        if ((numStr.substring(8, 9) == numStr.substring(7, 8))) {
            if ((numStr.substring(6, 7) == numStr.substring(5, 6))) {
                if ((numStr.substring(4, 5) == numStr.substring(3, 4))) {
                    if ((numStr.substring(2, 3) == numStr.substring(1, 2))) {
                        total++;
                        resultsWrite.write(numStr.substr(1) + '\n')
                    }
                }
            }
        }
    }
    resultsWrite.end;
    console.log('Finished finding all quad doubles');
    console.log('Total possible amounts of quad doubles in a run = ' + total);
}

function oneOfAKind(){ //find one of a kinds (a very bad way to figure them out) ie 22222222
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating one of a kinds');
    while (number<upper){
        number++
        numStr = number.toString();
        if ((numStr.substring(8, 9) == numStr.substring(7, 8))) {
            if ((numStr.substring(8, 9) == numStr.substring(6, 7))) {
                if ((numStr.substring(8, 9) == numStr.substring(5, 6))) {
                    if ((numStr.substring(8, 9) == numStr.substring(4, 5))) {
                        if ((numStr.substring(8, 9) == numStr.substring(3, 4))) {
                            if ((numStr.substring(8, 9) == numStr.substring(2, 3))) {
                                if ((numStr.substring(8, 9) == numStr.substring(1, 2))) {
                                    total++;
                                    resultsWrite.write(numStr.substr(1) + '\n')
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    resultsWrite.end;
    console.log('Finished finding all quad doubles');
    console.log('Total possible amounts of quad doubles in a run = ' + total);
}

function doubleQuad() { //find quad doubles ie 11112222
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating double quads');
    while (number<upper){
        number++
        numStr = number.toString();
        if ((numStr.substring(8, 9) == numStr.substring(7, 8))) {
            if ((numStr.substring(8, 9) == numStr.substring(6, 7))) {
                if ((numStr.substring(8, 9) == numStr.substring(5, 6))) {
                    if ((numStr.substring(4, 5) == numStr.substring(1, 2))) {
                        if ((numStr.substring(4, 5) == numStr.substring(3, 4))) {
                            if ((numStr.substring(4, 5) == numStr.substring(2, 3))) {
                                total++;
                                resultsWrite.write(numStr.substr(1) + '\n');
                            }
                        }
                    }
                }
            }
        }
    }
    resultsWrite.end;
    console.log('Finished finding all double quads');
    console.log('Total possible amounts of double quads in a run = ' + total);
}

function xyxyzzww() { //find this type of pattern (would look like 12123344 or 44331212)
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating (xyxyzzww or zzwwxyxy)');
    while (number<upper){
        number++
        numStr = number.toString();
        if ((numStr.substring(8, 9) == numStr.substring(7, 8))) { //ww
            if ((numStr.substring(6, 7) == numStr.substring(5, 6))) { //zz
                if ((numStr.substring(1, 2) == numStr.substring(3, 4))) { //xx
                    if ((numStr.substring(2, 3) == numStr.substring(4, 5))) { //yy
                        total++;
                        resultsWrite.write(numStr.substr(1) + '\n');
                    }
                }
            }
        } else if ((numStr.substring(1, 2) == numStr.substring(2, 3))) { //ww
            if ((numStr.substring(3, 4) == numStr.substring(4, 5))) { //zz
                if ((numStr.substring(5, 6) == numStr.substring(7, 8))) { //xx
                    if ((numStr.substring(6, 7) == numStr.substring(8, 9))) { //yy
                        total++;
                        resultsWrite.write(numStr.substr(1) + '\n');
                    }
                }
            }
        }
    }
    resultsWrite.end;
    console.log('Finished finding all (xyxyzzww or zzwwxyxy)');
    console.log('Total possible amounts of (xyxyzzww or zzwwxyxy) in a run = ' + total);
}

//CAUTION this one takes a bit to run
function trinary() { //find trinaries ie 34534534 (only three numbers)
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating trinaries');
    while (number<upper){
        number++
        numStr = number.toString();
        numArray = Array.from(numStr.substring(1,9)); //convert string to array
        numArray = numArray.filter((x, i, numArray) => numArray.indexOf(x) == i); //replace array with just the unique numbers
        if (numArray.length == 3) { //if there's only three numbers then record it
            total++;
            resultsWrite.write(numStr.substr(1) + '\n');
        }
    }
    resultsWrite.end;
    console.log('Finished finding all trinaries');
    console.log('Total possible amounts of trinaries in a run = ' + total);
}


//CAUTION this one also takes a bit.
function binary() { //find binaries ie 12221221 (only two numbers)
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating binaries');
    while (number<upper){
        number++
        numStr = number.toString();
        numArray = Array.from(numStr.substring(1,9)); //convert string to array
        numArray = numArray.filter((x, i, numArray) => numArray.indexOf(x) == i); //replace array with just the unique numbers
        if (numArray.length == 2) { //if there's only three numbers then record it
            total++;
            resultsWrite.write(numStr.substr(1) + '\n');
        }
    }
    resultsWrite.end;
    console.log('Finished finding all binaries');
    console.log('Total possible amounts of binaries in a run = ' + total);
}

function ascend()  {//numbers that only go up ie 11234789 or 33447789
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating ascending numbers');
    while (number<upper){
        number++;
        numStr = number.toString();
        if ((numStr.substring(1, 2) <= numStr.substring(2, 3))) {
            if ((numStr.substring(2, 3) <= numStr.substring(3, 4))) {
                if ((numStr.substring(3, 4) <= numStr.substring(4, 5))) {
                    if ((numStr.substring(4, 5) <= numStr.substring(5, 6))) {
                        if ((numStr.substring(5, 6) <= numStr.substring(6, 7))) {
                            if ((numStr.substring(6, 7) <= numStr.substring(7, 8))) {
                                if ((numStr.substring(7, 8) <= numStr.substring(8, 9))) {
                                    total++;
                                    resultsWrite.write(numStr.substr(1) + '\n');
                                }
                            }
                        }
                    }
                }
            }
        }            
    }
    resultsWrite.end;
    console.log('Finished finding all ascending serials');
    console.log('Total possible amounts of ascending serials in a run = ' + total);
}


function descend()  {//numbers that only go down ie 99874321 or 99775540
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating descending numbers');
    while (number<upper){
        number++;
        numStr = number.toString();
        if ((numStr.substring(1, 2) >= numStr.substring(2, 3))) {
            if ((numStr.substring(2, 3) >= numStr.substring(3, 4))) {
                if ((numStr.substring(3, 4) >= numStr.substring(4, 5))) {
                    if ((numStr.substring(4, 5) >= numStr.substring(5, 6))) {
                        if ((numStr.substring(5, 6) >= numStr.substring(6, 7))) {
                            if ((numStr.substring(6, 7) >= numStr.substring(7, 8))) {
                                if ((numStr.substring(7, 8) >= numStr.substring(8, 9))) {
                                    total++;
                                    resultsWrite.write(numStr.substr(1) + '\n');
                                }
                            }
                        }
                    }
                }
            }
        }            
    }
    resultsWrite.end;
    console.log('Finished finding all descending serials');
    console.log('Total possible amounts of descending serials in a run = ' + total);
}


function xyyx()  {//numbers that follow an xzywywxz pattern ie 12343412
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating xyyx numbers');
    while (number<upper){
        number++;
        numStr = number.toString();
        if ((numStr.substring(1, 3) == numStr.substring(7, 9))) {
            if ((numStr.substring(3, 5) == numStr.substring(5, 7))) {
                total++;
                resultsWrite.write(numStr.substr(1) + '\n');
            }
        }
    }
    console.log('Finished finding all xyyx serials');
    console.log('Total possible amounts of xyyx serials in a run = ' + total);
}

function radar() { //radar numbers go wxyzzyxw, palindromes 
    function reverse(s){ //only need this function for radars
        return s.split("").reverse().join("");
    }

    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating radars');
    while (number<upper){
        number++;
        numStr = number.toString();
        if ((numStr.substring(1, 5) == reverse(numStr.substring(5, 9)))) {
            total++;
            resultsWrite.write(numStr.substr(1) + '\n');
        }
    }
    console.log('Finished finding all radar serials');
    console.log('Total possible amounts of radar serials in a run = ' + total);
}


radar(); //9,999
//xyyx(); //9,999
//ascend(); //24,309
//descend(); //24,309
//binary(); //11,430
//trinary(); //695,520
//xyxyzzww(); //18,999
//doubleQuad(); //99
//oneOfAKind(); //9
//quadDoubles(); //9,999