package com.commun.hive.communhive.repositories;

import com.commun.hive.communhive.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    // You can add custom query methods here if needed
}
