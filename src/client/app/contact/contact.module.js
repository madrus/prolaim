/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['translator', '$scope', '$stateParams'];

    ////////////////////////////////////////////////////////

    function ContactController(translator, $scope, $stateParams) {

        console.log('ContactController');

        /*jshint validthis: true */
        var vm = this;
        vm.translate = translate;
        vm.prolaimMap = {};
        var ymapsScript = 'https://api-maps.yandex.ru/2.1.26/?load=package.standard&lang=uk-RU';

        // init
        var oldIso = $stateParams.language;
        console.log('contact: $stateParams.language: ' + oldIso);

        var iso = oldIso || 'ru';
        if (iso !== 'ru' && iso !== 'ua') {
            iso = 'ru';
        }

        activate();

        ////////////////////////////////////////////////

        function activate() {
            vm.translate(iso);

            loadScript(ymapsScript, function () {
                console.log('ymaps-loader has been loaded, now we are ymaps.ready');
                ymaps.ready(iniYmap);
            });
        };

        function loadScript(src, callback) {
            // make sure the ymaps script is loaded by the time we call it
            // otherwise by refreshing the contact page we get "undefined is not a function"
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (callback) script.onload = callback;
            document.getElementsByTagName("head")[0].appendChild(script);
            script.src = src;
        }

        function iniYmap() {
            // инициализируем карту
            vm.prolaimMap = initializeMap();
            // создаем маркер преприятия
            var marker = initializeMarker();
            // Добавляем метку на карту.
            vm.prolaimMap.geoObjects.add(marker);
        }

        function onTranslated(data) {
            if (data) {
                vm.data = data;
                vm.language = iso;
            } else {
                console.log('No data available from the translator');
            }
        }

        function onError(reason) {
            vm.error = 'Could not translate: ' + reason;
        }

        function translate(language) {
            var pageName = 'contact';
            oldIso = $stateParams.language; // if oldIso was not defined yet
            iso = language;
            translator.getTranslation(pageName, language).then(onTranslated, onError);
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
    }

})();
