package es.example.lineafacturas.adapters.persistence.repositories;

import es.example.lineafacturas.adapters.persistence.mappers.LineaFacturaMapper;
import es.example.lineafacturas.models.LineaFactura;
import es.example.lineafacturas.ports.driven.LineaFacturaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class LineaFacturaRepositoryAdapter implements LineaFacturaRepository {

    private final LineaFacturaJpaRepository lineaFacturaJpaRepository;
    private final LineaFacturaMapper lineaFacturaMapper;

    @Override
    public LineaFactura save(LineaFactura lineaFactura) {
        return lineaFacturaMapper.toDomain(lineaFacturaJpaRepository
                .save(lineaFacturaMapper.toEntity(lineaFactura)));
    }

    @Override
    public LineaFactura findById(Long id) {
        return lineaFacturaJpaRepository.findById(id).map(lineaFacturaMapper::toDomain).orElse(null);
    }

    @Override
    public List<LineaFactura> findAll() {
        return lineaFacturaMapper.toDomainList(lineaFacturaJpaRepository.findAll());
    }

    @Override
    public LineaFactura update(LineaFactura lineaFactura) {
        return lineaFacturaMapper.toDomain(lineaFacturaJpaRepository
                .save(lineaFacturaMapper.toEntity(lineaFactura)));
    }

    @Override
    public boolean deleteById(Long id) {
        if (lineaFacturaJpaRepository.existsById(id)) {
            lineaFacturaJpaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
