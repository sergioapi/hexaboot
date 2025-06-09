package <%= groupID %>;

import <%=pathModel%>.<%=model%>;
import <%=pathRepository%>.<%=model%>RepositoryPort;
import <%=pathUseCase%>.<%=model%>UseCase;
import <%=pathUseCaseAnnotation%>.UseCase;

import java.util.Optional;
import java.util.List;

@UseCase
public class <%= model %>UseCaseImpl implements <%= model %>UseCase {
    private final <%= model %>RepositoryPort <%= entityVarName%>RepositoryPort;

    public <%= model %>UseCaseImpl(<%= model %>RepositoryPort <%= entityVarName%>RepositoryPort) {
        this.<%= entityVarName%>RepositoryPort = <%= entityVarName%>RepositoryPort;
    }

   public <%= model %> create<%= model %>(<%= model %> <%= entityVarName%>){
        return <%= entityVarName%>RepositoryPort.save(<%= entityVarName%>);
    }

    public <%= model %> get<%= model %>(String id){
        return <%= entityVarName%>RepositoryPort.findById(id);
    }

    public List<<%= model %>> getAll<%= model %>s(){
        return <%= entityVarName%>RepositoryPort.findAll();
    }

    public boolean delete<%= model %>(String id){
        return <%= entityVarName%>RepositoryPort.deleteById(id);
    }

    public <%= model %> update<%= model %>(String id, <%= model %> update<%= entityVarName%>) {
        update<%= entityVarName %>.setId(id);
        return <%= entityVarName %>RepositoryPort.update(update<%= entityVarName %>);
    }
}