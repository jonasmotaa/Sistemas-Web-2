package br.edu.ufop.web.ticket.sales.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.edu.ufop.web.ticket.sales.converters.SaleConverter;
import br.edu.ufop.web.ticket.sales.dtos.CreateSaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.SaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.UpdateSaleStatusDTO;
import br.edu.ufop.web.ticket.sales.enums.SaleStatus;
import br.edu.ufop.web.ticket.sales.models.EventModel;
import br.edu.ufop.web.ticket.sales.models.SaleModel;
import br.edu.ufop.web.ticket.sales.repositories.IEventRepository;
import br.edu.ufop.web.ticket.sales.repositories.ISaleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final ISaleRepository saleRepository;
    private final IEventRepository eventRepository;
    private final SaleConverter saleConverter;

    public SaleDTO createSale(CreateSaleDTO createSaleDTO) {
        EventModel event = eventRepository.findById(createSaleDTO.getEventId())
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + createSaleDTO.getEventId()));
        
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(event.getStartSales()) || now.isAfter(event.getEndSales())) {
            throw new IllegalStateException("Sales are not open for this event.");
        }

        SaleModel saleModel = SaleModel.builder()
                .userId(createSaleDTO.getUserId())
                .event(event)
                .saleStatus(SaleStatus.EM_ABERTO) // Inicia com status "Em aberto"
                .build();
        
        saleModel = saleRepository.save(saleModel);
        return saleConverter.toDTO(saleModel);
    }

    public SaleDTO getSaleById(UUID id) {
        SaleModel sale = saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found with id: " + id));
        return saleConverter.toDTO(sale);
    }

    public List<SaleDTO> getSalesByUserId(UUID userId) {
        return saleRepository.findByUserId(userId).stream()
                .map(saleConverter::toDTO)
                .collect(Collectors.toList());
    }

    public SaleDTO updateSaleStatus(UUID id, UpdateSaleStatusDTO updateSaleStatusDTO) {
        SaleModel sale = saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found with id: " + id));
        
        sale.setSaleStatus(updateSaleStatusDTO.getNewStatus());
        sale = saleRepository.save(sale);
        return saleConverter.toDTO(sale);
    }

    public void deleteSale(UUID id) {
        if (!saleRepository.existsById(id)) {
            throw new EntityNotFoundException("Sale not found with id: " + id);
        }

        saleRepository.deleteById(id);
    }
}