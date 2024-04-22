package com.vnptit.ehealth.docs.ingenico;

public class TransInfo {
	private String transType;
	private String cardNo;
	private int amount;
	private String STAN;
	private String time;
	private String expireDate;
	private String refNo;
	private String approvalCode;
	private String returnCode;
	private String tid;
	private String mid;
	private String currencyCode;
	private String batchNo;
	private String receiptNo;
	private String cardType;
	private String cardHolder;
	private String cardInput;
	private String posSerial;
	private String transName;
	private String transStatus;

	// Getter Methods

	public String getTransType() {
		return transType;
	}

	public String getCardNo() {
		return cardNo;
	}

	public int getAmount() {
		return amount;
	}

	public String getSTAN() {
		return STAN;
	}

	public String getTime() {
		return time;
	}

	public String getExpireDate() {
		return expireDate;
	}

	public String getRefNo() {
		return refNo;
	}

	public String getApprovalCode() {
		return approvalCode;
	}

	public String getReturnCode() {
		return returnCode;
	}

	public String getTid() {
		return tid;
	}

	public String getMid() {
		return mid;
	}

	public String getCurrencyCode() {
		return currencyCode;
	}

	public String getBatchNo() {
		return batchNo;
	}

	public String getReceiptNo() {
		return receiptNo;
	}

	public String getCardType() {
		return cardType;
	}

	public String getCardHolder() {
		return cardHolder;
	}

	public String getCardInput() {
		return cardInput;
	}

	public String getPosSerial() {
		return posSerial;
	}

	public String getTransName() {
		return transName;
	}

	public String getTransStatus() {
		return transStatus;
	}

	// Setter Methods

	public void setTransType(String transType) {
		this.transType = transType;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public void setSTAN(String STAN) {
		this.STAN = STAN;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public void setExpireDate(String expireDate) {
		this.expireDate = expireDate;
	}

	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}

	public void setApprovalCode(String approvalCode) {
		this.approvalCode = approvalCode;
	}

	public void setReturnCode(String returnCode) {
		this.returnCode = returnCode;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}

	public void setBatchNo(String batchNo) {
		this.batchNo = batchNo;
	}

	public void setReceiptNo(String receiptNo) {
		this.receiptNo = receiptNo;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public void setCardHolder(String cardHolder) {
		this.cardHolder = cardHolder;
	}

	public void setCardInput(String cardInput) {
		this.cardInput = cardInput;
	}

	public void setPosSerial(String posSerial) {
		this.posSerial = posSerial;
	}

	public void setTransName(String transName) {
		this.transName = transName;
	}

	public void setTransStatus(String transStatus) {
		this.transStatus = transStatus;
	}

	@Override
	public String toString() {
		return "TransInfo: {STAN=" + STAN + ", amount=" + amount + ", approvalCode=" + approvalCode + ", batchNo="
				+ batchNo + ", cardHolder=" + cardHolder + ", cardInput=" + cardInput + ", cardNo=" + cardNo
				+ ", cardType=" + cardType + ", currencyCode=" + currencyCode + ", expireDate=" + expireDate + ", mid="
				+ mid + ", posSerial=" + posSerial + ", receiptNo=" + receiptNo + ", refNo=" + refNo + ", returnCode="
				+ returnCode + ", tid=" + tid + ", time=" + time + ", transName=" + transName + ", transStatus="
				+ transStatus + ", transType=" + transType + "}";
	}
}
