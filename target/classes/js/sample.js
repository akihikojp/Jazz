/**
 * 1.ジャズバーの名前と住所のリストを用意
 * 2.データのリストから緯度経度を取得(非同期)
 * 3.現在位置の取得(非同期)
 * 4.DOMContentLoadedイベント(非同期)
 * 5.全ての非同期処理が終わったら
 * 6.それぞれの住所と現在地の距離を算出
 * 7.算出した距離の値が小さい(近い)順にソート
 * 8.結果をテーブルに出力
 */

/**
 * 1:東京都内のジャズバー
 * 経度緯度取得後に、各データ毎にlat(緯度),lng(経度)が入ります。
 */
var dataList = [
		{
			"name" : "いーぐる",
		    "address": "新宿区四谷1-8"
		},
		{
			"name" : "イントロ",
			"address": "新宿区高田馬場2-14-8"
		},
		{
			"name" : "シラムレン",
			"address": "新宿歌舞伎町1-1-10新宿ゴールデン街G2通り2F"
		},
		{
			"name" : "ダグ",
			"address": "新宿区新宿3-15-12 B1"		
		},
		{
			"name" : "ナルシス",
			"address": "新宿区歌舞伎町1-13-6　YOビル2F"	
		},
		{
			"name" : "直立猿人",
			"address": "大田区西蒲田7-61-8"	
		},
		{
			"name" : "六曜舎",
			"address": "沖縄市照屋1-13-7"
		},
		{
			"name" : "八尋家",
			"address": "港区港南4町目6-4-1003"
		},
	];
	
		/**
		 * 2.データリストの緯度経度を取得
		 */
$(function() {
		function dfdGeocode(){
			var dfd = $.Deferred();
			
			//Gercoderのインスタンスを生成
			var geocoder = new google.maps.Geocoder();
			
			//カウンター
			var cnt = 0;
		    
			//データ分緯度経度の取得
			$.each(dataList, function(i, data){
				geocoder.geocode({
					address: data.address
				}, function(d, status){
					data.lat = d[0].geometry.location.lat(); //緯度
					data.lng = d[0].geometry.location.lng(); //経度
					cnt++;
					if(cnt === dataList.length){
						dfd.resolve();
					}		
				});
			});
			return dfd.promise();
		}
		
		/**3.現在位置の取得*/
		function dfdCurrentPosition(){
			var dfd = $.Deferred();
			// Geolocationが使用可能かチェック
			if(!window.navigator.geolocation) dfd.reject();
			
			//現在地の取得
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
						enableHighAccuracy:true, //位置情報の制度を高く
						timeout: 10000, //10秒でタイムアウト
						maximumAge: 600000 //10分間有効
					}
			);
			
			return dfd.promise();
		}
		
		/**4.DOM Content Loaded*/
		function dfdDocumentReady(){
		    var dfd = $.Deferred();
		    $(function(){
		        dfd.resolve();
		    });
		    return dfd.promise();
		}
		
		/**5.非同期処理を並列化(データが揃った段階でソートを開始)*/
		$.when(
		    dfdCurrentPosition(), //現在地情報(経度・緯度)を取得
		    dfdGeocode(), //データリストの経度・緯度を取得
		    dfdDocumentReady()
		)
		.done(function(position){ // 全ての非同期処理が終わったら
			//現在地(coords属性は、area要素における領域の座標を指定する)
			var coords = position.coords;
		    
			//距離の割出しを行い、各データにdistance属性を設定
		    $.each(dataList, function(i, data){
		    		data.distance = getDistance(data.lat, data.lng, coords.latitude, coords.longitude, 0) /1000; //kmで算出	
		    });
		    
			//現在地からの距離が小さい順にソート
			dataList.sort(function(a,b){
				return (a.distance < b.distance) ? -1 : 1;
			});
			
			//データを出力
			var html = "";
			
	        $.each(dataList, function(i, data){
	            html += '<tr>';
	                html += '<td>'+(i+1)+'</td>';
	                html += '<td><a href="https://maps.google.co.jp/maps?q='+ data.name + data.address +'&z=17&iwloc=A" target="_blank">';
	                    html += data.name;
	                html += '</a></td>';
	                html += '<td>'+data.distance+'km</td>';
	            html += '</tr>';
	        });

	        $("#data-list").append(html);

		    
		}).fail(function(){
		    alert("お使いの端末の位置情報サービスが無効になっているか対応していないため、エラーが発生しました");
		    console.log("error", arguments);
		});
		
		
		
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
			if((Math.abs(lat1 - lat2) < 0.00001) && (Math.abs(lng1 - lng2) < 0.00001)){
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
});

		


