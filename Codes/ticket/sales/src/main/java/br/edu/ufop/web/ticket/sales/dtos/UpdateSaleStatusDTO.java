package br.edu.ufop.web.ticket.sales.dtos;

import br.edu.ufop.web.ticket.sales.enums.SaleStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateSaleStatusDTO {
    private SaleStatus newStatus;
}