/*jshint -W117 */
(function () {
    'use strict';

    // app.contact
    //
    var ContactController = function (TranslatorFactory, $scope, $stateParams) {
        // init
        var oldIso = $stateParams.language;
        console.log('contact: $stateParams.language: ' + oldIso);

        var iso = oldIso || 'ua';
        if (iso !== 'ru' && iso !== 'ua') {
            iso = 'ua';
        }

        var pageName = 'contact';
        var vm = this;
        vm.prolaimMap = null;

        var onTranslated = function (data) {
            if (data) {
                vm.data = data;
                vm.language = iso;
            } else {
                console.log('No data available from the translator');
            }
        };

        var onError = function (reason) {
            vm.error = 'Could not translate';
        };

        vm.translate = function (language) {
            oldIso = $stateParams.language; // if oldIso was not defined yet
            console.log('contact: translate: oldIso: ' + oldIso);
            console.log('contact: translate: language: ' + language);
            iso = language;
            TranslatorFactory.getTranslation(pageName, language).then(onTranslated, onError);
        };

        // Дождёмся загрузки API и готовности DOM.
        var initializeMap = function () {
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

            var prolaim = new ymaps.Map(mapContainer, config);
            //prolaim.controls.add('routeEditor');

            //var zoomOffset = -3;
            //var miniMap = new ymaps.MiniMap(zoomOffset);
            //prolaim.controls.add('miniMap');

            var geoObject = new ymaps.GeoObject({
                // Описание геометрии
                geometry: {
                    type: 'Point',
                    coordinates: [50.381229, 30.340011]
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
            prolaim.geoObjects.add(geoObject);
        };

        var activate = function () {
            vm.translate(iso);
            ymaps.ready(initializeMap);
        };

        activate();
    };

    var module = angular.module('app.contact', []);
    module.$inject = ['TranslatorFactory', '$scope', '$stateProvider'];
    module.controller('ContactController', ContactController);
})();
