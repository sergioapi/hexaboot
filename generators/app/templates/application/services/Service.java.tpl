package <%= groupID %>.application.services;

import <%= groupID %>.application.ports.in.*;
import <%= groupID %>.domain.models.<%= entityName %>;

import java.util.List;
import java.util.Optional;

public class <%= entityName %>Service implements Create<%= entityName %>UseCase, Delete<%= entityName %>UseCase, Update<%= entityName %>UseCase, Retrieve<%= entityName %>UseCase {

    private final Create<%= entityName %>UseCase create<%= entityName %>UseCase;
    private final Retrieve<%= entityName %>UseCase retrieve<%= entityName %>UseCase;
    private final Delete<%= entityName %>UseCase delete<%= entityName %>UseCase;
    private final Update<%= entityName %>UseCase update<%= entityName %>UseCase;

    public <%= entityName %>Service(Create<%= entityName %>UseCase create<%= entityName %>UseCase, Retrieve<%= entityName %>UseCase retrieve<%= entityName %>UseCase, Delete<%= entityName %>UseCase delete<%= entityName %>UseCase, Update<%= entityName %>UseCase update<%= entityName %>UseCase) {
        this.create<%= entityName %>UseCase = create<%= entityName %>UseCase;
        this.retrieve<%= entityName %>UseCase = retrieve<%= entityName %>UseCase;
        this.delete<%= entityName %>UseCase = delete<%= entityName %>UseCase;
        this.update<%= entityName %>UseCase = update<%= entityName %>UseCase;
    }

    @Override
    public <%= entityName %> create<%= entityName %>(<%= entityName %> <%= entityVarName %>) {
        return create<%= entityName %>UseCase.create<%= entityName %>(<%= entityVarName %>);
    }

    @Override
    public boolean delete<%= entityName %>(Long id) {
        return delete<%= entityName %>UseCase.delete<%= entityName %>(id);
    }

    @Override
    public Optional<<%= entityName %>> get<%= entityName %>(Long id) {
        return retrieve<%= entityName %>UseCase.get<%= entityName %>(id);
    }

    @Override
    public List<<%= entityName %>> getAll<%= entityName %>s() {
        return retrieve<%= entityName %>UseCase.getAll<%= entityName %>s();
    }

    @Override
    public Optional<<%= entityName %>> update<%= entityName %>(Long id, <%= entityName %> update<%= entityName %>) {
        return update<%= entityName %>UseCase.update<%= entityName %>(id, update<%= entityName %>);
    }
}
