package <%= groupID %>;

import <%= entityRepoPath %>.<%= entityName %>Repository;
import <%= useCasePath %>.<%= entityName %>UseCase;
import <%= useCaseImplPath %>.<%= entityName %>UseCaseImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class <%= entityName %>Config {

    @Bean
    public <%= entityName %>UseCase <%= entityVarName %>UseCase(<%= entityName %>Repository <%= entityVarName %>Repository) {
        return new <%= entityName %>UseCaseImpl(<%= entityVarName %>Repository);
    }
}