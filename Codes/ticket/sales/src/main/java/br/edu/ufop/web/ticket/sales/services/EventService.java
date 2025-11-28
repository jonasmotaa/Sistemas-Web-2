package br.edu.ufop.web.ticket.sales.services;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.edu.ufop.web.ticket.sales.converters.EventConverter;
import br.edu.ufop.web.ticket.sales.dtos.EventDTO;
import br.edu.ufop.web.ticket.sales.models.EventModel;
import br.edu.ufop.web.ticket.sales.repositories.IEventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventService {

    private final IEventRepository eventRepository;
    private final EventConverter eventConverter;

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(eventConverter::toDTO)
                .collect(Collectors.toList());
    }

    public EventDTO getEventById(UUID id) {
        EventModel event = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));
        return eventConverter.toDTO(event);
    }

    public EventDTO createEvent(EventDTO eventDTO) {
        EventModel eventModel = eventConverter.toModel(eventDTO);
        eventModel = eventRepository.save(eventModel);
        return eventConverter.toDTO(eventModel);
    }

    public EventDTO updateEvent(UUID id, EventDTO eventDTO) {
        EventModel existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));

        existingEvent.setDescription(eventDTO.getDescription());
        existingEvent.setType(eventDTO.getType());
        existingEvent.setDate(eventDTO.getDate());
        existingEvent.setStartSales(eventDTO.getStartSales());
        existingEvent.setEndSales(eventDTO.getEndSales());
        existingEvent.setPrice(eventDTO.getPrice());

        existingEvent = eventRepository.save(existingEvent);
        return eventConverter.toDTO(existingEvent);
    }

    public void deleteEvent(UUID id) {
        if (!eventRepository.existsById(id)) {
            throw new EntityNotFoundException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }
}