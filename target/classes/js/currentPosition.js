///**Googlemap上で現在地情報を取得する*/
//    // 現在地取得処理
//	function initMap() {
//        if (!navigator.geolocation) {
//            alert('Geolocation APIに対応していません');
//            return false;
//        }
//      // Geolocation APIに対応している
//      if (navigator.geolocation) {
//        // 現在地を取得
//        navigator.geolocation.getCurrentPosition(
//        		//取得成功時
//        		function(position) {
//            // 現在地の緯度・経度を取得
//            var mapLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//            var mapOptions = {
//            		zoom: 15,
//            		center : mapLatLng  // 緯度・経度
//            };
//            // マップオブジェクト作成
//            var currentMap = new google.maps.Map(
//              document.getElementById('mapCanvas'), // マップを表示する要素
//              mapOptions         // マップオプション
//            );
//            //　マップにマーカーを表示する
//            var imagePath = 'img/you_are_here.png';
////          var animation = google.maps.Animation.BOUNCE;
//            var marker = new google.maps.Marker({ //マーカー追加
//            	 map : currentMap,              // 対象の地図オブジェクト
//         	 position : mapLatLng,    // 緯度・経度
//         	 icon: imagePath,
////         	 animation: animation //ピンのアニメーション        
//         	 });
//          },
//          
//          // 取得失敗した場合
//          function(error) {
//            // エラーメッセージを表示
//            switch(error.code) {
//              case 1: // PERMISSION_DENIED
//                alert("位置情報の利用が許可されていません");
//                break;
//              case 2: // POSITION_UNAVAILABLE
//                alert("現在位置が取得できませんでした");
//                break;
//              case 3: // TIMEOUT
//                alert("タイムアウトになりました");
//                break;
//              default:
//                alert("その他のエラー(エラーコード:"+error.code+")");
//                break;
//            }
//          }); // Geolocation APIに対応していない
//      } else {
//        alert("この端末では位置情報が取得できません");
//      }
//    } //initMap関数