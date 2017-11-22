/**地域選択→都道府県表示*/
$(function(){
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
		
	//地域を選択する要素タグがクリックされたら、該当する都道府県を選んでくれる。
	$('.region_class').on('change', function(){
		var selectVal = $("#select_region").val();//選択された地域ID 
		$.ajax({
			url :  hostUrl + '/find_prefecture?regionId=' + selectVal,
			dataType : 'json',
			type : 'GET'
		})
		.then(function(prefectures){
			$('#select_prefecture').empty(); //.empty()で、<option>情報を空っぽにする。.remove()はダメだった。
			$('#select_prefecture').append($('<option>').html('↓県で絞る').val(0));
			$.each(prefectures, function(index,value){
				$('#select_prefecture').append($('<option>').html(value.name).val(value.id));  //値は都道府県ID
			})
			
	    },function(){});
	});
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////


/**都道府県選択→地域表示*/
$(function(){
	var pathName = location.pathname.split('/')[1];
	var hostUrl = '/' + pathName;
		
	//都道府県が選択されたら、該当する地域が表示されるようにする.
	$('.prefecture_class').on('change', function(){ 
		var selectVal = $("#select_prefecture").val();//選択された都道府県のidを取得 
		$.ajax({
			//該当する地域を取得するメソッドが動く.
			url :  hostUrl + '/find_region?prefectureId=' + selectVal,
			dataType : 'json',
			type : 'GET'
		})
		.then(function(region){
			$('#select_region').empty(); //.empty()で、<option>情報を空っぽにする。.remove()はダメだった。
			$("#select_region").append($('<option>').html(region[0].name).val(region[0].id));  //値は地域ID
	    },function(){});
	});
});
