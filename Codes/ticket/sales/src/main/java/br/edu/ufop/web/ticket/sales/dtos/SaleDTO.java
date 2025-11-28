package br.edu.ufop.web.ticket.sales.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

import br.edu.ufop.web.ticket.sales.enums.SaleStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleDTO {
    private UUID id;
    private UUID userId;
    private UUID eventId;
    private String eventDescription;
    private LocalDateTime saleDate;
    private SaleStatus saleStatus;
}