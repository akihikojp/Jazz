package jp.co.rakus.jazz.domain;

import lombok.Data;

/** 非同期通信のパラメータ */
@Data
public class AjaxParameter {

	/** 検索キーワード */
	private String place;
	/** 住所 */
	private String address;
	/** 緯度 */
	private double latitude;
	/** 経度 */
	private double longitude;
	
}