function equalsIgnoreCase(a, b){
  if(a == undefined || b == undefined)return false;
  return a.toLowerCase() == b.toLowerCase();
}

function aes(text){
  var aesthetic = [];
  aesthetic["a"] = "ａ";
  aesthetic["b"] = "ｂ";
  aesthetic["c"] = "ｃ";
  aesthetic["d"] = "ｄ";
  aesthetic["e"] = "ｅ";
  aesthetic["f"] = "ｆ";
  aesthetic["g"] = "ｇ";
  aesthetic["h"] = "ｈ";
  aesthetic["i"] = "ｉ";
  aesthetic["j"] = "ｊ";
  aesthetic["k"] = "ｋ";
  aesthetic["l"] = "ｌ";
  aesthetic["m"] = "ｍ";
  aesthetic["n"] = "ｎ";
  aesthetic["o"] = "ｏ";
  aesthetic["p"] = "ｐ";
  aesthetic["q"] = "ｑ";
  aesthetic["r"] = "ｒ";
  aesthetic["s"] = "ｓ";
  aesthetic["t"] = "ｔ";
  aesthetic["u"] = "ｕ";
  aesthetic["v"] = "ｖ";
  aesthetic["w"] = "ｗ";
  aesthetic["x"] = "ｘ";
  aesthetic["y"] = "ｙ";
  aesthetic["z"] = "ｚ";
  aesthetic["A"] = "Ａ";
  aesthetic["B"] = "Ｂ";
  aesthetic["C"] = "Ｃ";
  aesthetic["D"] = "Ｄ";
  aesthetic["E"] = "Ｅ";
  aesthetic["F"] = "Ｆ";
  aesthetic["G"] = "Ｇ";
  aesthetic["H"] = "Ｈ";
  aesthetic["I"] = "Ｉ";
  aesthetic["J"] = "Ｊ";
  aesthetic["K"] = "Ｋ";
  aesthetic["L"] = "Ｌ";
  aesthetic["N"] = "Ｍ";
  aesthetic["N"] = "Ｎ";
  aesthetic["O"] = "Ｏ";
  aesthetic["P"] = "Ｐ";
  aesthetic["Q"] = "Ｑ";
  aesthetic["R"] = "Ｒ";
  aesthetic["S"] = "Ｓ";
  aesthetic["T"] = "Ｔ";
  aesthetic["U"] = "Ｕ";
  aesthetic["V"] = "Ｖ";
  aesthetic["W"] = "Ｗ";
  aesthetic["X"] = "Ｘ";
  aesthetic["Y"] = "Ｙ";
  aesthetic["Z"] = "Ｚ";
  var out = "";
  text.split("").forEach(function(val){
    out += ((aesthetic[val] == undefined) ? val : aesthetic[val]);
  });
  return out;
}

function zalgo(text){
  return Z.generate(text);
}

/* Utils - lots of scary stuff, not formatted well. */

