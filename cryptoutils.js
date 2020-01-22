var engCharFreq = [['E', 12.02], ['T', 9.10], ['A', 8.12], ['O', 7.68], ['I', 7.31], ['N', 6.95], ['S', 6.28],
                    ['R', 6.02], ['H', 5.92], ['D', 4.32], ['L', 3.98], ['U', 2.88], ['C', 2.71], ['M', 2.61],
                    ['F', 2.30], ['Y', 2.11], ['W', 2.09], ['G', 2.03], ['P', 1.82], ['B', 1.49], ['V', 1.11],
                    ['K', 0.69], ['X', 0.17], ['Q', 0.11], ['J', 0.10], ['Z', 0.07],];

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
    console.log(msg);
    var letterFreq = [];
    /*var letterFreq = [['a', 0, 0], ['b', 0, 0], ['c', 0, 0], ['d', 0, 0], ['e', 0, 0], ['f', 0, 0], ['g', 0, 0], ['h', 0, 0], 
                    ['i', 0, 0], ['j', 0, 0], ['k', 0, 0], ['l', 0, 0], ['m', 0, 0], ['n', 0, 0], ['o', 0, 0], ['p', 0, 0], 
                    ['q', 0, 0], ['r', 0, 0], ['s', 0, 0], ['t', 0, 0], ['u', 0, 0], ['v', 0, 0], ['w', 0, 0], ['x', 0, 0], 
                    ['y', 0, 0], ['z', 0, 0], ];*/
    /*console.log([['a', 0, 0], ['b', 0, 0], ['c', 0, 0], ['d', 0, 0], ['e', 0, 0], ['f', 0, 0], ['g', 0, 0], ['h', 0, 0], 
                    ['i', 0, 0], ['j', 0, 0], ['k', 0, 0], ['l', 0, 0], ['m', 0, 0], ['n', 0, 0], ['o', 0, 0], ['p', 0, 0], 
                    ['q', 0, 0], ['r', 0, 0], ['s', 0, 0], ['t', 0, 0], ['u', 0, 0], ['v', 0, 0], ['w', 0, 0], ['x', 0, 0], 
                    ['y', 0, 0], ['z', 0, 0], ]);*/
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
    console.log(letterFreq);
    return letterFreq;
}

            