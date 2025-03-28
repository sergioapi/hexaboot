package  <%= groupID %>.infrastructure.config;

import  <%= groupID %>.application.services.<%= entityName %>Service;
import  <%= groupID %>.application.usecases.*;
import  <%= groupID %>.domain.ports.driven.<%= entityName %>Repository;
import  <%= groupID %>.infrastructure.persistance.repositories.Jpa<%= entityName %>RepositoryAdapter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

    @Bean
    public <%= entityName %>Service <%= entityVarName %>Service(<%= entityName %>Repository <%= entityVarName %>Repository) {
        return new <%= entityName %>Service(
                new Create<%= entityName %>UseCaseImpl(<%= entityVarName %>Repository),
                new Retrieve<%= entityName %>UseCaseImpl(<%= entityVarName %>Repository),
                new Delete<%= entityName %>UseCaseImpl(<%= entityVarName %>Repository),
                new Update<%= entityName %>UseCaseImpl(<%= entityVarName %>Repository)
        );
    }

    @Bean
    public <%= entityName %>Repository <%= entityVarName %>RepositoryPort(Jpa<%= entityName %>RepositoryAdapter jpa<%= entityName %>RepositoryAdapter) {
        return jpa<%= entityName %>RepositoryAdapter;
    }
}
