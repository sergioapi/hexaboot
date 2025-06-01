package es.example.lineafacturas.adapters.persistence.mappers;

import es.example.lineafacturas.adapters.persistence.entities.LineaFacturaEntity;
import es.example.lineafacturas.models.LineaFactura;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-01T18:01:54+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class LineaFacturaMapperImpl implements LineaFacturaMapper {

    @Override
    public LineaFacturaEntity toEntity(LineaFactura lineaFactura) {
        if ( lineaFactura == null ) {
            return null;
        }

        LineaFacturaEntity lineaFacturaEntity = new LineaFacturaEntity();

        lineaFacturaEntity.setId( lineaFactura.getId() );
        lineaFacturaEntity.setDescripcion( lineaFactura.getDescripcion() );
        lineaFacturaEntity.setCantidad( lineaFactura.getCantidad() );

        return lineaFacturaEntity;
    }

    @Override
    public LineaFactura toDomain(LineaFacturaEntity lineaFacturaEntity) {
        if ( lineaFacturaEntity == null ) {
            return null;
        }

        LineaFactura lineaFactura = new LineaFactura();

        lineaFactura.setId( lineaFacturaEntity.getId() );
        lineaFactura.setDescripcion( lineaFacturaEntity.getDescripcion() );
        lineaFactura.setCantidad( lineaFacturaEntity.getCantidad() );

        return lineaFactura;
    }

    @Override
    public List<LineaFactura> toDomainList(List<LineaFacturaEntity> lineaFacturaEntities) {
        if ( lineaFacturaEntities == null ) {
            return null;
        }

        List<LineaFactura> list = new ArrayList<LineaFactura>( lineaFacturaEntities.size() );
        for ( LineaFacturaEntity lineaFacturaEntity : lineaFacturaEntities ) {
            list.add( toDomain( lineaFacturaEntity ) );
        }

        return list;
    }
}
