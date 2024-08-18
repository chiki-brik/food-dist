function openModal (modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show'); // делаем не через toggle, т.к. изначально нет никакого класса
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // чтобы при открытии модального окна не скролился задний фон, сам сайт

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); // если пользователь открыл окно до того, как оно открылось по таймеру - таймер сбрасываем, чтобы не мелькать пользователю одно и то же, ведь он уже посмотрел модальное окно
    }
    
};

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    
    modal.classList.add('hide'); 
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    // ---------------------------------------------------------------------------------------------------------

    //Modal
    const modalTrigger = document.querySelectorAll(triggerSelector), // квадратные скобки для дата-атрибута
          modal = document.querySelector(modalSelector);
          //modalCloseBtn = document.querySelector('[data-close]');         // крестик не будет реагировать на старые обработчики событий и закрывать окно. Потому что этот элемент создан динамически - ПРОБЛЕМА МОДАЛЬНОГО ОКНА С БАЛГОДАРНОСТЬЮ!!!!!
    
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
        // btn.addEventListener('click', () => {
        //     modal.classList.add('show'); // делаем не через toggle, т.к. изначально нет никакого класса
        //     modal.classList.remove('hide');
        //     document.body.style.overflow = 'hidden'; // чтобы при открытии модального окна не скролился задний фон, сам сайт
        // });
    });

    // modalCloseBtn.addEventListener('click', () => {
    //     closeModal();
    // });
    // можно иначе вызвать
    // modalCloseBtn.addEventListener('click', closeModal); // крестик не будет реагировать на старые обработчики событий и закрывать окно. Потому что этот элемент создан динамически - ПРОБЛЕМА МОДАЛЬНОГО ОКНА С БАЛГОДАРНОСТЬЮ!!!!!

    modal.addEventListener('click', (e) => { // чтобы модальное окно закрывалось при клике вне окна, на "подложку"
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // modal-dialog это само модальное окно, modal - все остальное(хотя по идее наклыдвается... но видимо так низя)
        // если в callback не передать e, и указать внутри event.target - все равно будет будет работать.  Но это считается плохой практикой. Идет отход от стандарта, возможно такой код будет не везде работать
        // крестик не будет реагировать на старые обработчики событий и закрывать окно. Потому что этот элемент создан динамически - ПРОБЛЕМА МОДАЛЬНОГО ОКНА С БАЛГОДАРНОСТЬЮ!!!!! - добавляем условие | e.target.getAttribute('data-close') == ''
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { // хотим закрывать модальное окно, если нажимается Esc на клавиатуре
        if (e.code === 'Escape' && modal.classList.contains('show')) { // второе условие - что модальное окно открыто
            closeModal(modalSelector);
        }
    });

    function showModalByScroll () { 
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {// scrollY - > pageYOffset - это прокрученная пользователем часть / clientHeight - видимая часть, которая отображается прямо сейчас на сайте, без какой-либо прокрутки >= scrollHeight - сколько промотано?
            // иногда в правой части условия добавляют -1, для некоторых мониторов / бравузеров
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // убираем обработчик, как тольк он один раз выполнился
        }
    }

    // чтобы модальное окно открылось, когда пользователь скролит
    window.addEventListener('scroll', showModalByScroll); // отслеживаем собитие скролл, в callback-е будем отслеживать конец страницы
    // , {once: true} - событие выполнится только 1 раз. Но тут оно не подходит, т.к. оно отловит первый "скролл" на windows, который конечно же не попадет под условие

}

export default modal;
export {closeModal};
export {openModal};