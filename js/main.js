/******************************
 * date:2017/07/24
 * name:整个项目的入口！！
 * author:He2ID
 */
$(function(){
	// 首页header头的搜索框
	// new searchFn().init();
	new SearchFn( $('#searchId') );

	// 首页左侧产品导航
	new SubNavFn( $('#subNavProductId') );

	// 首页的轮播图
	var _slideIdConfig = {
		imageDivId : $('#imageDivId'),
		iconListId : $('#iconListId'),
		slidePointBgId : $('#slidePointBgId'),
		toLeftBtnId : $('#toLeftBtnId'),
		toRightBtnId : $('#toRightBtnId')
	}
	new SlideWrapFn( _slideIdConfig );
	//首页享品质
	new ProductBlock($('#productId'));
});