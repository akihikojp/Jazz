package jp.co.rakus.jazz.controller;

import lombok.Data;

/** 地域情報のフォーム */
@Data
public class RegionForm {
	/** 地域ID */
	private String id;
	/** 地域名(漢字) */
	private String name;
	/** 地域名(ひらがな) */
	private String nameKana;

}
