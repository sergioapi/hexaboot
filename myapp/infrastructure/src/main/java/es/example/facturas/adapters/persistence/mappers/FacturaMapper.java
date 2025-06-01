package es.example.facturas.adapters.persistence.mappers;

import es.example.facturas.adapters.persistence.entities.FacturaEntity;
import es.example.facturas.models.Factura;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FacturaMapper{

    FacturaEntity toEntity(Factura factura);

    Factura toDomain(FacturaEntity facturaEntity);

    List<Factura> toDomainList(List<FacturaEntity> facturaEntities);
}