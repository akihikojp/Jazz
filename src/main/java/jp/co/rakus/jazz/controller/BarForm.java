package jp.co.rakus.jazz.controller;

import lombok.Data;

/** 喫茶店情報のフォーム */
@Data
public class BarForm {
	/** ID */
	private String id;
	/** 喫茶店名(日本語) */
	private String nameJpa;
	/** 喫茶店名(英語) */
	private String nameEng;
	/** 住所 */
	private String address;
	/** 電話番号 */
	private String tel;
	/** 地方(関東、近畿など) */
	private String regionId;
	/** 都道府県 */
	private String prefectureId;
	/** 緯度 */
	private String latitude;
	/** 経度 */
	private String longitude;

}
