/**
 * 緯度と経度を取得するjs.
 * geocodeとsirusiizuを使う.
 */
$(function(){
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
	
	$("#findLatAndLng").on('click',function(){
		console.log('1.geocode計画：ここまで成功!');
		
		$.ajax({
			url : hostUrl + '/lat_lng',
			dataType : 'json',
			type : 'GET'
		})
		.then(function(searchItems){
			console.log('2.geocode計画：ここまで成功!');
			console.log(searchItems);
		
		
		
		},function(){});
		
		
		
		
		
		
	});
});