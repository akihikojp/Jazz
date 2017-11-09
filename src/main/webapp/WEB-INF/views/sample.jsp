<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="common/common.jsp"%>
    
</head>
<body>
						<fieldset>
							<legend><i>JAZZ喫茶を検索する
							<input type = submit value= "住所から緯度経度取得(仮配置)" id="findLatAndLng">
							<!-- findLatAndLngボタンをonclickするとgetLatitude.jsのメソッドが動く -->
							</i></legend>
							
							
							<label for="distance">現在地からの距離で検索</label>
							<br>
							距離:<select id="distance" name="distance">
							<option value="1">1km以内</option>
							<option value="5">5km以内</option>
							<option value="10">10km以内</option>
							</select>
							<input type="submit" value="検索">
							<br>

							件数:<select id="number" name="number">
							<option value="1" selected>1件</option>
							<option value="5">5件</option>
							<option value="10">10件</option>
							</select>
							<input type="submit" value="検索">
						</fieldset>
						<br>
						
						
						<fieldset>
							<label for="distance">地域で検索</label>
							<br>
				<!-- 		<select id="distance" name="distance">
							<option value="5" selected>---</option>
							<option value="5">北海道地方</option>
							<option value="10">東北地方</option>
							<option value="10">関東地方</option>
							</select>
							&nbsp;
							-->
						<div>
							<select name="prefectureId" id="select_prefecture">
							<!-- name属性はControllerの引数で渡される -->
							<!-- id属性はsample.jsのidで使用 -->
							<option value="0">都道府県</option>
							<option value="1">北海道</option>
							<option value="2">青森県</option>
							<option value="3">岩手県</option>
						 	<option value="4">宮城県</option>
							<option value="5">秋田県</option>
							<option value="6">山形県</option>
							<option value="7">福島県</option>
							<option value="8">茨城県</option>
							<option value="9">栃木県</option>
							<option value="10">群馬県</option>
							<option value="11">埼玉県</option>
							<option value="12">千葉県</option>
							<option value="13">東京都</option>
							<option value="14">神奈川県</option>
							<option value="15">新潟県</option>
							<option value="16">富山県</option>
							<option value="17">石川県</option>
							<option value="18">福井県</option>
							<option value="19">山梨県</option>
							<option value="20">長野県</option>
							<option value="21">岐阜県</option>
							<option value="22">静岡県</option>
							<option value="23">愛知県</option>
							<option value="24">三重県</option>
							<option value="25">滋賀県</option>
							<option value="26">京都府</option>
							<option value="27">大阪府</option>
							<option value="28">兵庫県</option>
							<option value="29">奈良県</option>
							<option value="30">和歌山県</option>
							<option value="31">鳥取県</option>
							<option value="32">島根県</option>
							<option value="33">岡山県</option>
							<option value="34">広島県</option>
							<option value="35">山口県</option>
							<option value="36">徳島県</option>
							<option value="37">香川県</option>
							<option value="38">愛媛県</option>
							<option value="39">高知県</option>
							<option value="40">福岡県</option>
							<option value="41">佐賀県</option>
							<option value="42">長崎県</option>
							<option value="43">熊本県</option>
							<option value="44">大分県</option>
							<option value="45">宮崎県</option>
							<option value="46">鹿児島県</option>
							<option value="47">沖縄県</option>
							</select>
							<input type="button" value="検索" id="findBar">
							<!-- findBarボタンのonclickでjsメソッドが動く -->
						</div>
						</fieldset>
						<br>
						
						
    <table border="1" >
        <thead>
            <tr>
                <td width="150" align="center">順番</td>
                <td width="300" align="center">店名</td>
                <td width="150" align="center">現在地からの距離</td>
            </tr>
        </thead>
        <tbody id="data-list" align="center"></tbody>
    </table>
</html>
</body>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDksEhWBuS-e45DgaBF9k9KeEDCjMzbNgw"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/sample.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/getLatitudeAndLongitude.js"></script>
</html>