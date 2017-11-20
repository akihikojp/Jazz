package jp.co.rakus.jazz.domain;

import lombok.Data;

/** 地域情報のドメイン */
@Data
public class Region {
	/** 地域ID */
	private Integer id;
	/** 地域名(漢字) */
	private String name;
	/** 地域名(ひらがな) */
	private String nameKana;

}
