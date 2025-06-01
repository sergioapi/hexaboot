package es.example.facturas.adapters.persistence.mappers;

import es.example.facturas.adapters.persistence.entities.FacturaEntity;
import es.example.facturas.models.Factura;
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
public class FacturaMapperImpl implements FacturaMapper {

    @Override
    public FacturaEntity toEntity(Factura factura) {
        if ( factura == null ) {
            return null;
        }

        FacturaEntity facturaEntity = new FacturaEntity();

        facturaEntity.setId( factura.getId() );
        facturaEntity.setNumero( factura.getNumero() );

        return facturaEntity;
    }

    @Override
    public Factura toDomain(FacturaEntity facturaEntity) {
        if ( facturaEntity == null ) {
            return null;
        }

        Factura factura = new Factura();

        factura.setId( facturaEntity.getId() );
        factura.setNumero( facturaEntity.getNumero() );

        return factura;
    }

    @Override
    public List<Factura> toDomainList(List<FacturaEntity> facturaEntities) {
        if ( facturaEntities == null ) {
            return null;
        }

        List<Factura> list = new ArrayList<Factura>( facturaEntities.size() );
        for ( FacturaEntity facturaEntity : facturaEntities ) {
            list.add( toDomain( facturaEntity ) );
        }

        return list;
    }
}
