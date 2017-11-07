<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="common/common.jsp"%>
    
</head>
<body>
						<fieldset>
							<legend><i>JAZZ喫茶を検索する</i></legend>
							
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
							<option value="0" selected>---</option>
							<option value="1">北海道</option>
							<option value="13">東京都</option>
							<option value="47">沖縄県</option>
							</select>
							<!-- <input type="button" onclick="location.href='http://localhost:8080/jazz/ajax'"> -->
							<input type="button" value="検索" id="findBar">
						</div>
						</fieldset>
						<br>
						
						
    <table border="1" >
        <thead>
            <tr>
                <td width="150" align="center">順番</td>
                <td width="150" align="center">店名</td>
                <td width="150" align="center">現在地からの距離</td>
            </tr>
        </thead>
        <tbody id="data-list" align="center"></tbody>
    </table>
</html>
</body>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDksEhWBuS-e45DgaBF9k9KeEDCjMzbNgw"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/sample.js"></script>
</html>