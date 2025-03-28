package <%= groupID %>.application.ports.in;

import <%= groupID %>.domain.models.<%= entityName %>;

public interface Create<%= entityName %>UseCase {

     <%= entityName %> create<%= entityName %>(<%= entityName %> <%= entityVarName %>);
}
