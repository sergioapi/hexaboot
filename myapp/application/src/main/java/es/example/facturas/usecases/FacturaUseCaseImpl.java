package es.example.facturas.usecases;

import es.example.facturas.models.Factura;
import es.example.facturas.ports.driven.FacturaRepository;
import es.example.facturas.ports.driving.FacturaUseCase;
import es.example.annotations.UseCase;

import java.util.Optional;
import java.util.List;

@UseCase
public class FacturaUseCaseImpl implements FacturaUseCase {
    private final FacturaRepository facturaRepository;

    public FacturaUseCaseImpl(FacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

   public Factura createFactura(Factura factura){
        return facturaRepository.save(factura);
    }

    public Factura getFactura(Long id){
        return facturaRepository.findById(id);
    }

    public List<Factura> getAllFacturas(){
        return facturaRepository.findAll();
    }

    public boolean deleteFactura(Long id){
        return facturaRepository.deleteById(id);
    }

    public Factura updateFactura(Long id, Factura updatefactura){
        return facturaRepository.update(updatefactura);
    }
}