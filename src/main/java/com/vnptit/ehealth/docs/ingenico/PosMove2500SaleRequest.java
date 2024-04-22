package com.vnptit.ehealth.docs.ingenico;

public class PosMove2500SaleRequest {

	public String requestId;
	public String clientId;
	public String cmd;
	public Double amount;
	public String f1;
	public String f2;
	public String f3;
	public String f4;
	public String f5;

	public PosMove2500SaleRequest(String requestId, String clientId, String cmd, Double amount, String f1, String f2,
			String f3, String f4, String f5) {
		super();
		this.requestId = requestId;
		this.clientId = clientId;
		this.cmd = cmd;
		this.amount = amount;
		this.f1 = f1;
		this.f2 = f2;
		this.f3 = f3;
		this.f4 = f4;
		this.f5 = f5;
	}

	public PosMove2500SaleRequest() {}

}
