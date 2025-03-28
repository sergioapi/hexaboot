package <%= groupID %>.application.ports.in;

import <%= groupID %>.domain.models.<%= entityName %>;

import java.util.Optional;

public interface Update<%= entityName %>UseCase {

     Optional<<%= entityName %>> update<%= entityName %>(Long id, <%= entityName %> update<%= entityName %>);
}
