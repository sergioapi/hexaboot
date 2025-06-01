package es.example.lineafacturas.ports.driving;

import es.example.lineafacturas.models.LineaFactura;

import java.util.List;

public interface LineaFacturaUseCase {
    
    LineaFactura createLineaFactura(LineaFactura lineaFactura);
    LineaFactura getLineaFactura(Long id);
    List<LineaFactura> getAllLineaFacturas();
    boolean deleteLineaFactura(Long id);
    LineaFactura updateLineaFactura(Long id, LineaFactura updateLineaFactura);
}