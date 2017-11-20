$(function() {
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
	var dataList = []; // 緯度・経度設定済み
	var pagenationNum = 0; // ページング用の宣言
    var newDataList = []; // ページング用の配列

	$("#findBar").on('click', function(){
		var selectRegionVal = $("#select_region").val();  // 地域ID
		var selectPrefectureVal = $("#select_prefecture").val();  // 都道府県ID(地域IDのみ選択した場合は、'0')
		if(selectRegionVal == 0 && selectPrefectureVal == 0){// 両方のタグが未選択だった場合の処理
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
        	
//        	$('.bar_tag_yahiro').empty();
//        	$.each(pagenationArray, function(i, page){
//        		pageNum = i + 1; //配列は0から。ページは1から。
//        		$('.bar_tag_yahiro').append(	'<a>' + pageNum + '</a>');
//        	});
//        	   	
//        	console.log('serchItemsの数は'+ searchItems.length);
//        	console.log('pagenationArrayの数は'+ pagenationArray.length);
	        	
	        }
        
    // データが揃った段階でソートを開始
    $.when(
        dfdCurrentPosition(),
       // dfdGeocode(),
        dfdDocumentReady(),
        $("#data-list").empty() // 検索条件を変える毎にテーブル更新される
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
	        
	    appendHTML(newDataList, pagenationNum);
    		
    })
    
    // 失敗
    .fail(function(){
        alert("お使いの端末の位置情報サービスが無効になっているか対応していないため、エラーが発生しました");
        console.log("error", arguments);
    });
    
	},function(){});	
			
///////////////////////////////////////////////////
	
		
	// 以下、メソッド外部化!

////////////////////////////////////////////////////////////////////////////////////////

		    // ページングの実装(onClickで作動)
		$('.bar_tag_yahiro').on('click', function(){
			pagenationNum = parseInt($(this).text()) - 1; // ページング番号【1】、配列【0】
			console.log('onClick:' + pagenationNum); // 確認用
			appendHTML(newDataList, pagenationNum);
		});
	    		
		
/////////////////////////////////////////////////////////////////////////////////////////
	    /**
		 * 2点間の緯度経度から距離を取得 測地線航海算法を使用して距離を算出する。
		 * 
		 * @see http://hamasyou.com/blog/2010/09/07/post-2/
		 * @param float
		 *            緯度1
		 * @param float
		 *            経度2
		 * @param float
		 *            緯度2
		 * @param float
		 *            経度2
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
		
		//HTMLにappendするメソッド。ページング実装で必要になったので外部化
	    function appendHTML(dataList, pagenationNum){
	        var html =  "";
	        /////////////////////////////
	        //1つ目の実装
	        $("#data-list").empty();
	    		$.each(dataList[pagenationNum], function(i, data){
	            html += '<tr>';
	                html += '<td>'+(i+1)+'</td>';
	                html += '<td><a href="https://maps.google.co.jp/maps?q='+data.nameJpa+','+data.address+'&z=17&iwloc=A" target="_blank">';
	                html += data.nameJpa;
	                html += '</a></td>';
	                html += '<td>'+data.distance+'km</td>';
	                html += '<td>' + data.latitude.toFixed(3);+ '</td>';
	                html += '<td>' + data.longitude.toFixed(3); + '</td>';
	            html += '</tr>';
	        }); //eachのendPoint
	    		   $("#data-list").append(html);
	    		   html = "";
	    		   
	    		   ////////////////////////
	    		   //2つ目の実装
	    		   $("#yahiro_pagination_id").empty();
	    		   html += '<nav aria-label="Page navigation">';
	    		   html += '<ul class="pagination jazz_bar_pagination">';
	    		   html += '<li>';
	    		   html += '<a href="#" aria-label="Previous">' ;
	    		   html += '<span aria-hidden="true">&laquo;</span>';
	    		   html += '</a>';
	    		   html += '</li>';
	    		   
	    		   html += '<li class="bar_tag_yahiro"><a>' + pagenationNum + '</a></li>';
	    		   
	    		   html += '<li>';
	    		   html += '<a href="#" aria-label="Next">';
	    		   html += '<span aria-hidden="true">&raquo;</span>';
	    		   html += '</a>';
	    		   html += '</li>';
	    		   html += '</ul>';
	    		   html += '</tbody>';
	    		   
	    		   $("yahiro_pagination_id").append(html);
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
		
////////////////////////////////////////////////////////////////////
	        
	        
//////////////////////////////////////////////////////////////////////
	        
	        
	});
});
