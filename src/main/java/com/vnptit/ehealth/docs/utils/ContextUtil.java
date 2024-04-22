package com.vnptit.ehealth.docs.utils;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.context.annotation.RequestScope;

import javax.annotation.ManagedBean;

@ManagedBean
@RequestScope
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContextUtil {
    public static final String SEPARATOR = ",";

    private String userName;
    private Long userId;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
