package com.commun.hive.communhive.repositories;

import com.commun.hive.communhive.models.EventParticipant;
import com.commun.hive.communhive.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import java.util.List;

@Repository
public interface EventParticipantRepository extends JpaRepository<EventParticipant, Integer> {

    List<EventParticipant> findByEventId(Integer eventId);

    @Transactional
    default List<EventParticipant> doManageEventParticipants(PaymentRepository paymentRepository, List<EventParticipant> participants) {
        List<EventParticipant> existingParticipants;

        // Retrieve the event ID from the first participant (assuming all participants belong to the same event)
        if (!participants.isEmpty()) {
            Integer eventId = participants.get(0).getEvent().getId();

            // Get the existing participants for the event
            existingParticipants = findByEventId(eventId);

            // Filter out existing participants that are not present in the provided list
            List<EventParticipant> participantsToPersist = participants.stream()
                    .filter(participant -> existingParticipants.stream()
                            .noneMatch(existingParticipant ->
                                    existingParticipant.getUser().getId().equals(participant.getUser().getId())))
                    .collect(Collectors.toList());

            // Save new participants
            saveAll(participantsToPersist);

            // Extract user IDs from the participants list
            Set<Integer> userIdsInParticipants = participants.stream()
                    .map(participant -> participant.getUser().getId())
                    .collect(Collectors.toSet());

            // Delete existing participants not present in the provided list
            List<EventParticipant> participantsToDelete = existingParticipants.stream()
                    .filter(existingParticipant -> !userIdsInParticipants.contains(existingParticipant.getUser().getId())) // Check if the participant is not in the new list
                    .collect(Collectors.toList());

            // Retrieve the payments associated with the participants to delete
            List<Payment> paymentsToDelete = new ArrayList<>();
            for (EventParticipant existingParticipant : participantsToDelete) {
                List<Payment> participantPayments = paymentRepository.findByParticipantId(existingParticipant.getId());
                paymentsToDelete.addAll(participantPayments);
            }

            if (!paymentsToDelete.isEmpty()) {
                // Delete the payments
                paymentRepository.deleteAll(paymentsToDelete);
            }

            if (!participantsToDelete.isEmpty()) {
                // Remove the entries from the database for participants not present in the provided list
                deleteAll(participantsToDelete);
            }

            // Refetch all entries for the eventParticipants
            participants = findByEventId(eventId);
        } else {
            existingParticipants = null;
        }

        // Return the final list of event participants
        return participants;
    }
}