### Проблема

Closure

Из-за наличия `setTimeout`, функция `callback` выполнялась после завершения цикла `for (i = 0; i < 3; i++)`. 
Так как `callback` обращается к глобальной переменной `request` по ссылке, то все вызовы `callback` получали 
значение '/populations' (последнее на момент завершения цикла).

### Решение

Immediately Invoked Function Expression

Заменяем
```javascript
var x = ...;
var callback = function (...) {
    // use x	
}
```
на
```javascript
var x = ...;
var callback = function (x) {
	return function (...) {
		// use x	
	}
} (x);
```

### Как избежать в будущем

Видимо, использовать IIFE. И не пытаться выстрелить себе в ногу.
