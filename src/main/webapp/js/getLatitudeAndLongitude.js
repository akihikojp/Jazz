/**
 * 緯度と経度を取得するjs
 * geocodeとsirusiizuを使う.
 */
$(function(){
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
	
	$("#findLatAndLng").on('click',function(){
		$.ajax({
			url : hostUrl + '/lat_lng',
			dataType : 'json',
			type : 'GET'
		})
		.then(function(searchItems){
			//addressList(576件)を配列で取得成功
			console.log(searchItems);
		
		
			
			
			
			
		},function(){});
		
		
		
		
		
		
	});
});