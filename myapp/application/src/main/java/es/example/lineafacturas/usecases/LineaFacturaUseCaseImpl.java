package es.example.lineafacturas.usecases;

import es.example.lineafacturas.models.LineaFactura;
import es.example.lineafacturas.ports.driven.LineaFacturaRepository;
import es.example.lineafacturas.ports.driving.LineaFacturaUseCase;
import es.example.annotations.UseCase;

import java.util.Optional;
import java.util.List;

@UseCase
public class LineaFacturaUseCaseImpl implements LineaFacturaUseCase {
    private final LineaFacturaRepository lineaFacturaRepository;

    public LineaFacturaUseCaseImpl(LineaFacturaRepository lineaFacturaRepository) {
        this.lineaFacturaRepository = lineaFacturaRepository;
    }

   public LineaFactura createLineaFactura(LineaFactura lineaFactura){
        return lineaFacturaRepository.save(lineaFactura);
    }

    public LineaFactura getLineaFactura(Long id){
        return lineaFacturaRepository.findById(id);
    }

    public List<LineaFactura> getAllLineaFacturas(){
        return lineaFacturaRepository.findAll();
    }

    public boolean deleteLineaFactura(Long id){
        return lineaFacturaRepository.deleteById(id);
    }

    public LineaFactura updateLineaFactura(Long id, LineaFactura updatelineaFactura){
        return lineaFacturaRepository.update(updatelineaFactura);
    }
}