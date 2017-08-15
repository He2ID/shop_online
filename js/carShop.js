/******************************
 * date:2017/08/14
 * name:购物车
 * author:He2ID
 */
function ShopCarFn(_config){
	for(var i in _config){
		this[i]=_config[i];
	}
	this.init();
}
ShopCarFn.prototype={
	init:function(){
		var _this=this;
		_this.getJson();
	},
	getJson:function(){
		var _this=this;
		getAjax(APILIST.cartUlLi,function(d){
			console.log(d)
			if(d.error.code==0){
				_this.cartTPL(d.cartList);//插入单种商品HTML
				_this.checkboxGoods();//某种商品选中事件
				_this.isCheckGoodsInfo();//统计所有选中商品
				_this.topTotalGoods.html(d.total.num);//顶部商品数量
				_this.selectGoodsNumId.html(d.total.num);//底部商品数量
				_this.goodsTotalMoneyId.html(d.total.totalMoney);//底部商品总价

				_this.addGoodsBtn();//商品数量"+"按键
				_this.reduceGoodsBtn();//商品数量"-"按键
				_this.enterGoodsNum();//商品数量直接输入
				_this.eventCheckAllBtn();//全选按钮事件
			}else{
				console.log(d.error.msg);
			}
		});
	},
	//购物车商品清单HTML
	cartTPL:function(_cartList){
		var _this=this;
		_this.cartWrapId.html(cartTplFn(_cartList));
	},
	//加号事件
	addGoodsBtn:function(){
		var _thisO = this;
		var _addGoodsBtn = _thisO.cartWrapId.find("input.addGoodsBtn");
		_addGoodsBtn.on('click',function(){
			var _this = $(this);
			var _check = _this.parents('.goodsItem').children('.chkBtn');
			var _num =  _check.attr('data-goodsNum');//商品数量
			var _unit = _check.attr('data-unit');//商品单价
			var _sum = _this.parent().next();
			_num++;
			_this.prev().val(_num);//更新数量显示框
			_check.attr('data-goodsNum',_num);
			_thisO.cartSingleTotal(_num,_unit,_sum,_this);//算单个商品总价
		});
	},
	//减号事件
	reduceGoodsBtn:function(){
		var _thisO = this;
		var _reduceGoodsBtn = _thisO.cartWrapId.find("input.reduceGoodsBtn");
		_reduceGoodsBtn.on('click',function(){
			var _this = $(this);
			var _check = _this.parents('.goodsItem').children('.chkBtn');
			var _num =  _check.attr('data-goodsNum');//商品数量
			var _unit = _check.attr('data-unit');//商品单价
			var _sum = _this.parent().next();
			if(_num>1){
				_num--
			}else{
				_num = 1;
			}
			_this.next().val(_num);//更新数量显示框
			_check.attr('data-goodsNum',_num);
			_this.attr('disabled','disabled');
			_thisO.cartSingleTotal(_num,_unit,_sum,_this);//算单个商品总价

		});
	},
	//数量直接输入
	enterGoodsNum:function(){
		var _thisO=this;
		var _enterGoodsBtn = _thisO.cartWrapId.find("input.enterGoodsBtn");
		_enterGoodsBtn.on('blur',function(){
			var _this = $(this);
			var _check = _this.parents('.goodsItem').children('.chkBtn');
			//数量同步到check
			var _blurVal = _this.val();
			_check.attr('data-goodsNum',_blurVal);
			console.log(_blurVal);
			var _num = _check.attr('data-goodsNum');
			var _unit = _check.attr('data-unit');
			var _sum = _this.parent().next();
			//点击后数据返回前，禁止点击
			_this.attr('disabled','disabled');
			_thisO.cartSingleTotal(_num,_unit,_sum,_this);
		});
	},
	//算一种商品总价 数量 单价 加减号公共方法
	cartSingleTotal:function(_n,_u,_sum,_goodsEvent){
		var _this = this;
		var _d = '[{"num":'+_n+',"price":'+_u+'}]';
		cartFnJsonp(APILIST.cart,_d,function(d){
			_sum.html('￥' + d);
			//计算一种商品总价 存到check
			_sum.parent()
				.find('input.chkBtn')
				.attr('data-sum',d);
			//点击后，数据返回前，禁止点击
			_goodsEvent.removeAttr('disabled');
		});
	},
	//商品单选 checkbox事件
	checkboxGoods:function(){
		var _self = this;
		var _chkBtn = _self.cartWrapId.find('input.chkBtn');
		_chkBtn.on('click',function(){
			var _this=$(this);
			if(_this.is('.isChkBtn')==false){//未选→选中
				_this.addClass('isChkBtn');
			}else{
				_this.removeClass('isChkBtn');//选中右未选
			}
			//_self.isCheckGoodsInfo();
			_self.goodsFooterInfo();
		});
	},
	//统计被选中的商品
	isCheckGoodsInfo:function(){
		var _this = this;
		var _tempArr = [];
		var _chkBtn=_this.cartWrapId.find('input.chkBtn');
		for(var i=0;i<_chkBtn.length;i++){
			if(_chkBtn.eq(i).is('.isChkBtn')==true){
				var _tem = {};
				_tem['price'] = _chkBtn.eq(i).attr('data-sum');
				_tem['num'] = _chkBtn.eq(i).attr('data-goodsNum');
				_tempArr.push(_tem);
			}
		}
		//console.log(_tempArr);
		return _tempArr;
	},
	//页尾总数量总钱数接口
	goodsFooterInfo:function(){
		var _self=this;
		var _d=_self.isCheckGoodsInfo();
		goodsCheckFnJsonp(APILIST.goodsCheck,JSON.stringify(_d),function(d){
			_self.goods.totalMoneyId.html(d.price);
			//console.log(d);
		});
	},
	//上下全选按钮事件
	eventCheckAllBtn:function(){
		var _self=this;
		var _checkAllBtn = $('.checkAllBtn');
		var _chkBtn = _self.cartWrapId.find('input.chkBtn');
		_checkAllBtn.on('click',function(){
			var _is = $(this).is('checked');
			if(_is==false){
				//全选未选中
				_chkBtn.removeAttr('checked');
				_checkAllBtn.removeAttr('checked');
			}else{
				//全选选中
				_chkBtn.attr('checked','true');
				_checkAllBtn.attr('checked','true');
			}
			_self.goodsFooterInfo();
		});
	}
}
var _shopCarConfig = {
	cartWrapId:$('#cartWrapId'),
	topTotalGoods:$('#topTotalGoods'),
	selectGoodsNumId:$('#selectGoodsNumId'),
	goodsTotalMoneyId:$('#goodsTotalMoneyId')
}
new ShopCarFn(_shopCarConfig);