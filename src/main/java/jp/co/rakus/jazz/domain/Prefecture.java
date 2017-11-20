package jp.co.rakus.jazz.domain;

import lombok.Data;

/** 都道府県情報のドメイン */
@Data
public class Prefecture {
	/** 都道府県ID */
	private Integer id;
	/** 地域ID */
	private Integer regionId;
	/** 都道府県名(漢字) */
	private String name;
	/** 都道府県名(ひらがな) */
	private String nameKana;
	/** 地域情報のドメイン */
	private Region region;
}
