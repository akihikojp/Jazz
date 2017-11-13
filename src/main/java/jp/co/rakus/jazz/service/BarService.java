package jp.co.rakus.jazz.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.co.rakus.jazz.domain.Bar;
import jp.co.rakus.jazz.repository.BarRepository;

@Transactional
@Service
public class BarService {

	@Autowired
	private BarRepository barRepository;

	/** @return 全喫茶店情報 */
	public List<Bar> findByPrefectureId(Integer prefectureId) {
		return barRepository.findByPrefectureId(prefectureId);
	}
	
	/**全件検索*/
	public List<Bar> findAllBars() {
		return barRepository.findAllBars();
	}
	
	
}

