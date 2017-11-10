package jp.co.rakus.jazz.controller;

/** 都道府県情報のフォーム */
public class PrefectureForm {
	/** 都道府県ID */
	private String id;
	/** 地域ID */
	private String regionId;
	/** 都道府県名(漢字) */
	private String name;
	/** 都道府県名(ひらがな) */
	private String nameKana;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRegionId() {
		return regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
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
