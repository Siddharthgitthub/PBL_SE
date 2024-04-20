package com.commun.hive.communhive.controllers;


import com.commun.hive.communhive.models.College;
import com.commun.hive.communhive.repositories.CollegeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/colleges")
public class CollegeController extends BaseController {

    @Autowired
    private CollegeRepository collegeRepository;

    @Operation(summary = "Get all college list", security = {@SecurityRequirement(name = "bearer-key")})
    @GetMapping
    public ResponseEntity<List<College>> getAllColleges() {
        List<College> colleges = collegeRepository.findAll();
        return new ResponseEntity<>(colleges, HttpStatus.OK);
    }


    @Operation(summary = "Get college by id.", security = {@SecurityRequirement(name = "bearer-key")})
    @GetMapping("/{id}")
    public ResponseEntity<College> getCollegeById(@PathVariable Integer id) {
        Optional<College> collegeOptional = collegeRepository.findById(id);
        return collegeOptional.map(college -> new ResponseEntity<>(college, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Operation(summary = "Add College", security = {@SecurityRequirement(name = "bearer-key")})
    @PostMapping
    public ResponseEntity<College> createCollege(@RequestBody College college) {
        College savedCollege = collegeRepository.save(college);
        return new ResponseEntity<>(savedCollege, HttpStatus.CREATED);
    }

    @Operation(summary = "Update College by id.", security = {@SecurityRequirement(name = "bearer-key")})
    @PutMapping("/{id}")
    public ResponseEntity<College> updateCollege(@PathVariable Integer id, @RequestBody College college) {
        if (collegeRepository.existsById(id)) {
            college.setId(id); // Ensuring the correct ID is set
            College updatedCollege = collegeRepository.save(college);
            return new ResponseEntity<>(updatedCollege, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Delete College by id.", security = {@SecurityRequirement(name = "bearer-key")})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCollege(@PathVariable Integer id) {
        if (collegeRepository.existsById(id)) {
            collegeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
