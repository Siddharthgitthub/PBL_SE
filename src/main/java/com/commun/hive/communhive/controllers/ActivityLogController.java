package com.commun.hive.communhive.controllers;


import com.commun.hive.communhive.models.ActivityLog;
import com.commun.hive.communhive.repositories.ActivityLogRepository;
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
@RequestMapping("/api/v1/activity-logs")
public class ActivityLogController extends BaseController {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Operation(summary = "Get all activity logs.", security = {@SecurityRequirement(name = "bearer-key")})
    @GetMapping
    public ResponseEntity<List<ActivityLog>> getAllActivityLogs() {
        List<ActivityLog> activityLogs = activityLogRepository.findAll();
        return new ResponseEntity<>(activityLogs, HttpStatus.OK);
    }

    @Operation(summary = "Get activity log by id.", security = {@SecurityRequirement(name = "bearer-key")})
    @GetMapping("/{id}")
    public ResponseEntity<ActivityLog> getActivityLogById(@PathVariable Integer id) {
        Optional<ActivityLog> activityLogOptional = activityLogRepository.findById(id);
        if (activityLogOptional.isPresent()) {
            return new ResponseEntity<>(activityLogOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ActivityLog create(ActivityLog activityLog) {
        return (ActivityLog) activityLogRepository.save(activityLog);
    }

}
