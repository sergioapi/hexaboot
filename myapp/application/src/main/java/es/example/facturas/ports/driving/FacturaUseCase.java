package es.example.facturas.ports.driving;

import es.example.facturas.models.Factura;

import java.util.List;

public interface FacturaUseCase {
    
    Factura createFactura(Factura factura);
    Factura getFactura(Long id);
    List<Factura> getAllFacturas();
    boolean deleteFactura(Long id);
    Factura updateFactura(Long id, Factura updateFactura);
}