package com.commun.hive.communhive.requests;

import com.commun.hive.communhive.models.College;
import com.commun.hive.communhive.models.types.UserType;

public class RegisterRequest {
    private String username;
    private String password;
    private College college;
    private UserType userType = UserType.STUDENT;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public College getCollege() {
        return college;
    }

    public void setCollege(College college) {
        this.college = college;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }
}
