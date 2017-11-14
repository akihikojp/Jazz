package jp.co.rakus.jazz.domain;

/** 非同期通信のパラメータ */
public class AjaxParameter {

	/** 検索キーワード */
	private String place;
	/** 住所 */
	private String address;
	/** 緯度 */
	private double latitude;
	/** 経度 */
	private double longitude;

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
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