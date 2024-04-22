package com.vnptit.ehealth.docs.service;

import com.vnptit.ehealth.docs.entities.UserEntity;

public interface UserService extends BaseService<UserEntity> {

    public UserEntity findByUsername(String username);

}
