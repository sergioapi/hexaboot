package <%= groupID %>.application.usecases;

import <%= groupID %>.domain.ports.driven.<%= entityName %>Repository;
import <%= groupID %>.application.ports.in.Delete<%= entityName %>UseCase;

public class Delete<%= entityName %>UseCaseImpl implements Delete<%= entityName %>UseCase {
    private final <%= entityName %>Repository <%= entityVarName %>Repository;

    public Delete<%= entityName %>UseCaseImpl(<%= entityName %>Repository <%= entityVarName %>Repository) {
        this.<%= entityVarName %>Repository = <%= entityVarName %>Repository;
    }

    @Override
    public boolean delete<%= entityName %>(Long id) {
        return <%= entityVarName %>Repository.deleteById(id);
    }
}

