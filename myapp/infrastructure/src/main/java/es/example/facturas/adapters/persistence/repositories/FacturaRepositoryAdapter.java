package es.example.facturas.adapters.persistence.repositories;

import es.example.facturas.adapters.persistence.mappers.FacturaMapper;
import es.example.facturas.models.Factura;
import es.example.facturas.ports.driven.FacturaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FacturaRepositoryAdapter implements FacturaRepository {

    private final FacturaJpaRepository facturaJpaRepository;
    private final FacturaMapper facturaMapper;

    @Override
    public Factura save(Factura factura) {
        return facturaMapper.toDomain(facturaJpaRepository
                .save(facturaMapper.toEntity(factura)));
    }

    @Override
    public Factura findById(Long id) {
        return facturaJpaRepository.findById(id).map(facturaMapper::toDomain).orElse(null);
    }

    @Override
    public List<Factura> findAll() {
        return facturaMapper.toDomainList(facturaJpaRepository.findAll());
    }

    @Override
    public Factura update(Factura factura) {
        return facturaMapper.toDomain(facturaJpaRepository
                .save(facturaMapper.toEntity(factura)));
    }

    @Override
    public boolean deleteById(Long id) {
        if (facturaJpaRepository.existsById(id)) {
            facturaJpaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
