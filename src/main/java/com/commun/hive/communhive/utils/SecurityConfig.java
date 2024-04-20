package com.commun.hive.communhive.utils;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfig {


    @Bean
    public BCryptPasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }
//    @Bean
//    public String encode(String password) {
//        return new BCryptPasswordEncoder().encode(password);
//    }
//
//    @Bean
//    public Boolean isValid(String password, String encodedPassword) {
//        return new BCryptPasswordEncoder().matches(password, encodedPassword);
//    }
}
