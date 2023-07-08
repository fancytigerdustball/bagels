function startGame() {
    function inDigits(x) {
        // I wrote this function because I don't know how "in" works. :(
        inside = false;
        for(var i = 0; i < digits.length; i++) {
            if(x == digits[i]) {inside = true;}
        }
        return inside;
    }
    function submit() {
        tries++;
        var guess = input.value;
        var bagels = "";
        var fermi = "";
        var pico = "";

        if(guess.length == 3) {
            for(var i = 0; i < 3; i++) {
                var digit = guess[i];
                if(digit == digits[i]) {
                    fermi += " fermi";
                }
                else {
                    if(inDigits(digit)) {
                        pico += " pico";
                    }
                }
            }
            if(fermi == "") {
                if(pico == "") {
                    bagels = " bagels";
                }
            }
            // Is there a way to shorten this? (like a Python f-string)
            response = "#" + tries + "  " + guess + ":" + bagels + fermi + pico;
        }
        else {
            tries--;
            response = "guess must be 3 numbers long.";
        }
        var relement = document.createElement("p");
        if(fermi == " fermi fermi fermi") {response += ". Perfect!";}
        else {
            if(tries == 10) {response += ". You ran out of tries. The secret number was: " + digits;}
        }
        relement.innerHTML = response;
        if(tries < 11) {div.appendChild(relement);}
    }
    var body = document.getElementById("body");
    var button = document.getElementById("button");
    var tries = 0;

    var digits = [];
    for(var i = 0; i < 3; i++) {
        var number = Math.floor(Math.random() * 10);
        if(inDigits(number)) {i--;}
        else {
            if(number != 0) {digits.push(number)};
        }
    }
    
    body.removeChild(button);
    var iframe = document.createElement("iframe");
    var input = document.createElement("input");
    var button = document.createElement("input");
    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    iframe.src = "rules.html";
    input.value = "Enter guess";
    input.type = "text";
    input.id = "gameInput";
    button.value = "Submit";
    button.type = "button";
    button.onclick = submit;
    button.id = "gameButton";
    h2.innerHTML = "Guess results";
    body.appendChild(iframe);
    body.appendChild(input);
    body.appendChild(button);
    body.appendChild(div);
    div.appendChild(h2);
}
