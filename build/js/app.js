/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim', [
        /* shared modules */
        'prolaim.core',

        /* feature areas */
        'prolaim.templates',
        'prolaim.shell',
        'prolaim.about',
        'prolaim.contact',
        'prolaim.jobs',
        'prolaim.main',
        'prolaim.partners',
        'prolaim.sidebar',
        'prolaim.content',
        'prolaim.footer',
        'prolaim.404'
    ]);

    angular.module('prolaim')
        .config(['$urlRouterProvider', '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {

                $urlRouterProvider
                    .when('', '/ru/main')
                    .when('/', '/ru/main')
                    .when('/ru', '/ru/main')
                    .when('/ru/', '/ru/main')
                    .when('/ua', '/ua/main')
                    .when('/ua/', '/ua/main')
                    //.otherwise('/ru/main');
                    .otherwise(function ($injector) {
                        $injector.get('$state')
                            .go('shell.lang.content.404', {}, {location: false});
                    });

                var shell = {
                    name: 'shell',
                    abstract: true,
                    url: '/',
                    templateUrl: 'app/layout/shell.html',
                    controller: 'Shell',
                    controllerAs: 'vm'
                };

                var language = {
                    name: 'shell.lang',
                    //url: '{language:[a-z]{2}}',
                    url: '{language:ru|ua}',
                    // These are the view definitions of the named views inside shell.html
                    // In such a way, they can be used as placeholders for other views below
                    views: {
                        'header@shell': {
                            templateUrl: 'app/layout/header/header.html'
                        },
                        'sidebar@shell': {
                            templateUrl: 'app/layout/partials/sidebar.html',
                            controller: 'Sidebar',
                            controllerAs: 'vm'
                        },
                        'content@shell': {
                            templateUrl: 'app/layout/partials/content.html',
                            controller: 'Content',
                            controllerAs: 'vm'
                        },
                        'footer@shell': {
                            templateUrl: 'app/layout/partials/footer.html',
                            controller: 'Footer',
                            controllerAs: 'vm'
                        },
                        'topnav@shell.lang': {
                            templateUrl: 'app/layout/header/topnav.html'
                        },
                        'navbar@shell.lang': {
                            templateUrl: 'app/layout/header/navbar.html'
                        }
                    },
                    resolve: {
                        language: function ($stateParams) {
                            return $stateParams.language;
                        }
                    }
                };

                var content = {
                    name: 'shell.lang.content',
                    url: '/',
                    abstract: true,
                    template: '<ui-view></ui-view>'
                };

                var main = {
                    name: 'shell.lang.content.main',
                    url: 'main',
                    templateUrl: 'app/main/main.html',
                    controller: 'Main',
                    controllerAs: 'vm'
                };

                var about = {
                    name: 'shell.lang.content.about',
                    url: 'about',
                    templateUrl: 'app/about/about.html',
                    controller: 'About',
                    controllerAs: 'vm'
                };

                var jobs = {
                    name: 'shell.lang.content.jobs',
                    url: 'jobs',
                    templateUrl: 'app/jobs/jobs.html',
                    controller: 'Jobs',
                    controllerAs: 'vm'
                };

                var contact = {
                    name: 'shell.lang.content.contact',
                    url: 'contact',
                    templateUrl: 'app/contact/contact.html',
                    controller: 'Contact',
                    controllerAs: 'vm'
                };

                var partners = {
                    name: 'shell.lang.content.partners',
                    url: 'partners',
                    templateUrl: 'app/partners/partners.html',
                    controller: 'Partners',
                    controllerAs: 'vm'
                };

                var p404 = {
                    name: 'shell.lang.content.404',
                    url: '404',
                    templateUrl: 'app/404/404.html',
                    controller: 'P404',
                    controllerAs: 'vm'
                };

                $stateProvider.state(shell);
                $stateProvider.state(language);
                $stateProvider.state(content);
                $stateProvider.state(main);
                $stateProvider.state(about);
                $stateProvider.state(jobs);
                $stateProvider.state(contact);
                $stateProvider.state(partners);
                $stateProvider.state(p404);

            }]);

})();

/*jshint -W117 */
(function() {
    'use strict';

    angular.module('prolaim.404', ['prolaim.config']);
})();

