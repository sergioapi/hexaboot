package <%= groupID %>;

import <%= pathEntity %>.<%= entityName %>Entity;
import <%= pathModel %>.<%= entityName %>;
import org.mapstruct.Mapper;
<% if (databaseEngine === 'mongodb') { %>
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.bson.types.ObjectId;
import java.util.Optional;
<% } %>
import java.util.List;

@Mapper(componentModel = "spring")
public interface <%= entityName %>Mapper{


    <%= entityName %>Entity toEntity(<%= entityName %> <%= entityVarName %>);


    <%= entityName %> toDomain(<%= entityName %>Entity <%= entityVarName %>Entity);

    List<<%= entityName %>> toDomainList(List<<%= entityName %>Entity> <%= entityVarName %>Entities);

    <% if (databaseEngine === 'mongodb') { %>
default String map(ObjectId value) {
    return Optional.ofNullable(value).map(val->val.toString()).orElseGet(()->"");
    }

default ObjectId map(String value) {
    return Optional.ofNullable(value).map(id->new ObjectId(id)).orElse(null);
}
    <% } %>
}