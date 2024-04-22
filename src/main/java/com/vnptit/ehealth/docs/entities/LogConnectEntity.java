package com.vnptit.ehealth.docs.entities;

import javax.persistence.*;

@Entity
@Table(name = "log_connect", schema = "main", catalog = "")
public class LogConnectEntity {
    private Long id;
    private String type;
    private String createdate;
    private String sourceip;
    private String destinationip;
    private String metadata;

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
    @Column(name = "type")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "createdate")
    public String getCreatedate() {
        return createdate;
    }

    public void setCreatedate(String createdate) {
        this.createdate = createdate;
    }

    @Basic
    @Column(name = "sourceip")
    public String getSourceip() {
        return sourceip;
    }

    public void setSourceip(String sourceip) {
        this.sourceip = sourceip;
    }

    @Basic
    @Column(name = "destinationip")
    public String getDestinationip() {
        return destinationip;
    }

    public void setDestinationip(String destinationip) {
        this.destinationip = destinationip;
    }

    @Basic
    @Column(name = "metadata")
    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

}
