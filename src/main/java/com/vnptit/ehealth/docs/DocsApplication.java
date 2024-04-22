package com.vnptit.ehealth.docs;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DocsApplication {

	public static void main(String[] args) {
		System.setProperty("spring.config.name", "application-dev");
		SpringApplication.run(DocsApplication.class, args);
	}

}
