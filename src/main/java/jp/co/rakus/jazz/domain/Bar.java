package jp.co.rakus.jazz.domain;

/** create文 */
//CREATE TABLE `jazz`.`bars` (
//`id` INT NOT NULL,
//`name_jpa` VARCHAR(45) NOT NULL,
//`name_eng` VARCHAR(45) NOT NULL,
//`address` VARCHAR(45) NOT NULL,
//`tel` VARCHAR(45) NULL,
//`region_id` INT NOT NULL,
//`prefecture_id` INT NOT NULL,
//`latitude` double(8,6) DEFAULT NULL,
//`longitude` double(8,6) DEFAULT NULL,
//PRIMARY KEY (`id`),
//UNIQUE INDEX `id_UNIQUE` (`id` ASC),
//UNIQUE INDEX `tel_UNIQUE` (`tel` ASC));

/** 喫茶店情報のドメイン */
public class Bar {
	/** ID */
	private Integer id;
	/** 喫茶店名(日本語) */
	private String nameJpa;
	/** 喫茶店名(英語) */
	private String nameEng;
	/** 住所 */
	private String address;
	/** 電話番号 */
	private String tel;
	/** 地方(関東、近畿など) */
	private Integer regionId;
	/** 都道府県 */
	private Integer prefectureId;
	/** 緯度 */
	private double latitude;
	/** 経度 */
	private double longitude;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
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
	public Integer getRegionId() {
		return regionId;
	}
	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}
	public Integer getPrefectureId() {
		return prefectureId;
	}
	public void setPrefectureId(Integer prefectureId) {
		this.prefectureId = prefectureId;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	

}