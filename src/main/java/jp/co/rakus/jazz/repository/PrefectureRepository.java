package jp.co.rakus.jazz.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import jp.co.rakus.jazz.domain.Prefecture;
import jp.co.rakus.jazz.domain.Region;


@Repository
public class PrefectureRepository {
	
	@Autowired
	private NamedParameterJdbcTemplate template;
	
	//Regionドメインの情報を持ったPrefectureドメイン
	private final static RowMapper<Prefecture> prefectureRowMapper = (rs, i) -> {
		 //地域情報
		 Region region = new Region();
		 region.setId(rs.getInt("id"));
		 region.setName(rs.getString("name"));
		 region.setNameKana(rs.getString("name_kana"));	
		 //都道府県情報
		 Prefecture prefecture = new Prefecture();
		 prefecture.setId(rs.getInt("id"));
		 prefecture.setRegionId(rs.getInt("region_id"));
		 prefecture.setName(rs.getString("name"));
		 prefecture.setNameKana(rs.getString("name_kana"));
		 prefecture.setRegion(region);
		 
		 return prefecture;
	};
	
	/**@return 都道府県と地域の情報を持ったリスト */
	public List<Prefecture> findAllPrefecture(){
		String sql = "SELECT p.id, p.name, p.name_kana, r.name, r.name_kana FROM prefecture p "
				   + "INNER JOIN region r ON p.region_id = r.id";
		return template.query(sql, prefectureRowMapper);
		
	}

}
