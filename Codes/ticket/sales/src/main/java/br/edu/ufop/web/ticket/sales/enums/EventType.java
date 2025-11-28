package br.edu.ufop.web.ticket.sales.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EventType {
    PALESTRA(1, "Palestra"),
    SHOW(2, "Show"),
    TEATRO(3, "Teatro"),
    CURSO(4, "Curso"),
    OUTRO(5, "Outro");

    private final Integer id;
    private final String description;
}