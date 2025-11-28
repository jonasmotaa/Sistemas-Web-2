package br.edu.ufop.web.ticket.sales.converters;

import org.springframework.stereotype.Component;

import br.edu.ufop.web.ticket.sales.dtos.SaleDTO;
import br.edu.ufop.web.ticket.sales.models.SaleModel;

@Component
public class SaleConverter {

    public SaleDTO toDTO(SaleModel model) {
        SaleDTO dto = new SaleDTO();

        dto.setId(model.getId());
        dto.setUserId(model.getUserId());
        dto.setSaleDate(model.getSaleDate());
        dto.setSaleStatus(model.getSaleStatus());

        if (model.getEvent() != null) {
            dto.setEventId(model.getEvent().getId());
            dto.setEventDescription(model.getEvent().getDescription());
        }

        return dto;
    }
}
