package com.commun.hive.communhive.requests;

public class CollegeDTO {
    private Integer id;
    private String collegeName;

    public CollegeDTO(Integer id, String collegeName) {
        this.id = id;
        this.collegeName = collegeName;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }
}