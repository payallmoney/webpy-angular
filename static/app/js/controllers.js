'use strict';

/* Controllers */


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];


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


var MainCtrl = function ($scope,$http,$location,loginService) {
	console.log(loginService);
	if(!loginService.user){
		$location.path('/login');
		$location.replace();
	}
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
		console.log(name)
		console.log(url)
		for(var i = 0 ;i < $scope.panes.length ; i++){
			var pane = $scope.panes[i];
			console.log($scope.panes[i]);
			if(name == $scope.panes[i].title){
				$scope.panes[i].active = true;
				console.log('1111111111111')
				return;
			}
		}
		console.log('222222222')
		$scope.panes[$scope.panes.length]={title:name,active:true,url:url};
	}
};