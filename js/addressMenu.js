/******************************
 * date:2017/08/10
 * name:配送地址选择
 * author:He2Id
 */
 function AddressMenuFn(_config){
 	for(var i in _config){
 		this[i] = _config[i];
 	}
 	this.init();
 }
 AddressMenuFn.prototype={
 	init:function(){
 		_self=this;
 		//地址显示隐藏
 		_self.addressTitleEvent();
 		//省市信息
 		_self.getData();
 		_self.eventTabA();
 		_self.eventTabB();
 		_self.eventTabC();
 	},
 	addressTitleEvent:function(){
 		_this = this;
 		_this.addressTitleId.on('click',function(){
 			if(_this.isShow==0){
 				_this.addressListId.show();
 				_this.isShow=1;
 			}else{
 				_this.addressListId.hide();
 				_this.isShow=0;
 			}
 		});
 	},
 	getData:function(){
 		_self=this;
 		//省
 		_self.getAddItem("province",provinceId,_self.provinceEvent);
 		//市
 		_self.getAddItem("city",cityId,_self.cityEvent);
 		//区
 		_self.getAddItem("area",areaId,_self.areaEvent);
 	},
 	//获取省市区公共方法
 	getAddItem:function(add,addId,addTabEvent){
 		_this=this;
 		_this[add]=addTabEvent;
		getAjax(APILIST[add],function(d){
			_this.createDom(d[add],addId);
			_this[add]();
		});
	},
 	//生成省市区节点
 	createDom:function(_d,_wrap){
 		_self=this;
 		for(var i=0;i<_d.length;i++){
 			$('<p/>',{})
 			.html(_d[i].name)
 			.appendTo(_wrap);
 		}
 	},
 	provinceEvent:function(){
 		_self=this;
 		_self.provinceId.find('p').on('click',function(){		
 			_this.addTxtEvent($(this).html(),"tabA");
 			_this.addTabChosen("tabB");	
 		});
 	},
 	cityEvent:function(){
 		_this=this;
 		_this.cityId.find('p').on('click',function(){
 			_this.addTxtEvent($(this).html(),"tabB");
 			_this.addTabChosen("tabC");	 			
 		});
 	},
 	areaEvent:function(){
 		_this=this;
 		_this.areaId.find('p').on('click',function(){
			_this.addTxtEvent($(this).html(),"tabC");
			_this.addressListId.hide();	
 			_this.isShow = 0;
 			_this.arr.splice(2,1);
 		});
 	},
 	//更新【配送至】地址数组 & tab键对应文本 公共方法
 	addTxtEvent:function(_html,tabN){
	 	_this=this;
	 	_this[tabN].html(_html);//文本
	 	_this.addressTitle(_html);//数组
	 },
 	//操作省市区数组
 	addressTitle:function(n){
 		_self=this;
 		var _arr=_self.arr;
 		if(_arr.length<3){
 			_arr.push(n);	
 		}
 		_self.addressDivId.html('');
 		for(var i=0;i<_arr.length;i++){
 			$('<p/>',{})
 				.html(_arr[i])
 				.appendTo(_self.addressDivId);
 		}
 	},
 	//tab点省
 	eventTabA:function(){
 		_this=this;
 		_this.addTabEvent(_this.tabA,function(){
 			_this.addTabChosen("tabA");	
 			_this.arr.splice(0,3);
 		}); 	
 	},
 	//tab点市
  	eventTabB:function(){
 		_this=this;
 		_this.addTabEvent(_this.tabB,function(){
 			_this.addTabChosen("tabB");	
 			_this.arr.splice(1,2);
 		}); 		
 	},	
 	//tab点区
  	eventTabC:function(){
 		_this=this;
 		_this.addTabEvent( _this.tabC,function(){
 			_this.addTabChosen("tabC");	
 		}); 
 	},
 	//点击省市区tab公共方法
 	addTabEvent:function(_tabDom,callback){
 		_this = this;
 		_tabDom.on('click',function(){
 			callback();
 		});
 	},
 	//点击选择省市区tab标签后 tab标签显示地域整体的样式变化的公共方法
 	addTabChosen:function(tabN){
 		_this=this;
 		var addTabArr = ["tabA","tabB","tabC"];
 		var addIdArr  = ["provinceId","cityId","areaId"];
 		var addLen    = addIdArr.length;
 		for( var i=0; i<addLen; i++ ){
 			if( tabN==addTabArr[i] ){
 				var N = i;
 				console.log(N);
 				_this[addTabArr[i]].show().addClass("yellow");//tab border样式
 				_this[addIdArr[i]].show();//对应地域item display样式
 			}else{
 				_this[addTabArr[i]].removeClass("yellow");
 				_this[addIdArr[i]].hide();
 				if(i>N){
 					_this[addTabArr[i]].hide();//tab display样式
 				}
 			}
 		}
 	}
 }

 var _config={
	 	addressTitleId:$('#addressTitleId'),
	 	addressListId:$('#addressListId'),
	 	addressDivId:$('#addressDivId'),
	 	//省市区 地域item
	 	provinceId:$('#provinceId'),
	 	cityId:$('#cityId'),
	 	areaId:$('#areaId'),
	 	//省市区tab
	 	tabA:$('#tabA'),
	 	tabB:$('#tabB'),
	 	tabC:$('#tabC'),
	 	isShow:0,
	 	arr:[]
 }
 new AddressMenuFn(_config);
