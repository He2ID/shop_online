/******************************
 * date:2017/07/24
 * name:整个项目的公共方法
 * author:He2ID
 */

/******************************
 * date:2017/08/04
 * name:ajax公共方法
 * author:He2ID
 */
function getAjax( _url, callback ){
	$.ajax({
		url: _url,
		type:'get',
		dataType:'jsonp',
		jsonp:'callback',
		success:function( d ){
			callback( d );
		}
	});
}

/******************************
 * date:2017/07/24
 * name:获取页面dom节点
 * author:He2ID
 * param : n，你要查找的dom节点的id
 */
function gId(n){
	return document.getElementById(n);
}

// 0726，演示了过度优化，不太推荐这样做。
// function gEq( _ths ){
// 	return _ths.children().eq(1);
// }

/******************************
 * date:2017/07/27
 * name:首页轮播广告的动画fn
 * author:He2ID
 * param : 
 * n，ul的id
 * i，计数的
 * w，移动的距离
 */
function slideAnimate( n, i, w ){
	n.stop().animate({
		left: -( i * w )
	},200);
}