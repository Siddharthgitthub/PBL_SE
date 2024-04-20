package com.commun.hive.communhive.repositories;


import com.commun.hive.communhive.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {


    List<Payment> findByParticipantId(Integer eventParticipantId);

}
