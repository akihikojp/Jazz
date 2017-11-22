/**
 * 緯度と経度を取得し、DBに格納するjs. 
 * geocodeAPIとsirusiizuライブラリを使っている.
 */

	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
	
$(function() {
	// top.jspのGoogleMapタグid
	sirusiizu.initialize('mapCanvas');
	
	// 住所から緯度・経度情報を取得し、MAPにピンを立てる
	$("#findLatAndLng").on('click', function() {
		var selectVal = $("#update_region").val(); //選択された地域ID(option value="${status.count}") 
		$.ajax({
			url : hostUrl + '/lat_lng?regionId=' + selectVal,
			dataType : 'json',
			type : 'GET'
		})
		.then(function(addressList) {
			console.log('★sirusiizu.marking:処理前');
			console.log('JSONのリストはこんな形してます!!!!!! ' + addressList);
			sirusiizu.marking(addressList) // sirusiizu.js呼出
			console.log('★sirusiizu.marking:処理後');
			console.log('★ajaxProcess:作動中');
			
		}, function() {
			reject("Mapにピンを立てています。サーバとの接続状態が不安定です");
		});
	}); //onClick終
	
}); //$(function)終


//////////////////////////////////////////////////////////////////////////////////

//以下、外部化

/////////////////////////////////////////////////////////////////////////

	// 緯度・経度情報が入ったajaxObjをController側に渡して、DBに格納するメソッド.
	function ajaxProcess(ajaxObjList) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				data : {ajaxData : JSON.stringify(ajaxObjList)},
				type : 'POST',
				url : hostUrl + "/register_lat_and_lng"
			}).then(function(resultValue) {
				resolve(resultValue);
			}, function() {
				reject("DB格納作業中。サーバとの接続状態が不安定です。");
			});
		});
	} //end tag
	
