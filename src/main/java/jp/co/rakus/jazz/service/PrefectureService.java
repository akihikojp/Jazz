package jp.co.rakus.jazz.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.rakus.jazz.domain.Prefecture;
import jp.co.rakus.jazz.repository.PrefectureRepository;

@Service
public class PrefectureService {
	
	@Autowired
	private PrefectureRepository prefectureRepository;
	
	
	/**@return 都道府県と地域の情報を持ったリスト */
	public List<Prefecture> findAllPrefecture(){
		return prefectureRepository.findAllPrefecture();
	}

}
