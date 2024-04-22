package com.vnptit.ehealth.docs.model;

import lombok.Data;

@Data
public class SqlFile {
	private String fileName;
	private Long size;
	private String fileType;
	private String folder;
}
