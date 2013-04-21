'use strict';

/* Controllers */



var LoginCtrl = function ($scope,$http,$location,loginService) {
	$scope.data = {};
	$scope.reset = function(){
		$scope.data.username ='';
		$scope.data.password ='';
		$scope.data.msg ='';
	}
	$scope.login = function(){
		$http({method: 'POST', url: '/login.json',params:$scope.data}).
		  success(function(data, status, headers, config) {
			if(data.code =='true'){
				loginService.setUser($scope.data.username);
				$location.path('/main');
				$location.replace();
			}else{
				$scope.data = data;
			}
		  }).
		  error(function(data, status, headers, config) {
			$scope.data.msg ='登录异常!';
		  });
	}
};


var MainCtrl = function ($scope,$http,$location,loginService,paginationService) {
	/* if(!loginService.user){
		$location.path('/login');
		$location.replace();
	} */
	$scope.menus=[
		{text:'系统管理',icon:'img/icons/setting.png',test:{background:"url(img/setting.png) norepeat"},child:[
			{text:'系统管理',img:'img/menu/9.gif',url:'html/systemmanager.html'}
		]},
		{text:'系统录入',icon:'img/icons/hypertension_manage_16_16.png',child:[
			{text:'结算表管理',img:'img/menu/female_business_01.gif',url:'html/settlemanager.html'},
			{text:'费用管理',img:'img/menu/7.gif',url:'html/costmanager.html'}
		]},
		{text:'其他功能',icon:'img/icons/query.png',child:[
			{text:'统计查询',img:'img/menu/25.gif',url:'html/query.html'}
		]}
	];
	$scope.panes =[];
	$scope.clickmenu = function(name,url){
		console.log($scope.panes);
		console.log($scope.panes.length);
		for(var i = 0 ;i < $scope.panes.length ; i++){
			var pane = $scope.panes[i];
			console.log($scope.panes[i]);
			if(name == $scope.panes[i].title){
				$scope.panes[i].active = true;
				return;
			}
		}
		$scope.panes[$scope.panes.length]={title:name,active:true,url:url};
	}
	//增加tab双击事件
	$(document).on("dblclick", ".nav-tabs a",function (e) {
			for(var i = 0 ;i < $scope.panes.length ; i++){		
				if(e.currentTarget.innerText == $scope.panes[i].title){
					$scope.panes.splice(i,1);
					$scope.$digest();
					return;
				}
			} 
		});
	
};

var SettleManagerCtrl = function($scope,$http,$location,paginationService) {
	/* if(!loginService.user){
		$location.path('/login');
		$location.replace();
	} */
	//显示列表

    $scope.gridData =  [];
    $scope.gridOptions = {
        data: 'gridData',
		columnDefs: [{field:'name', displayName:'姓名'}, {field:'age', displayName:'年龄'}]
    };
}

var PaginationDemoCtrl = function ($scope,paginationService) {
  $scope.noOfPages = 111;
  $scope.currentPage = 4;
  $scope.maxSize = 10;
  $scope.maxNum = 1105;
  
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };
};