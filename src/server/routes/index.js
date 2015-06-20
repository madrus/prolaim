module.exports = function(app) {
    var api = '/api';
    var data = '/../../data/';
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.get(api + '/:pageName/:language', getTranslation);

    function getTranslation(req, res, next) {
        var pageName = req.params.pageName;
        var language = req.params.language;
        var jsonFileName = pageName + '.' + language + '.json';

        var json = jsonfileservice.getJsonFromFile(data + jsonFileName);
        res.send(json);
    }
};
