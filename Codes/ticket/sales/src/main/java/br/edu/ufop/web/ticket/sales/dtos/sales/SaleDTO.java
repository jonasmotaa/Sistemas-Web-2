package br.edu.ufop.web.ticket.sales.dtos.sales;

import java.time.LocalDateTime;
import java.util.UUID;

import br.edu.ufop.web.ticket.sales.enums.EnumSaleStatusType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaleDTO {
    private UUID id;
    private UUID userId;
    private UUID eventId;
    private LocalDateTime saleDate;
    private EnumSaleStatusType saleStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}