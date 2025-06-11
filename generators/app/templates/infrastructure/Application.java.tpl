package <%= package %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(
        basePackages = "<%= groupID %>",
        includeFilters = @ComponentScan.Filter(
                type = org.springframework.context.annotation.FilterType.ANNOTATION,
                classes = <%= pathUseCaseAnnotation %>.UseCase.class
        ))
public class <%= mainClassName %> {

	public static void main(String[] args) {
		SpringApplication.run(<%= mainClassName %>.class, args);
	}

}
