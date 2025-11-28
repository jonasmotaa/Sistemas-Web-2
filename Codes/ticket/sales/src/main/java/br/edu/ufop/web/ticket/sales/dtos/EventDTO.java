package br.edu.ufop.web.ticket.sales.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

import br.edu.ufop.web.ticket.sales.enums.EventType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventDTO {
    private UUID id;
    private String description;
    private EventType type;
    private LocalDateTime date;
    private LocalDateTime startSales;
    private LocalDateTime endSales;
    private Float price;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}