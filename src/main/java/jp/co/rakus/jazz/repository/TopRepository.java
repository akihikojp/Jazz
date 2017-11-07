package jp.co.rakus.jazz.repository;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.co.rakus.jazz.domain.Bar;

@Repository
public class TopRepository {
	
	@Autowired
	private NamedParameterJdbcTemplate template;
	
	private final static RowMapper<Bar> barRowMapper = (rs, i) -> {
		Bar bar = new Bar();
		bar.setId(rs.getInt("id"));
		bar.setNameJpa(rs.getString("name_jpa"));
		bar.setNameEng(rs.getString("name_eng"));
		bar.setAddress(rs.getString("address"));
		bar.setTel(rs.getString("tel"));
		bar.setRegionId(rs.getString("region_id"));
		bar.setPrefectureId(rs.getString("prefecture_id"));
		return bar;
	};
	
	
	/** @return 全喫茶店情報 */
	public List<Bar> findAllBars() {
		String sql = "SELECT id, name_jpa, name_eng, address, tel, region_id, prefecture_id from bars";
		return template.query(sql, barRowMapper);
	}
	
	
	
	

}
