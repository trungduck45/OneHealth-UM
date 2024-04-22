package com.vnptit.ehealth.docs.service;

import org.springframework.data.domain.Page;

import com.vnptit.ehealth.docs.model.SearchReq;

import java.util.List;

public interface BaseService<T> {

    public Page<T> search(SearchReq req);
    public List<T> search();
    public T create(T t);
    public T update(T t);
    public T getById(Long id);
    public void delete(Long id);
}
