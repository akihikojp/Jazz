package jp.co.rakus.jazz.controller;

import lombok.Data;

/** 都道府県情報のフォーム */
@Data
public class PrefectureForm {
	/** 都道府県ID */
	private String id;
	/** 地域ID */
	private String regionId;
	/** 都道府県名(漢字) */
	private String name;
	/** 都道府県名(ひらがな) */
	private String nameKana;
}
