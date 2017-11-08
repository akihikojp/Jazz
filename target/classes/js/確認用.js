
	var dataList = [
		{name = 'あ,い,う,え,お'},
		{name = 'か,き,く,け,こ'},
		{name = 'さ,し,す,せ,そ'},
		{name = 'た,ち,つ,て,と'},
		{name = 'な,に,ぬ,ね,の'}
		];
	var あ行 = [];
	var か行 = [];
	var さ行 = [];
	var た行 = [];
	var な行 = [];
	
	var test = dataList.divide(5);
	console.log('ひらがなテスト' + test)