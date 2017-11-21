$(function() {
	sirusiizu.initialize("mapCanvas"); //top.jsp:GoogleMapのタグid
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
	var dataList = []; // 緯度・経度設定済み
	var pagenationNum = 0; // ページング番号
    var newDataList = []; // ページング用配列

	$("#findBar").on('click', function(){
		var dataList = [],  pagenationNum = 0, newDataList = [];  //検索ボタンクリック毎に初期化
		var selectRegionVal = $("#select_region").val();          // 地域ID
		var selectPrefectureVal = $("#select_prefecture").val();  // 都道府県ID(地域IDのみ選択した場合は、'0')
		if(selectRegionVal == 0 && selectPrefectureVal == 0){     // 両方のタグが未選択だった場合の処理
			alert('地域か都道府県は必ず選択してください!');
		}		
		$.ajax({
		url :  hostUrl + '/find_bar?regionId=' + selectRegionVal + '&prefectureId=' + selectPrefectureVal,
		// regionIdとprefectureIdの2つの値が渡される.
		dataType : 'json',
		type : 'GET'
		})
	
	.then(function(searchItems){
		calculatePageNum(searchItems); //パージ数を検索するメソッド
		dataList = searchItems;
		
		
		
/////////////////////////////////////
		
		//取得してきたアイテム数を引数としたページ数の計算メソッド
        function calculatePageNum(searchItems){
        	var barNum = searchItems.length; //検索してきた喫茶店の数
        	var pagenationArray = []; //格納用配列
        	var numOfPage;
        	
        	var numOfPage = barNum / 10;
        	if(barNum % 10 != 0) {
        		numOfPage = numOfPage + 1;
        	}
        	for(var i = 1; i <= numOfPage; i++){
        		pagenationArray.push(i);
        	}
       	
	}
        
    // データが揃った段階でソートを開始
    $.when(
        dfdCurrentPosition(),
       // dfdGeocode(),
        dfdDocumentReady(),
        calculatePageNum(searchItems),
        $("#data-list").empty(), // 検索条件を変える毎にテーブル更新される
        $('#yahiro-pagination-id').empty()
    )
    .done(function(position){

        // 現在地
        var coords = position.coords;
        
        // 距離の割り出しを行ない、各データにdistance属性を設定
        $.each(dataList, function(i, data){
        		/** DBに緯度・経度情報を入れたおかげで、getDistanceメソッドを走らせるだけでおｋ */
            data.distance = getDistance(data.latitude, data.longitude, coords.latitude, coords.longitude, 0) / 1000; // kmで算出
        });

        // 現在地からの距離が小さい順にソート
        dataList.sort(function(a, b){
        	return (a.distance < b.distance) ? -1 : 1;
        });
        
        // 上記でソートされたデータを10件ずつのリストに分ける
        var number = dataList.length; // ソートされたBar情報
        var cnt = 10; // 表示は10件ずつにしたい
	        for(var i = 0; i < Math.ceil(number / cnt); i++) { // Math.ceil:引数として与えた数以上の最小の整数を返す
	        	  var j = i * cnt;
	        	  var p = dataList.slice(j, j + cnt); 	 
	        	  newDataList.push(p);                   // i*cnt 番目から取得したものをnewDataList に追加
	        }
	        
	    console.log('ソートした後の配列数:' + newDataList.length);
	    appendHTML(newDataList, pagenationNum);
	    appendPagenation(newDataList);
    		
    })
    
    // 失敗
    .fail(function(){
        alert("お使いの端末の位置情報サービスが無効になっているか対応していないため、エラーが発生しました");
        console.log("error", arguments);
    });
    
	},function(){});	
			
///////////////////////////////////////////////////////////////////////////////////////
	
		
	// 以下、外部化メソッド

		
/////////////////////////////////////////////////////////////////////////////////////////

	    //ページ数を動的にするメソッド
	    function appendPagenation(newDataList){
	    	var pageHTML = "";
	    	$('#yahiro-pagination-id').empty();
	    	for(var i = 1; i <= newDataList.length; i++){
	    		pageHTML += '<a class="bar_tag_yahiro">' + i + '</a>'; 
	    	}
	    	$('#yahiro-pagination-id').html(pageHTML);
	    	
	    };
		
////////////////////////////////////////////////////////////////////////////////////////

		//ページングの実装
	    /**DANGER!!:jQueryで動的にDOMを生成すると、その要素に対してイベントを生成するには通常の方法ではイベントが効かなくなる*/
	    //第一引数:イベント名
	    //第二引数:セレクタ(ここでは、上で作ったやつ)
	    //第三引数:関数イベントfunction()
		$(document).on('click', '.bar_tag_yahiro', function(){
			var pageHTML = "";
			pagenationNum = parseInt($(this).text()) - 1; // ページング番号【1】、配列【0】
			appendHTML(newDataList, pagenationNum);
			sirusiizu.marking(newDataList); // sirusiizu.js呼出し
		});
	    		
		
/////////////////////////////////////////////////////////////////////////////////////////
	    /**
		 * 2点間の緯度経度から距離を取得 測地線航海算法を使用して距離を算出する.
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
	    
	    
	    ///////////////////////////////////////////////////////////////////////////////////////////////////
		
		//HTMLにappendするメソッド. ページング実装で必要になったので外部化.
	    function appendHTML(dataList, pagenationNum/**onClickしたページ数*/){
	        var html =  "";

	        $("#data-list").empty();
	        
	        html += '<table border="1">';
	        html += '<thead>';
	        html += '<tr>';
	        html += '<td width="150" align="center">距離が近い順</td>';
	        html += '<td width="300" align="center">店名</td>';
	        html += '<td width="200" align="center">ここからの距離</td>';
	        html += '</tr>';
	        html += '</thead>';
	        
	        
	        
	        
	    		$.each(dataList[pagenationNum], function(i, data){
	    			html += '<tr>';
	                html += '<td>'+(i+1)+'</td>';
	                html += '<td><a href="https://maps.google.co.jp/maps?q='+data.nameJpa+','+data.address+'&z=17&iwloc=A" target="_blank">';
	                html += data.nameJpa;
	                html += '</a></td>';
	                html += '<td>'+data.distance+'km</td>';
//	                html += '<td>' + data.latitude.toFixed(3);+ '</td>';
//	                html += '<td>' + data.longitude.toFixed(3); + '</td>';
	            html += '</tr>';
	        });
	    		   html += '</table>';
	    		  $("#data-list").append(html);
	    		   html = "";
	    };
	    
////////////////////////////////////////////////////////////////////
	    
	     // DOM Content Loaded
	     function dfdDocumentReady(){
	         var dfd = $.Deferred();
	         $(function(){
	             dfd.resolve($(document));
	         });
	         return dfd.promise();
	     }

/////////////////////////////////////////////////////////
	   
	     // データリストの緯度経度を取得
	     function dfdGeocode(){
	     var dfd = $.Deferred();
	            
	     // Geocoderのインスタンスを生成
	     var geocoder = new google.maps.Geocoder();

	     // カウンター
	     var cnt = 0;

	     // データ分緯度経度の取得
	     $.each(dataList, function(i, data){
	     geocoder.geocode({address: data.address}, function(d, status){
	     if (d && d[0]) { // there are some results
	     data.lat = d[0].geometry.location.lat(); // 緯度
	     data.lng = d[0].geometry.location.lng(); // 経度
	     cnt++;
	     }
	     if( cnt === dataList.length ){
	     dfd.resolve();
	     }
	     });
	     });

	     return dfd.promise();
	     }
	        	        
////////////////////////////////////////////////////////
	     
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
	                    enableHighAccuracy:true, // 位置情報の精度を高く
	                    timeout: 10000, // 10秒でタイムアウト
	                    maximumAge: 600000 // 10分間有効
	                }
	            );

	            return dfd.promise();
	        }
		
///////////////////////////////////////////////////////////////////
	             
	});
});
