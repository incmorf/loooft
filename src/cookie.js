/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

//
function getCookie() {
    var cookies = document.cookie.split('; ').reduce((prev, current) => { 
        const [name, value] = current.split('=');

        prev[name] = value;
  
        return prev;
    }, {});
    
    return cookies;
}

filterNameInput.addEventListener('keyup', function() {
    listTable.innerHTML = '';
    if (filterNameInput.value !== '') {
  
        getFilterAllCookie(filterNameInput.value); 
  
    } else {
  
        getAllCookie(); 
    }
});

addButton.addEventListener('click', () => {

    let cookie = getCookie();

    if (cookie[addNameInput.value]) { 
  
        var date = new Date(new Date().getTime() + 3600 * 1000); 
        
        document.cookie = `${addNameInput.value}=${addValueInput.value}; path=/; expires=${date.toUTCString()};`; 
   
        let trs = listTable.querySelectorAll('tr'); 

        for (let i=0; i<trs.length; i++) { 
            if (trs[i].firstChild.innerHTML == addNameInput.value) { 
                if (addValueInput.value.indexOf(filterNameInput.value) < 0) {
                    trs[i].remove();         
                } else {
                    trs[i].firstChild.nextElementSibling.innerHTML = addValueInput.value;
                }
            }
        }
 
    } else {
        let date = new Date(new Date().getTime() + 3600 * 1000); 
        let inputNI = addNameInput.value;
        let inputVI = addValueInput.value;
        let inputF = filterNameInput.value;

        document.cookie = `${inputNI}=${inputVI}; path=/; expires=${date.toUTCString()};`;  
 
        if (inputNI.indexOf(inputF) >= 0 || inputVI.indexOf(inputF) >= 0) {
            createNodes(inputNI, inputVI); 
        }
 
    }
    
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
       
        let parents = e.target.parentNode;
        let firstChild = parents.firstChild;
        let cookieName = firstChild.textContent;

        deleteCookie(cookieName);
        e.target.parentNode.remove();
    }
});

function deleteCookie(name) {
   
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
   
}

function createNodes(name, value) {
    var tr = document.createElement('tr');

    listTable.appendChild(tr);

    var td = document.createElement('td');

    td.textContent = name;
    tr.appendChild(td);
    var td2 = document.createElement('td');

    td2.textContent = value;
    tr.appendChild(td2);

    var input = document.createElement('button');

    input.setAttribute('class', 'delete');
    input.innerHTML = 'delete';

    tr.appendChild(input);
}

function getFilterAllCookie(value) {
    let cookies = getCookie();

    for (let cookie in cookies) {
        if (cookie) {
            if (cookie.indexOf(value) >= 0 || cookies[cookie].indexOf(value) >= 0) {
                createNodes(cookie, cookies[cookie]);
            }
        }
    } 
}

function getAllCookie() {
    let cookies = getCookie();

    for (let cookie in cookies) {
        if (cookie) {
            createNodes(cookie, cookies[cookie]);
        }
    }
}
getAllCookie(); 