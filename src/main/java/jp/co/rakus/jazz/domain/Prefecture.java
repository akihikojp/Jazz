package jp.co.rakus.jazz.domain;

/** 都道府県情報のドメイン */
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

	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getRegionId() {
		return regionId;
	}

	public void setRegionId(Integer regionId) {
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