/*jshint -W117 */
(function() {
    'use strict';

    angular.module('prolaim.about', ['prolaim.config']);
})();

/*jshint -W117 */
(function() {
    'use strict';

    angular.module('prolaim.contact', ['prolaim.config']);
})();

(function () {
    'use strict';

    angular
        .module('app.core', [
            /* Cross-app modules */
            'blocks.exception',
            'blocks.logger',
            'blocks.router',
            /* 3rd-party modules */
            'ui.router',
            'ngResource',
            'ngplus'
        ]);

})();

(function () {
    'use strict';

    angular.module('prolaim.templates', []);
})();

/*jshint -W117 */
(function() {
    'use strict';

    angular.module('prolaim.jobs', ['prolaim.config']);
})();

/*jshint -W117 */
(function() {
    'use strict';

    angular.module('prolaim.shell', ['prolaim.config']);
})();

/*jshint -W117 */
(function() {
    'use strict';

    angular.module('prolaim.main', ['prolaim.config']);
})();

/*jshint -W117 */
(function() {
    'use strict';

    angular.module('prolaim.partners', ['prolaim.config']);
})();

(function () {
    'use strict';

    angular.module('prolaim.content', [])
        .controller('Content', Content);

    function Content() {
        console.log('Content placeholder');
    }

})();

/*jshint -W117 */
(function() {
    'use strict';

    angular.module('prolaim.footer', ['prolaim.config']);
})();

(function () {
    'use strict';

    angular.module('prolaim.sidebar', [])
        .controller('Sidebar', Sidebar);

    function Sidebar() {
        console.log('Sidebar placeholder');
    }

})();

