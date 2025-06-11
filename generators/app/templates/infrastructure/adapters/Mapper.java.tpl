package <%= package %>;

import <%= pathEntity %>.<%= model %>Entity;
import <%= pathModel %>.<%= model %>;
import org.mapstruct.Mapper;
import java.util.List;
import java.util.Optional;
<% if (databaseEngine !== 'mongodb') { %>
import org.mapstruct.Mapping;
import org.mapstruct.Named;
<% } else { %>
import org.bson.types.ObjectId;
<% } %>

@Mapper(componentModel = "spring")
public interface <%= model %>Mapper{
    <%= model %>Entity toEntity(<%= model %> <%= modelVarName %>);
    
    <%= model %> toDomain(<%= model %>Entity <%= modelVarName %>Entity);

    List<<%= model %>> toDomainList(List<<%= model %>Entity> <%= modelVarName %>Entities);
    <% if (databaseEngine === 'mongodb') { %>
    default String map(ObjectId value) {
        return Optional.ofNullable(value).map(val->val.toString()).orElseGet(()->"");
    }

    default ObjectId map(String value) {
        return Optional.ofNullable(value).map(id->new ObjectId(id)).orElse(null);
    }<% } %>
}