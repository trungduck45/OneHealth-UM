package com.vnptit.ehealth.docs.entities;

import com.google.gson.Gson;

public class PostTransLogRequest {
	public String hospitalid;
	public String uname;
	public String createdate;
	public String rq_rqt;
	public String rq_cmd;
	public String rq_callback;
	public String rp_requestid;
	public String rp_clientid;
	public String rp_command;
	public String rp_status;
	public String ti_transtype;
	public String ti_cardno;
	public String ti_amount;
	public String ti_stan;
	public String ti_time;
	public String ti_expiredate;
	public String ti_refno;
	public String ti_approvalcode;
	public String ti_returncode;
	public String ti_tid;
	public String ti_mid;
	public String ti_currencycode;
	public String ti_batchno;
	public String ti_receiptno;
	public String ti_cardtype;
	public String ti_cardholder;
	public String ti_cardinput;
	public String ti_emvappname;
	public String ti_emvaid;
	public String ti_emvtc;
	public String ti_posserial;
	public String ti_transname;
	public String ti_transstatus;
	public String ti_requestid;
	public String ti_clientId;
	
	public String toJson() {;
		return (new Gson()).toJson(this);
	}

	@Override
	public String toString() {
		return "AgribankPostTransLogRequest [createdate=" + createdate + ", hospitalid=" + hospitalid + ", rp_clientid="
				+ rp_clientid + ", rp_command=" + rp_command + ", rp_requestid=" + rp_requestid + ", rp_status="
				+ rp_status + ", rq_callback=" + rq_callback + ", rq_cmd=" + rq_cmd + ", rq_rqt=" + rq_rqt
				+ ", ti_amount=" + ti_amount + ", ti_approvalcode=" + ti_approvalcode + ", ti_batchno=" + ti_batchno
				+ ", ti_cardholder=" + ti_cardholder + ", ti_cardinput=" + ti_cardinput + ", ti_cardno=" + ti_cardno
				+ ", ti_cardtype=" + ti_cardtype + ", ti_clientId=" + ti_clientId + ", ti_currencycode="
				+ ti_currencycode + ", ti_emvaid=" + ti_emvaid + ", ti_emvappname=" + ti_emvappname + ", ti_emvtc="
				+ ti_emvtc + ", ti_expiredate=" + ti_expiredate + ", ti_mid=" + ti_mid + ", ti_posserial="
				+ ti_posserial + ", ti_receiptno=" + ti_receiptno + ", ti_refno=" + ti_refno + ", ti_requestid="
				+ ti_requestid + ", ti_returncode=" + ti_returncode + ", ti_stan=" + ti_stan + ", ti_tid=" + ti_tid
				+ ", ti_time=" + ti_time + ", ti_transname=" + ti_transname + ", ti_transstatus=" + ti_transstatus
				+ ", ti_transtype=" + ti_transtype + ", uname=" + uname + "]";
	}

	
}
