package <%= groupID %>.domain.ports.driven;

import <%= groupID %>.domain.models.<%= entityName %>;

import java.util.List;
import java.util.Optional;

public interface <%= entityName %>Repository{
    <%= entityName %> save(<%= entityName %> <%= entityVarName %>);
    Optional<<%= entityName %>> findById(Long id);
    List<<%= entityName %>> findAll();
    Optional<<%= entityName %>> update(<%= entityName %> <%= entityVarName %>);
    boolean deleteById(Long id);
}
