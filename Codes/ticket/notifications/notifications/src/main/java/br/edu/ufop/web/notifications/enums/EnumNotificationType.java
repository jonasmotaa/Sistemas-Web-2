package br.edu.ufop.web.notifications.enums;

import lombok.Getter;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Getter
public enum EnumNotificationType {
    MESSAGE(0, "Message"),
    EMAIL(1, "Email"),
    WHATSAPP(2, "WhatsApp"),
    TELEGRAM(3, "Telegram");

    private final Integer id;
    private final String description;
}
