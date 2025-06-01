package es.example.lineafacturas.adapters.persistence.repositories;

import es.example.lineafacturas.adapters.persistence.entities.LineaFacturaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LineaFacturaJpaRepository extends JpaRepository<LineaFacturaEntity, Long> {
}
