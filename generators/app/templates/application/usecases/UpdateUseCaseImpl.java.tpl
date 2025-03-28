package <%= groupID %>.application.usecases;

import <%= groupID %>.domain.models.<%= entityName %>;
import <%= groupID %>.domain.ports.driven.<%= entityName %>Repository;
import <%= groupID %>.application.ports.in.Update<%= entityName %>UseCase;

import java.util.Optional;

public class Update<%= entityName %>UseCaseImpl implements Update<%= entityName %>UseCase {
    private final <%= entityName %>Repository <%= entityVarName %>Repository;

    public Update<%= entityName %>UseCaseImpl(<%= entityName %>Repository <%= entityVarName %>Repository) {
        this.<%= entityVarName %>Repository = <%= entityVarName %>Repository;
    }

    @Override
    public Optional<<%= entityName %>> update<%= entityName %>(Long id, <%= entityName %> update<%= entityName %>) {
        return <%= entityVarName %>Repository.update(update<%= entityName %>);
    }
}