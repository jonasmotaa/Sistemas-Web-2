package br.edu.ufop.web.ticket.sales.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import br.edu.ufop.web.ticket.sales.converters.EventConverter;
import br.edu.ufop.web.ticket.sales.domain.EventDomain;
import br.edu.ufop.web.ticket.sales.dtos.events.CreateEventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.DeleteEventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.EventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.UpdateEventDTO;
import br.edu.ufop.web.ticket.sales.models.EventModel;
import br.edu.ufop.web.ticket.sales.repositories.IEventRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventService {

    private final IEventRepository eventRepository;

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream()
                .map(EventConverter::toDTO)
                .toList();
    }

    public EventDTO getEventById(String id) {
        UUID uuid = UUID.fromString(id);
        Optional<EventModel> optionalEvent = eventRepository.findById(uuid);
        if (optionalEvent.isPresent()) {
            EventModel event = optionalEvent.get();
            return EventConverter.toDTO(event);
        }
        return null;
    }

    public EventDTO createEvent(CreateEventDTO createEventDTO) {

        EventDomain eventDomain = EventConverter.toDomain(createEventDTO);
        EventModel eventModel = EventConverter.toModel(eventDomain);
        return EventConverter.toDTO(eventRepository.save(eventModel));
    }

    public EventDTO updateEvent(UpdateEventDTO updateEventDTO) {

        Optional<EventModel> optionalEventModel = eventRepository.findById(updateEventDTO.getId());

        if(optionalEventModel.isEmpty()){
            return null;
        }
        
        EventModel eventModel = optionalEventModel.get();
        EventDomain eventDomain = EventConverter.toDomain(updateEventDTO);     
    
        eventModel.setDescription(eventDomain.getDescription());
        eventModel.setType(eventDomain.getType());
        eventModel.setDate(eventDomain.getDate());
        eventModel.setStartSales(eventDomain.getStartSales());
        eventModel.setEndSales(eventDomain.getEndSales());
        eventModel.setPrice(eventDomain.getPrice());
        return EventConverter.toDTO(eventRepository.save(eventModel));
    }

    public void deleteEvent(DeleteEventDTO deleteEventDTO) {

        Optional<EventModel> optionalEvent = eventRepository.findById(deleteEventDTO.id());

        if (optionalEvent.isEmpty()) {
            throw new EntityNotFoundException("Event not found");
        }
        eventRepository.delete(optionalEvent.get());
    }
} 