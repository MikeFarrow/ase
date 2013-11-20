/* Sample app for shares management which reads data from a third party rest server */
var app = angular.module('app', []);

app.controller('MainCtrl', function($scope, stckSrch) {


    $scope.doNew = function() {
		console.info("New thing xx");
		console.info($scope.name);
		
		var promise = stckSrch.get($scope.name);
			promise.then(
				function(activities){
				if (typeof stckDat.Data === "undefined") {
					alert("something is undefined");
				}else {
					$scope.result = stckDat.Data.Symbol;
					$scope.price = stckDat.Data.LastPrice;
					$scope.change = stckDat.Data.Change;
					//$scope.$apply();
					console.info('Success maybe');
					console.dir(stckDat.Data);
					console.info(stckDat.Data.Symbol);
				}
				},
				function(reason){
					console.info('Failed: ' + reason);
				}
     );

		//$scope.result = myServ($scope.name);
		console.info($scope.result);

	 };


});

app.service('stckSrch', function($http, $q) {
	this.get = function(sym){
		var deferred = $q.defer();

		$http({
			method: "JSONP",
			params: {
				 symbol: sym,
				 callback: "stck_search"
			},
			url: "http://dev.markitondemand.com/Api/Quote/jsonp",
			isArray: true
		}).success(function(data, status) {
			 // It never goes into this one for some reason
			 deferred.resolve(data);
		}).error(function(data, status) {
			 //deferred.reject(data);
			 deferred.resolve(data);
		});

		return deferred.promise;
	}
}
);

/* This is the callback used by $http
 More info can be found here:
 https://github.com/angular/angular.js/issues/1551
 http://stackoverflow.com/questions/13267285/angular-resource-with-jsonp-not-working
*/
var stckDat
function stck_search(data) {
	stckDat = data;
}
