'use strict';

/* Controllers */

var LoginCtrl = function ($scope, $http, $location, loginService) {
	$scope.data = {};
	$scope.reset = function () {
		$scope.data.username = '';
		$scope.data.password = '';
		$scope.data.msg = '';
	}
	$scope.login = function () {
		$http({
			method : 'POST',
			url : '/login.json',
			params : $scope.data
		}).
		success(function (data, status, headers, config) {
			if (data.code == 'true') {
				loginService.setUser($scope.data.username);
				$location.path('/main');
				$location.replace();
			} else {
				$scope.data = data;
			}
		}).
		error(function (data, status, headers, config) {
			$scope.data.msg = '登录异常!';
		});
	}
};

var MainCtrl = function ($scope, $http, $location, loginService) {
	/* if(!loginService.user){
	$location.path('/login');
	$location.replace();
	} */
	$scope.menus = [{
			text : '系统管理',
			icon : 'img/icons/setting.png',
			test : {
				background : "url(img/setting.png) norepeat"
			},
			child : [{
					text : '系统管理',
					img : 'img/menu/9.gif',
					url : 'html/systemmanager.html'
				}
			]
		}, {
			text : '系统录入',
			icon : 'img/icons/hypertension_manage_16_16.png',
			child : [{
					text : '结算表管理',
					img : 'img/menu/female_business_01.gif',
					url : 'html/settlemanager.html'
				}, {
					text : '费用管理',
					img : 'img/menu/7.gif',
					url : 'html/costmanager.html'
				}
			]
		}, {
			text : '其他功能',
			icon : 'img/icons/query.png',
			child : [{
					text : '统计查询',
					img : 'img/menu/25.gif',
					url : 'html/query.html'
				}
			]
		}
	];
	$scope.panes = [];
	$scope.clickmenu = function (name, url) {
		console.log($scope.panes);
		console.log($scope.panes.length);
		for (var i = 0; i < $scope.panes.length; i++) {
			var pane = $scope.panes[i];
			console.log($scope.panes[i]);
			if (name == $scope.panes[i].title) {
				$scope.panes[i].active = true;
				return;
			}
		}
		$scope.panes[$scope.panes.length] = {
			title : name,
			active : true,
			url : url
		};
	}
	//增加tab双击事件
	$(document).on("dblclick", ".nav-tabs a", function (e) {
		for (var i = 0; i < $scope.panes.length; i++) {
			if (e.currentTarget.innerText == $scope.panes[i].title) {
				$scope.panes.splice(i, 1);
				$scope.$digest();
				return;
			}
		}
	});

};

var SettleManagerCtrl = function ($scope, $http, $location,cache,$window) {
	/* if(!loginService.user){
	$location.path('/login');
	$location.replace();
	} */
	cache.then(function(data) {
		$scope.cache = data;
		console.log($scope.cache);
	});
	//显示列表
	$scope.gridData = [];
	$scope.gridOptions = {
		data : 'gridData',
		columnDefs : [{
				field : 'name',
				displayName : '姓名'
			}, {
				field : 'age',
				displayName : '年龄'
			}
		]
	};
	//编辑数据
	$scope.edit = {items:[{"inputdate":new Date()}],
		supplier_date:new Date(),
		consignee_date:new Date()
	};
	$scope.add = function () {
		$scope.title='新增';
		$scope.ico = 'img/icons/edit_add.png';
		$scope.shouldBeOpen = true;
	}
	$scope.open = function () {
		$scope.shouldBeOpen = true;
	};
	$scope.close = function () {
		$scope.shouldBeOpen = false;
	};
	$scope.save = function () {
		$window.alert("保存成功!");
		$scope.shouldBeOpen = false;
		$scope.edit = {items:[{"inputdate":new Date()}]};
	};

	$scope.opts = {
		backdropFade : true,
		dialogFade : true
	};
	//增加石材
	$scope.additem = function(){
		if(!$scope.edit.items){
			$scope.edit.items = [];
		}
		$scope.edit.items[$scope.edit.items.length]={"inputdate":new Date()};
	}
	$scope.removeitem = function(index){
		console.log("======="+index);
		if($window.confirm("是否确认删除本行?")){
			$scope.edit.items.splice(index,1);
			if($scope.edit.items.length==0){
				$scope.edit.items[$scope.edit.items.length]={"inputdate":new Date()};
			}
		}
	}
	//分页的数据
	$scope.noOfPages = 111;
	$scope.currentPage = 4;
	$scope.maxSize = 10;
	$scope.maxNum = 1105;

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};
}


