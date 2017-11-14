package jp.co.rakus.jazz.controller;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jp.co.rakus.jazz.domain.AjaxParameter;
import jp.co.rakus.jazz.domain.Bar;
import jp.co.rakus.jazz.domain.Prefecture;
import jp.co.rakus.jazz.domain.Region;
import jp.co.rakus.jazz.service.BarService;
import jp.co.rakus.jazz.service.PrefectureService;

@Controller
@RequestMapping()
public class TopController {

	/**Bar情報のサービスクラス*/
	@Autowired
	private BarService barService;
	/**都道府県情報のサービスクラス*/
	@Autowired
	private PrefectureService prefectureService;
	/**	JSONをオブジェクトに変換するためのクラス */
	private static ObjectMapper mapper = new ObjectMapper();
	
	

	@ModelAttribute
	public BarForm setUpForm() {
		return new BarForm();
	}

	/**都道府県と地域情報を取得した上でtop画面を表示.*/
	@RequestMapping("/top")
	public String top(Model model) {
		barService.findAllBars();
		List<Prefecture> prefectureList = prefectureService.findAllPrefecture();
		List<Region> regionList = prefectureService.findAllRegion();
		model.addAttribute("prefectureList", prefectureList);
		model.addAttribute("regionList", regionList);
		
		return "top";
	}

	/**
	 * @return データベース情報(json形式)
	 */
	@ResponseBody
	@RequestMapping("/ajax")
	public List<Bar> findByPrefectureId(Integer prefectureId) {
		// return topService.findByPrefectureId(2); 動作確認用
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
		
		/**
		 * LIMIT OFFSETで100件に分割する方法もあり?
		 * delayとか入れてみる?
		 **/
		//以下本番用
		List<Bar> barList = barService.findAllBars();
		for(Bar bar : barList) {
			String barAddress = bar.getAddress();
			barAddressList.add(barAddress);
		}
		return barAddressList;
		
//		//以下、テスト
//		List<Bar> testBarList = 
//				//barService.findByPrefectureId(2);//青森：10件以下
//				//barService.findByPrefectureId(1);//北海道：37件
//				//barService.findByPrefectureId(13);//東京
//		
//		for(Bar bar : testBarList) {
//			String barAddress = bar.getAddress();
//			barAddressList.add(barAddress);
//		}
//		return barAddressList;
		//以上、テスト用
	}

	/**@return 都道府県情報(JSON形式)*/
	@ResponseBody
	@RequestMapping("/find_prefecture")
	public List<Prefecture> findPrefectureByRegionId(Integer regionId){
		List<Prefecture> prefectureList = new ArrayList<>();
		if(0 == regionId) {
			prefectureList = prefectureService.findAllPrefecture();
			return prefectureList;
		} else {
			prefectureList =  prefectureService.findPrefectureByRegionId(regionId);
		}
			return prefectureList;
		}
	

	/**@return 地域情報(JSON形式)*/
	@ResponseBody
	@RequestMapping("/find-region")
	public List<Region> findRegionByPrefectureId(Integer prefectureId){
		List<Region> regionList = new ArrayList<>();
		if(0 == prefectureId) {
			regionList = prefectureService.findAllRegion();
		} else {
			regionList = prefectureService.findRegionByPrefectureId(prefectureId);
		}
			return regionList;
		}	
	
	/**
	 * sirusiizu.jsで取得したJSON形式のデータを、DBに格納する
	 * @param ajaxData jsで取得した緯度・経度データ
	 * @return
	 * @throws JsonParseException 
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	@RequestMapping(value = "/register_lat_and_lng", method = RequestMethod.POST)
	@ResponseBody
	public String registerLatAndLng(String ajaxData) 
				throws JsonParseException, JsonMappingException, IOException{

		System.out.println("Controllerまで来ました。");
		System.out.println("!!!!!!!!!!!!!!!!!!!" + ajaxData);
		
		//JSONをオブジェクト型リストに変換
		List<AjaxParameter> ajaxParameterList 
		= mapper.readValue(ajaxData, new TypeReference<List<AjaxParameter>>() {});
		System.out.println("ControllerTest: その2");
		String message = "";
		int count = 0;
		for (AjaxParameter ajaxParameter : ajaxParameterList) {
			count++;
			String address = ajaxParameter.getAddress();
			double latitude = ajaxParameter.getLatitude();
			double longitude = ajaxParameter.getLongitude();
			barService.save(address,latitude,longitude);
			System.out.println(count + "番目のデータ処理中。");
		}
		
		if(message.equals("")) message = "正しくデータが更新されました"; 
		return message;
		}
	
		
}