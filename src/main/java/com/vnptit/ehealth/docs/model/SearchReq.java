package com.vnptit.ehealth.docs.model;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class SearchReq {

    private String filter;

    @NotNull
    private Integer page;

    @NotNull
    private Integer size;

    @NotNull
    private String sort;

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }
}
