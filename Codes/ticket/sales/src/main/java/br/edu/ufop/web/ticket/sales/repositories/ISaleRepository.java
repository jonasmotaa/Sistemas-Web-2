package br.edu.ufop.web.ticket.sales.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.ufop.web.ticket.sales.models.SaleModel;

@Repository
public interface ISaleRepository extends JpaRepository<SaleModel, UUID> {
    List<SaleModel> findByUserId(UUID userId);
}