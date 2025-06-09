package <%= groupID %>;

import <%= pathMapper %>.<%= entityName %>Mapper;
import <%= pathModel %>.<%= entityName %>;
import <%= pathRepo %>.<%= entityName %>RepositoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
<% if (databaseEngine === 'mongodb') { %>
import org.bson.types.ObjectId;
<% } %>
import java.util.List;

@Repository
@RequiredArgsConstructor
public class <%= entityName %>RepositoryAdapter implements <%= entityName %>RepositoryPort {

    private final <%= entityName %>SpringRepository <%= entityVarName %>SpringRepository;
    private final <%= entityName %>Mapper <%= entityVarName %>Mapper;

    @Override
    public <%= entityName %> save(<%= entityName %> <%= entityVarName %>) {
        return <%= entityVarName %>Mapper.toDomain(<%= entityVarName %>SpringRepository
                .save(<%= entityVarName %>Mapper.toEntity(<%= entityVarName %>)));
    }

@Override
public <%= entityName %> findById(String id) {
    <% if (databaseEngine === 'mongodb') { %>
    return <%= entityVarName %>SpringRepository.findById(new ObjectId(id))
            .map(<%= entityVarName %>Mapper::toDomain)
            .orElse(null);
    <% } else { %>
    return <%= entityVarName %>SpringRepository.findById(Long.valueOf(id))
            .map(<%= entityVarName %>Mapper::toDomain)
            .orElse(null);
    <% } %>
}

    @Override
    public List<<%= entityName %>> findAll() {
        return <%= entityVarName %>Mapper.toDomainList(<%= entityVarName %>SpringRepository.findAll());
    }

    @Override
    public <%= entityName %> update(<%= entityName %> <%= entityVarName %>) {
        return <%= entityVarName %>Mapper.toDomain(<%= entityVarName %>SpringRepository
                .save(<%= entityVarName %>Mapper.toEntity(<%= entityVarName %>)));
    }

    @Override
public boolean deleteById(String id) {
    <% if (databaseEngine === 'mongodb') { %>
    ObjectId objId = new ObjectId(id);
    if (<%= entityVarName %>SpringRepository.existsById(objId)) {
        <%= entityVarName %>SpringRepository.deleteById(objId);
        return true;
    }
    return false;
    <% } else { %>
    Long longId = Long.valueOf(id);
    if (<%= entityVarName %>SpringRepository.existsById(longId)) {
        <%= entityVarName %>SpringRepository.deleteById(longId);
        return true;
    }
    return false;
    <% } %>
}
}
