var poster = new Poster();
var posterApp = angular.module('posterApp', [ 'ui.router' ], function() {
})
posterApp.controller('posterController1', [ '$scope', '$rootScope',
		function($scope, $rootScope) {
			$scope.upload = function(line, row) {
				console.log(line + "," + row);
			}
		} ]);
posterApp.controller('posterController2', [ '$scope', '$rootScope',
		function($scope, $rootScope) {
		} ]);
posterApp.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('tianzx', {
				url : '/tianzx',
				templateUrl : "/wx/template/mainTpl.tpl",
			}).state(
					"tianzx.template",
					{
						url : '.template/:id',
						views : {
							viewA : {
								template : function($stateParams) {
									return poster.divArray[$stateParams.id - 1]
								},
								controller : 'posterController1'
							},
							viewB : {
								templateUrl : function($stateParams) {
									return  "/wx/template/"
											+ poster.templateId + "/tpl"
											+ $stateParams.id + ".tpl";
								},
								controller : 'posterController2'
							}
						},
					})
			$urlRouterProvider.otherwise('/tianzx.template/1');
		} ]);
posterApp.controller('posterController', [ '$scope', '$rootScope',
		'$stateParams', function($scope, $rootScope, $stateParams) {
			$rootScope.data = poster.sourceValue;
			$rootScope.new_val = poster.sortedValue;
			$scope.items = [];
			var len = poster.divArray.length;
			for ( var i = 1; i <= len; i++) {
				$scope.items.push(i);
			}
			$scope.submit = function() {
				console.log("success");
				console.log(data);
				console.log($rootScope.new_val);
				var returnValue = returnDataArray($rootScope.new_val);
				console.log(returnValue);
			}
		} ]);