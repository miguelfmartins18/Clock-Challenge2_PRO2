window.onload = function () {

    const hourHand = document.querySelector('.hourHand');
    const minuteHand = document.querySelector('.minuteHand');
    const secondHand = document.querySelector('.secondHand');
    const time = document.querySelector('.time');
    const clock = document.querySelector('.clock');
    const bot = document.querySelectorAll('.bot');
    const amPm = document.getElementById('amPm');

    var i = 1;
    var nightMode = false;
    var timer;

    // Function to change hour according to timezones

    function setDate() {
        var AUTime = new Date().toLocaleString("en-US", {
            timeZone: "Australia/Sydney"
        });

        var NYTime = new Date().toLocaleString("en-US", {
            timeZone: "America/New_York"
        });

        var LXTime = new Date().toLocaleString("en-US", {
            timeZone: "Europe/Lisbon"
        });

        var AMSTime = new Date().toLocaleString("en-US", {
            timeZone: "Europe/Amsterdam"
        });

        var myArrayTimes = [NYTime, LXTime, AMSTime, AUTime];

        globalToday = myArrayTimes[i];
        const today = new Date(globalToday).toLocaleString("en-US");
        var myIndexOf = today.indexOf(':');
        var horas = parseInt(today.substring(myIndexOf - 2, myIndexOf));
        var second = '';
        var minute = '';
        var hour = '';
        var amPmValue = '';
        if (horas < 10) { // getting values from string
            second = today.substring(16, 18);
            minute = today.substring(13, 15);
            hour = today.substring(11, 12);
            amPmValue = today.substring(19, 21);
        } else {
            second = today.substring(17, 19);
            minute = today.substring(14, 16);
            hour = today.substring(11, 13);
            amPmValue = today.substring(20, 22);
        }

        // Pointer rotation

        const secondDeg = ((second / 60) * 360) + 360;
        secondHand.style.transform = 'rotate(' + secondDeg + 'deg)';

        const minuteDeg = ((minute / 60) * 360);
        minuteHand.style.transform = 'rotate(' + minuteDeg + 'deg)';

        const hourDeg = ((hour / 12) * 360);
        hourHand.style.transform = 'rotate(' + hourDeg + 'deg)';

        time.innerHTML = '<span>' + hour + ' : ' + minute + ' : ' + second + ' <small>' + amPmValue + '</small> ' + ' </span>';

        // Night Mode detection

        if (horas >= 8 && amPmValue === 'PM' && horas <= 11 && amPmValue === 'PM' || horas >= 0 && amPmValue === 'AM' && horas <= 6 && amPmValue === 'AM') {
            nightMode = true;
        } else {
            nightMode = false;
        }
    }

    setInterval(setDate, 1000);

    // Setting Night Mode
    function fn_nightMode() {
        var myBody = document.body;
        if (nightMode) {
            myBody.classList.add('bodyNight');
        } else {
            myBody.classList.remove('bodyNight');
        }
    }

    // remove menu active classes
    function removeCssClass() {
        var ul = document.getElementById('ul_bots');
        var items = ul.getElementsByTagName('li');
        for (var i = 0; i < items.length; ++i) {
            items[i].classList.remove('active');
        }
    }

    function addCssClass(id) {
        document.getElementById(id).classList.add("active");
    }

    // menu click event listener

    document.getElementById("ul_bots").addEventListener("click", function (e) {
        if (e.target && e.target.nodeName == "LI") {
            removeCssClass();
            addCssClass(e.target.id);
            i = e.target.id;
            timer = setTimeout(fn_nightMode, 1200);
        }
    });


};