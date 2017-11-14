(function () {
	var sirusiizu = function () {
		this.map = null;
		this.callback = {};
		this.address = [];
		this.latlng = [];
	}
 
sirusiizu.prototype = {
	//sirusiizu.clear
	clear: function () {
		for (var i = 0; i < this.address.length; i++) {
			this.address[i].marker.setMap(null);
			this.address[i].marker = null;
			this.address[i].location = null;
		}
		this.address = [];
	},
	//sirusiizu.initialize
	initialize: function (id) {
		var myOptions = {
			zoom: 11,
			center: new google.maps.LatLng(35.691638, 139.704616),
			scaleControl: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(document.getElementById(id), myOptions);
	},
	//sirusiizu.selectSetCenter
	selectSetCenter: function (latLng ,placeData) {
		var map = this.map;
		var offset = new google.maps.Size(0, -30);
		var infoData = {
			content: placeData,
			position: latLng,
			pixelOffset: offset
		};
		//引数の経度緯度をマップの中央とし、ズーム
		map.setCenter(latLng);
		map.setZoom(16);
		var infowindow = new google.maps.InfoWindow(infoData);
		infowindow.open(map);
	},
	//sirusiizu.geocoding
	//住所から経度緯度を求める
	geocoding: function (addr, cb) {
		var map = this.map;
		var maxValue = 0;
		this.callback = cb ? cb : {};
		this.clear();
		for (var i = 0; i < addr.length; i++) {
			if (addr[i] != "") {
				this.address.push({
					index: i,
					address: addr[i], 
					iconURL: null, 
					infoHTML: null,
					title: null
				});
			}
		}
		
		if (this.address.length === 0) 
			return;
		
		codeAddress(map, this.address, 0, this.callback, ajaxObjList)
		return;
		
		function putMarker(map, addr) {
			var marker = new google.maps.Marker({
				icon: addr.icon,
				title: (
					addr.title ?
						addr.title 
					:
						(addr.index + 1) + ". " + addr.address
				),
				map: map, 
				position: addr.location
			});
			addr.marker = marker;
			if (addr.infoHTML) {
				var infowindow = new google.maps.InfoWindow({
					content: addr.infoHTML
				});
				addr.infowindow = infowindow;
				google.maps.event.addListener(marker, 'click', function() {
					console.log("click!");
					infowindow.open(map, marker);
				});
			}
		}
		
		function codeAddress(map, address, index, callback, ajaxObjList) {
		var geocoder;
			if (!geocoder) {
				geocoder = new google.maps.Geocoder();
			}
			if (geocoder) {
				geocoder.geocode( { 'address': address[index].address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						address[index].location = results[0].geometry.location;
						
						// 残りのデータ数を画面に表示
						$("#file_analysis").empty();
						$("#file_analysis").text("ファイル解析中...(" + index + "/" + address.length + ")");
						
						// DBに格納するピン情報のオブジェクト生成
						ajaxObjList.push({
							place   : address[index].address,
							address : results[0].formatted_address.replace(/^日本、/, ''),
							lat     : address[index].location.lat(),
							lng     : address[index].location.lng() 
						});
		
						if ("onGeocoded" in callback) {
							callback["onGeocoded"](index, address[index]);
						}
		
						putMarker(map, address[index]);
						index++;
						
						// 全ての住所にマーカーが立てられたかの判定
						if (index < address.length) {
							codeAddress(map, address, index, callback, ajaxObjList);
						} else {
							if ("onGeocodeCompleted" in callback) {
								callback["onGeocodeCompleted"](address);
							}
							// 処理状態を画面に表示するメソッド(onGoogleMap.jsに記述)
							dbProcessMessage();
							
							ajaxProcess(ajaxObjList, '/bulkRegist')
							.then(function(message) {
								alert(message);
								location.href = $("#contextPath").text() + "/addressInfo" + '/googleMap';
							})
							.catch(function(e) {
								alert(e);
								$("#file_analysis").empty();
								$("#menu_display").css("display", "");
							});
						}
					} else {
						if (status == "OVER_QUERY_LIMIT") {
							setTimeout(function(){
								codeAddress(map, address, index, callback, ajaxObjList);
							}, 2);
								
						} else {
							address[index].error = status;
							index++;
							codeAddress(map, address, index, callback, ajaxObjList);
						}
					}
				});
			}
		}
	},
	
	//経度緯度からマーカーを立てる
	//sirusiizu.latlngPutMarker
	latlngPutMarker: function(data ,cb){
		var markers=[];
		var map = this.map;
		var maxValue = 0;
		this.clear();
		
		for (var i = 0; i < data.length; i++) {
			if (data[i] != "") {
				this.latlng.push({
					index: i,
					place: data[i].place,
					lat: data[i].lat,
					lng: data[i].lng,
				});
			}
		}
		
		if (this.latlng.length === 0) 
			return;
		
		codeAddress(map, this.latlng, 0)
			return;
		
		//mapにマーカーを立てる
		function putMarker(map, latlng){
			var marker = new google.maps.Marker;
			markerLatLng = {lat: latlng.lat, lng: latlng.lng};
			marker = new google.maps.Marker({
				position: markerLatLng,
				map: map
			});
			markers.push(marker);
			var infowindow = new google.maps.InfoWindow({
				content: latlng.place
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
		}
		
		//マーカーを立てる再帰
		function codeAddress(map, latlng, index) {
			putMarker(map, latlng[index]);
			index++;
			if (index < latlng.length) {
				codeAddress(map, latlng, index);
			}else{
				//再起の終わり
				markerCluster();
			}
			if (status == "OVER_QUERY_LIMIT") {
				setTimeout(function(){
					codeAddress(map, latlng, index);
				}, 2);
			} 
		}
		//マーカーにクラスタを適用
		function markerCluster() {
			var markerCluster = new MarkerClusterer(
				map,
				markers,
				{imagePath : 'contextPath/../../images/m'});
		}
	}
}
	
window.sirusiizu = new sirusiizu();
})();
