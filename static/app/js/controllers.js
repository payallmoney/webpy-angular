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

var SettleManagerCtrl = function ($scope, $http, $location,cache,$window,$filter) {
	/* if(!loginService.user){
	$location.path('/login');
	$location.replace();
	} */
	//初始化数据
	var initedit = function (){
		return {
			'_id':null,
			items:[{"inputdate":$filter('date')(new Date() ,'yyyy-MM-dd')}],
			//2013-05-21T11:40:36.049Z
			supplier_date:$filter('date')(new Date() ,'yyyy-MM-dd'),
			consignee_date:$filter('date')(new Date() ,'yyyy-MM-dd')
		}
	};
	var lastedit = initedit();
	cache.then(function(data) {
		$scope.cache = data;
		console.log($scope.cache);
	});
	console.log($.parseJSON);
	//显示列表
	$scope.gridData = [];
	$scope.gridOptions = {
		data : 'gridData',
		showSelectionCheckbox:true,
		columnDefs : [{
				field : 'supplier',
				displayName : '供货方',
				cellTemplate : '<div class="ngCellText colt{{$index}}">{{row.getProperty(col.field)}}</div>'
			}, {
				field : 'consignee',
				displayName : '收货方'
			}, {
				field : 'supplier_date',
				displayName : '供货日期',
				cellTemplate : '<div class="ngCellText colt{{$index}}"> {{row.getProperty(col.field) | decode | date:"yyyy-MM-dd"}} </div>'
			}, {
				field : 'consignee_date',
				displayName : '收货日期',
				cellTemplate : '<div class="ngCellText colt{{$index}}"> {{row.getProperty(col.field) | decode | date:"yyyy-MM-dd"}} </div>'
			}, {
				field : 'supplier_opt',
				displayName : '供货方签字'
			}, {
				field : 'consignee_opt',
				displayName : '收货方签字'
			}, {
				field : 'allsum',
				displayName : '总金额'
			}
		],
		rowTemplate:'<div ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ng-dblclick="gridDBLClick(row.rowIndex)" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}" ng-cell></div>'
	};
	//双击事件
	$scope.gridDBLClick = function(index){
		console.log($scope.gridData[index]);
		$scope.edit = $scope.gridData[index];
		$scope.shouldBeOpen = true;
	}
	//编辑数据
	
	
	$scope.add = function () {
		$scope.title='新增';
		$scope.ico = 'img/icons/edit_add.png';
		$scope.shouldBeOpen = true;
		$scope.edit = initedit();
	}
	$scope.open = function () {
		$scope.shouldBeOpen = true;
	};
	$scope.close = function () {
		$scope.shouldBeOpen = false;
	};
	//重置
	$scope.reset = function(){
		$scope.edit = initedit();
	}
	//保存
	$scope.save = function () {
		console.log($scope.edit);
		$http({
			method : 'POST',
			url : '/settlemanager/add',
			params : $scope.edit
		}).
		success(function (data, status, headers, config) {
			if (data.code == 'true') {
				$window.alert("保存成功!");
				$scope.shouldBeOpen = false;
				lastedit = $scope.edit;
				$scope.edit = initedit();
			} else {
				$window.alert(data.msg);
			}
		}).
		error(function (data, status, headers, config) {
			console.log("错误数据如下:");
			console.log("data:");
			console.log(data);
			console.log("status:");
			console.log(status);
			console.log("headers:");
			console.log(headers);
			console.log("config:");
			console.log(config);
			$scope.msg = '保存异常!';
		});
	};
	//查询
	$scope.query = function(){
		$http({
			method : 'POST',
			url : '/settlemanager/list',
			params : {"page":$scope.page,"params":$scope.params}
		}).
		success(function (data, status, headers, config) {
			if (data.code == 'true') {
				$scope.page = data.page;
				$scope.gridData = data.data;
			} else {
				$window.alert(data.msg);
			}
		}).
		error(function (data, status, headers, config) {
			console.log("错误数据如下:");
			console.log("data:");
			console.log(data);
			console.log("status:");
			console.log(status);
			console.log("headers:");
			console.log(headers);
			console.log("config:");
			console.log(config);
			$scope.msg = '保存异常!';
		});
	}
	$scope.opts = {
		backdropFade : true,
		dialogFade : true
	};
	//增加一行
	$scope.additem = function(){
		if(!$scope.edit.items){
			$scope.edit.items = [];
		}
		$scope.edit.items[$scope.edit.items.length]={"inputdate":$filter('date')(new Date() ,'yyyy-MM-dd')};
	}
	//删除一行
	$scope.removeitem = function(index){
		if($window.confirm("是否确认删除本行?")){
			$scope.edit.items.splice(index,1);
			if($scope.edit.items.length==0){
				$scope.edit.items[$scope.edit.items.length]={"inputdate":new Date()};
			}
			recalc();
		}
	}
	//行中的价格或数量变化时,重新计算金额.
	$scope.change = function(index){
		if(!angular.isNumber($scope.edit.items[index].num)){
			$scope.edit.items[index].num = 0;
		}
		if(!angular.isNumber($scope.edit.items[index].price)){
			$scope.edit.items[index].price = 0;
		}
		if(!angular.isNumber($scope.edit.items[index].remit)){
			$scope.edit.items[index].remit = 0;
		}
		$scope.edit.items[index].sum = $scope.edit.items[index].num* $scope.edit.items[index].price - $scope.edit.items[index].remit;
		recalc();
	}
	function recalc(){
		$scope.edit.allsum = 0;
		for( var i = 0 ; i <$scope.edit.items.length ; i ++){
			if(!angular.isNumber($scope.edit.items[i].sum)){
				$scope.edit.items[i].sum = 0;
			}
			$scope.edit.allsum += $scope.edit.items[i].sum;
		}
	}	
	//分页的数据
	$scope.page = {
		noOfPages : 1,
		currentPage : 1,
		maxSize : 15,
		pageSize :15,
		maxNum : 1
	}

	$scope.selectPage = function (pageNo) {
		print("这里做了?");
		console.log(pageNo);
		$scope.page.currentPage = pageNo;
		$scope.query();
	};
	$scope.$watch('page.currentPage', function() {
		$scope.query();
    });
	function selectPage(pageNo) {
		print("这里1111做了?");
		$scope.page.currentPage = pageNo;;
	};
}


