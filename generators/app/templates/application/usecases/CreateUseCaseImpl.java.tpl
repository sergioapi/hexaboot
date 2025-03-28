package <%= groupID %>.application.usecases;

import <%= groupID %>.domain.models.<%= entityName %>;
import <%= groupID %>.domain.ports.driven.<%= entityName %>Repository;
import <%= groupID %>.application.ports.in.Create<%= entityName %>UseCase;

public class Create<%= entityName %>UseCaseImpl implements Create<%= entityName %>UseCase {

     private final <%= entityName %>Repository <%= entityVarName %>Repository;

     public Create<%= entityName %>UseCaseImpl(<%= entityName %>Repository <%= entityVarName %>Repository){
          this.<%= entityVarName %>Repository = <%= entityVarName %>Repository;
     }

     @Override
     public <%= entityName %> create<%= entityName %>(<%= entityName %> <%= entityVarName %>){
          return  <%= entityVarName %>Repository.save( <%= entityVarName %>);
     }
}
