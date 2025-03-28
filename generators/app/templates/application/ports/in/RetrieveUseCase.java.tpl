package <%= groupID %>.application.ports.in;

import <%= groupID %>.domain.models.<%= entityName %>;

import java.util.List;
import java.util.Optional;

public interface Retrieve<%= entityName %>UseCase {

    Optional<<%= entityName %>> get<%= entityName %>(Long id);
    List<<%= entityName %>> getAll<%= entityName %>s();
}
