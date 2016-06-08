/*jslint browser: true*/
/*global angular*/

(function () {
    'use strict';
    var urlContext = 'https://api.themoviedb.org/3/movie/popular?api_key=',
        myApp = angular.module('pindropModule');
    
    myApp.service('movieListService', ['$http', function (http) {
        this.getMovieList = function (api_key, page_count) {
            return http({
                url: urlContext + api_key + "&page=" + page_count,
                method: 'get'
            });
        };

    }]);

}());