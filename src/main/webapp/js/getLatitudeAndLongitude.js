/**
 * 緯度と経度を取得するjsを作成. geocodeAPIとsirusiizuライブラリを使う.
 */

	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
	
$(function() {
	// top.jspのGoogleMapタグのidと一致させる。
	sirusiizu.initialize("mapCanvas");
	
	// 住所から緯度・経度情報を取得し、MAPにピンを立てる。
	$("#findLatAndLng").on('click', function() {
		var selectVal = $("#update_region").val();//選択された地域ID 
		$.ajax({
			url : hostUrl + '/lat_lng?regionId=' + selectVal,
			dataType : 'json',
			type : 'GET'
		}).then(function(addressList) {
			console.log('★sirusiizu.marking:処理前');
			sirusiizu.marking(addressList) // sirusiizu.js呼出し
			console.log('★sirusiizu.marking:処理後');
			console.log('★ajaxProcess:作動中');
			
			////////////////////////////////
//			console.log('★ajaxProcess:処理前');
//			ajaxProcess(ajaxObj) //メソッドの切出し
//			console.log('★ajaxProcess:処理後');
			
		}, function() {
			reject("Mapにピンを立てています。サーバとの接続状態が不安定です");
		});
	}); //end tag
	
}); //$(function)のend tag


//外部化

	// 緯度・経度情報が格納されたajaxObjをController側に渡して、DBに格納する為のメソッド.
	function ajaxProcess(ajaxObj) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				data : {ajaxData : JSON.stringify(ajaxObj)},
				type : 'POST',
				url : hostUrl + "/register_lat_and_lng"
			}).then(function(resultValue) {
				resolve(resultValue);
			}, function() {
				reject("DBに緯度・経度情報を格納しています。サーバとの接続状態が不安定です");
			});
		});
	} //end tag
	
