/*jshint -W117 */
(function () {

    'use strict';

    angular.module('prolaim')
        .factory('mapService', mapService);

    ///////////////////////////////////////

    function mapService() {
        var service = {};

        service.getMap = getMap;

        return service;
    }

    function getMap() {
        var map;
        var ymapsScript = 'https://api-maps.yandex.ru/2.1.26/?load=package.standard&lang=uk-RU';
        loadScript(ymapsScript, function () {
            console.log('ymaps-loader has been loaded, now we are ymaps.ready');
            ymaps.ready(function () {
                // инициализируем карту
                map = initializeMap();
                // создаем маркер преприятия
                var marker = initializeMarker();
                // Добавляем метку на карту.
                map.geoObjects.add(marker);
            });
        });
        return map;
    }

    // Дождёмся загрузки API и готовности DOM.
    function initializeMap() {
        var mapContainer = document.getElementById('prolaim-map');
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ('prolaim-map').
        var config = {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: [50.381329, 30.340411], // Вишневое
            zoom: 16,
            // включаем масштабирование карты колесом
            behaviors: ['default', 'scrollZoom']
        };

        var prolaimMap = new ymaps.Map(mapContainer, config);
        //prolaimMap.controls.add('routeEditor');

        //var zoomOffset = -3;
        //var miniMap = new ymaps.MiniMap(zoomOffset);
        //prolaimMap.controls.add('miniMap');
        return prolaimMap;
    }

    function initializeMarker() {
        var marker = new ymaps.GeoObject({
            // Описание геометрии
            // geometry: {
            //     type: 'Point',
            //     coordinates: [50.381229, 30.340011]
            // },
            geometry: {
                type: 'Point',
                coordinates: [50.381366, 30.340078]
            },
            // Свойства
            properties: {
                // Контент метки
                iconContent: 'Офис и склад-магазин'
            }
        }, {
            // Опции
            // Иконка метки будет растягиваться под размер ее содержимого.
            //preset: 'islands#blackStretchyIcon',
            preset: 'islands#darkorangeStretchyIcon',
            //iconColor: '#a5260a',
            // Метку можно перемещать.
            draggable: true
        });

        return marker;
    }

    function loadScript(src, callback) {
        // make sure the ymaps script is loaded by the time we call it
        // otherwise by refreshing the contact page we get "undefined is not a function"
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (callback) script.onload = callback;
        document.getElementsByTagName("head")[0].appendChild(script);
        script.src = src;
    }

})();