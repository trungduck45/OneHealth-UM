package com.vnptit.ehealth.docs.service;

import org.springframework.data.domain.Page;
import com.vnptit.ehealth.docs.entities.ChildArticleEntity;
import com.vnptit.ehealth.docs.model.SearchArticleReq;

public interface ChildArticleService extends BaseService<ChildArticleEntity> {
        public Page<ChildArticleEntity> findAllByContentContaining(SearchArticleReq req);
}
