package br.edu.ufop.web.ticket.sales.enums;

import lombok.Getter;

@Getter
public enum EnumEventType {
    EVENTO(0, "Evento geral"),
    PALESTRA(1, "Palestra"),
    SHOW(2, "Show"),
    TEATRO(3, "Teatro"),
    CURSO(4, "Curso");

    private final Integer id;
    private final String description;

    private EnumEventType(Integer id, String description) {
        this.id = id;
        this.description = description;
    }

    
}