import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
    // ---------------------------------------------------------------------------------------------------------

    //Forms

    const forms = document.querySelectorAll(formSelector); // получаем все формы со страницы

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'thnx. We will contact you soon',
        failure: 'smth went wrong..'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData (form) {
        form.addEventListener('submit', (e) => { // submimt enter или мышь при попытке отправки формы. В верстке, если кнопка сделана тэгом button, то у нее автоматически стоит type - submit.
            e.preventDefault(); // чтобы страница не перезагружалась автоматически при отправке формы

            // создание блока для оповещения пользователя о статусе отправки формы
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage); // так в форме все едет. То что ниже - чтобы после формы вставлялось
            form.insertAdjacentElement('afterend', statusMessage); // afterend - после формы, statusMessage - что вставляем

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            //request.setRequestHeader('Content-type', 'multipart/form-data'); // для работы с formData именной такой тип. Но когда идет связка XMLHttpRequest с formData - заголовок устанавливать не нужно! Он устанавливается автоматически
            //request.setRequestHeader('Content-type', 'application/json'); // - ЭТО ЕСЛИ НУЖЕН JSON НА BACKEND
            const formData = new FormData(form); // форма, из которой собираем данные. У input этой формы обязательно должен быть указан атрибут name, которые не должны повторяться

            // конвертируем formData в json - ЭТО ЕСЛИ НУЖЕН JSON НА BACKEND
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });

            //const json = JSON.stringify(object);

            // fetch('server.php', {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(object)
            // })
            postData('http://localhost:3000/requests', json)
            //.then(data => data.text())
            .then(data => { //success. data - то, что возвращает сервер при success
                console.log(data);
                showThanksModal(message.success); 
                statusMessage.remove();
            }).catch(() => { // fail. ОСОБЕННОСТЬ FETCH - PROMISE НЕ ПЕРЕЙДЕТ В СОСТОЯНИЕ ОТКЛОНЕНО ИЗ-ЗА ОТВЕТА HTTP, КОТОРЫЙ СЧИТАЕТСЯ ОШИБКОЙ(404Б 500Б 501 И Т.Д.). ЕДИНСТВЕННОЕ, ЧТО ПОМЕНЯЕТСЯ, ЭТО СВОЙСТВО СТАТУС, КОТОРОЕ ПЕРЕЙДЕТ В СОСТОЯНИЕ FALSE. ОБРАБАТЫВАЕТ CATCH ЕСЛИ ТОЛЬКО СОВСЕМ НЕ УДАЛОСЬ ВЫПОЛНИТЬ ЗАПРОС(ТИПО НЕТ ИНЕТА)
                showThanksModal(message.failure); 
            }).finally(() => {
                form.reset(); 
            }); // Response {type: 'basic', url: 'http://localhost/food/server.php', redirected: false, status: 200, ok: true, …} ---> если не делать .then(data => data.text())
            //array(2) {
            //   ["name"]=>
            //   string(16) "Fedyushina ALINA"
            //   ["phone"]=>
            //   string(18) "+7 (111) 111-11-11"
            // }

            //request.send(json); // тут был formData - ЭТО ЕСЛИ НУЖЕН JSON НА BACKEND

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response); //array(0) {} - при request.setRequestHeader('Content-type', 'multipart/form-data');, хотя success. Но данные не отправились
            //         // когда все получилось:
            //         //array(2) {
            //         //["name"]=>
            //         //string(16) "Fedyushina ALINA"
            //         //["phone"]=>
            //         //string(18) "+7 (111) 111-11-11"
            //         //}
            //         showThanksModal(message.success); // statusMessage.textContent =
            //         form.reset(); // очищаем форму после успешной отправки
            //         //setTimeout(() => { // убираем информационное сообщение через 2 секунды
            //         statusMessage.remove();
            //         //}, 2000);
            //     } else {
            //         showThanksModal(message.failure); // statusMessage.textContent =
            //     }
            // });
        });
    }

    // красивое оповещение пользователя
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); // скрыли предыдущий контент. Все окно
        openModal('.modal', modalTimerId); // заново открываем??? модальное окно, класс modal
        
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove(); // черещ 4 сек удаляем окно благодарности
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    // GET
    // fetch('https://jsonplaceholder.typicode.com/todos/1') // из этой конструкции возвращается именно промис. get- запрос по-умолчанию
    //   .then(response => response.json()) // response.json() превращает в js-object, типа parse, Но! с особенностью - она возвращает промис!!! Потому что неизвестно сколько времени json будет превращатсья в объект
    //   // вместо json можно использовать: 1 text() и некоторые другие..
    //   .then(json => console.log(json)); // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}

    //POST
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: "POST",
    //     body: JSON.stringify({name: 'alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // }) 
    // .then(response => response.json()) 
    // .then(json => console.log(json)); // {name: 'alex', id: 101}

    // ---------------------------------------------------------------------------------------------------------

    // Requests to DB

    // fetch('http://localhost:3000/menu') // тут возвращается промис // изначально было db.json -> потом поменяли на то, что вышло в json-servere как endPoint
    //     .then(data => data.json()) // данные от сервера конвертиурем в объект(приходит изначально json)
    //     .then(res => console.log(res));
}

export default forms;