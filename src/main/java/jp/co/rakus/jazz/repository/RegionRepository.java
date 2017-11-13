package jp.co.rakus.jazz.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import jp.co.rakus.jazz.domain.Region;

@Repository
public class RegionRepository {
	
	@Autowired
	private NamedParameterJdbcTemplate template;
	
	//Regionドメインの情報を持ったRegionドメイン
	private final static RowMapper<Region> regionRowMapper = (rs, i) -> {
		 //地域情報
		 Region region = new Region();
		 region.setId(rs.getInt("id"));
		 region.setName(rs.getString("name"));
		 region.setNameKana(rs.getString("name_kana"));	
		 return region;
	};

	/**@return 地域の情報を持ったリスト*/
	public List<Region> findAllRegion(){
		String sql = "SELECT id, name, name_kana FROM jazz.region";
		return template.query(sql, regionRowMapper);
	}
	
}