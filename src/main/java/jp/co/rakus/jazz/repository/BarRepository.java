package jp.co.rakus.jazz.repository;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import jp.co.rakus.jazz.domain.Bar;

@Repository
public class BarRepository {
	
	@Autowired
	private NamedParameterJdbcTemplate template;
	
	private final static RowMapper<Bar> barRowMapper = (rs, i) -> {
		Bar bar = new Bar();
		bar.setId(rs.getInt("id"));
		bar.setNameJpa(rs.getString("name_jpa"));
		bar.setNameEng(rs.getString("name_eng"));
		bar.setAddress(rs.getString("address"));
		bar.setTel(rs.getString("tel"));
		bar.setRegionId(rs.getInt("region_id"));
		bar.setPrefectureId(rs.getInt("prefecture_id"));
		bar.setLatitude(rs.getDouble("latitude"));
		bar.setLongitude(rs.getDouble("longitude"));	
		return bar;
	};
	
	
	/** @return 全喫茶店情報 */
	public List<Bar> findAllBars() {
		String sql = "SELECT id, name_jpa, name_eng, address, tel, region_id, prefecture_id, latitude, longitude from bars";
		return template.query(sql, barRowMapper);
	}
	
	/**
	 * @param prefectureId　都道府県ID
	 * @return 選択された都道府県の喫茶店情報
	 */
	public List<Bar> findByPrefectureId(Integer prefectureId) {
		String sql = "SELECT id, name_jpa, name_eng, address, tel, region_id, prefecture_id, latitude, longitude from bars WHERE prefecture_id = :prefectureId";
		SqlParameterSource param = new MapSqlParameterSource().addValue("prefectureId", prefectureId);
		return template.query(sql, param, barRowMapper);	
		}
	
	
	/**
	 * @param regionId　地域ID
	 * @return 選択された地域の喫茶店情報
	 */
	public List<Bar> findByRegionId(Integer regionId) {
		String sql = "SELECT id, name_jpa, name_eng, address, tel, region_id, prefecture_id, latitude, longitude from bars WHERE region_id = :regionId";
		SqlParameterSource param = new MapSqlParameterSource().addValue("regionId", regionId);
		return template.query(sql, param, barRowMapper);	
	}
	
	
	/**緯度・経度情報の更新処理 @param address,latitude,longitude*/
	public void save(String address, double latitude, double longitude) {
		String sql;
		try {
		sql = "UPDATE bars SET latitude = :latitude, longitude = :longitude WHERE address = :address";
		template.update(sql, new MapSqlParameterSource()
							.addValue("latitude", latitude)
							.addValue("longitude", longitude)
							.addValue("address", address));
		}catch(Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	
}
