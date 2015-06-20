angular.module("prolaim.templates").run(["$templateCache", function($templateCache) {$templateCache.put("app/404/404.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/about/about.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/contact/contact.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.OFFICE.NAME }}</h3><p>{{ vm.data.OFFICE.ADDRESS }}</p><p>{{ vm.data.PHONES }}(044)406-38-44; (044)401-64-30; (044)502-94-54; (04598)63-800; (04598)58-828</p><p>{{ vm.data.EMAIL }}prolaim@ukr.net</p><h3>{{ vm.data.DEPOT.NAME }}</h3><p>{{ vm.data.DEPOT.ADDRESS }}</p><p>{{ vm.data.PHONES }}(04598)58-828; (044)406-38-44</p>{{ vm.error }}<h3>{{ vm.data.LOCATION }}</h3><div class=map><div id=prolaim-map></div></div></div>");
$templateCache.put("app/layout/shell.html","<section class=container><header id=header><div ui-view=header@shell></div></header><section><div class=row><aside id=sidebar class=col-md-2><div ui-view=sidebar@shell></div></aside><section id=content class=col-md-10><div ui-view=content></div></section></div></section><footer id=footer class=clearfix><div ui-view=footer@shell></div></footer></section>");
$templateCache.put("app/jobs/jobs.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/main/main.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/partners/partners.html","<div class=page-header><h1>{{ vm.data.TITLE }}</h1><h3>{{ vm.data.SUBTITLE }}</h3>{{ vm.error }}</div>");
$templateCache.put("app/layout/header/header.html","<div ui-view=topnav></div><div ui-view=navbar></div>");
$templateCache.put("app/layout/header/navbar.html","<nav class=\"navbar navbar-default\" id=navbar role=navigation><div class=container-fluid id=menu-border><div class=navbar-header><button type=button class=\"navbar-toggle collapsed\" ng-click=\"vm.navbarCollapsed = !vm.navbarCollapsed\"><span class=sr-only>{{ vm.data.MENU.TOGGLE }}</span> <span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button></div><div class=\"collapse navbar-collapse\" collapse=vm.navbarCollapsed><ul class=\"nav navbar-nav\"><li class=\"item active\" ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.CEMENT | uppercase }}<span class=sr-only>(current)</span></a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.POTASSIUM | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.MIXES | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.FILLING | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.MASH | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.OTHER | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.PRICES | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.DELIVERY | uppercase }}</a></li></ul></div></div></nav>");
$templateCache.put("app/layout/header/topnav.html","<nav class=\"navbar navbar-default\" id=topnav><div class=\"container-fluid topnav-left\"><div class=navbar-header><a class=navbar-brand ui-sref=shell.lang.content.main><img ng-src=images/prolaim.png></a></div><div class=\"collapse navbar-collapse\" collapse=vm.navbarCollapsed><ul class=\"nav navbar-nav\"><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.main>{{ vm.data.MENU.MAIN | uppercase }}<span class=sr-only>(current)</span></a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.about>{{ vm.data.MENU.ABOUT | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.partners>{{ vm.data.MENU.PARTNERS | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.jobs>{{ vm.data.MENU.JOBS | uppercase }}</a></li><li class=item ui-sref-active=active><a ui-sref=shell.lang.content.contact>{{ vm.data.MENU.CONTACT | uppercase }}</a></li></ul></div></div><div class=topnav-right><div class=\"nav navbar-nav navbar-right\" id=flags><input type=image ng-click=\"vm.setLanguageAndTranslate(\'ru\')\" ng-src=images/russia.png alt=Русский title=Русский> <input type=image ng-click=\"vm.setLanguageAndTranslate(\'ua\')\" ng-src=images/ukraine.png alt=Українська title=Українська></div><div class=pull-right><form class=\"navbar-form navbar-right\" role=search><div class=form-group><input type=text class=form-control placeholder=\"{{ vm.data.SEARCH_HINT }}\"></div><button type=submit class=\"btn btn-default\">{{ vm.data.SEARCH | uppercase }}</button></form></div></div></nav>");
$templateCache.put("app/layout/partials/content.html","<div ui-view></div>");
$templateCache.put("app/layout/partials/footer.html","<div class=center-block><h4>Здесь будет футер со всякого рода полезной информацией</h4><div><span class=\"glyphicon glyphicon-copyright-mark\" aria-hidden=true></span> <span class=sr-only>Copyright</span> {{ vm.data.COPYRIGHT }}</div>{{ vm.error }}</div>");
$templateCache.put("app/layout/partials/sidebar.html","<h4>Это - боковая панель, на которой клиенту будут предоставлены расширенные возможности для поиска</h4>");}]);