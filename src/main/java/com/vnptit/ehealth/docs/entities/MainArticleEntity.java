package com.vnptit.ehealth.docs.entities;

import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Table(name = "mainarticle", schema = "main", catalog = "")
public class MainArticleEntity {
    private Long id;
    private String name;
    private String code;
    private String note;
    private LocalDateTime createdate;
    private LocalDateTime updatedate;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "code")
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Basic
    @Column(name = "note")
    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    @Basic
    @Column(name = "createdate")
    public LocalDateTime getCreateDate() {
        return createdate;
    }

    public void setCreateDate(LocalDateTime createdate) {
        this.createdate = createdate;
    }

    @Basic
    @Column(name = "updatedate")
    public LocalDateTime getUpdateDate() {
        return updatedate;
    }

    public void setUpdateDate(LocalDateTime updatedate) {
        this.updatedate = updatedate;
    }
}
