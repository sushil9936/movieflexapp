# movieflexapp

This app is a demostratio of grid of posters for popular movies. It is implemented using angularJS and related libraries.
Unit testing applied using Jasmine and angular-mocks.

Following were the requirements for the app

1. Display a grid of posters for popular movies
    a. Be sure to include the movie’s title somewhere on the card
    Grid is displayed using css style classs hovereffect and overlay which are included in style.css file.

2. On hover, the poster should scale and be highlighted.
   This is achieved by adding on :hover selector for above stylesheet classes. Opacity and background colors are changes as per requirement.Transitioning, and transitioning timing also applied in order to move move movie title and to have animated effect.

3. The grid should be infinitely scrollable, with additional posters paging in as the user
   scrolls down
   This is implemented using ng-infinite-scroll directive in angular using which on scroll function in controller can be called.
   api to access "the movie database" is called once the scroll reaches bottom of the page.

4. While waiting for the API, a loading indicator should be displayed
   This is implemented using angular-spinner using which once the api call is made spinner can be displayed till the call gets completed.

To access the movie data base api key was generated after signing up on
https://www.themoviedb.org/

Number of datasets can be loaded by calling the api by following manner 
https://api.themoviedb.org/3/movie/popular?api_key=###&page=1
https://api.themoviedb.org/3/movie/popular?api_key=###&page=2

Application created using angular controller and service. Service is responsible to make backend api call and return promise object.
Response from api consist of data for the particular page. 
Page-count passed was increamented while making each call to api from UI side.

Unit testing implemented for angular service and controller.
