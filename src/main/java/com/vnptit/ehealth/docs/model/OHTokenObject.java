package com.vnptit.ehealth.docs.model;

import org.springframework.stereotype.Component;

@Component
public class OHTokenObject {
	public String accessToken;
	public String idpToken;
	public String string;
	public boolean rememberMe;
	public Double expiredTime;
	public String tokenType;

	public OHTokenObject() {}


}
