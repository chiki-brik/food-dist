import { getResource } from "../services/services";

function cards() {
    // ---------------------------------------------------------------------------------------------------------

    //Use classes for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price; // тут можно сделать доп.преобразования, если вдруг в цене число
            this.classes = classes; // это массив rest-элементов. Это будут классы для создаваемого div-элемента
            this.parent = document.querySelector(parentSelector); // тут лежит DOM-элемент. Родитель нашего создаваемого элемента на странице
            this.transfer = 93.9; // сколько рублей в доларе
            this.changeToRUB(); // можно вызывать и в другом месте. Изначально цена приходит в доларах
        }

        changeToRUB() {
            this.price = Math.floor(this.price * this.transfer);
        }

        render() { // формирование верстки
            const element = document.createElement('div'); // этот div по идее и есть menu__item(сейчас убрали этот класс!!!), но мы создаем дополнительный внешний

            // устанавливает значение по-умолчанию для классов
            if (this.classes.length === 0) this.classes.push('menu__item');

            this.classes.forEach(className => element.classList.add(className)); // каждый класс добавляем по одному к созданному div-элементу

            // сюда вставим весь нужный html-код
            element.innerHTML = ` 
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    //1 var
    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // obj как аргумент. Но вместо этого делает деструктуризацию
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    //2 var
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));


    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => { 
    //         const element = document.createElement("div");

    //         const transfer = 93.9;

    //         price = Math.floor(price * transfer); 

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> руб/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    //3й var
    // библиотека axios

    //переменная axios будет получена из доп.скрипта, где мы подрубали библиотеку(до этого скрипта)
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({ img, altimg, title, descr, price }) => { // obj как аргумент. Но вместо этого делает деструктуризацию 
    //             // data.data - потому что axios.get возвращает объект с полем data,  где содержатся все данные, переданные с сервера. Мы туда опускаемся
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    // const div = new MenuCard();
    // div.render(); // долгий вариант

    // НИЖЕ ДОЛГИЙ НЕОПТИМАЛЬНЫЙ ВАРИАНТ
    // если объект используется только на месте - переменная не нужна. Краткая запись
    // new MenuCard(
    //     "img/tabs/vegy.jpg", // передаем в кавычках!
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством',
    //     7,
    //     '.menu .container',
    //     'menu__item', // это тоже класс
    //     'big' // дополнительный класс!!!! для теста
    // ).render();

    // new MenuCard(
    //     "img/tabs/elite.jpg", // передаем в кавычках!
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     14,
    //     '.menu .container',
    //     'menu__item',
    //     'menu__item' // будет добавлен только 1 раз
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg", // передаем в кавычках!
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     10,
    //     '.menu .container'
    //     // тут никакой класс не передали
    // ).render();
}

export default cards;