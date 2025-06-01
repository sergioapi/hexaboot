package es.example.facturas.adapters.persistence.repositories;

import es.example.facturas.adapters.persistence.entities.FacturaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacturaJpaRepository extends JpaRepository<FacturaEntity, Long> {
}
