$(function() {
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
	var dataList = []; // 緯度・経度設定済み
	var paginationNum = 0; //ページング用の宣言
    var newDataList = []; //ページング用の配列

	$("#findBar").on('click', function(){
		var selectRegionVal = $("#select_region").val();  //地域ID
		var selectPrefectureVal = $("#select_prefecture").val();  //都道府県ID(地域IDのみ選択した場合は、'0')
		if(selectRegionVal == 0 && selectPrefectureVal == 0){//両方のタグが未選択だった場合の処理
			alert('地域か都道府県は必ず選択してください!');
		}
		$.ajax({
		url :  hostUrl + '/find_bar?regionId=' + selectRegionVal + '&prefectureId=' + selectPrefectureVal,
		// regionIdとprefectureIdの2つの値が渡される.
		dataType : 'json',
		type : 'GET'
			
	})
	.then(function(searchItems){
		dataList = searchItems;
	
/////////////////////////////////////////////////////////////
//    // データリストの緯度経度を取得
//    function dfdGeocode(){
//        var dfd = $.Deferred();
//        
//        // Geocoderのインスタンスを生成
//        var geocoder = new google.maps.Geocoder();
//
//        // カウンター
//        var cnt = 0;
//
//        // データ分緯度経度の取得
//        $.each(dataList, function(i, data){
//            geocoder.geocode({address: data.address}, function(d, status){
//            	if (d && d[0]) { // there are some results
//                data.lat = d[0].geometry.location.lat(); //緯度
//                data.lng = d[0].geometry.location.lng(); //経度
//                cnt++;
//            	}
//                if( cnt === dataList.length ){
//                    dfd.resolve();
//                }
//            });
//        });
//
//        return dfd.promise();
//    }
/////////////////////////////////////////////////////////////
    
    
///////////////////////////////////////////////////////////
    // 現在位置の取得
    function dfdCurrentPosition(){
        var dfd = $.Deferred();

        // Geolocationが使用可能かチェック
        if( !window.navigator.geolocation ) dfd.reject();

        // 現在地の取得
        window.navigator.geolocation.getCurrentPosition(
            // Success
            function(position){
                dfd.resolve(position);
            },
            // Error
            function(error){
                dfd.reject();
            },
            // Options
            {
                enableHighAccuracy:true, //位置情報の精度を高く
                timeout: 10000, //10秒でタイムアウト
                maximumAge: 600000 //10分間有効
            }
        );

        return dfd.promise();
    }
///////////////////////////////////////////////////////////
    
    
///////////////////////////////////////////////////////////
    // DOM Content Loaded
    function dfdDocumentReady(){
        var dfd = $.Deferred();
        $(function(){
            dfd.resolve($(document));
        });
        return dfd.promise();
    }
///////////////////////////////////////////////////////////

    
    
    
///////////////////////////////////////////////////////////    
    // データが揃った段階でソートを開始
    $.when(
        dfdCurrentPosition(),
       // dfdGeocode(),
        dfdDocumentReady(),
        $("#data-list").empty() //検索条件を変える毎にテーブル更新される
    )
    .done(function(position){

        // 現在地
        var coords = position.coords;
        
        // 距離の割り出しを行ない、各データにdistance属性を設定
        $.each(dataList, function(i, data){
        		/**DBに緯度・経度情報を入れたおかげで、getDistanceメソッドを走らせるだけでおｋ*/
            data.distance = getDistance(data.latitude, data.longitude, coords.latitude, coords.longitude, 0) / 1000; //kmで算出
        });

        // 現在地からの距離が小さい順にソート
        dataList.sort(function(a, b){
        	return (a.distance < b.distance) ? -1 : 1;
        });
        
        //上記でソートされたデータを10件ずつのリストに分ける
        var number = dataList.length; //ソートされたBar情報
        var cnt = 10; //表示は10件ずつにしたい
	        for(var i = 0; i < Math.ceil(number / cnt); i++) { //Math.ceil:引数として与えた数以上の最小の整数を返す
	        	  var j = i * cnt;
	        	  var p = dataList.slice(j, j + cnt); 	 // i*cnt 番目から i*cnt+cnt 番目まで取得
	        	  newDataList.push(p);                    // 取得したものを newDataList に追加
	        }
	        
        var html =  "";
        
 ///////////////////////////
        
    //ページングの実装
    	$('.bar_tag_yahiro').on('click', function(){
    		paginationNum = parseInt($(this).text()) - 1; //ページング番号【1】、配列【0】
    		console.log(paginationNum); //確認用
    })  
        $.each(newDataList[paginationNum], function(i, data){
            html += '<tr>';
                html += '<td>'+(i+1)+'</td>';
                html += '<td><a href="https://maps.google.co.jp/maps?q='+data.nameJpa+','+data.address+'&z=17&iwloc=A" target="_blank">';
                html += data.nameJpa;
                html += '</a></td>';
                html += '<td>'+data.distance+'km</td>';
                html += '<td>' + data.latitude.toFixed(3);+ '</td>';
                html += '<td>' + data.longitude.toFixed(3); + '</td>';
            html += '</tr>';
        });
    	
       $("#data-list").append(html);

    })
    .fail(function(){
        alert("お使いの端末の位置情報サービスが無効になっているか対応していないため、エラーが発生しました");
        console.log("error", arguments);
    });
///////////////////////////////////////////////////////////

    
    
    
///////////////////////////////////////////////////////////
    /**
     * 2点間の緯度経度から距離を取得
     * 測地線航海算法を使用して距離を算出する。
     * @see http://hamasyou.com/blog/2010/09/07/post-2/
     * @param float 緯度1
     * @param float 経度2
     * @param float 緯度2
     * @param float 経度2
     * @param 小数点以下の桁数(べき乗で算出精度を指定)
     */
    function getDistance(lat1, lng1, lat2, lng2, precision){
      var distance = 0;
      if( ( Math.abs(lat1 - lat2) < 0.00001 ) && ( Math.abs(lng1 - lng2) < 0.00001 ) ) {
        distance = 0;
      }else{
        lat1 = lat1 * Math.PI / 180;
        lng1 = lng1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        lng2 = lng2 * Math.PI / 180;

        var A = 6378140;
        var B = 6356755;
        var F = ( A - B ) / A;

        var P1 = Math.atan( ( B / A ) * Math.tan(lat1) );
        var P2 = Math.atan( ( B / A ) * Math.tan(lat2) );

        var X = Math.acos( Math.sin(P1) * Math.sin(P2) + Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2) );
        var L = ( F / 8 ) * ( ( Math.sin(X) - X ) * Math.pow( (Math.sin(P1) + Math.sin(P2) ), 2) / Math.pow( Math.cos(X / 2), 2 ) - ( Math.sin(X) - X ) * Math.pow( Math.sin(P1) - Math.sin(P2), 2 ) / Math.pow( Math.sin(X), 2) );

        distance = A * ( X + L );
        var decimal_no = Math.pow(10, precision);
        distance = Math.round(decimal_no * distance / 1) / decimal_no;
      }
      return distance;
    }
	},function(){}); //本来は、ここでエラー時の処理を書く。
	});
});
