package com.vnptit.ehealth.docs.api;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vnptit.ehealth.docs.entities.ChildArticleEntity;
import com.vnptit.ehealth.docs.model.BaseResponse;
import com.vnptit.ehealth.docs.model.SearchArticleReq;
import com.vnptit.ehealth.docs.model.SearchReq;
import com.vnptit.ehealth.docs.service.ChildArticleService;
import com.vnptit.ehealth.docs.service.BaseService;

@RestController
@CrossOrigin
@RequestMapping("/api/child-article")
public class ChildArticleApi extends BaseApi<ChildArticleEntity> {
    @Autowired
    private ChildArticleService childArticleService;


    @GetMapping("/search-by-contain")
    public BaseResponse searchByContain(@Valid SearchArticleReq req) {
        return new BaseResponse("00", "Lấy dữ liệu thành công", this.childArticleService.findAllByContentContaining(req));
    }

    @Override
    protected BaseService<ChildArticleEntity> getBaseService() {
        return childArticleService;
    }
}
