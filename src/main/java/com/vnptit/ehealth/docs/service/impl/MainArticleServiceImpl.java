package com.vnptit.ehealth.docs.service.impl;

import org.springframework.stereotype.Service;

import com.vnptit.ehealth.docs.entities.MainArticleEntity;
import com.vnptit.ehealth.docs.repository.MainArticleRepository;
import com.vnptit.ehealth.docs.repository.BaseRepository;
import com.vnptit.ehealth.docs.service.MainArticleService;

@Service
public class MainArticleServiceImpl extends BaseServiceImpl<MainArticleEntity> implements MainArticleService {
    private final MainArticleRepository mainArticleRepository;

    public MainArticleServiceImpl(MainArticleRepository mainArticleRepository){
        this.mainArticleRepository = mainArticleRepository;
    }


    @Override
    protected BaseRepository<MainArticleEntity> getBaseRepository() {
        return mainArticleRepository;
    }
}
