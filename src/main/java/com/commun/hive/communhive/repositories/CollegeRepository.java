package com.commun.hive.communhive.repositories;

import com.commun.hive.communhive.models.College;
import com.commun.hive.communhive.requests.CollegeDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollegeRepository extends JpaRepository<College, Integer> {
    //    @Query("SELECT c.id, c.collegeName FROM College c")
    @Query("SELECT new com.commun.hive.communhive.requests.CollegeDTO(c.id, c.collegeName) FROM College c")
    List<CollegeDTO> findAllWithIdAndCollegeName();
}
