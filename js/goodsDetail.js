/******************************
 * date:2017/08/07
 * name:产品详情
 * author:He2ID
 */
 /******************************
 * date:2017/08/07
 * name:大图切换，局部高清展示
 * author:He2ID
 */
 function GoodDetailImg(_config){
 	for(var i in _config){
 		this[i]=_config[i];
 	}
 	// this.smallImgId=n;
 	// this.bigImgId=$('#bigImgId')
 	this.sum=0;
 	this.init();
 }
 GoodDetailImg.prototype = {
 	init:function(){
		var _this = this; 
		_this.getJson();
 	},
 	getJson:function(){
		var _this = this;
		getAjax( APILIST.smallImgData,function(d){
			//console.log(d);//Arr[6] smallImg → bigImg + imgUrl
			var _imgs = d.smallImg;
			_this.createDom(_imgs);
			_this.defaultBigImg(_imgs[0].imgurl);
			_this.eventLeft();
			_this.eventRight();
			_this.eventMouse();
		});
 	},
 	createDom:function(_imgs){
 		//console.log(_imgs);
		var _this = this;
		var _len = _imgs.length;
		for(var i=0;i<_len;i++){
			$('<li/>',{})
				.attr("data-bigImg",_imgs[i].bigImg)
				.html(function(){
					$('<img/>',{})
						.css({
							'width':60,
							'height':60
						})
						.attr('src',_imgs[i].imgurl)
						.appendTo($(this));
				})
				.on('click',function(){
					console.log($(this).attr('data-bigimg'));
					var bigImgUrl=$(this).attr('data-bigimg');
					_this.eventBigImg(bigImgUrl);
					//点击某张图片，切换局部详细大图
					_this.bigImgMove(bigImgUrl);
				})
				.appendTo(_this.smallImgId);
		}
		//设置ul宽度
		_this.smallImgId.css('width',_len*75);
 	},
 	eventBigImg:function(_imgSrc){
 		//点小图，大图切换
 		var _this=this;
 		_this.bigImgId.attr('src',_imgSrc);
 	},
 	defaultBigImg:function(_imgSrc){
 		//页面加载完 大图默认显示第一张
 		var _this=this;
 		_this.bigImgId.attr('src',_imgSrc);	
 		//页面加载完 加载详细显示第一张大图
 		_this.bigImgMove(_imgSrc);
 	},
 	eventLeft:function(){
 		var _this=this;
 		_this.leftBtnId.on('click',function(){
 			if(_this.sum<2){
 				_this.sum++;
 				//console.log(_this.sum);
				_this.smallImgId.css('left',-(_this.sum*75));
 			}
 		});
 	},
 	eventRight:function(){
 		var _this=this;
 		_this.rightBtnId.on('click',function(){
 			if (_this.sum>0) {
 				_this.sum--;
 				//console.log(_this.sum);
 				_this.smallImgId.css('left',-(_this.sum*75));
 			}
 		});
 	},
 	eventMouse:function(){
 		var _this=this;
 		_this.goodsBigImg.on({
 			mouseover:function(){
 				_this.bigImgMask.show();
 				_this.eventMouseMove();
 				_this.bigImgWrapId.show();
 			},
  			mouseout:function(){
 				_this.bigImgMask.hide();
 				_this.bigImgWrapId.hide();
 			}
 		});
 	},
 	eventMouseMove:function(){
 		var _this=this;
 		_this.goodsBigImg.on('mousemove',function(e){
 			//console.log(e);
 			var _eL=e.pageX;
 			var _eT=e.pageY;

 			var _goodsBigImgXY = _this.goodsBigImg.offset();
 			//mask一半宽度100
 			var _goodsBigImgXY_w=100;
  			_eL = _eL - _goodsBigImgXY.left - _goodsBigImgXY_w;	
  			_eT = _eT - _goodsBigImgXY.top - _goodsBigImgXY_w;		
  			var _eLval = _this.goodsBigImg.width() - _this.bigImgMask.width();
  			var _eTval = _this.goodsBigImg.height() - _this.bigImgMask.height()
 			if( _eL < 0 ){
 				//向左
 				_eL = 0;
 			}else if( _eL > _eLval){
 				//向右
 				_eL = _eLval;
 			}
 			if( _eT < 0 ){
 				//向上
 				_eT = 0;
 			}else if( _eT > _eTval){
 				//向下
 				_eT = _eTval;
 			}
 			//半透明遮罩
 			_this.bigImgMask.css({
 				'left':_eL,
 				'top':_eT
 			})
 			.html( _eL + " , " + _eT)

  		// 	 var _eL=e.offsetX - _goodsBigImgXY_w;
 		//  var _eT=e.offsetY - _goodsBigImgXY_w;	
 			//  _this.bigImgMask.css({
 			// 	'left':_eL,
 			// 	'top':_eT
 			// })	
 			// .html(_eL+" , " + _eT)

 			//局部详细大图 图片坐标
 			var _bigImgLocalMove=_this.bigImgWrapId.children('img');
 			_bigImgLocalMove.css({
 				'left':-(_eL * 2.475),
 				'top':-(_eT * 2.475)
 			});
 		})
 	},
 	bigImgMove:function(_imgSrc){
 		//大图显示局部
 		var _this=this;
 		_this.bigImgWrapId.children('img').attr('src',_imgSrc);
 	}
 }

 var detailImgConfig = {
	 	smallImgId:$('#smallImgId'),
	 	bigImgId:$('#bigImgId'),
	 	leftBtnId:$('#leftBtnId'),
	 	rightBtnId:$('#rightBtnId'),
	 	goodsBigImg:$('#goodsBigImg'),
	 	bigImgMask:$('#bigImgMask'),
	 	bigImgWrapId:$('#bigImgWrapId')
 }
 new GoodDetailImg(detailImgConfig);

 //获取链接地址
