package jp.co.rakus.jazz.controller;

/** 喫茶店情報のフォーム */
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNameJpa() {
		return nameJpa;
	}

	public void setNameJpa(String nameJpa) {
		this.nameJpa = nameJpa;
	}

	public String getNameEng() {
		return nameEng;
	}

	public void setNameEng(String nameEng) {
		this.nameEng = nameEng;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getRegionId() {
		return regionId;
	}

	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	public String getPrefectureId() {
		return prefectureId;
	}

	public void setPrefectureId(String prefectureId) {
		this.prefectureId = prefectureId;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

}
