package <%= groupID %>;

import <%=pathModel%>.<%=model%>;
import <%=pathRepository%>.<%=model%>Repository;
import <%=pathUseCase%>.<%=model%>UseCase;
import <%=pathUseCaseAnnotation%>.UseCase;

import java.util.Optional;
import java.util.List;

@UseCase
public class <%= model %>UseCaseImpl implements <%= model %>UseCase {
    private final <%= model %>Repository <%= entityVarName%>Repository;

    public <%= model %>UseCaseImpl(<%= model %>Repository <%= entityVarName%>Repository) {
        this.<%= entityVarName%>Repository = <%= entityVarName%>Repository;
    }

   public <%= model %> create<%= model %>(<%= model %> <%= entityVarName%>){
        return <%= entityVarName%>Repository.save(<%= entityVarName%>);
    }

    public <%= model %> get<%= model %>(Long id){
        return <%= entityVarName%>Repository.findById(id);
    }

    public List<<%= model %>> getAll<%= model %>s(){
        return <%= entityVarName%>Repository.findAll();
    }

    public boolean delete<%= model %>(Long id){
        return <%= entityVarName%>Repository.deleteById(id);
    }

    public <%= model %> update<%= model %>(Long id, <%= model %> update<%= entityVarName%>) {
        update<%= entityVarName %>.setId(id);
        return <%= entityVarName %>Repository.update(update<%= entityVarName %>);
    }
}