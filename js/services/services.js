const postData = async (url, data) => { // вынесли обращение к серверу в отдельную функцию, чтобы удобнее было что-то донастраивать // async - чтобы показать, что в функции будет асинхронный код
    const res = await fetch(url, { // res - promise // этот код асинхронный. Если сервер будет долго отвечать - переменной ничего не присвоится и в последующих действиях код сломается // await - указывает, что выполнения этой операции необходимо дождаться
        // async и await всегда! работают в паре
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data  //JSON.stringify(data)
    });

    return await res.json(); // await тут нужен, т.к. мы не знаем, сколько будет работать метод json. Данных для обработки может быть очень много
};

//const getResource = async (url) => {
async function getResource(url) {
    const res = await fetch(url);

    // обработка ошибок 404 и прочих для fetch(он ломается только на отсутствии инета или на полной отсутствии подклчюения к серверу)
    if (!res.ok) {
        throw new Error(`could not fetch ${url}, status: ${res.status}`); // объект ошибки
    }

    return await res.json();
};

export { postData };
export { getResource };