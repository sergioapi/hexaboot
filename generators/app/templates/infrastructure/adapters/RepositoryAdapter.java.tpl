package <%= groupID %>;

import <%= pathMapper %>.<%= entityName %>Mapper;
import <%= pathModel %>.<%= entityName %>;
import <%= pathRepo %>.<%= entityName %>Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class <%= entityName %>RepositoryAdapter implements <%= entityName %>Repository {

    private final <%= entityName %>JpaRepository <%= entityVarName %>JpaRepository;
    private final <%= entityName %>Mapper <%= entityVarName %>Mapper;

    @Override
    public <%= entityName %> save(<%= entityName %> <%= entityVarName %>) {
        return <%= entityVarName %>Mapper.toDomain(<%= entityVarName %>JpaRepository
                .save(<%= entityVarName %>Mapper.toEntity(<%= entityVarName %>)));
    }

    @Override
    public <%= entityName %> findById(Long id) {
        return <%= entityVarName %>JpaRepository.findById(id).map(<%= entityVarName %>Mapper::toDomain).orElse(null);
    }

    @Override
    public List<<%= entityName %>> findAll() {
        return <%= entityVarName %>Mapper.toDomainList(<%= entityVarName %>JpaRepository.findAll());
    }

    @Override
    public <%= entityName %> update(<%= entityName %> <%= entityVarName %>) {
        return <%= entityVarName %>Mapper.toDomain(<%= entityVarName %>JpaRepository
                .save(<%= entityVarName %>Mapper.toEntity(<%= entityVarName %>)));
    }

    @Override
    public boolean deleteById(Long id) {
        if (<%= entityVarName %>JpaRepository.existsById(id)) {
            <%= entityVarName %>JpaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
