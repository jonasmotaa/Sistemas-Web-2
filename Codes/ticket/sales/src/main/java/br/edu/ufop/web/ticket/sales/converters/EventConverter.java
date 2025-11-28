package br.edu.ufop.web.ticket.sales.converters;

import org.springframework.stereotype.Component;

import br.edu.ufop.web.ticket.sales.dtos.EventDTO;
import br.edu.ufop.web.ticket.sales.models.EventModel;

@Component
public class EventConverter {

    public EventModel toModel(EventDTO dto) {
        return EventModel.builder()
                .description(dto.getDescription())
                .type(dto.getType())
                .date(dto.getDate())
                .startSales(dto.getStartSales())
                .endSales(dto.getEndSales())
                .price(dto.getPrice())
                .build();
    }

    public EventDTO toDTO(EventModel model) {
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
}
