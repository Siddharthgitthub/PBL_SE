package com.commun.hive.communhive.controllers;


import com.commun.hive.communhive.models.College;
import com.commun.hive.communhive.models.User;
import com.commun.hive.communhive.repositories.CollegeRepository;
import com.commun.hive.communhive.repositories.UserRepository;
import com.commun.hive.communhive.requests.CollegeDTO;
import com.commun.hive.communhive.requests.LoginRequest;
import com.commun.hive.communhive.requests.RegisterRequest;
import com.commun.hive.communhive.utils.JWTConfig;
import com.commun.hive.communhive.utils.SecurityConfig;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth/v1")
public class AuthController extends BaseController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityConfig security;

    @Autowired
    private JWTConfig jwt;

    @Autowired
    private CollegeRepository collegeRepository;

    @GetMapping("/collages/all")
    public ResponseEntity<List<CollegeDTO>> getAllColleges() {
        List<CollegeDTO> colleges = collegeRepository.findAllWithIdAndCollegeName();
        return new ResponseEntity<>(colleges, HttpStatus.OK);
    }

    // Endpoint for user registration
    @PostMapping("/users/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()) != null) {
            Map<String, Object> status = new HashMap<>();
            status.put("status", "error");
            status.put("message", "Username already exists");
            status.put("error", "USERNAME_CONFLICT");
            try {
                // Convert the map to JSON
                ObjectMapper objectMapper = new ObjectMapper();
                String json = objectMapper.writeValueAsString(status);

                // Create headers with content type application/json
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                // Return the JSON response
                return ResponseEntity.status(HttpStatus.CONFLICT).headers(headers).body(json);
            } catch (JsonProcessingException e) {
                System.out.println(e.toString());
                // Return an error response
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing JSON response");
            }
        }

        // Create a new User object from the RegisterRequest
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(security.encoder().encode(registerRequest.getPassword()));
        user.setCollege(registerRequest.getCollege());
        user.setUserType(registerRequest.getUserType());

        // Save the user object
        userRepository.save(user);

        Map<String, Object> status = new HashMap<>();
        status.put("status", "success");
        status.put("message", "User registered successfully");
        // Prepare Response
        User result = new User();
        result.setId(user.getId());
        result.setUsername(user.getUsername());
        result.setCollege(user.getCollege());
        result.setUserType(user.getUserType());
        status.put("data", result);
        try {
            // Convert the map to JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(status);

            // Create headers with content type application/json
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Return the JSON response
            return ResponseEntity.status(HttpStatus.CREATED).headers(headers).body(json);
        } catch (JsonProcessingException e) {
            System.out.println(e.toString());
            // Return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing JSON response");
        }
    }

    // Endpoint for user login
    @PostMapping("/users/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            if (security.encoder().matches(user.getPassword(), existingUser.getPassword())) {

                Map<String, Object> userDetails = new HashMap<>();
                userDetails.put("id", existingUser.getId());
                userDetails.put("username", existingUser.getUsername());
                userDetails.put("user_type", existingUser.getUserType());
                userDetails.put("created_on", existingUser.getCreatedOn());
                userDetails.put("modified_on", existingUser.getModifiedOn());
                userDetails.put("college", existingUser.getCollege());

                String token = jwt.generate(user.getUsername(), userDetails);
                return ResponseEntity.ok(Map.of(
                        "token", token,
                        "user", userDetails
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password! Please try again!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
