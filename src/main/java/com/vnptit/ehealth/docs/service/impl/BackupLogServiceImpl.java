package com.vnptit.ehealth.docs.service.impl;

import org.springframework.stereotype.Service;

import com.vnptit.ehealth.docs.entities.BackupLogEntity;
import com.vnptit.ehealth.docs.repository.BackupLogRepository;
import com.vnptit.ehealth.docs.repository.BaseRepository;
import com.vnptit.ehealth.docs.service.BackupLogService;

@Service
public class BackupLogServiceImpl extends BaseServiceImpl<BackupLogEntity> implements BackupLogService {
    private final BackupLogRepository BackupLogRepository;

    public BackupLogServiceImpl(BackupLogRepository BackupLogRepository){
        this.BackupLogRepository = BackupLogRepository;
    }


    @Override
    protected BaseRepository<BackupLogEntity> getBaseRepository() {
        return BackupLogRepository;
    }
}
