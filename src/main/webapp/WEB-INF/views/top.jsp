<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="common/common.jsp"%>

</head>

<body background="img.jpg"/>
<style>
body {
	background-image: url(img/jazz_bgd.jpg);
	background-size: cover;
	font-size: 15px;
	}
</style>

<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="well">
						
						<fieldset>
							<legend><i>JAZZ喫茶を検索する
							<input type = submit value= "緯度経度検索(仮)" id="findLatAndLng">
							<!-- findLatAndLngボタンをonclickするとgetLatitude.jsのメソッドが動く -->
							</i></legend>
							
							<label for="distance">【検索条件を選択してください】</label>
							<br>
				<!--   		距離:<select id="distance" name="distance">
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
							<br>
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
					<br>
						
				</div>
			</div>
		</div>
	</div>

	<br>
	<br>
	<br>
	<br>
	
	<!--  検索結果 -->
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="well">
					<form:form modelAttribute="bookForm" method="post" action="${pageContext.request.contextPath}/admin/confirm_page">
						<c:if test="${error != null}">
							<label class="control-label" style="color: red" for="inputError"><c:out
									value="${error}" /></label>
						</c:if>
						
						<fieldset>
							<legend><i>検索結果</i></legend>
							<!-- GoogleMapの表示 -->
							<div id="map"></div>
							<!-- いくつかのピンが表示される。
							ピンをクリックしたら、下にjsで動的な表示がされる。という実装にしたい。 -->
							<br>
							<table border=1 width="350">
								 <tr><th colspan="2">喫茶店情報</th></tr>
								 <tr><td align="center">店舗名:</td><td align="center">&nbsp;ゴールデンバー</td>
								 <tr><td align="center">住所:</td><td align="center">&nbsp;東京都新宿区</td>
								 <tr><td align="center">電話番号:</td><td align="center">&nbsp;0120-888-888</td>
								 <tr><td align="center">評価:</td><td align="center">&nbsp;★★★</td>
								 <tr><td align="center" >メモ:</td><td align="center">&nbsp;※↑ここ非同期でやりたい</td>						 
							</table>
							<input type=checkbox name="" value="check"><i>また行きたいリストに追加する</i>
							

						</fieldset>
					</form:form>				
				</div>
			</div>
		</div>
	</div>
	
	<br>
				<!-- GoogleMapの表示 -->
				<div id="map"></div>
</body>
</html>

