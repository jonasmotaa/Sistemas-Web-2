package br.edu.ufop.web.ticket.sales.dtos.events;

import java.time.LocalDateTime;
import java.util.UUID;

import br.edu.ufop.web.ticket.sales.enums.EnumEventType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEventDTO {

  private UUID id;
  private String description;
  private EnumEventType type;
  private LocalDateTime date;
  private LocalDateTime startSales;
  private LocalDateTime endSales;
  private Float price;
  private LocalDateTime updatedAt;
}