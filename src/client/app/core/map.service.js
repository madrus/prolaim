/*jshint -W117 */
(function () {
    'use strict';

    angular
        .module('prolaim.core')
        .factory('mapService', mapService);

    mapService.$inject = ['logger'];

    ///////////////////////////////////////

    function mapService(logger) {
        /*jshint validthis: true */
        var service = this;

        service.getMap = getMap;

        return service;

        ////////////////////////

        function getMap() {
            var map;
            var ymapsSource = 'https://api-maps.yandex.ru/2.1.26/?load=package.standard&lang=uk-RU';
            loadScript(ymapsSource, function () {
                console.log('ymaps has been loaded, now we are ready');
                ymaps.ready(function () {
                    // инициализируем карту
                    map = initializeMap();
                    // создаем маркер преприятия
                    var marker = initializeMarker();
                    // Добавляем метку на карту.
                    map.geoObjects.add(marker);
                    console.log('marker placed');
                });
            });

            console.log('map is ready to be returned to the caller');
            logger.info('Map is ready');
            return map;
        }

        function loadScript(ymapsSource, callback) {
            // make sure the ymaps script is loaded by the time we call it
            // otherwise by refreshing the contact page we get "undefined is not a function"
            var mapScript = document.createElement('script');
            mapScript.type = 'text/javascript';
            //if (angular.isFunction(callback)) {
            //    mapScript.onload = callback;
            //}
            mapScript.onload = mapScript.onloadstatechange = function () {
                if (mapScript.readyState &&
                    mapScript.readyState !== 'complete' &&
                    mapScript.readyState !== 'loaded') {
                    return;
                }
                // если все загрузилось, то снимаем обработчик и выбрасываем callback
                mapScript.onload = mapScript.onloadstatechange = null;
                if (angular.isFunction(callback)) {
                    callback();
                }
            };
            mapScript.async = true;
            mapScript.src = ymapsSource;
            document.getElementsByTagName('head')[0].appendChild(mapScript);
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

            console.log('before ymaps.Map');
            var prolaimMap = new ymaps.Map(mapContainer, config);
            console.log('after ymaps.Map');
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

            console.log('marker initialized');
            return marker;
        }
    }
})();

