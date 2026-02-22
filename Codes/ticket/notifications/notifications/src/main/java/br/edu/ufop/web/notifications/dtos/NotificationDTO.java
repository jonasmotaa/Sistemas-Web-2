package br.edu.ufop.web.notifications.dtos;

import java.util.UUID;
import br.edu.ufop.web.notifications.enums.EnumNotificationType;
import java.time.LocalDateTime;



public record NotificationDTO(
    UUID id,
    UUID userId,
    String service,
    EnumNotificationType notificationType,
    String subject,
    String content,
    LocalDateTime sentAt,
    LocalDateTime readAt
){

}

