/*jshint -W117 */
(function () {
    'use strict';

    var module = angular.module('app')
        .controller('ContactController', ContactController);

    ContactController.$inject = ['TranslatorService', '$scope', '$stateParams'];

    function ContactController(TranslatorService, $scope, $stateParams) {

        console.log('ContactController');

        /*jshint validthis: true */
        var vm = this;
        vm.translate = translate;

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
            ymaps.ready(initializeMap);
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
            console.log('contact: translate: oldIso: ' + oldIso);
            console.log('contact: translate: language: ' + language);
            iso = language;
            TranslatorService.getTranslation(pageName, language).then(onTranslated, onError);
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

            // Добавляем метку на карту.
            prolaimMap.geoObjects.add(marker);
        }
    }

})();
