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
    console.log('Calculating quad doubles')
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
    console.log('Calculating one of a kinds')
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

function quadDoubles() { //find quad doubles ie 11112222
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating quad doubles')
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
    console.log('Finished finding all quad doubles');
    console.log('Total possible amounts of quad doubles in a run = ' + total);
}

function xyxyzzww() { //find this type of pattern (would look like 12123344 or 44331212)
    clearResults();
    var numStr = number.toString();
    resultsTxt();
    var resultsWrite = fs.createWriteStream('results.txt');
    console.log('Calculating (xyxyzzww or zzwwxyxy)')
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
    console.log('Calculating trinaries')
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


trinary();
//xyxyzzww();
//quadDoubles();
//oneOfAKind();
//quadDoubles();