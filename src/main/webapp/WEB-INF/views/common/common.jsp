<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
	<!-- jQuery読込みがBootstrapよりも後にあると、時々正しく動作しない時があるらしい。 -->
	 <!-- jQuery読み込み -->
	<script src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
	 <!-- BootstrapのJS読み込み -->
    <script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDksEhWBuS-e45DgaBF9k9KeEDCjMzbNgw"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/sample.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/getLatitudeAndLongitude.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/sirusiizu.js"></script>
	<script src="${pageContext.request.contextPath}/js/currentPosition.js"></script>
	<link href="${pageContext.request.contextPath}/css/bootstrap.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/original.css" rel="stylesheet">

<title>全国Jazz喫茶マップ</title>

<nav class="navbar navbar-default">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed"
				data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
				aria-expanded="false">
				<span class="sr-only">Toggle navigation</span> 
				<span class="icon-bar"></span> 
				<span class="icon-bar"></span> 
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="${pageContext.request.contextPath}/top">
<%-- 				<!-- ヘッダーロゴ --> 
				<img alt="画像のテキスト情報" src="${pageContext.request.contextPath}/img/jazz_kissa.jpg" width ="150" height="150"> --%>
			</a>
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse"
			id="bs-example-navbar-collapse-1">
			<p class="navbar-text navbar-right">
			
			<div align="left" >
			<b><font size="5" color="#800000">近場のJAZZ喫茶案内MAP&nbsp;&nbsp;〜JAZZ喫茶に行こう〜</font></b><br>
			<font size="4">あなたの今いる場所から最も近いJAZZ喫茶を見つけます。</font>
			</div>

			<div align="right">
				<sec:authorize access="isAnonymous()">
					<a href="${pageContext.request.contextPath}/login"
						class="navbar-link">ログイン</a>&nbsp;&nbsp; 
						</sec:authorize>

				<sec:authorize access="isAuthenticated()">
					<a href="${pageContext.request.contextPath}/update-userinfo"
						class="navbar-link">登録情報</a>&nbsp;&nbsp;
							<a href="${pageContext.request.contextPath}/logout"
						class="navbar-link">ログアウト</a>
				</sec:authorize>
			</div>
			</p>
		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container-fluid -->
</nav>










