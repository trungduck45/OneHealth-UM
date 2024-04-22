package com.vnptit.ehealth.docs.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vnptit.ehealth.docs.entities.MainArticleEntity;
import com.vnptit.ehealth.docs.model.BaseResponse;
import com.vnptit.ehealth.docs.model.SearchReq;
import com.vnptit.ehealth.docs.service.MainArticleService;
import com.vnptit.ehealth.docs.service.BaseService;

@RestController
@CrossOrigin
@RequestMapping("/api/main-article")
public class MainArticleApi extends BaseApi<MainArticleEntity> {
    private final MainArticleService mainArticleService;

    public MainArticleApi(MainArticleService mainArticleService) {
        this.mainArticleService = mainArticleService;
    }

    @Override
    protected BaseService<MainArticleEntity> getBaseService() {
        return mainArticleService;
    }
}
