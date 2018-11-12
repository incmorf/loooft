/* ДЗ 2 - работа с массивами и объеектами */
/*
 Задание 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i=0;i<array.length;i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:
 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var newArray = [];

    for (let i=0;i<array.length;i++) {
        newArray.push(fn(array[i], i, array));
    }
    
    return newArray;
}

/*
 Задание 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 Кроме callback, методу можно передать «начальное значение» – аргумент initialValue. 
 Если он есть, то на первом вызове значение previousValue будет равно initialValue, 
 а если у reduce нет второго аргумента, то оно равно первому элементу массива, а перебор начинается со второго.
 */

function reduce(array, fn, initial) {
    var previousValue = initial || array[0];
    var i;

    (previousValue === array[0]) ? i=1 : i=0;

    for (;i<array.length;i++) {
        previousValue = fn(previousValue, array[i], i, array);
    }
    
    return previousValue;

}

/*
 Задание 4:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива
 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var newArray = [];

    for (var key in obj) {
        newArray.push(key.toUpperCase());
    }
    
    return newArray;
}

/*
 Задание 5 *:
 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to) {
    var newArray = [];
 
    if (Math.abs(from) > array.length && from < 0) {
        from = 0;
    } else if (from < 0) {
        from += array.length;
    } else if (from > array.length) {
        from = array.length
    } 

    if (Math.abs(to) > array.length && to < 0) {
        to = 0
    } else if (to < 0) {
        to += array.length;
    } else if (to > array.length || to === undefined) {
        to = array.length;
    }
    
    for (let i = from; i<to; i++) {
        newArray.push(array[i]);
    }
    
    return newArray;
}
/*
 Задание 6 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {

    let proxy = new Proxy(obj, {
   
        set(target, prop, value) {
            target[prop] = value*value;
            
            return true;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
