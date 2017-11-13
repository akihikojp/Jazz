package jp.co.rakus.jazz.repository;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import jp.co.rakus.jazz.domain.Prefecture;
import jp.co.rakus.jazz.domain.Region;

@Repository
public class PrefectureRepository {
	
	@Autowired
	private NamedParameterJdbcTemplate template;
	
	private final static RowMapper<Prefecture> prefectureRowMapper = (rs, i) -> {
		 //都道府県情報
		 Prefecture prefecture = new Prefecture();
		 prefecture.setId(rs.getInt("id"));
		 prefecture.setRegionId(rs.getInt("region_id"));
		 prefecture.setName(rs.getString("name"));
		 prefecture.setNameKana(rs.getString("name_kana"));
		 return prefecture;
	};
	
	private final static RowMapper<Region> regionRowMapper = (rs, i) -> {
		 //地域情報
		 Region region = new Region();
		 region.setId(rs.getInt("id"));
		 region.setName(rs.getString("name"));
		 region.setNameKana(rs.getString("name_kana"));	
		 return region;
	};
	
	/**@return 都道府県の情報を持ったリスト */
	public List<Prefecture> findAllPrefecture(){
		String sql = "SELECT id, region_id, name, name_kana FROM jazz.prefecture";
		return template.query(sql, prefectureRowMapper);
	}
	
	/**@return 選択された地域IDに該当する都道府県のみを抽出するメソッド*/
	public List<Prefecture> findPrefectureByRegionId(Integer regionId){
		String sql = "SELECT id, region_id, name, name_kana FROM prefecture where region_id = :regionId";
		MapSqlParameterSource param = new MapSqlParameterSource().addValue("regionId", regionId);
		return template.query(sql, param, prefectureRowMapper);	
	}
	
	/**@return 選択された都道府県IDに該当する地域情報を逆引き表示する為のメソッド*/
	public List<Region> findRegionByPrefectureId(Integer prefectureId){
		String sql = "SELECT id, name, name_kana FROM region WHERE id = (SELECT region_id "
				   + "FROM prefecture WHERE id = :prefectureId)";
		MapSqlParameterSource param = new MapSqlParameterSource().addValue("prefectureId", prefectureId);
		return template.query(sql, param, regionRowMapper);
	
	}

}
