package <%= package %>;

import <%= pathEntity %>.<%= model %>Entity;
import <%= pathModel %>.<%= model %>;
import org.mapstruct.Mapper;
import java.util.List;
<% if (DBtype==='Sql') { %>
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.stream.Collectors;
<% for (importStatement of relationImports) { %>
import <%= importStatement %>;
<% } %>
<% } else { %>
import org.bson.types.ObjectId;
import java.util.Optional;
<% } %>

@Mapper(componentModel = "spring")
public interface <%= model %>Mapper {

<% if (DBtype==='Sql') { %>
<% relations.forEach(function(rel) { if (rel.type === 'ManyToOne' || rel.type === 'OneToOne') { %>
    @Mapping(target = "<%= rel.fieldName %>", source = "<%= rel.fieldName %>Id", qualifiedByName = "idTo<%= rel.targetEntity %>Entity")
<% } else if (rel.type === 'OneToMany') { %>
    
<% } else if (rel.type === 'ManyToMany') { %>
    @Mapping(target = "<%= rel.fieldName %>", source = "<%= rel.fieldName %>Ids", qualifiedByName = "idsTo<%= rel.targetEntity %>Entities")
<% } }); %>
<% } %>
    <%= model %>Entity toEntity(<%= model %> <%= modelVarName %>);

<% if (DBtype==='Sql') { %>
<% relations.forEach(function(rel) { if (rel.type === 'ManyToOne' || rel.type === 'OneToOne') { %>
    @Mapping(target = "<%= rel.fieldName %>Id", source = "<%= rel.fieldName %>.id")
<% } else if (rel.type === 'OneToMany') { %>
    
<% } else if (rel.type === 'ManyToMany') { %>
    @Mapping(target = "<%= rel.fieldName %>Ids", source = "<%= rel.fieldName %>", qualifiedByName = "<%= rel.fieldName %>EntitiesToIds")
<% } }); %>
<% } %>
    <%= model %> toDomain(<%= model %>Entity <%= modelVarName %>Entity);

    List<<%= model %>> toDomainList(List<<%= model %>Entity> <%= modelVarName %>Entities);

<% if (dataBaseEngine === 'MongoDB') { %>
    default String map(ObjectId value) {
        return Optional.ofNullable(value).map(val->val.toString()).orElseGet(()->"");
    }
    default ObjectId map(String value) {
        return Optional.ofNullable(value).map(id->new ObjectId(id)).orElse(null);
    }
<% } else { %>
<% relations.forEach(function(rel) { 
    if (rel.type === 'ManyToOne' || rel.type === 'OneToOne') { %>
    @Named("idTo<%= rel.targetEntity %>Entity")
    default <%= rel.targetEntity %>Entity idTo<%= rel.targetEntity %>Entity(String id) {
        if (id == null) return null;
        <%= rel.targetEntity %>Entity entity = new <%= rel.targetEntity %>Entity();
        entity.setId(Long.valueOf(id));
        return entity;
    }
<% } else if ( rel.type === 'ManyToMany') { %>
    @Named("idsTo<%= rel.targetEntity %>Entities")
    default List<<%= rel.targetEntity %>Entity> idsTo<%= rel.targetEntity %>Entities(List<String> ids) {
        if (ids == null) return null;
        return ids.stream().map(id -> {
            <%= rel.targetEntity %>Entity entity = new <%= rel.targetEntity %>Entity();
            entity.setId(Long.valueOf(id));
            return entity;
        }).collect(Collectors.toList());
    }

    @Named("<%= rel.fieldName %>EntitiesToIds")
    default List<String> <%= rel.fieldName %>EntitiesToIds(List<<%= rel.targetEntity %>Entity> entities) {
        if (entities == null) return null;
        return entities.stream().map(e -> e.getId().toString()).collect(Collectors.toList());
    }
<% } }); %>
<% } %>
}
