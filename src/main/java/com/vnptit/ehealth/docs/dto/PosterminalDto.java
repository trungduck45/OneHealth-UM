package com.vnptit.ehealth.docs.dto;

public class PosterminalDto {
    private Long posterminalid;
    private String name;
    private String code;
    private String ipaddress;

    public Long getPosterminalid() {
        return posterminalid;
    }

    public void setPosterminalid(Long posterminalid) {
        this.posterminalid = posterminalid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getIpaddress() {
        return ipaddress;
    }

    public void setIpaddress(String ipaddress) {
        this.ipaddress = ipaddress;
    }

    public PosterminalDto(Long posterminalid, String name, String code, String ipaddress) {
        this.posterminalid = posterminalid;
        this.name = name;
        this.code = code;
        this.ipaddress = ipaddress;
    }
}
