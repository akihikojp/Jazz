package jp.co.rakus.jazz.service;

import org.jsoup.select.Elements;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jp.co.rakus.jazz.domain.Bar;
import jp.co.rakus.jazz.repository.TopRepository;

@Service
@Transactional
public class TopService {

	@Autowired
	private TopRepository topRepository;

	/**
	 * 全国のjazzBar情報を取得するクラス.
	 * @return　まだ内容は未定・・・
	 */
	public String findJazzBar() {
		Document document = null;
		try {
			document = Jsoup.connect("http://jazz-kissa.jp/jazz-kissa-map-in-japan").get();
		} catch (Exception e) {
			System.err.println("データ取得エラーが発生しました!");
		}
			
		/**1.全情報取得*/
		Elements barElements = document.getElementsByTag("li");
		
		/**2.name取得*/
		List<String> barNameList = new ArrayList<>(); //List型の変数宣言
		for(Element element : barElements) { //elementには<li></li>間が1つの要素として入っている。				
			String barName = element.getElementsByTag("strong").text();
			if(!("".equals(barName))) { barNameList.add(barName); }
	    } 
		
			/**3.mapURL取得*/
			Elements hrefInfo = barElements.select("a[href]"); //MapURL以外の不要な情報もスクレイピングしてしまう。
			String convertedToText = String.valueOf(hrefInfo);//取得した要素を文字列に変換する。
			String[] splittedTexts = convertedToText.split("(?!<.*)\\\"(?=[^<]*>)");//「"」でsplitしている。
			List<String> mapAddressList = new ArrayList<>(); //List型の変数宣言
			for(String text: splittedTexts) {
				if(text.startsWith("https://www.google.com/maps/place")) { 
					//該当するアドレスをListに加える。
					mapAddressList.add(text);
				}
			}

			
			//for(String mapURL : mapAddressList) {
				String mapURL = mapAddressList.get(5);
			try {
				document = Jsoup.connect(mapURL).get();
			} catch (IOException e) {
				System.err.println("mapURL情報取得時にエラーが発生しました。");
				e.printStackTrace();
				}	
			Elements eachShopElements = document.getElementsByTag("section-info-text");
			for(Element shopInfo : eachShopElements) {
				System.out.println(shopInfo);
			}
				
		return null;
	}


	/** @return 全喫茶店情報 */
	public List<Bar> findByPrefectureId(Integer prefectureId) {
		return topRepository.findByPrefectureId(prefectureId);
	}
	
	/**全件検索*/
	public List<Bar> findAllBars() {
		return topRepository.findAllBars();
	}
}