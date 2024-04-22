package com.vnptit.ehealth.docs.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vnptit.ehealth.docs.entities.ChildArticleEntity;

public interface ChildArticleRepository extends BaseRepository<ChildArticleEntity> {
    public Page<ChildArticleEntity> findAllByNameIgnoreCaseContainingOrContentIgnoreCaseContaining(String name, String content,
            Pageable pageable);
}
