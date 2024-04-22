package com.vnptit.ehealth.docs.service.impl;

import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import com.vnptit.ehealth.docs.model.SearchReq;
import com.vnptit.ehealth.docs.query.CustomRsqlVisitor;
import com.vnptit.ehealth.docs.repository.BaseRepository;
import com.vnptit.ehealth.docs.service.BaseService;

import java.util.List;

public abstract class BaseServiceImpl<T> implements BaseService<T> {
    protected abstract BaseRepository<T> getBaseRepository();

    public Page<T> search(SearchReq req){
        Node rootNode = new RSQLParser().parse(req.getFilter());

        Specification<T> spec = rootNode.accept(new CustomRsqlVisitor<T>());
        System.out.println(rootNode.toString());
        String[] sortList = req.getSort().split(",");
        Sort.Direction direction = sortList[1].equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize(), direction, sortList[0]);
        return this.getBaseRepository().findAll(spec, pageable);
    }

    public List<T> search(){
        return this.getBaseRepository().findAll();
    }

    public T create(T t) {
        return this.getBaseRepository().save(t);
    }

    public T update(T t) {
        return this.getBaseRepository().save(t);
    }
    public T getById(Long id){
        return (T) this.getBaseRepository().findById(id);
    }

    public void delete(Long id){
        this.getBaseRepository().deleteById(id);
    }
}
