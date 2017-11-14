<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="common/common.jsp"%>
</header>

<body background="img.jpg" />
<style>
body {
	background-image: url(img/jazz_bgd.jpg);
	background-size: cover;
	font-size: 15px;
}
</style>

<div class="container">
	<div class="row browser_box">
		<div class="col-xs-12">
			<div class="well">

				<fieldset class="browser_box">
					<legend style="text-align: center">
						<i>JAZZ喫茶を検索する </i>
					</legend>

					<label for="distance">【検索条件を選択してください】</label> <br>
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

					<select name="regionId" id="select_region" class="region_class">
						<option value="0">地域で検索</option>
						<c:forEach var="region" items="${regionList}" varStatus="status">
							<option value="${status.count}"><c:out value="${region.name}"/></option>
						</c:forEach>
					</select> <br>

					<div>
						<select name="prefectureId" id="select_prefecture"
							class="prefecture_class">
							<option value="0">都道府県で検索</option>
							<c:forEach var="prefecture" items="${prefectureList}"
								varStatus="status">
								<option value="${status.count}"><c:out value="${prefecture.name}"/></option>
							</c:forEach>
						</select> <br> <input type="button" value="検索" id="findBar">
						<!-- findBarボタンのonclickでjsメソッドが動く -->
						<input type="button"
							onclick="location.href='${pageContext.request.contextPath}/top'"
							value="リセット">
					</div>
				</fieldset>

				<br>


				<table border="1">
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

<!--  検索結果 -->
<div class="container">
	<div class="row browser_box">
		<div class="col-xs-12">
			<div class="well">
				<form:form modelAttribute="bookForm" method="post"
					action="${pageContext.request.contextPath}/admin/confirm_page">
					<c:if test="${error != null}">
						<label class="control-label" style="color: red" for="inputError"><c:out
								value="${error}" /></label>
					</c:if>

					<fieldset>
						<legend style="text-align: center">
							<i>検索結果</i>
						</legend>

						<!-- いくつかのピンが表示される。
							ピンをクリックしたら、下にjsで動的な表示がされる。という実装にしたい。 -->
						<br>
						<table align=center border=1 width="350">
							<tr>
								<th colspan="2">喫茶店情報</th>
							</tr>
							<tr>
								<td align="center">店舗名:</td>
								<td align="center">&nbsp;ゴールデンバー</td>
							<tr>
								<td align="center">住所:</td>
								<td align="center">&nbsp;東京都新宿区</td>
							<tr>
								<td align="center">電話番号:</td>
								<td align="center">&nbsp;0120-888-888</td>
							<tr>
								<td align="center">評価:</td>
								<td align="center">&nbsp;★★★</td>
							<tr>
								<td align="center">メモ:</td>
								<td align="center">&nbsp;※↑ここ非同期でやりたい</td>
							<tr>
								<td colspan="2"><input type=checkbox name="" value="check"
									align=center><i>お気に入りの店リストに追加する</i></td>
						</table>



					</fieldset>
				</form:form>
			</div>
		</div>
	</div>
</div>


<div class="container">
	<div class="row browser_box">
		<div class="col-xs-12">
			<div class="well">
				<!--選択した地域の住所情報から経度・緯度を抽出し、DBに格納 -->
				<select name="regionId" id="update_region" class="region_class">
					<c:forEach var="region" items="${regionList}" varStatus="status">
						<option value="${status.count}"><c:out value="${region.name}"/></option>
					</c:forEach>
				</select> <input type=submit value="緯度経度取得ボタン(管理者用)" id="findLatAndLng">
			</div>
		</div>
	</div>
</div>

<!-- GoogleMapの表示 -->
<div id="mapCanvas" style="position: static"></div>


<br>
</body>
</html>

