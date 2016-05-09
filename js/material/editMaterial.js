// 生成一个html myApp
	materialApp
	// 对左侧的div生成一个控制器进行监控，数据与视图的解耦
	.controller('div_add_appmsg', function($scope, $rootScope) {
		// 全局数组
		material.materialList = $rootScope.items = [];
		// 标记右侧的序号
		$rootScope.index = $scope._index = 0;
		// 计算右侧对其数组
		$rootScope.nums = [];
		
		$rootScope.subFlag = "false";
		
		// $rootScope.editValidate = $scope.edit;

		$scope.add = function() {
			if($rootScope.items.length==8){
				comp.message("你最多只可以加入8条图文消息", "error");
				return;
			}
			var item = {
					id: new Date().getTime() + "_add",
					title: '',
					cover: '',
					discription: '',
					content: '',
					author:'',
					show_cover: false,
					link:'',
				};
			
			$rootScope.items.push(item);
		};
		if(material.edit=='add'){
			$scope.add();
		}
		
		
		$scope.delete = function(index) {
//			
			$rootScope.items.splice(index,1);
			$scope.deleteDiv();
		};

		$rootScope.edit = $scope.edit = function(index, $event) {
			$scope._index = index;
			
			$rootScope.item = $scope.items[$scope._index];
			$rootScope.item.content = $scope.items[$scope._index].content + "";
			if($rootScope.item.content =="undefined") {
				$rootScope.item.content = '';
			}
			console.log($rootScope.item.content);
			var target = $event.target;
			// 加入遮罩
			$scope.replaceCss(target);
			
//			$scope.updateArray();
			
			// 右侧级联变化
			$scope.changeDiv(index);
			
			$("label").css('display','none');
			
		};
		
		// 更换css样式
		$scope.choseClass = function(value) {
			if (value == '0') {
				return "edit-show-main edit-show-hd selColor";
			} else if (value >= '1') {
				return "edit-show-main"
			} 
		}
		
		// 右侧div移动操作
		$rootScope.changeDiv = $scope.changeDiv = function(index) {
			$rootScope.index = index;
			$rootScope.nums.splice(0,$rootScope.nums.length);
			for(var i=0 ; i<index;i++) {
				$rootScope.nums.push(i);
			}
		}
		
		$scope.deleteDiv = function() {
			$rootScope.nums.pop();
		}
		
		/**
		 * **未来考虑如何用angular 替换 jquery 有关dom 操作
		 */
		// 更换遮罩
		$scope.replaceCss = function(target) {
			$("div").removeClass("selColor");
			$(target).parent().parent().parent().parent().addClass("selColor");
		}

		// 全局作用域用来绑定两侧数据
		$rootScope.item = $rootScope.items[$scope._index];
		
		//数组进行排序
		$scope.updateArray = function() {
			var _sortArr = [];
//			var allData = [];
			$("div[name*='editshow']").each(function() {
				_sortArr.push($(this).attr("data-id"));
			})
			console.log(_sortArr);
			console.log(material.materialList);
			for(var i=0;i<_sortArr.length;i++) {
				var _val = _sortArr[i];
				for(var j=0;j<material.materialList.length;j++) {
					if (_val == material.materialList[j].id) {
						allData.push(material.materialList[j]);
//						$rootScope.items.push(material.materialList[j]);
					}
				}
			}
			
//			console.log(allData);
			$rootScope.items =allData;
			$rootScope.$apply();
			console.log("success...");
//			return allData;
		};
		
		$scope.drag = function() {
			/*
			 * 拖拉排序
			 */
			$("#" + "J_sortable").sortable({
				axis: 'y',
				revert: false,
				cancel: "a[name=js_add_appmsg]",
				items: "div[name=editshow]",
				parent:"div[id=wsj-edit-main]",
				scroll: false
			}).bind('sortstop', function(event, ui) {
				$rootScope.$apply(function() {
					$(".edit-show-main").eq(0).addClass('edit-show-hd').siblings().removeClass('edit-show-hd');
//					$rootScope.items = $scope.updateArray();
				});
			});
			
		}
//		$scope.drag();
	})
	// 对右侧的div生成一个控制器进行监控
	.controller('edit-content', function($scope, $rootScope,$timeout,$http) {
		
		$scope.doUpload = function(that) {
			$.upload({
				url: material.contextPath + "/image/upload.do",
				onComplate: function(data) {
					var result = data.result;
					if (result == "error") {
						comp.message("文件提交服务器失败，请稍后刷新页面重试，如果还未成功请联系管理。", "error");
					}
					var url = data.url;
					$rootScope.items[$rootScope.index].cover=url;
					$rootScope.$apply();
				}
			});
		}
	})
	.controller('submit',function($scope,$rootScope,$timeout){
		// angular.element('#edit').trigger('click');
		$scope.publish = function() {
			var i = 0;
			do {
				if (material.submitFlag == "termination") {
					material.validateNum = 0;
					material.submitFlag = "false";
					break;
				}
				$rootScope.item = $rootScope.items[i];
				$rootScope.changeDiv(i);
				$rootScope.$apply();
				$("div").removeClass("selColor");
				$(document.getElementsByTagName('iframe')[0].contentWindow.document.body).html($rootScope.item.content);
				$("#materialForm").submit();
				i++;
			}while(i<$rootScope.items.length)
		}
		
	})
	/**
	 * business controller 对右侧的位移进行控制
	 */
	.controller('shift-div',function($scope,$rootScope){
		$scope.$watch("nums",function(){
		})
	})
	
	/**
	 * 实现ckeditor 标签 ck-editor ng-model directive中映射为 ckEditor ngModel
	 * 用link函数创建可以操作DOM的指令。
	 */
	.directive('ckEditor',function(){
		return {
			require : '?ngModel',
			link : function(scope,ele,attr,ngModel) {
				var ck = CKEDITOR.replace(ele[0]);
				ckEditor = ck;
				if(!ngModel) return;
				ck.on('pasteState',function(){
					scope.$apply(function(){
						ngModel.$setViewValue(ck.getData());
					});
				});
				ngModel.$render = function(value) {
						ck.setData(ngModel.$viewValue);
				}
			}
		};
	});
	
	$(".form_validation_reg").compValidate({
		rules: {
			title: {
				required: true,
				minlength: 1,
				maxlength: 64,
				uwsnumcharcn: true
			},
			author: {
				minlength: 1,
				maxlength: 8,
				uwsnumcharcn: true
			},
			discription: {
				maxlength: 120
			},
			content: {
				required: true,
				maxlength:4096
			},
			cover: {
				required: true
			},
			link: {
				url: true,
				maxlength: 128
			},
		},
		
		messages: {
			title: {
				required: '标题不能为空',
				maxlength: '名称输入的内容长度不能超过 64位'
			},
			author: {
				maxlength: '作者输入的内容长度不能超过 8位'
			},
			discription: {
				maxlength: '摘要输入的内容长度不能超过120位'
			},
			content: {
				required: '内容不能为空',
				maxlength: '正文输入的内容长度不能超过120位'
			},
			cover: {
				required: '必须插入一张图片'
			},
			link: {
				url: "请输入合法的原文链接",
				maxlength: "原文链接输入的内容长度不能超过 128位"
			}
		},
		
		errorPlacement: function(error, element) {
			if ($(element).attr("id") == "cover") {
				$(element).parent().parent().append(error);
			} else {
				$(element).closest('div').append(error);
			}
		},
		
		highlight: function(element) {
			if ($(element).attr("id") == "cover") {
				$(element).parent().parent().addClass("f_error");
			} else {
				$(element).closest('div').addClass("f_error");
			}
		},
		
		unhighlight: function(element) {
			if ($(element).attr("id") == "cover") {
				$(element).parent().parent().removeClass("f_error");
			} else {
				$(element).closest('div').removeClass("f_error");
			}
		},
		invalidHandler: function(form, validator) {
			// submitFlag = false;
			console.log("进入失败处理截断。。。")
			material.submitFlag = "termination";
		}, 
		// 验证通过时的处理函数
		submitHandler: function(form) {
			//console.log("成功进入拦截器。。。");
			material.submitFlag = "true";
			
			material.validateNum++;
			if (material.validateNum < material.materialList.length) {
				return;
			}
			console.log("success");
   			$.ajax({
				async: false,
				cache: false,
				type: 'POST',
				dataType: "json",
				data: JSON.stringify(material.materialList),
				contentType: "application/json",
				url: material.contextPath+"/wechat/material/opt-add/submitMaterialng.do" , // 请求的action路径
				success: function(data) { // 请求成功后处理函数。
					if(data.success) {
						comp.message("图文已成功保存。", "success");
//						$.post();
						window.location.href=material.contextPath+"/wechat/material/opt-query/materialngList.do";
					}else {
						comp.message("图文保存失败。", "error");
					}
				},
				error: function(data) {
					comp.message("发送失败,请稍后刷新页面重试，如果还未成功请联系管理。", "error");
				},
			});
		},
		ignore: "",
	});
