package jp.co.rakus.jazz.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.co.rakus.jazz.domain.Prefecture;
import jp.co.rakus.jazz.domain.Region;
import jp.co.rakus.jazz.repository.PrefectureRepository;
import jp.co.rakus.jazz.repository.RegionRepository;

@Service
@Transactional
public class PrefectureService {
	
	@Autowired
	private PrefectureRepository prefectureRepository;
	
	@Autowired
	private RegionRepository regionRepository;
	

	
	/**@return 地域の情報を持ったリスト*/
	public List<Region> findAllRegion(){
		return regionRepository.findAllRegion();
	}
	
	/**@return 都道府県の情報を持ったリスト */
	public List<Prefecture> findAllPrefecture(){
		return prefectureRepository.findAllPrefecture();
	}
	
	/**@return 選択された地域IDに該当する都道府県情報*/
	public List<Prefecture> findPrefectureByRegionId(Integer regionId){
		return prefectureRepository.findPrefectureByRegionId(regionId);
	}

	
	/**@return 選択された都道府県IDに該当する地域情報*/
	public List<Region> findRegionByPrefectureId(Integer prefectureId){
		return prefectureRepository.findRegionByPrefectureId(prefectureId);
	}
}
