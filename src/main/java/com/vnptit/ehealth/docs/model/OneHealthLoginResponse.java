package com.vnptit.ehealth.docs.model;

import org.springframework.stereotype.Component;

@Component
public class OneHealthLoginResponse {
	public String code;
	public String message;
	public OHTokenObject data;

	public OneHealthLoginResponse() {}


}
