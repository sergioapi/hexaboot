package es.example.lineafacturas.adapters.persistence.mappers;

import es.example.lineafacturas.adapters.persistence.entities.LineaFacturaEntity;
import es.example.lineafacturas.models.LineaFactura;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LineaFacturaMapper{

    LineaFacturaEntity toEntity(LineaFactura lineaFactura);

    LineaFactura toDomain(LineaFacturaEntity lineaFacturaEntity);

    List<LineaFactura> toDomainList(List<LineaFacturaEntity> lineaFacturaEntities);
}