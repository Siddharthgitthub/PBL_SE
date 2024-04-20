package com.commun.hive.communhive;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CommunHiveApplication {
    public static void main(String[] args) {
        SpringApplication.run(CommunHiveApplication.class, args);
    }

    @Bean
    public OpenAPI getOpenAPI() {
        return new OpenAPI().info(new Info().title("CommunHive API Documentation (OpenAPI)")).components(new Components().addSecuritySchemes("bearer-key",
                new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")));
    }
}
