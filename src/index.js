import {
    SSL_OP_SSLEAY_080_CLIENT_DH_BUG
} from 'constants';

/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
    var newElem = document.createElement('div');

    newElem.textContent = text;
    
    return newElem;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в переметре what в начало элемента, переданного в параметре where

 Пример:
prepend(document.querySelector('#one'), document.querySelector('#two')) 
 */
function prepend(what, where) {
    var parentElement = where;
    var firstChild = parentElement.firstChild;

    parentElement.insertBefore(what, firstChild);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоя

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>

   findAllPSiblings(document.body) // функция должна вернуть массив с э
 */
function findAllPSiblings(where) {
    var newArr = [];

    for (var i = 0; i < where.childNodes.length - 1; i++) {
        var elem = where.childNodes[i];

        if (elem.nextElementSibling.tagName === 'P') {
            newArr.push(elem);
        }
    }

    return newArr;
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" 
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </dody>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
    var result = [];

    for (var child of where.childNodes) {
        if (child.nodeType === 1) {
            result.push(child.innerText);
        }
    }

    return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    for (var i = 0; i < where.childNodes.length; i++) {
        var elem = where.childNodes[i];

        if (elem.nodeType === 3) {
            elem.parentNode.removeChild(elem);
        }
    }
}

/*
 Задание 6:

 Выполнить предудыщее задание с использование рекурсии - 

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    if (where) {
        for (var i = 0; i < where.childNodes.length; i++) {

            if (where.childNodes[i].nodeType === 3) {
                where.childNodes[i].parentElement.removeChild(where.childNodes[i]);
            }
            if (where.childNodes[i] && where.childNodes[i].hasChildNodes() === true) {
                deleteCurrNodes(where.childNodes[i]);
            }
            deleteTextNodesRecursive(where.childNodes[i]);
        }
    }

    function deleteCurrNodes(where) {
        for (var i = 0; i < where.childNodes.length; i++) {
            if (where.childNodes[i].nodeType === 3) {
                where.childNodes[i].parentElement.removeChild(where.childNodes[i]);
            }
        }
    }
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
function collectDOMStat(root) {}

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};