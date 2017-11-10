package jp.co.rakus.jazz.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jp.co.rakus.jazz.domain.Bar;
import jp.co.rakus.jazz.domain.Prefecture;
import jp.co.rakus.jazz.service.BarService;
import jp.co.rakus.jazz.service.PrefectureService;

@Controller
@RequestMapping()
public class TopController {

	@Autowired
	private BarService barService;
	@Autowired
	private PrefectureService prefectureService;

	@ModelAttribute
	public BarForm setUpForm() {
		return new BarForm();
	}

	@RequestMapping("/top")
	public String top() {
		barService.findAllBars();
		return "top";
	}

	@RequestMapping("/sample")
	public String sample() {
		return "sample";
	}

	/**
	 * @return データベース情報(json形式)
	 */
	@ResponseBody
	@RequestMapping("/ajax")
	public List<Bar> findByPrefectureId(Integer prefectureId) {
		// return topService.findByPrefectureId(2);
		if (prefectureId == 0) {
			return barService.findAllBars();
		}
		return barService.findByPrefectureId(prefectureId);
	}
	
	
	
	/**
	 * JSON型でリターン
	 * @return リスト形式のJazzBar住所(全576件)
	 */
	@ResponseBody
	@RequestMapping("/lat_lng")
	public List<String> toFindLatANDLng() {
		List<String> barAddressList = new ArrayList<>();
		
//		//以下本番用。動作確認済み。
//		List<Bar> barList = barService.findAllBars();
//		for(Bar bar : barList) {
//			String barAddress = bar.getAddress();
//			barAddressList.add(barAddress);
//		}
//		return barAddressList;
		
		//以下、テスト用
		List<Bar> testBarList = barService.findByPrefectureId(2);//青森：５件
		for(Bar bar : testBarList) {
			String barAddress = bar.getAddress();
			barAddressList.add(barAddress);
		}
		return barAddressList;
		//以上、テスト用
	}

	@ResponseBody
	@RequestMapping("/find_prefecture")
	public List<Prefecture> prefectureInfo(){
		List<Prefecture> prefectureList =  prefectureService.findAllPrefecture();
		
		return prefectureList;
		
	}
		
}