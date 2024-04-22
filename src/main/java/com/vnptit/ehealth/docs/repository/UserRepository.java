package com.vnptit.ehealth.docs.repository;

import com.vnptit.ehealth.docs.entities.UserEntity;

public interface UserRepository extends BaseRepository<UserEntity> {
    public UserEntity findByUsername(String username);
}
