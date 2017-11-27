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
import net.arnx.jsonic.JSON;

@Controller
@RequestMapping()
public class TopController {

	@Autowired /** Bar情報のサービスクラス */
	private BarService barService;
	@Autowired /** 都道府県情報のサービスクラス */
	private PrefectureService prefectureService;
	/** JSONとJavaオブジェクトの相互変換ができるクラス */
	private static ObjectMapper mapper = new ObjectMapper();

	@ModelAttribute
	public BarForm setUpForm() {
		return new BarForm();
	}

	/** 都道府県、地域を取得したのちに、top画面を表示 */
	@RequestMapping("/top")
	public String top(Model model) {
		model.addAttribute("prefectureList", prefectureService.findAllPrefecture()); // 都道府県情報(北海道,青森...)
		model.addAttribute("regionList", prefectureService.findAllRegion());		   // 地域情報(東北地方,関東地方...)
		return "top";
	}
	
	/**クリックされたバーの情報を表示する。*/
	public String clickedBarDetails(){
		return null;

	}
	

	/** @return 検索条件に合致したBarオブジェクトのリスト(json形式) */
	@ResponseBody
	@RequestMapping("/find_bar")                                         
	public String findBarBySomeId(Integer regionId, Integer prefectureId) {
		return JSON.encode(barService.findBarBySomeId(regionId, prefectureId));
	}
	
	/** @return ジャズバー住所リスト(JSON型) */
	@ResponseBody
	@RequestMapping("/lat_lng")
	public List<String> toFindLatANDLng(Integer regionId, Integer pageNum/**nullのままでおｋ*/) {
		List<String> barAddressList = new ArrayList<>();

		// 管理者権限において、選択した地域IDの緯度・経度情報を取得する
		List<Bar> barList = barService.findByRegionId(regionId);
		for (Bar bar : barList) {
			String barAddress = bar.getAddress();
			barAddressList.add(barAddress);
		}
		return barAddressList;
	}

	/** @return 都道府県情報(JSON形式) */
	@ResponseBody
	@RequestMapping("/find_prefecture")
	public List<Prefecture> findPrefectureByRegionId(Integer regionId) {
		List<Prefecture> prefectureList = new ArrayList<>();
		// 「地域を選択」タグのまま検索ボタンを押した時の動作
		if (0 == regionId) {
			prefectureList = prefectureService.findAllPrefecture();
			return prefectureList;
		} else {
			// 検索したい地域を選択した時
			prefectureList = prefectureService.findPrefectureByRegionId(regionId);
		}
		return prefectureList;
	}

	/** @return 地域情報(JSON形式) */
	@ResponseBody
	@RequestMapping("/find_region")
	public List<Region> findRegionByPrefectureId(Integer prefectureId) {
		List<Region> regionList = new ArrayList<>();
		if (0 == prefectureId) {
			regionList = prefectureService.findAllRegion();
		} else {
			regionList = prefectureService.findRegionByPrefectureId(prefectureId);
		}
		return regionList;
	}public TopController() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * sirusiizu.jsで取得したJSON形式のデータをオブジェクトに変換し、DBに格納する
	 * @param ajaxData jsで取得した緯度・経度データ
	 * @return DB格納が終わった後に表示されるmessage(sirusiizu.jsのメソッドの引数になってる!)
	 * @throws JsonParseException, JsonMappingException, IOException
	 */
	@RequestMapping(value = "/register_lat_and_lng", method = RequestMethod.POST)
	@ResponseBody
	public String registerLatAndLng(String ajaxData) 
			throws JsonParseException, JsonMappingException, IOException {

		// JSONをオブジェクト型リストに変換
		List<AjaxParameter> ajaxParameterList = mapper.readValue(ajaxData, new TypeReference<List<AjaxParameter>>() {
		});
		// JsonからBeanに変換:mapper.readValue
		// BeanからJsonに変換:mapper.writeValue
		String message = "";
		for (AjaxParameter ajaxParameter : ajaxParameterList) {
			String address = ajaxParameter.getAddress();
			double latitude = ajaxParameter.getLatitude();
			double longitude = ajaxParameter.getLongitude();
			barService.save(address, latitude, longitude);
		}

		// messageがsirusiizu.jsに渡って、alertで表示されるようになってる。
		//if (message.equals(""))
		//	message = "喫茶店情報がMAPに反映されました!";
		return message;
	}
	
}