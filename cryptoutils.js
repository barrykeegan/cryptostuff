var engCharFreq = [['E', 12.70], ['T', 9.35], ['A', 8.16], ['O', 7.50], ['I', 6.96], ['N', 6.74], ['S', 6.32],
    ['H', 6.09], ['R', 5.98], ['D', 4.25], ['L', 4.02], ['U', 2.75], ['W', 2.56], ['M', 2.40], ['F', 2.22], 
    ['C', 2.20], ['G', 2.01], ['Y', 1.99], ['P', 1.92], ['B', 1.49], ['K', 1.29], ['V', 0.97], ['J', 0.15], 
    ['X', 0.15], ['Q', 0.09], ['Z', 0.07],];

var biGramFreq = [['TH', 3.88], ['HE', 3.68], ['IN', 2.28], ['ER', 2.17], ['AN', 2.14], ['RE', 1.74], ['ND', 1.57],
    ['ON', 1.41], ['EN', 1.38], ['AT', 1.33], ['OU', 1.28], ['ED', 1.27], ['HA', 1.27], ['TO', 1.16], ['OR', 1.51], 
    ['IT', 1.13], ['IS', 1.10], ['HI', 1.09], ['ES', 1.09], ['NG', 1.05],];

var triGramFreq = [['THE', 3.50], ['ING', 1.47], ['HER', 0.82], ['HAT', 0.65], ['HIS', 0.59], ['THA', 0.59], ['ERE', 0.56],
    ['FOR', 0.55], ['ENT', 0.53], ['ION', 0.50], ['TER', 0.46], ['WAS', 0.46], ['YOU', 0.43], ['ITH', 0.43], ['ITH', 0.43], 
    ['VER', 0.43], ['ALL', 0.42], ['WIT', 0.39], ['THI', 0.39], ['TIO', 0.37],];

var quadriGramFreq = [['THAT', 0.76], ['THER', 0.64], ['WITH', 0.57], ['TION', 0.55], ['HERE', 0.37], ['OULD', 0.36], 
    ['IGHT', 0.30], ['HAVE', 0.29], ['HICH', 0.28], ['WHIC', 0.28], ['THIS', 0.27], ['THIN', 0.27], ['THEY', 0.26], 
    ['ATIO', 0.26], ['EVER', 0.26], ['FROM', 0.25], ['OUGH', 0.25], ['WERE', 0.23], ['HING', 0.22], ['MENT', 0.22],];

function shiftChar(char, shiftVal)
{
    var currCharPos = char.charCodeAt(0) - "a".charCodeAt(0);
    if(shiftVal !== 0)
    {
        if (shiftVal > 0)
        {
            var newCharPos=(currCharPos + shiftVal) % 26;
            return String.fromCharCode("a".charCodeAt(0) + newCharPos);
        }
        else
        {
            var newCharPos = currCharPos + shiftVal;
            if (newCharPos < 0)
            {
                return String.fromCharCode("a".charCodeAt(0) + newCharPos + 26);
            }
            else
            {
                return String.fromCharCode("a".charCodeAt(0) + newCharPos);
            }
        }
    }
    else
    {
        return char;
    }
}


function convertString(str, shiftVal)
{
    var converted = "";
    for (var i = 0; i < str.length; i++)
    {
        if(str.charAt(i) >= 'a' && str.charAt(i) <= 'z')
        {
            converted += shiftChar(str.charAt(i),shiftVal)
        }
        else
        {
            converted += str.charAt(i);
        }
    }
    return converted;
}

function performFreqAnalysis(msg)
{
    var letterFreq = [];
    var totalLetters = 0;
    
    for (var i = 0; i < 26; i++)
    {
        letterFreq.push([String.fromCharCode("a".charCodeAt(0) + i), 0, 0]);
    }
    
    
    for (var c= 0; c < msg.length; c++)
    {
        if(msg[c] >= 'a' && msg[c] <= 'z')
        {
            totalLetters++;
            letterFreq[msg[c].charCodeAt(0)-"a".charCodeAt(0)][1]++;
        }
    }

    for (var i = 0; i < letterFreq.length; i++)
    {
        if(letterFreq[i][1] !== 0)
        {
            letterFreq[i][2] = ((letterFreq[i][1] / totalLetters) * 100).toFixed(3);
        }
    }
    return letterFreq;
}

function calculateI(letterFreq, length)
{
    var numerator = 0;
    for(var i = 0; i<letterFreq.length; i++)
    {
        if(letterFreq[i][1] > 1)
        {
            numerator += letterFreq[i][1] * (letterFreq[i][1] -1);
        }
    }
    var denominator = length * (length-1);
    I = numerator / denominator;
    return I;
} 

function estimateKeyLength(len)
{
    var keyLenghtEstimate = 0.027*len;
    keyLenghtEstimate /= (len -1)*0.044 + 0.065 - 0.038*len;
    return keyLenghtEstimate;
}