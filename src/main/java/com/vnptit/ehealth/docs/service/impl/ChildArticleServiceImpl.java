package com.vnptit.ehealth.docs.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.vnptit.ehealth.docs.entities.ChildArticleEntity;
import com.vnptit.ehealth.docs.model.SearchArticleReq;
import com.vnptit.ehealth.docs.model.SearchReq;
import com.vnptit.ehealth.docs.repository.ChildArticleRepository;
import com.vnptit.ehealth.docs.repository.BaseRepository;
import com.vnptit.ehealth.docs.service.ChildArticleService;

@Service
public class ChildArticleServiceImpl extends BaseServiceImpl<ChildArticleEntity> implements ChildArticleService {
    private final ChildArticleRepository childArticleRepository;

    public ChildArticleServiceImpl(ChildArticleRepository childArticleRepository){
        this.childArticleRepository = childArticleRepository;
    }

    @Override
    public Page<ChildArticleEntity> findAllByContentContaining(SearchArticleReq req){
        String[] sortList = req.getSort().split(",");
        Sort.Direction direction = sortList[1].equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(req.getPage(), req.getSize(), direction, sortList[0]);
        System.out.println("Filter: " + req.getFilter());

        return this.childArticleRepository.findAllByNameIgnoreCaseContainingOrContentIgnoreCaseContaining(req.getFilter(), req.getFilter(), pageable);
    };


    @Override
    protected BaseRepository<ChildArticleEntity> getBaseRepository() {
        return childArticleRepository;
    }
}
