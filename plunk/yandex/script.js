//<script src="http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU" type="text/javascript"></script>

ymaps.ready(init);

function init() {

    var myMap = new ymaps.Map("map", {
        center: [48.568388, 39.309111],
        zoom: 13
    });

    myMap.behaviors.enable('scrollZoom');

    myMap.controls
        // Кнопка изменения масштаба.
        .add('smallZoomControl');

    myPlacemark2 = new ymaps.Placemark([48.568388, 39.309111], {
        // Свойства.
        iconContent: '1',
        balloonContent: 'Балун',
        hintContent: 'Собственный значок метки'
    }, {
        // Опции.
        // Своё изображение иконки метки.
        iconImageHref: 'images/phone.png',
        // Размеры метки.
        iconImageSize: [30, 30],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-15, -25]
    });

    myPlacemark3 = new ymaps.Placemark([48.566895, 39.316765], {
        // Свойства.
        iconContent: '1',
        balloonContent: 'Балун',
        hintContent: 'Собственный значок метки'
    }, {
        // Опции.
        // Своё изображение иконки метки.
        iconImageHref: 'images/phone.png',
        // Размеры метки.
        iconImageSize: [30, 30],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-15, -25]
    });

    // Добавляем все метки на карту.
    myMap.geoObjects
        .add(myPlacemark3)
        .add(myPlacemark2);
}

