/* Test case for service */
describe('Service: movieListService', function () {
    var testService,
        promise,
        successCallback,
        errorCallback,
        $httpBackend;

    beforeEach(function () {
        module('pindropModule');

        inject(function (_$httpBackend_, movieListService) {
            $httpBackend = _$httpBackend_;
            successCallback = jasmine.createSpy();
            errorCallback = jasmine.createSpy();
            testService = movieListService;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('When getMovieList() method in movieListService is called with right api key and page count', function () {
        it('Should execute the call successfully', function () {
            $httpBackend
                .whenGET('https://api.themoviedb.org/3/movie/popular?api_key=a0e96b399ef5103985a828c9b51f4523&page=1')
                .respond({});

            promise = testService.getMovieList('a0e96b399ef5103985a828c9b51f4523', '1');
            promise.then(successCallback, errorCallback);
            $httpBackend.flush();
            expect(successCallback).toHaveBeenCalled();
            expect(errorCallback).not.toHaveBeenCalled();
        });
    });

});

/* Test case for controller  */
describe('Controller: pindropController', function () {
    var testController, $scope, spyPromise, deferred, mockTestService;

    beforeEach(function () {
        module('pindropModule');

        inject(function ($rootScope, $controller, $q) {
            $scope = $rootScope.$new();
            deferred = $q.defer();
            spyPromise = deferred.promise;
            mockTestService = jasmine.createSpyObj('movieListService', ['getMovieList']);
            mockTestService.getMovieList.andReturn(spyPromise);

            spyPromise.success = function (fn) {
                spyPromise.then(function (data) {
                    //fn(data);
                });
                return spyPromise;
            };

            spyPromise.error = function (fn) {
                spyPromise.then(undefined, function (status) {
                    fn(status);
                });
                return spyPromise;
            };

            testController = $controller('pindropController', {
                '$scope': $scope,
                'movieListService': mockTestService
            });
        });
    });
    
    describe('Calling the getMovies method ', function () {
        beforeEach(function () {
            testController.getMovies();
        });
        it('movies[] array should not contain any element', function () {
            expect(testController.movies.length).toBe(0);
        });
        it('busy flag should be set true', function () {
            expect(testController.busy).toBe(true);
        }); 
    });
});