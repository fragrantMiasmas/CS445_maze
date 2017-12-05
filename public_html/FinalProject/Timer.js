// Elizabeth Reed
//timer for the A-maze-ing race

var minutes = 10;
var seconds = 0;
var showTime = "Time: " + minutes + ":" + seconds;

    var x = setInterval(function ()
    {
        seconds -=1;
        showTime = "Time: " + minutes + ":" + seconds;

        if (minutes <= 0 && seconds <= 0) {
            showTime = "Time: 0:00";
            document.getElementById("timer").innerHTML = showTime;
        }
        
        else if (seconds <= 9 && seconds > 0) {
            showTime = minutes + ":0" + seconds;
            document.getElementById("timer").innerHTML = showTime;
        }
        
        else if (seconds <= 0) {
            seconds = 60;
            minutes -= 1;
            document.getElementById("timer").innerHTML = showTime;
        }
        else
            document.getElementById("timer").innerHTML = showTime;

    }, 1000);
