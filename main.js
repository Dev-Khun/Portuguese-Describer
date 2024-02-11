//Must use functions
function inRange(num, min, max) {
    return num >= min && num <= max; // if num matches both of this statements returns true
}
function capitalFirst(str){ //I mean, very nice, but aparently you could just use the css declaration text-transform: uppercase;
    const capitalize  = str[0].toUpperCase()+str.substring(1); // method substring(1) returns a string starting from index 1
    return capitalize;
}
function rightCharCount(l,x) {
    const right = l.length - x;
    return right;
}
function checkHundred(x){
    if (x.length == 3 && x[1] == 0 && x[2] == 0){
        return true;
    }
}
// Example use of a recursive function
function removeZero(z) {
    if (z[0] == 0) {                    //This is the condition to be matched 
        return removeZero(z.slice(1));  //This will slice the first character and reinsert it in the function
    }                                   //(in reality, z.slice(1) will remove everything that is behind the specified index in this case is only the [0])
    else {
        return z;                       // If no zeros are found in the firts index, it will return the value left
    }
}

//This is a simple sound function, the sound willbe reproduced every time this class is called
function siuu() {
    const sound = new Audio('extras/siu.mp3');
    sound.play();
}

//Variables
const result = document.querySelector('#result');
const numBox = document.querySelector('#usrNum');
let finalStr = '';

//Program
function describe(n) {
    const units = {
        0:'zero',
        1:'um',
        2:'dois',
        3:'três',
        4:'quatro',
        5:'cinco',
        6:'seis',
        7:'sete',
        8:'oito',
        9:'nove',
        10:'dez',
        11:'onze',
        12:'doze',
        13:'treze',
        14:'catorze',
        15:'quinze',
        16:'dezasseis',
        17:'dezassete',
        18:'dezoito',
        19:'dezanove'
    };
    const dozens = {
        2:'vinte',
        3:'trinta',
        4:'quarenta',
        5:'cinquenta',
        6:'sessenta',
        7:'setenta',
        8:'oitenta',
        9:'noventa'
    };
    const hundreds = {
        0:'cem',
        1:'cento',
        2:'duzentos',
        3:'trezentos',
        4:'quatrocentos',
        5:'quinhentos',
        6:'seiscentos',
        7:'setecentos',
        8:'oitocentos',
        9:'novecentos'
    };

    // All cases will have to count chars backwards to avoid bugging in inputs like 021
    // This is why rightCharCount() is there
    // removeZero() will remove all leading zeros from a value

    switch (true){
        //This will check if the value is zero
        case n == 0:
            finalStr = units[n];
            finalStr = capitalFirst(finalStr);
            break;

        //Check James Bond
        case n == '007':
            finalStr = "(⌐▀͡ ̯ʖ▀)=/̵͇̿̿/'̿'̿̿̿ ̿ ̿̿ ";
            break;

        //Check Ronaldo
        case n === '7':
            finalStr = units[n];
            finalStr = capitalFirst(finalStr);
            siuu();
            break;

        //This will check all numbers until 19 and remove leading zeros if they exist
        case inRange(n,1,19):
            if (n[0] == 0) {
                finalStr = `${units[removeZero(n)]}`;
                finalStr = capitalFirst(finalStr);
            }
            else {
                finalStr = units[n];
                finalStr = capitalFirst(finalStr);
            }
            break;

        //This code will apply to all numbers that end with a 0 like 20,30,40,50...
        case n[rightCharCount(n,1)] == 0 && inRange(n,20,90):
            finalStr = capitalFirst(`${dozens[n[rightCharCount(n,2)]]}`);
            break;
            
        //Check Naughty
        case removeZero(n) == 69:
            finalStr = '(͠≖ ͜ʖ͠≖)';
            break;

        //This code will apply to all numbers that are not ending with a 0 between 21 and 99 (included)
        case inRange(n,21,99):  
            finalStr = `${capitalFirst(dozens[n[rightCharCount(n,2)]])} e ${capitalFirst(units[n[rightCharCount(n,1)]])}`; // dozens[n.length-2]+" e "+units[n.length-1]
            break;
        // This part checks if the numbers end with 00 like 100,200,300,400...
        case checkHundred(n):
            if(n == 100){
                finalStr = capitalFirst(`${hundreds[n[rightCharCount(n,3)]-1]}`);
            }
            else {
                finalStr = capitalFirst(`${hundreds[n[rightCharCount(n,3)]]}`);
            }
        break;
            //THIS IS THE GENIUSES OF GENIUSES USE OF RECURSION! THIS LINE ALONE FINISHED THE PROGRAM
        case inRange(n,101,999):
            finalStr = capitalFirst(`${hundreds[n[0]]} e ${describe(n.slice(1))}`);
            break;

        case n == 1000:
            finalStr = 'Mil'
            break;

        default:
            finalStr = "Not a valid Number"
            // finalStr = `${dozens[n[n.length-2]]} e ${units[n[n.length-1]]}`;
    }
    return finalStr;
}
function usrInput(elem) {
    if (elem.value > 1000) {
        elem.value = 0;
    }
    else if(elem.value.length > 3 && elem.value != '1000') {
        elem.value = elem.value.slice(0, 3); //0 inclusive and 3 exclusive
    }
    else if (elem.value < 0) {
        elem.value = 0;
    }
    result.textContent= describe(elem.value);
}
function clearResult() {
    numBox.value = '';
    result.textContent = '';
}