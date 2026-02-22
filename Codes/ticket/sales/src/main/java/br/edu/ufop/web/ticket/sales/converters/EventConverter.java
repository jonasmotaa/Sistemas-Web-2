package br.edu.ufop.web.ticket.sales.converters;

import br.edu.ufop.web.ticket.sales.domain.EventDomain;
import br.edu.ufop.web.ticket.sales.dtos.events.CreateEventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.EventDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.UpdateEventDTO;
import br.edu.ufop.web.ticket.sales.models.EventModel;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class EventConverter {

    public static EventModel toModel(EventDomain domain) {
        return EventModel.builder()
                .description(domain.getDescription())
                .type(domain.getType())
                .date(domain.getDate())
                .startSales(domain.getStartSales())
                .endSales(domain.getEndSales())
                .price(domain.getPrice())
                .build();
    }

    public static EventDTO toDTO(EventModel model) {
        EventDTO dto = new EventDTO();
        dto.setId(model.getId());
        dto.setDescription(model.getDescription());
        dto.setType(model.getType());
        dto.setDate(model.getDate());
        dto.setStartSales(model.getStartSales());
        dto.setEndSales(model.getEndSales());
        dto.setPrice(model.getPrice());
        dto.setCreatedAt(model.getCreatedAt());
        dto.setUpdatedAt(model.getUpdatedAt());
        return dto;
    }

    public static EventDomain toDomain(CreateEventDTO eventDTO) {
        return EventDomain.builder()
        .type(eventDTO.getType())
        .description(eventDTO.getDescription())
        .date(eventDTO.getDate())
        .startSales(eventDTO.getStartSales())
        .endSales(eventDTO.getEndSales())
        .price(eventDTO.getPrice())
        .createdAt(eventDTO.getCreatedAt())
        .updatedAt(eventDTO.getUpdatedAt())
        .build();        
    }

    public static EventDomain toDomain(UpdateEventDTO updateEventDTO) {
        return EventDomain.builder()
                .description(updateEventDTO.getDescription())
                .type(updateEventDTO.getType())
                .date(updateEventDTO.getDate())
                .startSales(updateEventDTO.getStartSales())
                .endSales(updateEventDTO.getEndSales())
                .price(updateEventDTO.getPrice())
                .build();
    }

}