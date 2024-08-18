function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // ---------------------------------------------------------------------------------------------------------

    // Slider

    // получить все элементы, с которыи будем работать
    // индекс, который будет определять текущий слайд
    // функция, которая будет заниматься показом наших слайдов(тут же будет скрытие других слайдов). Принимает индекс элемента, который будет показывать. Тут должна быть проверка на зацикленность 
    // обработчики событий на стрелки, которые вызывают предыдущую функцию

    //1 вариант
    // const slides = document.querySelectorAll('.offer__slide'),
    //       prev = document.querySelector('.offer__slider-prev'),
    //       next = document.querySelector('.offer__slider-next'),
    //       total = document.querySelector('#total'),
    //       current = document.querySelector('#current');

    // let slideIndex = 1; // номер длайда для отображения

    // showSlides(slideIndex); // инициализация для первого вызова функции

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block'; // либо можно пустые кавычки

    //     if (slideIndex < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) { // n это + или - единица
    //     showSlides(slideIndex += n)
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    //2 вариант - карусель

    // Navigation
    // получение как элемента вообще всего слайдера(индикаторы и прочее)
    // установление ему position: relative
    // обертка для точек навигации
    // при помощи цикла создавать кол-во точек, чтобы оно соответствовало кол-ву слайдов
    // соответствие точек по порядку слайдам
    // установление класса активности
    // при кликании на точки перемещение на соответствующий слайд
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width; // берем именно computedStyle, width инлайн стилей нам никак не поможет в этой ситуации. Нужно уже отрендеренное значение

    let slideIndex = 1; // номер длайда для отображения
    let offset = 0; // отступ , чтобы понимать на сколько мы сместились по слайдам

    // добавление для однозначного числа
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    //делаем длинную полосу в 100% для каждого слайда = 400 в этом случае. Чтобы они пролистывались как карусель
    slidesField.style.width = 100 * slides.length + '%'; // тут нужна ед.изм. т.к. это мы прописываем стили для css
    slidesField.style.display = 'flex'; // для формирования линии горизонтальной, а не вертикальной
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'; // чтобы показывался только сайт "окошка"

    slides.forEach(slide => {
        slide.style.width = width; // для каждого слайда устанавливаем ширину в "видимое окошко" нашей карусели. Чтобы видно было только один из всех слайдов
    });

    slider.style.position = 'relative'; // для навигации

    const indicators = document.createElement('ol'), // ordered list
          dots = []; // массив, куда будем складывать дотсы
    indicators.classList.add('carousel-indicators');
    // типо второй вариант вместо класса.???
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);

    // создаем все точки
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); // data-slide-to="4"
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        //  изначально показываем, что активна первая dot
        if(i == (slideIndex - 1)) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    function highlightDot(curIndex) { // подсвечивание дотса нужного
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[curIndex - 1].style.opacity = 1;
    }

    function numOfCurSlide(curIndex) { // отображение номера слайда на счетчике
        if (curIndex < 10) {
            current.textContent = `0${curIndex}`;
        } else {
            current.textContent = curIndex;
        }
    }

    function deleteNotDigits(value) {
        return +value.replace(/\D/g, '');
    }

    next.addEventListener('click',() => {

        if(offset == (deleteNotDigits(width)) * (slides.length - 1)) { // достигли 4го слайда. slice нужен потому что у нас width это строка по типу '500px'
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        // сдвигаем слайды
        slidesField.style.transform = `translateX(-${offset}px)`; // смещаем элемент влево

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        numOfCurSlide(slideIndex);
        highlightDot(slideIndex);
    });

    prev.addEventListener('click',() => {

        if(offset == 0) { // достигли 4го слайда. slice нужен потому что у нас width это строка по типу '500px'
            offset = (deleteNotDigits(width)) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        // сдвигаем слайды
        slidesField.style.transform = `translateX(-${offset}px)`; // смещаем элемент влево

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        numOfCurSlide(slideIndex);
        highlightDot(slideIndex);
    });

    // навигация при нажатии на сами dots
    dots.forEach(dot => {
        dot.addEventListener('click', (e) =>{
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo; // меняем значение тек.слайда
            offset = (deleteNotDigits(width)) * (slideTo - 1); // меняем значение отступа

            slidesField.style.transform = `translateX(-${offset}px)`; // назначаем сам отступ

            numOfCurSlide(slideIndex);
            highlightDot(slideIndex);
        });
    });
}

export default slider;