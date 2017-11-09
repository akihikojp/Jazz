package jp.co.rakus.jazz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jp.co.rakus.jazz.domain.Bar;
import jp.co.rakus.jazz.service.TopService;

@Controller
@RequestMapping()
public class TopController {

	@Autowired
	private TopService topService;

	@ModelAttribute
	public BarForm setUpForm() {
		return new BarForm();
	}

	@RequestMapping("/top")
	public String top() {
		topService.findAllBars();
		return "top";
	}

	@RequestMapping("/sample")
	public String sample() {
		// topService.findAllBars();
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
			return topService.findAllBars();
		}
		return topService.findByPrefectureId(prefectureId);
	}
}