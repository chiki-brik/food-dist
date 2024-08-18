function timer(id, deadLine) {
    // ---------------------------------------------------------------------------------------------------------

    //Timer
    //const deadLine = '2024-05-11';

    //функция, которая определяет разницу между дедлайном и нашим текущим временем
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // техническая перемменная - получаем кол-во мс остатка времени

        if (t <= 0) { // если время уже вышло - отображаем нули
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // 1000 - столько мс в секунде, 60 - секунд, 60 минут в часе, 24 часа // сколько дней в кол-ве мс
                hours = Math.floor((t / (1000 * 60 * 60)) % 24), // остаток от кол-во мс в часе. Остаток от целых суток
                minutes = Math.floor((t / (1000 * 60)) % 60), // остаток от мс в минутах
                seconds = Math.floor((t / 1000) % 60); // остаток от мс в секундах
        }

        return { // создаем и сразу возвращаем объект
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // доп.функция, которая будет подставлять нолик, если в таймере число однозначное
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    //функция, которая устанавливает наши часы на страницу
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector), //.timer
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); // раз в секунду запуск функции обновления часов на странице. Т.к. перед первым запуском пройдет 1 секунда - за это время пользователь может увидеть начальные значения -> верстка будет "мигать"


        updateClock(); // чтобы верстка не мигала пока ждет первую секунду

        // функция которая будет обновлять часы на странице
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { // если время вышло - отключаем таймер
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadLine);
}

export default timer;