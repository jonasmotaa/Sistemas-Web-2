package br.edu.ufop.web.ticket.sales.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import br.edu.ufop.web.ticket.sales.converters.SaleConverter;
import br.edu.ufop.web.ticket.sales.domain.SaleDomain;
import br.edu.ufop.web.ticket.sales.dtos.events.DeleteSaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.UpdateSaleStatusDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.CreateSaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.SaleDTO;
import br.edu.ufop.web.ticket.sales.enums.EnumSaleStatusType;
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

    public List<SaleDTO> getAllSales() {
        return saleRepository.findAll().stream()
                .map(SaleConverter::toDTO)
                .collect(Collectors.toList());
    }

    public SaleDTO createSale(CreateSaleDTO createSaleDTO) {
        EventModel event = eventRepository.findById(createSaleDTO.getEventId())
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + createSaleDTO.getEventId()));
        
        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(event.getStartSales()) || now.isAfter(event.getEndSales())) {
            throw new IllegalStateException("Sales are not open for this event.");
        }

        SaleDomain saleDomain = SaleConverter.toDomain(createSaleDTO);
        saleDomain.setEventId(event);
        saleDomain.setSaleDate(now);
        if (saleDomain.getSaleStatus() == null) {
            saleDomain.setSaleStatus(EnumSaleStatusType.EM_ABERTO); // Default status
        }

        
        SaleModel saleModel = SaleConverter.toModel(saleDomain);
        return SaleConverter.toDTO(saleRepository.save(saleModel));
    }

    public SaleDTO getSaleById(String id) {
        UUID saleId = UUID.fromString(id);
        Optional<SaleModel> saleOptional = saleRepository.findById(saleId);
        if(saleOptional.isPresent()){
            SaleModel sale = saleOptional.get();
            return SaleConverter.toDTO(sale);
        }
        return null;
    }

    public List<SaleDTO> getSalesByUserId(String Id) {
        UUID userId = UUID.fromString(Id);
        List<SaleModel> sales = saleRepository.findByUserId(userId);
        return sales.stream()
                .map(SaleConverter::toDTO)
                .collect(Collectors.toList());
    }

    public SaleDTO updateSaleStatus(UpdateSaleStatusDTO updateSaleStatusDTO) {
        Optional<SaleModel> saleOptional = saleRepository.findById(updateSaleStatusDTO.getSaleId());
        if(!saleOptional.isPresent()) {
            return null;
        }
        SaleModel sale = saleOptional.get();
        sale.setSaleStatus(updateSaleStatusDTO.getNewStatus());
        return SaleConverter.toDTO(saleRepository.save(sale));
    }

    public void deleteSale(DeleteSaleDTO deleteSaleDTO) {
        Optional<SaleModel> saleOptional = saleRepository.findById(deleteSaleDTO.id());
        if(saleOptional.isEmpty()) {
            throw new EntityNotFoundException("Sale not found with id: " + deleteSaleDTO.id());
        }
        saleRepository.delete(saleOptional.get());
    }
}