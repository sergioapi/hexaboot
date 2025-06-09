package <%= groupID %>;

import <%=pathModel%>.<%=model%>;

import java.util.List;

public interface <%= model %>UseCase {
    
    <%= model %> create<%= model %>(<%= model %> <%= entityVarName %>);
    <%= model %> get<%= model %>(String id);
    List<<%= model %>> getAll<%= model %>s();
    boolean delete<%= model %>(String id);
    <%= model %> update<%= model %>(String id, <%= model %> update<%= model %>);
}