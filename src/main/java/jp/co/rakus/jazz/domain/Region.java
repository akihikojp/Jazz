package jp.co.rakus.jazz.domain;

/** 地域情報のドメイン */
public class Region {
	/** 地域ID */
	private Integer id;
	/** 地域名(漢字) */
	private String name;
	/** 地域名(ひらがな) */
	private String nameKana;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNameKana() {
		return nameKana;
	}

	public void setNameKana(String nameKana) {
		this.nameKana = nameKana;
	}

}
