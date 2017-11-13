/**地域から都道府県を検索*/
$(function(){
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
		
	//地域を選択する要素タグがクリックされたら、該当する都道府県を選んでくれる。
	$('.region_class').on('change', function(){
		var selectVal = $("#select_region").val();//選択された地域ID 
		console.log('クリックされた地域ID:' + selectVal);
		$.ajax({
			url :  hostUrl + '/find_prefecture?regionId=' + selectVal,
			dataType : 'json',
			type : 'GET'
		})
		.then(function(prefectures){
			console.log('選ばれた都道府県:' + prefectures);
			$.each(prefectures, function(index,value){
				
			}
//			$.each(prefectures, function(index, value){
//				$('#select_prefecture').append($('<option>').html(value.name).val(index + 1));  //都道府県名と一致させるために+1		
//				$('#select_region').append($('<option>').html(value.region_name).val(index + 1));  //地域名と一致させるために+1
//				
//   	})
			
	    },function(){});
	});
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////

/**都道府県から地域を検索*/
$(function(){
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
		
	//都道府県が選択されたら、該当する地域が表示されるようにする.
	$('.prefecture_class').on('change', function(){ 
		var selectVal = $("#select_prefecture").val();//選択された都道府県のidを取得 
		$.ajax({
			//該当する地域を取得するメソッドが動く.
			url :  hostUrl + '/find-region?prefectureId=' + selectVal,
			dataType : 'json',
			type : 'GET'
		})
		.then(function(region){
			console.log("サブクエリの結果!!!" + region);
			
	    },function(){});
	});
});
