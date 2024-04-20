package com.commun.hive.communhive.controllers;

import com.commun.hive.communhive.models.EventParticipant;
import com.commun.hive.communhive.repositories.EventParticipantRepository;
import com.commun.hive.communhive.repositories.PaymentRepository;
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
@RequestMapping("/api/v1/event-participants")
public class EventParticipantController extends BaseController {

    @Autowired
    private EventParticipantRepository eventParticipantRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Operation(summary = "Get all Event Participants", security = {@SecurityRequirement(name = "bearer-key")})
    @GetMapping
    public ResponseEntity<List<EventParticipant>> getAllEventParticipants() {
        List<EventParticipant> eventParticipants = eventParticipantRepository.findAll();
        return new ResponseEntity<>(eventParticipants, HttpStatus.OK);
    }

    @Operation(summary = "Get all Event Participants by event ID.", security = {@SecurityRequirement(name = "bearer-key")})
    @GetMapping("/event/{eventId}/participants")
    public ResponseEntity<List<EventParticipant>> getAllEventParticipantsByEventId(@PathVariable Integer eventId) {
        List<EventParticipant> eventParticipants = eventParticipantRepository.findByEventId(eventId);
        if (!eventParticipants.isEmpty()) {
            return new ResponseEntity<>(eventParticipants, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Get Event Participants by id.", security = {@SecurityRequirement(name = "bearer-key")})
    @GetMapping("/{id}")
    public ResponseEntity<EventParticipant> getEventParticipantById(@PathVariable Integer id) {
        Optional<EventParticipant> eventParticipantOptional = eventParticipantRepository.findById(id);
        if (eventParticipantOptional.isPresent()) {
            return new ResponseEntity<>(eventParticipantOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Create Event Participant!", security = {@SecurityRequirement(name = "bearer-key")})
    @PostMapping("/create")
    public ResponseEntity<EventParticipant> createEventParticipant(@RequestBody EventParticipant eventParticipant) {
        EventParticipant savedEventParticipant = eventParticipantRepository.save(eventParticipant);
        return new ResponseEntity<>(savedEventParticipant, HttpStatus.CREATED);
    }

    @Operation(summary = "Upsert Bulk Event Participants!", security = {@SecurityRequirement(name = "bearer-key")})
    @PostMapping
    public ResponseEntity<List<EventParticipant>> createEventParticipants(@RequestBody List<EventParticipant> participants) {
        List<EventParticipant> finalParticipants = eventParticipantRepository.doManageEventParticipants(paymentRepository, participants);
        return new ResponseEntity<>(finalParticipants, HttpStatus.CREATED);
    }

    @Operation(summary = "Update Event Participants by id.", security = {@SecurityRequirement(name = "bearer-key")})
    @PutMapping("/{id}")
    public ResponseEntity<EventParticipant> updateEventParticipant(@PathVariable Integer id, @RequestBody EventParticipant eventParticipant) {
        if (eventParticipantRepository.existsById(id)) {
            eventParticipant.setId(id); // Ensuring the correct ID is set
            EventParticipant updatedEventParticipant = eventParticipantRepository.save(eventParticipant);
            return new ResponseEntity<>(updatedEventParticipant, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @Operation(summary = "Delete Event Participants by id.",
            security = {@SecurityRequirement(name = "bearer-key")},
            parameters = {
                    @Parameter(
                            name = "authorization",
                            in = ParameterIn.HEADER,
                            required = true
                    )}
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventParticipant(@PathVariable Integer id) {
        if (eventParticipantRepository.existsById(id)) {
            eventParticipantRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
