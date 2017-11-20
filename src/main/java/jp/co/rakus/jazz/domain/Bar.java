package jp.co.rakus.jazz.domain;

import lombok.Data;

/** create文 */
//CREATE TABLE `jazz`.`bars` (
//`id` INT NOT NULL,
//`name_jpa` VARCHAR(45) NOT NULL,
//`name_eng` VARCHAR(45) NOT NULL,
//`address` VARCHAR(45) NOT NULL,
//`tel` VARCHAR(45) NULL,
//`region_id` INT NOT NULL,
//`prefecture_id` INT NOT NULL,
//`latitude` double(8,6) DEFAULT NULL,
//`longitude` double(8,6) DEFAULT NULL,
//PRIMARY KEY (`id`),
//UNIQUE INDEX `id_UNIQUE` (`id` ASC),
//UNIQUE INDEX `tel_UNIQUE` (`tel` ASC));

/** 喫茶店情報のドメイン */
@Data
public class Bar {
	/** ID */
	private Integer id;
	/** 喫茶店名(日本語) */
	private String nameJpa;
	/** 喫茶店名(英語) */
	private String nameEng;
	/** 住所 */
	private String address;
	/** 電話番号 */
	private String tel;
	/** 地方(関東、近畿など) */
	private Integer regionId;
	/** 都道府県 */
	private Integer prefectureId;
	/** 緯度 */
	private double latitude;
	/** 経度 */
	private double longitude;

}