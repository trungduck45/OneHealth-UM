package com.vnptit.ehealth.docs.ingenico;

public class PosMove2500SaleResponse {
	public String requestId;
	public String clientId;
	public String command;
	public String status;
	public TransInfo transInfo;

	public PosMove2500SaleResponse(String requestId, String clientId, String command, String status,
			TransInfo transInfoObject) {
		super();
		this.requestId = requestId;
		this.clientId = clientId;
		this.command = command;
		this.status = status;
		transInfo = transInfoObject;
	}

	@Override
	public String toString() {
		return "PosMove2500SaleResponse:{" +
				"requestId='" + requestId + '\'' +
				", clientId='" + clientId + '\'' +
				", command='" + command + '\'' +
				", status='" + status + '\'' +
				", transInfo:" + transInfo.toString() +
				'}';
	}

	public PosMove2500SaleResponse() {}
}

