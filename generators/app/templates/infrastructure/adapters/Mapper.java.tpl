package <%= groupID %>;

import <%= pathEntity %>.<%= entityName %>Entity;
import <%= pathModel %>.<%= entityName %>;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface <%= entityName %>Mapper{

    <%= entityName %>Entity toEntity(<%= entityName %> <%= entityVarName %>);

    <%= entityName %> toDomain(<%= entityName %>Entity <%= entityVarName %>Entity);

    List<<%= entityName %>> toDomainList(List<<%= entityName %>Entity> <%= entityVarName %>Entities);
}