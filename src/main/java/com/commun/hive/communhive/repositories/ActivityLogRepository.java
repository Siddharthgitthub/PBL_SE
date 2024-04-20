package com.commun.hive.communhive.repositories;


import com.commun.hive.communhive.models.ActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityLogRepository extends JpaRepository<ActivityLog, Integer> {
    // You can add custom query methods here if needed
}
