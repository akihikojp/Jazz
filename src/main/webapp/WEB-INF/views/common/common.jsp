<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
	<!-- jQuery読込みがBootstrapよりも後にあると、時々正しく動作しない時がある -->
	<script src="https://code.jquery.com/jquery-1.12.1.min.js"></script>
	<script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/currentPosition.js"></script>
    	<script type="text/javascript" src="${pageContext.request.contextPath}/js/sirusiizu.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/findBar.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/prefecture.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/getLatitudeAndLongitude.js"></script>
	<!-- 1.initMap付き -->
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDksEhWBuS-e45DgaBF9k9KeEDCjMzbNgw&callback=initMap"></script>
	<!-- 2.initMap無し -->
	<!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDksEhWBuS-e45DgaBF9k9KeEDCjMzbNgw"></script> -->
	
	<!-- BootstrapのJS読み込み -->
<%-- 	<script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
    	<script type="text/javascript" src="${pageContext.request.contextPath}/js/sirusiizu.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/findBar.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/prefecture.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/getLatitudeAndLongitude.js"></script> --%>
	<link href="${pageContext.request.contextPath}/css/bootstrap.css" rel="stylesheet">
	<link href="${pageContext.request.contextPath}/css/original.css" rel="stylesheet">
 	
 	<!--以下の処理:参考URL:https://qiita.com/akippiko/items/a4c539934fa4df2fd5b5-->
	<style>
        html { height: 100% }
        body { height: 100%; margin: 0; padding: 0 }
        #mapCanvas {
     		height: 50%;
     		width: 80%;
     		margin-top: 30px;
     		margin-left: auto;
     		margin-right: auto;
     		display: block;
     		zoom : 0.6;
     	}
    </style>

<title>全国Jazz喫茶マップ</title>
</head>

<header>
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
			<b><font size="5" color="#800000">近場の喫茶案内MAP&nbsp;&nbsp;</font></b><br>
			<font size="4">あなたの今いる場所から最も近い喫茶店を見つけます</font>
			</div>


		</div>
		<!-- /.navbar-collapse -->
	</div>
	<!-- /.container-fluid -->
</nav>










