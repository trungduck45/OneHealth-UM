package com.vnptit.ehealth.docs.api;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vnptit.ehealth.docs.entities.BackupLogEntity;
import com.vnptit.ehealth.docs.model.BaseResponse;
import com.vnptit.ehealth.docs.model.SearchReq;
import com.vnptit.ehealth.docs.service.BackupLogService;
import com.vnptit.ehealth.docs.service.BaseService;

@RestController
@CrossOrigin
@RequestMapping("/api/backuplog")
public class BackupLogApi extends BaseApi<BackupLogEntity> {
    private final BackupLogService backupLogService;

    public BackupLogApi(BackupLogService backupLogService) {
        this.backupLogService = backupLogService;
    }

    @Override
    protected BaseService<BackupLogEntity> getBaseService() {
        return backupLogService;
    }
}
