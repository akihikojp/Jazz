/**
 * 緯度と経度を取得するjsを作成.
 * geocodeAPIとsirusiizuライブラリを使う.
 */
$(function(){
	//top.jspのGoogleMapタグのidと一致させる。
	sirusiizu.initialize("mapCanvas");
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
	
	$("#findLatAndLng").on('click',function(){
		$.ajax({
			url : hostUrl + '/lat_lng',
			dataType : 'json',
			type : 'GET'
		})
		.then(function(addressList){
			console.log('★経度緯度取得、処理前');
			sirusiizu.marking(addressList)
			//sirusiizu.jsでnewしているので、こっちでも使える。
//			console.log(siあrusiizu.marking(addressList));
			console.log('★経度緯度取得、処理後');
						
		},function(){});
		
	});
});