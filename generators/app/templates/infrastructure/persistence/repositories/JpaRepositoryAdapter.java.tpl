package  <%= groupID %>.infrastructure.persistance.repositories;

import  <%= groupID %>.domain.models.<%= entityName %>;
import  <%= groupID %>.domain.ports.driven.<%= entityName %>Repository;
import  <%= groupID %>.infrastructure.persistance.entities.<%= entityName %>Entity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class Jpa<%= entityName %>RepositoryAdapter implements <%= entityName %>Repository {

    private final Jpa<%= entityName %>Repository jpa<%= entityName %>Repository;

    public Jpa<%= entityName %>RepositoryAdapter(Jpa<%= entityName %>Repository jpa<%= entityName %>Repository) {
        this.jpa<%= entityName %>Repository = jpa<%= entityName %>Repository;
    }

    @Override
    public <%= entityName %> save(<%= entityName %> <%= entityVarName %>) {
        <%= entityName %>Entity <%= entityVarName %>Entity = <%= entityName %>Entity.fromDomainModel(<%= entityVarName %>);
        <%= entityName %>Entity saved<%= entityName %>Entity = jpa<%= entityName %>Repository.save(<%= entityVarName %>Entity);
        return saved<%= entityName %>Entity.toDomainModel();
    }

    @Override
    public Optional<<%= entityName %>> findById(Long id) {
        return jpa<%= entityName %>Repository.findById(id).map(<%= entityName %>Entity::toDomainModel);
    }

    @Override
    public List<<%= entityName %>> findAll() {
        return jpa<%= entityName %>Repository.findAll().stream()
                .map(<%= entityName %>Entity::toDomainModel)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<<%= entityName %>> update(<%= entityName %> <%= entityVarName %>) {
        if(jpa<%= entityName %>Repository.existsById(<%= entityVarName %>.getId())) {
            <%= entityName %>Entity <%= entityVarName %>Entity = <%= entityName %>Entity.fromDomainModel(<%= entityVarName %>);
            <%= entityName %>Entity update<%= entityName %>Entity = jpa<%= entityName %>Repository.save(<%= entityVarName %>Entity);
            return Optional.of(update<%= entityName %>Entity.toDomainModel());
        }
        return Optional.empty();
    }

    @Override
    public boolean deleteById(Long id) {
        if(jpa<%= entityName %>Repository.existsById(id)) {
            jpa<%= entityName %>Repository.deleteById(id);
            return true;
        }
        return false;
    }
}
