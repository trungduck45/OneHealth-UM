package com.vnptit.ehealth.docs.entities;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.stereotype.Component;

@Component
@EntityScan
public class HisPayRequest {
	public String orderId;
	public String hisUser;
	public String uuid;
	public Double amount;
	public String description;
	public String f1;
	public String f2;
	public String f3;
	public String f4;
	public String f5;
	public String checksum;
	public Long posterminalid;
	public Long benhnhanid;

	public HisPayRequest() {}

	public HisPayRequest(String orderId, String hisUser, String uuid, Double amount, String description, String f1,
			String f2, String f3, String f4, String f5, String checksum, Long posterminalid, Long benhnhanid) {
		super();
		this.orderId = orderId;
		this.hisUser = hisUser;
		this.uuid = uuid;
		this.amount = amount;
		this.description = description;
		this.f1 = f1;
		this.f2 = f2;
		this.f3 = f3;
		this.f4 = f4;
		this.f5 = f5;
		this.checksum = checksum;
		this.posterminalid = posterminalid;
		this.benhnhanid = benhnhanid;
	}

	@Override
	public String toString() {
		return "HisPayRequest [amount=" + amount + ", checksum=" + checksum + ", description=" + description + ", f1="
				+ f1 + ", f2=" + f2 + ", f3=" + f3 + ", f4=" + f4 + ", f5=" + f5 + ", hisUser=" + hisUser + ", orderId="
				+ orderId + ", posterminalid=" + posterminalid + ", uuid=" + uuid + "]";
	}

}
