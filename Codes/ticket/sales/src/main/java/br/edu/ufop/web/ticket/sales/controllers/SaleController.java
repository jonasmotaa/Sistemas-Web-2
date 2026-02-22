package br.edu.ufop.web.ticket.sales.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.ufop.web.ticket.sales.dtos.events.DeleteSaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.events.UpdateSaleStatusDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.CreateSaleDTO;
import br.edu.ufop.web.ticket.sales.dtos.sales.SaleDTO;
import br.edu.ufop.web.ticket.sales.service.SaleService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;

    

    @GetMapping
    public ResponseEntity<List<SaleDTO>> getAllSales() {
        return ResponseEntity.ok(saleService.getAllSales());
    }   

    @PostMapping
    public ResponseEntity<SaleDTO> createSale(@RequestBody CreateSaleDTO createSaleDTO) {
        SaleDTO createdSale = saleService.createSale(createSaleDTO);
        return ResponseEntity.ok(createdSale);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaleDTO> getSaleById(@PathVariable(value = "id") String id) {
        List<SaleDTO> sales = saleService.getAllSales().stream()
            .filter(sale -> sale.getId().toString().equals(id))
            .toList();
        if (sales.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(sales.get(0));
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SaleDTO>> getSalesByUserId(@PathVariable(value = "userId") UUID userId) {
        List<SaleDTO> sales = saleService.getAllSales().stream()
                .filter(sale -> sale.getUserId().equals(userId))
                .toList();
        return ResponseEntity.ok(sales);
    }

    @PutMapping("/status")
    public ResponseEntity<SaleDTO> updateSaleStatus(@RequestBody UpdateSaleStatusDTO updateSaleStatusDTO) {
        SaleDTO saleDTO = saleService.updateSaleStatus(updateSaleStatusDTO);
        if (saleDTO == null) {  
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(saleDTO);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteSale(@RequestBody DeleteSaleDTO deleteSaleDTO) {
        saleService.deleteSale(deleteSaleDTO);
        return ResponseEntity.ok("Sale deleted successfully");
    }
}