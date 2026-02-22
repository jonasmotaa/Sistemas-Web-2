package br.edu.ufop.web.ticket.sales.converters;

import org.springframework.stereotype.Component;

import br.edu.ufop.web.ticket.sales.domain.SaleDomain;
import br.edu.ufop.web.ticket.sales.dtos.events.UpdateSaleStatusDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.CreateSaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.SaleDTO;
import br.edu.ufop.web.ticket.sales.models.SaleModel;

@Component
public class SaleConverter {

    public static SaleDTO toDTO(SaleModel model) {
        return new SaleDTO(
            model.getId(),
            model.getUserId(),
            model.getEvent().getId(),
            model.getSaleDate(),
            model.getSaleStatus(),
            model.getCreatedAt(),
            model.getUpdatedAt()
            
        );
        
    }

    public static SaleModel toModel(SaleDomain domain) {
        SaleModel model = new SaleModel();
        model.setId(domain.getId());
        model.setUserId(domain.getUserId());
        model.setSaleDate(domain.getSaleDate());
        model.setSaleStatus(domain.getSaleStatus());
        if (domain.getEventId() != null) {
            model.setEvent(domain.getEventId());
        }
        return model;
    }

    public static SaleDomain toDomain(CreateSaleDTO createSaleDTO) {
        SaleDomain domain = new SaleDomain();
        domain.setUserId(createSaleDTO.getUserId());
        domain.setSaleStatus(createSaleDTO.getSaleStatus());
        return domain;
    }

    public static SaleDomain toDomain(UpdateSaleStatusDTO updateSaleStatusDTO) {
        SaleDomain domain = new SaleDomain();
        domain.setId(updateSaleStatusDTO.getSaleId());
        domain.setSaleStatus(updateSaleStatusDTO.getNewStatus());
        return domain;
    }
}