package jp.co.rakus.jazz.controller;

/** 地域情報のフォーム */
public class RegionForm {
	/** 地域ID */
	private String id;
	/** 地域名(漢字) */
	private String name;
	/** 地域名(ひらがな) */
	private String nameKana;

	public String getId() {
		return id;
	}

	public void setId(String id) {
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