/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.404')
        .controller('P404', P404);

    P404.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    ///////////////////////////////////////////////////////////////

    /* @ngInject */
    function P404(translator, languageService, defaultSettings) {

        console.log('P404: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'P404';
        var defaultLanguage;

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Oops! Non-existing page';

        activate();

        ////////////////////////////////////////////

        function activate() {
            console.log('defaultSettings.language = ' + defaultSettings.language);
            var iso = languageService.getLanguage() || defaultSettings.language;
            vm.translate(iso);
        }

        function translate(language) {
            return translator
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();

/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.about')
        .controller('About', About);

    About.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    ///////////////////////////////////////////////////////////////

    /* @ngInject */
    function About(translator, languageService, defaultSettings) {

        console.log('About: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'about';
        var defaultLanguage;

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'About Prolaim';

        activate();

        ////////////////////////////////////////////

        function activate() {
            console.log('defaultSettings.language = ' + defaultSettings.language);
            var iso = languageService.getLanguage() || defaultSettings.language;
            vm.translate(iso);
        }

        function translate(language) {
            return translator
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();

(function () {
    'use strict';

    angular.module('prolaim.config', []);

    angular.module('prolaim.config')
        .constant('defaultSettings', {
            language: 'ru'
        }
    );

})();

/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.contact')
        .controller('Contact', Contact);

    Contact.$inject = [
        'translator', 'languageService', 'mapService', 'defaultSettings'
    ];

    ////////////////////////////////////////////////////////

    function Contact(translator, languageService, mapService, defaultSettings) {

        console.log('Contact: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'contact';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.prolaimMap = {};
        vm.title = 'Contact Prolaim';

        activate();

        ////////////////////////////////////////////////

        function activate() {
            mapService.getMap();
            var iso = languageService.getLanguage() || defaultSettings.language;
            vm.translate(iso);
        }

        function translate(language) {
            return translator
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('prolaim.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$location', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $location, $q, exception, logger) {
        var readyPromise;

        var service = {
            getTranslation: getTranslation,
            ready: ready
        };

        return service;

        function getTranslation(pageName, language) {
            return $http.get('/api/' + pageName + '/' + language)
                .then(getTranslationComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getTranslation')(message);
                    $location.url('/');
                });

            function getTranslationComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getReady() {
            if (!readyPromise) {
                // Apps often pre-fetch session data ("prime the app")
                // before showing the first view.
                // This app doesn't need priming but we add a
                // no-op implementation to show how it would work.
                logger.info('Primed the app data');
                readyPromise = $q.when(service);
            }
            return readyPromise;
        }

        function ready(promise) {
            return getReady()
                .then(function() {
                    return promise ? $q.all(promise) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();

/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim')
        .factory('helper', helper);

    /////////////////////////////////////////////////////////////

    function helper() {

        var service = {};

        service.getLanguageFromPath = getLanguageFromPath;
        service.getRestOfPath = getRestOfPath;

        return service;

        ////////////////////////////////////////////

        function getLanguageFromPath(path) {
            if (!path) {
                return false;
            }
            var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (!languages || languages.length < 2) {
                return false;
            } else {
                return languages[1];
            }
        }

        function getRestOfPath(path) {
            if (!path) {
                return false;
            }
            var languages = path.match(/^\/(ru|ua)(\/.*)?/); // /ru or /ua optionally followed by /...
            if (!languages || languages.length < 3) {
                return false;
            } else {
                return languages[2];
            }
        }
    }
})();

/*jshint -W117 */
(function () {

    'use strict';

    angular.module('prolaim')
        .factory('languageService', languageService);

    languageService.$inject = ['$rootScope'];

    ///////////////////////////////////////////////

    function languageService($rootScope) {

        console.log('languageService: inside the service');

        /*jshint validthis: true */
        var service = this;

        service.getLanguage = getLanguage;
        service.setLanguage = setLanguage;

        return service;

        //////////////////////////////////

        function setLanguage(language) {
            if (language !== getLanguage()) {
                $rootScope.language = language;
                console.log('setLanguage called. Language changed to ' + language);
            } else {
                console.log('setLanguage called with same language = ' + language);
            }
        }

        function getLanguage() {
            var iso = $rootScope.language;
            console.log('$rootScope.language = ' + iso);
            return iso;
        }
    }

})();

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
        var ymapsSource = 'https://api-maps.yandex.ru/2.1.26/?load=package.standard&lang=uk-RU';
        loadScript(ymapsSource, function () {
            console.log('ymaps has been loaded, now we are ready');
            ymaps.ready(function () {
                // инициализируем карту
                map = initializeMap();
                // создаем маркер преприятия
                var marker = initializeMarker();
                // Добавляем метку на карту.
                console.log('before placing marker');
                map.geoObjects.add(marker);
                console.log('marker placed');
            });
        });

        console.log('map is ready to be returned to the caller');
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

})();


/*jshint -W117 */
(function () {

    'use strict';

    /**
     * translatorResource service (only $resource dependency)
     * no functions exposed to the outside world
     */
    angular.module('prolaim')
        .service('translatorResource', translatorResource);

    translatorResource.$inject = ['$resource'];

    //////////////////////////////////////////////////////////////

    function translatorResource($resource) {
        var pathToJsonFile = '../server/data/:fileName';
        return $resource(pathToJsonFile);
    }

    /////////////////////////////////////////////////////////

    /**
     * translator service (no $resource dependency)
     * getTranslation function is exposed to the outside world
     * and returns a promise object
     */
    angular.module('prolaim')
        .factory('translator', translator);

    translator.$inject = ['translatorResource', '$q'];

    /////////////////////////////////////////////////////////////////////

    function translator(translatorResource, $q) {

        var service = {};

        service.getTranslation = getTranslation;

        return service;

        //////////////////////////////////

        function getTranslation(pageName, language) {

            var deferred = $q.defer();
            var msg = 'page \'' + pageName + '\' into \'' + language + '\'';
            console.log('translator: translating ' + msg);
            var languageJsonFileName = pageName + '.' + language + '.json';

            translatorResource.get({fileName: languageJsonFileName}).$promise
                .then(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }
    }

})();

/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.jobs')
        .controller('Jobs', Jobs);

    Jobs.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    ////////////////////////////////////////////////////////

    /* @ngInject */
    function Jobs(translator, languageService, defaultSettings) {

        console.log('Jobs: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'jobs';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Prolaim job offers';

        activate();

        ////////////////////////////////////////////

        function activate() {
            var iso = languageService.getLanguage() || defaultSettings.language;
            vm.translate(iso);
        }

        function translate(language) {
            return translator
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();

/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.shell')
        .controller('Shell', Shell);

    Shell.$inject = [
        '$rootScope', '$location', '$state',
        'translator', 'languageService',
        'helper', 'defaultSettings'
    ];

    function Shell($rootScope, $location, $state,
                   translator, languageService,
                   helper, defaultSettings) {

        console.log('Shell: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var firstTime, iso, oldIso, path;

        vm.data = {
            language: ''
        };
        vm.setLanguageAndTranslate = setLanguageAndTranslate;
        vm.navbarCollapsed = true;

        activate();
        initWatch();

        /////////////////////////////////////////

        function setLanguageAndTranslate(language) {
            languageService.setLanguage(language);
            translate(language);
        }

        function activate() {
            init();
            console.log('shell: translate activated with language ' + iso);
            translate(iso);
        }

        /* INIT */
        function init() {
            console.log('inside init language function');

            var path = $location.path();
            console.log('shell: path from $location: ' + path);

            /* LANGUAGE and TRANSLATE */
            oldIso = helper.getLanguageFromPath(path);
            iso = oldIso || defaultSettings.language;
            languageService.setLanguage(iso);
        }

        /* WATCH */
        function initWatch() {
            $rootScope.$watch('language', function (newLanguage) {
                    console.log('$WATCH: watched language changed to ' + newLanguage);
                    translate(newLanguage);
                }
            );
        }

        function translate(language) {
            var pageName = 'header';
            var currentState = $state.current;
            path = $location.path(); // if path was not defined yet
            console.log('shell: path: ' + path);
            oldIso = helper.getLanguageFromPath(path); // if oldIso was not defined yet
            iso = language; // save the choice

            translator.getTranslation(pageName, language).then(function (data) {
                if (data) {
                    vm.data = data;
                    if (iso !== oldIso) {
                        $location.path(iso).replace();
                    }
                    console.log('shell: path after relocation: ' + $location.path());
                    return vm.data;
                }
            });

            var lang = helper.getLanguageFromPath(path);
            var rest = helper.getRestOfPath(path);
            //var urlMatcher = new $urlMatcherFactory.compile('^\/(ru|ua)(\/.*)?', {caseInsensitive: false});
            console.log('lang: ' + lang + ', rest: ' + rest);

            var newPath = '/' + iso + rest;
            console.log('newPath: ' + newPath);

            if (oldIso !== iso) {
                console.log('relocating to ' + newPath);
                $location.path(newPath).replace();
            }

            $state.reload(currentState); //TODO check if 'reload' is the way
        }
    }
})();

/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.main')
        .controller('Main', Main);

    Main.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    ////////////////////////////////////////////////////////

    /* @ngInject */
    function Main(translator, languageService, defaultSettings) {

        console.log('Main: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'main';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Prolaim main page';

        activate();

        ////////////////////////////////////////////

        function activate() {
            var iso = languageService.getLanguage() || defaultSettings.language;
            vm.translate(iso);
        }

        function translate(language) {
            return translator
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();

/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.partners')
        .controller('Partners', Partners);

    Partners.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    ///////////////////////////////////////////////////////

    /* @ngInject */
    function Partners(translator, languageService, defaultSettings) {

        console.log('Partners: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'partners';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Partners of Prolaim';

        activate();

        ////////////////////////////////////////////

        function activate() {
            var iso = languageService.getLanguage() || defaultSettings.language;
            vm.translate(iso);
        }

        function translate(language) {
            return translator
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();

/*jshint -W117 */
(function () {
    'use strict';

    angular.module('prolaim.footer')
        .controller('Footer', Footer);

    Footer.$inject = [
        'translator', 'languageService', 'defaultSettings'
    ];

    /////////////////////////////////////////////////////

    /* @ngInject */
    function Footer(translator, languageService, defaultSettings) {
        console.log('Footer: inside the controller');

        /*jshint validthis: true */
        var vm = this;
        var pageName = 'footer';

        /* here we specify what the view needs */
        vm.data = {
            LANGUAGE: ''
        };
        vm.translate = translate;
        vm.title = 'Prolaim footer';

        activate();

        ////////////////////////////////////////////

        function activate() {
            var iso = languageService.getLanguage() || defaultSettings.language;
            vm.translate(iso);
        }

        function translate(language) {
            return translator
                .getTranslation(pageName, language)
                .then(function (data) {
                    if (data) {
                        vm.data = data;
                        return vm.data;
                    }
                });
        }
    }

})();

angular.module("prolaim.templates").run(["$templateCache", function($templateCache) {$templateCache.put("app/404/404.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/about/about.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/contact/contact.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.OFFICE.NAME }}</h3><p>{{ vm.data.OFFICE.ADDRESS }}</p><p>{{ vm.data.PHONES }}(044)406-38-44; (044)401-64-30; (044)502-94-54; (04598)63-800; (04598)58-828</p><p>{{ vm.data.EMAIL }}prolaim@ukr.net</p><h3>{{ vm.data.DEPOT.NAME }}</h3><p>{{ vm.data.DEPOT.ADDRESS }}</p><p>{{ vm.data.PHONES }}(04598)58-828; (044)406-38-44</p>{{ vm.error }}<h3>{{ vm.data.LOCATION }}</h3><div class=map><div id=prolaim-map></div></div></div>");
$templateCache.put("app/jobs/jobs.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/main/main.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/layout/shell.html","<section class=container><header id=header><div ui-view=header@shell></div></header><section><div class=row><aside id=sidebar class=col-md-2><div ui-view=sidebar@shell></div></aside><section id=content class=col-md-10><div ui-view=content></div></section></div></section><footer id=footer class=clearfix><div ui-view=footer@shell></div></footer></section>");
$templateCache.put("app/partners/partners.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/layout/header/header.html","<div ui-view=topnav></div><div ui-view=navbar></div>");
$templateCache.put("app/layout/header/navbar.html","<nav class=\"navbar navbar-default\" id=navbar role=navigation><div class=container-fluid id=menu-border><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" ng-click=\"vm.navbarCollapsed = !vm.navbarCollapsed\"><span class=sr-only>{{ vm.data.MENU.TOGGLE }}</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button></div><div class=\"collapse navbar-collapse\" collapse=vm.navbarCollapsed><ul class=\"nav navbar-nav\"><li class=\"item active\" ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.CEMENT | uppercase }}<span class=sr-only>(current)</span></a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.POTASSIUM | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.MIXES | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.FILLING | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.MASH | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.OTHER | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.PRICES | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.DELIVERY | uppercase }}</a></li></ul></div></div></nav>");
$templateCache.put("app/layout/header/topnav.html","<nav class=\"navbar navbar-default\" id=topnav><div class=\"container-fluid topnav-left\"><div class=navbar-header><a class=navbar-brand ui-sref=shell.lang.content.main><img ng-src=/src/client/images/prolaim.png></a></div><div class=\"collapse navbar-collapse\" collapse=vm.navbarCollapsed><ul class=\"nav navbar-nav\"><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.MAIN | uppercase }}<span class=sr-only>(current)</span></a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.about>{{ vm.data.MENU.ABOUT | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.partners>{{ vm.data.MENU.PARTNERS | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.jobs>{{ vm.data.MENU.JOBS | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.contact>{{ vm.data.MENU.CONTACT | uppercase }}</a></li></ul></div></div><div class=topnav-right><div class=\"nav navbar-nav navbar-right\" id=flags><input type=image ng-click=\"vm.setLanguageAndTranslate(\'ru\')\" ng-src=/src/client/images/russia.png alt=Русский title=Русский> <input type=image ng-click=\"vm.setLanguageAndTranslate(\'ua\')\" ng-src=/src/client/images/ukraine.png alt=Українська title=Українська></div><div class=pull-right><form class=\"navbar-form navbar-right\" role=search><div class=form-group><input type=text class=form-control placeholder=\"{{ vm.data.SEARCH_HINT }}\"></div><button type=submit class=\"btn btn-default\">{{ vm.data.SEARCH | uppercase }}</button></form></div></div></nav>");
$templateCache.put("app/layout/partials/content.html","<div ui-view></div>");
$templateCache.put("app/layout/partials/footer.html","<div class=center-block><h4>Здесь будет футер со всякого рода полезной информацией</h4><div><span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=true></span> <span class=sr-only>Copyright</span> {{ vm.data.COPYRIGHT }}</div>{{ vm.error }}</div>");
$templateCache.put("app/layout/partials/sidebar.html","<h4>Это - боковая панель, на которой клиенту будут предоставлены расширенные возможности для поиска</h4>");}]);