// var _href = ( window.location.href );
// var _n = _href.indexOf('?');
// var _str = _href.substring(_n+1);
/******************************
 * date:2017/08/10
 * name:产品详情
 * author:He2ID
 */
 function GetGoodsDetailInfo(n){
 	for(var i in n){
 		this[i] = n[i];
 	}
 	this.init();
 }
GetGoodsDetailInfo.prototype={
	init:function(){
		var _this = this;
		_this.getData();
	},
	getData:function(){
		var _this = this;
		var _pid = getPid( 'pidVal' );
		console.log(_pid);
		getParam( APILIST.param, _pid, function(d){
			console.log(d);
			_this.createDom( d.productInfo );
		});
	},
	resolveJson:function( _data ){
		//解析Json数据 
		var _this=this;
		var _temArr = [];
		for(var i=0;i<_data.length;i++){
			for(var j in _data[i]){
				_temArr.push(_data[i][j]);
			}
		}
		//console.log(_temArr);
		return _temArr;
	},
	createDom:function( _data ){
		var _this = this;
		var _dataArr = _this.resolveJson(_data);

		// $('<h1/>',{})
		// 	.html(_data[0].title)
		// 	.appendTo(_this.goodsInfoId);
		// $('<p/>',{})
		// 	.html(_data[i].info)
		// 	.appendTo(_this.goodsInfoId);
		for(var i=0;i<_dataArr.length;i++){
			if(i==0){
				$('<h1/>',{})
				.html(_dataArr[i])
				.appendTo(_this.goodsInfoId);	
			}else{
				$('<p/>',{})
				.html(_dataArr[i])
				.appendTo(_this.goodsInfoId);
			}
		}
		//方法二
		// for(var i=0;i<_dataArr.length;i++){
		// 	$('<p/>',{})
		// 	.html(_dataArr[i])
		// 	.appendTo(_this.goodsInfoId);
		// }
		// _this.goodsInfoId.find('p').eq(0).css({
		// 	'font-size':33,
		// 	'color':'#f00'
		// });
	}
}
var _getGoodsDetailConfig={
 	goodsInfoId:$('#goodsInfoId')
}
new GetGoodsDetailInfo(_getGoodsDetailConfig);