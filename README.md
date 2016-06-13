Node.js API "КЛАДР в облаке"
============================

Node.js модуль для поиска по базе адресов КЛАДР через сервис [kladr-api.ru] [1].

Описание API
------------

Функция доступа к сервису


**new Kladr(opts)** - инициализация класса

Аргументы
* *opts* - Объект настроек
	* token - Токен доступа к сервису (по умолчанию null, указывается только для платной версии)
	
**Kladr.getData(query, cb)** - получение данных

Аргументы
* *query* - Объект запроса, который может содержать следующие поля:
	* parentType - тип родительского объекта для ограничения области поиска (region|district|city)
	* parentId - КЛАДР-идентификатор родительского объекта для ограничения области поиска
	* contentType - тип искомого объекта (region|district|city|street|building)
	* query - название искомого объекта или часть названия
	* withParent - получить объекты вместе с родителями (если true у объекта заполняется свойство Parent)
	* limit - ограничение количества возвращаемых объектов
* *cb* - Коллбэк-функция

Установка
---------

`````
npm install kladrapi-for-node
`````

Пример
------
Получение списка всех населённый пунктов, название которых начинается на "Ряз"
`````js

const kladrApi = require("kladrapi-for-node");

// для платной версии
const Kladr = new kladrApi({
    token: '51dfe5d42fb2b43e3300006e'
});

// для бесплатной версии
const Kladr = new kladrApi();


let q = {query: 'Ряз', contentType: 'city', withParent: 0};

Kladr.getData(q, (err, result)=>{
    console.log(err, result);
});

`````

[1]: http://kladr-api.ru/        "КЛАДР API"
