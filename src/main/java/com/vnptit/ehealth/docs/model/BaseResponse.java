package com.vnptit.ehealth.docs.model;

import org.springframework.stereotype.Component;

@Component
public class BaseResponse {
	public String CODE;
	public String MESSAGE;
	public Object RESULT;
    public String responseCode;

	public BaseResponse() {}

	public BaseResponse(String code, String message, Object result) {
		this.CODE = code;
		this.MESSAGE = message;
		this.RESULT = result;
	}

    public BaseResponse(String CODE, String MESSAGE, Object RESULT, String responseCode) {
        this.CODE = CODE;
        this.MESSAGE = MESSAGE;
        this.RESULT = RESULT;
        this.responseCode = responseCode;
    }
}
