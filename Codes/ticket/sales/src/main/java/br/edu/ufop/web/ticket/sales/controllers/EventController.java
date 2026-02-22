package br.edu.ufop.web.ticket.sales.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ufop.web.ticket.sales.dtos.events.CreateEventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.DeleteEventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.EventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.UpdateEventDTO;
import br.edu.ufop.web.ticket.sales.service.EventService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable(value = "id") String id) {

        EventDTO eventDTO = eventService.getEventById(id);
        if (eventDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(eventDTO);
    }

    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody CreateEventDTO createEventDTO) {
        
        EventDTO createdEvent = eventService.createEvent(createEventDTO);
        return ResponseEntity.ok(createdEvent);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> updateEvent(@RequestBody UpdateEventDTO updateEventDTO) {

        EventDTO existingEvent = eventService.updateEvent(updateEventDTO);
        if (existingEvent == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(existingEvent);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteEvent(@RequestBody DeleteEventDTO deleteEventDTO) {
        eventService.deleteEvent(deleteEventDTO);
        return ResponseEntity.ok("Event deleted successfully");
    }
}