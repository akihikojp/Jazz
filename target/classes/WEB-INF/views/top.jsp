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
			<div class="col-xs-offset-3 col-xs-6">
				<div class="well">
					<form:form modelAttribute="bookForm" method="post" action="${pageContext.request.contextPath}/admin/confirm_page">
						<c:if test="${error != null}">
							<label class="control-label" style="color: red" for="inputError"><c:out
									value="${error}" /></label>
						</c:if>
						
						<fieldset>
							<legend><i>JAZZ喫茶を検索する</i></legend>
							
							<label for="distance">【検索条件を選択してください】</label>
							<br>
							距離:<select id="distance" name="distance">
							<option value="nearest" selected>現在地から最も近い</option>
							<option value="1">1km以内</option>
							<option value="5">5km以内</option>
							<option value="10">10km以内</option>
							</select>
							<br>

							件数:<select id="number" name="number">
							<option value="1" selected>近場の1件</option>
							<option value="5">近場の5件</option>
							<option value="10">近場の10件</option>
							</select>
							<br>
							
							金額:<select id="price" name="price">
							<option value="1,000" selected>〜1,000円</option>
							<option value="1,000〜">1,000〜3,000円</option>
							<option value="10">3,000〜5,000円</option>
							</select>
							<br>
							
							<br>
							<input type="submit" value="上記条件で検索する">
						</fieldset>
					</form:form>				
				</div>
			</div>
		</div>
	</div>
	
	
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
<script src="${pageContext.request.contextPath}/js/currentPosition.js"></script>
</html>

