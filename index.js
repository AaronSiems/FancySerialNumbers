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
    var numStr = number.toString();
    var i = 1;
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


quadDoubles();