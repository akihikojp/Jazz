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
						<i>喫茶店を検索する </i>
					</legend>

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
					★地域で選択:
						<select name="regionId" id="select_region" class="region_class">
							<option value="0">地域</option>
							<c:forEach var="region" items="${regionList}" varStatus="status">
								<option value="${status.count}"><c:out value="${region.name}"/></option>
							</c:forEach>
						</select> 
						<br>
					★都道府県で選択:
						<select name="prefectureId" id="select_prefecture" class="prefecture_class">
							<option value="0">都道府県</option>
							<c:forEach var="prefecture" items="${prefectureList}" varStatus="status">
								<option value="${status.count}"><c:out value="${prefecture.name}"/></option>
							</c:forEach>
						</select> 
						 
						 <br> 
						 <input type="button" value="検索" id="findBar"> 
						 <input type="button" onclick="location.href='${pageContext.request.contextPath}/top'" value="リセット">
					</div>
				</fieldset>

				<br>
								
				<!--　喫茶店情報の表示とか -->
				<div id="data-list" align="left"></div>
				
				
				
				<!-- GIF制御のためのコンテナ -->
				<div id="loading_container">
				<!-- ロード中のGIF img -->	
				<div id="loading"> <img src="img/loading.gif"> </div>
				
				<!-- ページングの処理 -->
				<nav aria-label="Page navigation">
					<ul class="pagination jazz_bar_pagination">
<!-- 						<li>
							<a href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
							</a> 
						</li>	 -->		
						<li id="yahiro-pagination-id"><a></a></li>	
<!-- 	 					<li>
							<a href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
							</a>
						</li> -->
					</ul>
				</nav>
				
				</div>
				
	<!-- 						<table align=center border=1 width="350">
							<tr>
								<th colspan="2">喫茶店情報</th>
							</tr>
							<tr>
								<td align="center">評価:</td>
								<td align="center">&nbsp;★★★</td>
							</tr>
							<tr>
								<td align="center">メモ:</td>
								<td align="center">&nbsp;※↑ここ非同期でやりたい</td>
							</tr>
							<tr>
								<td colspan="2"><input type=checkbox name="" value="check">
								<i>お気に入りの店リストに追加する</i></td>
							</tr>
						</table> -->
						
			</div>
		</div>
	</div>
</div>


				<!-- GoogleMapの表示 -->
				<div id="mapCanvas" style="position:static"></div>


<%-- <div class="container">
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
</div> --%>




<br>
</body>
</html>

