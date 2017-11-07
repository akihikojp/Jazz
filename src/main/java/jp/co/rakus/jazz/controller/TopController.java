package jp.co.rakus.jazz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jp.co.rakus.jazz.domain.Bar;
import jp.co.rakus.jazz.service.TopService;

@Controller
@RequestMapping
public class TopController {
	
	@Autowired
	private TopService topService;
	
	@ModelAttribute
	public BarForm setUpForm(){
		return new BarForm();
	}
	
	@RequestMapping("/top")
	public String top() {
		topService.findJazzBar();
		return "top";
	}
	
	@RequestMapping("/sample")
	public String sample() {
		topService.findJazzBar();
		return "sample";
	}
	
	@RequestMapping("/")
	@ResponseBody
	public String findAllBars(Model model, BarForm form) {
		List<Bar> barList = topService.findAllBars();
		//jsonで受け取る
		
		return null;
	}
	

}
