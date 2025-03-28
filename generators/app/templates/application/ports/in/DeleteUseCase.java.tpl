package <%= groupID %>.application.ports.in;

public interface Delete<%= entityName %>UseCase {

     boolean delete<%= entityName %>(Long id);
}
