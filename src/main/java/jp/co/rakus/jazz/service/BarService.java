package jp.co.rakus.jazz.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.co.rakus.jazz.domain.Bar;
import jp.co.rakus.jazz.repository.BarRepository;
import net.arnx.jsonic.JSON;

@Service
@Transactional
public class BarService {

	@Autowired
	private BarRepository barRepository;

	
	/**全喫茶店検索*/
	public List<Bar> findAllBars() {
		return barRepository.findAllBars();
	}
	
	/** @return 都道府県別 喫茶店情報 */
	public List<Bar> findByPrefectureId(Integer prefectureId) {
		return barRepository.findByPrefectureId(prefectureId);
	}

	/** @return 地域別 喫茶店情報 */
	public List<Bar> findByRegionId(Integer regionId) {
		return barRepository.findByRegionId(regionId);
	}
	
	/**緯度・経度情報の更新処理 @param address,latitude,longitude*/
	public void save(String address, double latitude, double longitude) {
		barRepository.save(address, latitude, longitude);
	}
	
	
	/**都道府県別あるいは地域別に喫茶店情報を検索する*/
	public List<Bar> findBarBySomeId(Integer regionId, Integer prefectureId) {
		List<Bar> barList = new ArrayList<>();
		if (regionId != 0 && prefectureId == 0) { // 地域IDのみ選択し、都道府県は全選択にした場合
			barList = findByRegionId(regionId);
			return barList;
			
		} else if (prefectureId != 0) { // 都道府県IDを選択した場合(地域IDも自動的に入る)
			barList = findByPrefectureId(prefectureId);
			return barList;
		} else // if(regionId == 0 && prefectureId == 0) { //未選択の場合
			return null;
	}
}

