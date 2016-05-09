var poster = new Poster();
var posterApp = angular.module('posterApp', [ 'ui.router' ], function() {
})
posterApp.controller('posterController1', [ '$scope', '$rootScope',
		function($scope, $rootScope) {
			$scope.upload = function(line, row) {
				console.log(line + "," + row);
			}
			$scope.upload2 = function() {
				//设置点击确定按钮后,对已选择图片参数处理	
				$('.chooseimg_model').live('shown.bs.model', function() {
					var options = {
						onChoose : function(ids, urls) {
							$rootScope.items[$rootScope.index].cover = url;
							$rootScope.items[$rootScope.index].imageId = ids;
							console.log($rootScope.items[$rootScope.index]);
						}
					};
					$('.chooseimg_model').imgChoose(options);
				})
				//点击按钮显示选片
				$('.chooseimg_model').modal({
					backdrop : false
				});
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