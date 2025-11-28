package br.edu.ufop.web.ticket.sales.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.ufop.web.ticket.sales.models.EventModel;

@Repository
public interface IEventRepository extends JpaRepository<EventModel, UUID> {
}