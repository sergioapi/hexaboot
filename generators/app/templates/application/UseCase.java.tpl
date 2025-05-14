package <%= groupID %>;

import <%=pathModel%>.<%=model%>;

import java.util.List;

public interface <%= model %>UseCase {
    
    <%= model %> create<%= model %>(<%= model %> <%= entityVarName %>);
    <%= model %> get<%= model %>(Long id);
    List<<%= model %>> getAll<%= model %>s();
    boolean delete<%= model %>(Long id);
    <%= model %> update<%= model %>(Long id, <%= model %> update<%= model %>);
}