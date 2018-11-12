/* Задание со звездочкой */
 
/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */

function createDiv() {
    var elem = document.createElement('DIV');

    elem.classList.add('draggable-div');
    elem.setAttribute('draggable', 'true')
    elem.style.position = 'absolute';
    elem.style.width = `${getRandomArbitrary(10, 150)}px`;
    elem.style.height = `${getRandomArbitrary(10, 150)}px`;

    elem.style.top = `${getRandomArbitrary(10, 150)}px`;
    elem.style.left = `${getRandomArbitrary(10, 150)}px`;

    elem.style.backgroundColor = `rgb(${getRandomArbitrary(1, 255)}, 
    ${getRandomArbitrary(1, 255)}, ${getRandomArbitrary(1, 255)})`;

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    return elem;

}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
  
    target.addEventListener('dragstart', handleDragStart);
    target.addEventListener('dragend', handleDrop);

    function handleDragStart(e) {
        e.target.getBoundingClientRect();
        e.target.getBoundingClientRect();
    }
    function handleDrop(e) {
    
        this.style.top = e.pageY - this.offsetHeight / 2 +'px';
        this.style.left = e.pageX - this.offsetWidth / 2 +'px';
      
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
  
    const div = createDiv();

    homeworkContainer.appendChild(div);
  
    addListeners(div);

});

export {
    createDiv
};