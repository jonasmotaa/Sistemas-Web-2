package br.edu.ufop.web.ticket.sales.controllers;

import java.net.URI;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import br.edu.ufop.web.ticket.sales.dtos.CreateSaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.SaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.UpdateSaleStatusDTO;
import br.edu.ufop.web.ticket.sales.services.SaleService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;


    @PostMapping
    public ResponseEntity<SaleDTO> createSale(@RequestBody CreateSaleDTO createSaleDTO) {
        SaleDTO createdSale = saleService.createSale(createSaleDTO);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdSale.getId())
                .toUri();

        return ResponseEntity.created(location).body(createdSale);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleDTO> getSaleById(@PathVariable UUID id) {
        return ResponseEntity.ok(saleService.getSaleById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SaleDTO>> getSalesByUserId(@PathVariable UUID userId) {
        return ResponseEntity.ok(saleService.getSalesByUserId(userId));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<SaleDTO> updateSaleStatus(
            @PathVariable UUID id,
            @RequestBody UpdateSaleStatusDTO updateSaleStatusDTO
    ) {
        return ResponseEntity.ok(saleService.updateSaleStatus(id, updateSaleStatusDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable UUID id) {
        saleService.deleteSale(id);
        return ResponseEntity.noContent().build();
    }
}
