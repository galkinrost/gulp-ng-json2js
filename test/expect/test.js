(function (module) {
    try {
        module = angular.module('TestFixtures');
    } catch (e) {
        module = angular.module('TestFixtures', []);
    }
    module.value('FixturesTestValue', {
    "username": "Barack",
    "nation": "USA",
    "work": "peacemaking"
});})();
