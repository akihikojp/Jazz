/*******************************************************************************
名前：しるしーず(ライブラリ)
説明：googleマップで複数住所を一括表示するライブラリ
　　　windowオブジェクトのプロパティにsirusiizuオブジェクトが追加される。
版　：1.01
更新履歴：
2014/06/06　markingメソッドでaddressオブジェクトの配列が渡された場合の処理を修正。

●sirusiizuオブジェクト
【メンバ変数】
　map:
　callback:markingメソッドの引数で渡したコールバック関数
　address:addressオブジェクト(下記参照)の配列
【メソッド】
　clear:addressプロパティをクリアし、地図上のマーカーを削除する。
　initialize:地図をdivタグに初期表示する。
　　《引数》
　　　id:地図を表示するdivタグのid
　setCenter:指定された住所を地図の中心にする。
　　《引数》
　　　index:中心に置く住所のaddressプロパティのインデックス。
　marking:addressプロパティの住所から位置情報を取得し、地図にマーカーを置く。
　　《引数》
　　　addressList:地図に表示する住所リスト。引数は以下の何れかで渡す。
　　　　・改行区切りの住所の文字列
　　　　・住所の配列
　　　　・ジオコード済のaddressオブジェクト
　　　cb:ジオコード実行後、全ジオコード終了時に渡された関数をコールバックする。
　　　　引数は連想配列で渡す。
　　　　{
　　　　　onGeocoded: １件のジオコード実行後に呼ばれる関数, 
　　　　　onGeocodeCompleted: 全ジオコード終了時に呼ばれる関数
　　　　}
　　　　《onGeocodedの関数に渡される引数》
　　　　　index:ジオコードを実行したaddressプロパティのインデックス。
　　　　　address:ジオコードを実行したaddressオブジェクト。
　　　　《onGeocodeCompletedの関数に渡される引数》
　　　　　address:addressオブジェクトの配列。

●addressオブジェクト
　マーキングに必要な情報がセットされる。
　sirusiizuオブジェクトのaddressプロパティは、当オブジェクトを配列で保持する。
【メンバ変数】
　address:住所
　iconURL:マーカー画像のURL
　index:配列内の自身のインデックス
　title:マーカーのツールチップで表示される文字
　infoHTML:情報ウィンドウに表示するHTML
　↓以下はジオコード時に取得し保持するオブジェクト。
　location
　icon
　marker
*******************************************************************************/
(function () {
var sirusiizu = function () {
	this.map = null;
	this.callback = {};
	this.address = [];
}
//プロトタイプとは？：オブジェクトみたいなもの。汎用的な関数をprototypeに定義する
sirusiizu.prototype = {
clear: function () {
	for (var i = 0; i < this.address.length; i++) {
		//画面上のピンを都度消してるイメージ
		//これがないと、アップロードするたびに前回のピンが画面上に残ってしまう
		this.address[i].marker.setMap(null);
		this.address[i].marker = null;
		this.address[i].location = null;
	}
	//addressオブジェクトの初期化。上の処理とは少し趣が違う。nullと初期化の違いを整理しよう
	this.address = [];
},

initialize: function (id) {
	var myOptions = {
		zoom: 5,
		//初回デフォルトで表示される地図の中心点.
		center: new google.maps.LatLng(35.6891848, 139.6916481),
		scaleControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	//どのMapを使うかという設定.
	//ここの'id'は他のjsで定義してる. (例) sirusiizu.initialize('mapCanvas');
	this.map = new google.maps.Map(document.getElementById(id), myOptions);
},

setCenter: function (index) {
	var map = this.map;
	map.setCenter(this.address[index].location);
	this.address[index].infowindow.open(map, this.address[index].marker);
	if (map.zoom < 9) {
		map.setZoom(9);
	}
},

//これ呼んでる.
marking: function (addressList, cb/**コールバック*/) {
	var ajaxObjList = new Array();
	var map = this.map; //どのGoogleMapを使うか宣言してる.
	var maxValue = 0;
	this.callback = cb ? cb : {};
	this.clear();
	
	for (var i = 0; i < addressList.length; i++) {
		
		if (addressList[i] != "") {
			this.address.push({
				index: i,
				address: addressList[i],
				iconURL: "img/jazz_icon.png",
				title: "クリックすると詳細情報が閲覧できます。",
				infoHTML: "リンククリックで詳細情報が閲覧できます<br>"
				+ '<a href="https://maps.google.co.jp/maps?q=' + addressList[i] + '&z=17&iwloc=A" target="_blank">'
				+ addressList[i]
				+ '</a>'
			});
		}
	}
	
	if (this.address.length === 0) //addrに何も入ってなかった場合の処理. これがないとgeocodeが無限ループになる。
		return;
	
	codeAddress(map, this.address, 0, this.callback, ajaxObjList)
	return;

	//ピンたてを行うメソッド
	function putMarker(map, addressList) {
		var marker = new google.maps.Marker({
			icon: addressList.icon,
			title: (
					addressList.title ?
							addressList.title 
				:
					(addressList.index + 1) + ". " + addressList.address
			),
			map: map, 
			position: addressList.location
		});
		addressList.marker = marker;
		if (addressList.infoHTML /**108行目で定義*/ ) {
			var infowindow = new google.maps.InfoWindow({
				content: addressList.infoHTML
			});
			addressList.infowindow = infowindow;
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
		}
	} //putMarkerメソッド

	
	//経度と緯度を算出するメソッド
	function codeAddress(map, address, index, callback, addressList) {
	var geocoder; //geocoder:住所情報を地理座標に変換するAPI.
		if (!geocoder) {
			geocoder = new google.maps.Geocoder();
		}
		if (geocoder) {//検索結果が複数あるとresultsに複数入る。この場合、一番上の要素以外は排除される。
			geocoder.geocode( { 'address': address[index].address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					address[index].location = results[0].geometry.location;
					
					// DBに格納する経度・緯度情報(ピン情報)のオブジェクト生成
					/**緯度・経度格納リスト*/
					ajaxObjList.push({
						address   : address[index].address,
						latitude     : address[index].location.lat(),
						longitude     : address[index].location.lng() 
					});
					
					//エラーがあったらコールバックする
					if ("onGeocoded" in callback) {
						callback["onGeocoded"](index, address[index]);
					}
	
					//アイコンを変えたいときに使用する
					if (address[index].iconURL) {
						address[index].icon = new google.maps.MarkerImage(address[index].iconURL);
					} else {
						address[index].icon = null;
					}
					
					//ピンたてメソッド
					putMarker(map, address[index]);
					index++;
					
					if (index < address.length) {
						codeAddress(map, address, index, callback);
					} else { 
						//★全ての経度緯度が取得できたらここにくる.
						if ("onGeocodeCompleted" in callback) {
							callback["onGeocodeCompleted"](address);
						}
						
						fitBounds(map, address);
						
						//ajaxProcess呼出し.
						//ここでDBに格納する処理を行なっている.
						ajaxProcess(ajaxObjList)
//						.then(function(message) {
//							alert(message);
//						})
						
									
					   }
				} else {	//statusがOKじゃなかった時の処理
					//使用制限を超過した場合に吐き出されるエラー文.
					//1秒間に10件しか取得できないという制約がある.
					if (status == "OVER_QUERY_LIMIT") {
							setTimeout(function(){
								codeAddress(map, address, index, callback);
							}, 2); //0.002sec待ってる
					} else {
						address[index].error = status;
						index++;
						codeAddress(map, address, index, callback);
					}
				}
			});
		}
	}//codeAddress終

					//境界を合わせる処理
					function fitBounds(map, address) {
						north = 0;
						east  = 0;
						south = 999;
						west  = 999;
						for(var i = 0; i < address.length; i++) {
							if (address[i].location) {
								west  = Math.min(west , address[i].location.lng());
								north = Math.max(north, address[i].location.lat());
								east  = Math.max(east , address[i].location.lng());
								south = Math.min(south, address[i].location.lat());
							}
						}
						var northeast = new google.maps.LatLng(north, east);
						var southwest = new google.maps.LatLng(south, west);
						map.fitBounds(new google.maps.LatLngBounds(southwest, northeast));
					} //fitBounds終
					
		} //marking:function終
} //sirusiizu.prototype終

window.sirusiizu = new sirusiizu();  //ここでnew
})();
