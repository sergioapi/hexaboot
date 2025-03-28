package <%= groupID %>.infrastructure.persistence.repositories;

import <%= groupID %>.domain.models.<%= entityName %>;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Jpa<%= entityName %>Repository extends JpaRepository<<%= entityName %>Entity, Long> {
}
