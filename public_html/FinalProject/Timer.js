// Elizabeth Reed
//timer for the A-maze-ing race

function Timer() {
    var minutes = 6;
    var seconds = 0;
    var totalTime = minutes * 60;
    var showTime = "Time: " + minutes + ":" + seconds;

    var x = setInterval(function ()
    {
        seconds -= 1;
        totalTime -= 1;
        showTime = "Time: " + minutes + ":" + seconds;

        hasTime = Boolean(totalTime > 0);
//        console.log(hasTime);

        if (minutes <= 0 && seconds <= 0) {
            showTime = "Time: 0:00";
            document.getElementById("timer").innerHTML = showTime;
        } else if (seconds <= 9 && seconds > 0) {
            showTime = "Time: " + minutes + ":0" + seconds;
            document.getElementById("timer").innerHTML = showTime;
        } else if (seconds <= 0) {
            seconds = 60;
            minutes -= 1;
            document.getElementById("timer").innerHTML = showTime;
        } else
            document.getElementById("timer").innerHTML = showTime;

    }, 1000);
}
