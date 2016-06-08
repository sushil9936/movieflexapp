/*jslint browser: true*/
/*global angular, console, alert*/
(function () {
    'use strict';
    // dependencies injected as needed.
    var myApp = angular.module('pindropModule', ['infinite-scroll', 'angularSpinner']);
    // configuration for the spinner 
    myApp.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
        usSpinnerConfigProvider.setDefaults({
            radius: 60,
            width: 16,
            length: 32,
            color: '#ccff33'
        });
    }]);

    myApp.controller('pindropController', ['$scope', 'movieListService', 'usSpinnerService', function ($scope, movieListService, usSpinnerService) {
        var vm = this,
            promise,
            api_key = "a0e96b399ef5103985a828c9b51f4523", // api key generated to access the movie database
            page_count = 1; // page count initially set to 1 then incremented as user scrolls down

        vm.movies = [];
        vm.busy = false;

        vm.getMovies = function () {
            usSpinnerService.spin('spinner-movieList'); // spinned started when method is called
            if (page_count > 40) { // using given api maximum 40 pages can be accessed to added that condition.
                return;
            }
            if (vm.busy) { // return if api call is in progress
                return;
            }
            vm.busy = true;
            promise = movieListService.getMovieList(api_key, page_count);
            promise.success(function (response) {
                var items = response.results;
                for (var i = 0; i < items.length; i++) {
                    vm.movies.push(items[i]);
                }
                vm.busy = false;
            });
            promise['finally'](function () {
             usSpinnerService.stop('spinner-movieList'); // spinned stopped when the api call is complete
                page_count = page_count + 1; // count for page is increamented once set of movies on that page are loaded.
            });
        };
    }]);

}());