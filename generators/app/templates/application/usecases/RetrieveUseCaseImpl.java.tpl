package <%= groupID %>.application.usecases;

import <%= groupID %>.domain.models.<%= entityName %>;
import <%= groupID %>.domain.ports.driven.<%= entityName %>Repository;
import <%= groupID %>.application.ports.in.Retrieve<%= entityName %>UseCase;

import java.util.List;
import java.util.Optional;

public class Retrieve<%= entityName %>UseCaseImpl implements Retrieve<%= entityName %>UseCase {
    private final <%= entityName %>Repository <%= entityVarName %>Repository;

    public Retrieve<%= entityName %>UseCaseImpl(<%= entityName %>Repository <%= entityVarName %>Repository) {
        this.<%= entityVarName %>Repository = <%= entityVarName %>Repository;
    }

    @Override
    public Optional<<%= entityName %>> get<%= entityName %>(Long id) {
        return <%= entityVarName %>Repository.findById(id);
    }

    @Override
    public List<<%= entityName %>> getAll<%= entityName %>s() {
        return <%= entityVarName %>Repository.findAll();
    }
}