var Z = {
    chars: {
        0 : [ /* up */
    '\u030d', /*     ̍     */
    '\u030e', /*     ̎     */
    '\u0304', /*     ̄     */
    '\u0305', /*     ̅     */
    '\u033f', /*     ̿     */
    '\u0311', /*     ̑     */
    '\u0306', /*     ̆     */
    '\u0310', /*     ̐     */
    '\u0352', /*     ͒     */
    '\u0357', /*     ͗     */
    '\u0351', /*     ͑     */
    '\u0307', /*     ̇     */
    '\u0308', /*     ̈     */
    '\u030a', /*     ̊     */
    '\u0342', /*     ͂     */
    '\u0343', /*     ̓     */
    '\u0344', /*     ̈́     */
    '\u034a', /*     ͊     */
    '\u034b', /*     ͋     */
    '\u034c', /*     ͌     */
    '\u0303', /*     ̃     */
    '\u0302', /*     ̂     */
    '\u030c', /*     ̌     */
    '\u0350', /*     ͐     */
    '\u0300', /*     ̀     */
    '\u0301', /*     ́     */
    '\u030b', /*     ̋     */
    '\u030f', /*     ̏     */
    '\u0312', /*     ̒    */
    '\u0313', /*     ̓     */
    '\u0314', /*     ̔     */
    '\u033d', /*     ̽     */
    '\u0309', /*     ̉     */
    '\u0363', /*     ͣ     */
    '\u0364', /*     ͤ     */
    '\u0365', /*     ͥ     */
    '\u0366', /*     ͦ     */
    '\u0367', /*     ͧ     */
    '\u0368', /*     ͨ     */
    '\u0369', /*     ͩ     */
    '\u036a', /*     ͪ     */
    '\u036b', /*     ͫ     */
    '\u036c', /*     ͬ     */
    '\u036d', /*     ͭ     */
    '\u036e', /*     ͮ     */
    '\u036f', /*     ͯ     */
    '\u033e', /*     ̾     */
    '\u035b', /*     ͛     */
    '\u0346', /*     ͆     */
    '\u031a'  /*     ̚     */
    ],
    1 : [ /* down */
    '\u0316', /*     ̖     */
    '\u0317', /*     ̗     */
    '\u0318', /*     ̘     */
    '\u0319', /*     ̙     */
    '\u031c', /*     ̜     */
    '\u031d', /*     ̝     */
    '\u031e', /*     ̞     */
    '\u031f', /*     ̟     */
    '\u0320', /*     ̠     */
    '\u0324', /*     ̤     */
    '\u0325', /*     ̥     */
    '\u0326', /*     ̦     */
    '\u0329', /*     ̩     */
    '\u032a', /*     ̪     */
    '\u032b', /*     ̫     */
    '\u032c', /*     ̬     */
    '\u032d', /*     ̭     */
    '\u032e', /*     ̮     */
    '\u032f', /*     ̯     */
    '\u0330', /*     ̰     */
    '\u0331', /*     ̱     */
    '\u0332', /*     ̲     */
    '\u0333', /*     ̳     */
    '\u0339', /*     ̹     */
    '\u033a', /*     ̺     */
    '\u033b', /*     ̻     */
    '\u033c', /*     ̼     */
    '\u0345', /*     ͅ     */
    '\u0347', /*     ͇     */
    '\u0348', /*     ͈     */
    '\u0349', /*     ͉     */
    '\u034d', /*     ͍     */
    '\u034e', /*     ͎     */
    '\u0353', /*     ͓     */
    '\u0354', /*     ͔     */
    '\u0355', /*     ͕     */
    '\u0356', /*     ͖     */
    '\u0359', /*     ͙     */
    '\u035a', /*     ͚     */
    '\u0323'  /*     ̣     */
        ],
    2 : [ /* mid */
    '\u0315', /*     ̕     */
    '\u031b', /*     ̛     */
    '\u0340', /*     ̀     */
    '\u0341', /*     ́     */
    '\u0358', /*     ͘     */
    '\u0321', /*     ̡     */
    '\u0322', /*     ̢     */
    '\u0327', /*     ̧     */
    '\u0328', /*     ̨     */
    '\u0334', /*     ̴     */
    '\u0335', /*     ̵     */
    '\u0336', /*     ̶     */
    '\u034f', /*     ͏     */
    '\u035c', /*     ͜     */
    '\u035d', /*     ͝     */
    '\u035e', /*     ͞     */
    '\u035f', /*     ͟     */
    '\u0360', /*     ͠     */
    '\u0362', /*     ͢     */
    '\u0338', /*     ̸     */
    '\u0337', /*     ̷      */
    '\u0361', /*     ͡     */
    '\u0358', /*     ͘     */
    '\u0321', /*     ̡     */
    '\u0322', /*     ̢     */
    '\u0327', /*     ̧     */
    '\u0328', /*     ̨     */
    '\u0334', /*     ̴     */
    '\u0335', /*     ̵     */
    '\u0336', /*     ̶     */
    '\u034f', /*     ͏     */
    '\u035c', /*     ͜     */
    '\u035d', /*     ͝     */
    '\u035e', /*     ͞     */
    '\u035f', /*     ͟     */
    '\u0360', /*     ͠     */
    '\u0362', /*     ͢     */
    '\u0338', /*     ̸     */
    '\u0337', /*     ̷      */
    '\u0361', /*     ͡     */
    '\u0489' /*     ҉_     */
    ]

    },
    random: function(len) {
        if (len == 1) return 0;
        return !!len ? Math.floor(Math.random() * len + 1) - 1 : Math.random();
    },
    generate: function(str) {
        var str_arr = str.split(''),
            output = str_arr.map(function(a) {
                if(a == " ") return a;
                for(var i = 0, l = Z.random(16);
                    i<l;i++){
                        var rand = Z.random(3);
                    a += Z.chars[rand][
                        Z.random(Z.chars[rand].length)
                        ];
                 }
                return a;
            });
        return output.join('');
    }
};