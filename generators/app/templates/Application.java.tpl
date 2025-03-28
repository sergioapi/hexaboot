package  <%= groupID %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class <%= entityName %>sApplication {

	public static void main(String[] args) {
		SpringApplication.run(<%= entityName %>sApplication.class, args);
	}

}
