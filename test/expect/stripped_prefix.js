(function (module) {
    try {
        module = angular.module('TestFixtures');
    } catch (e) {
        module = angular.module('TestFixtures', []);
    }
    module.value('Test', {
    "username": "Barack",
    "nation": "USA",
    "work": "peacemaking"
});})();
