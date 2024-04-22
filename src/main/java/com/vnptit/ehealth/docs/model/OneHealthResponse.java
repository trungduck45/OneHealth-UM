package com.vnptit.ehealth.docs.model;

import org.springframework.stereotype.Component;

@Component
public class OneHealthResponse {
	public String code;
	public String message;
	public PaymentResponse data;

	public OneHealthResponse() {}


    public class PaymentResponse {
        public String reqSoHoaDon;

    }
}


