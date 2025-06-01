package es.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(
        basePackages = "es.example",
        includeFilters = @ComponentScan.Filter(
                type = org.springframework.context.annotation.FilterType.ANNOTATION,
                classes = es.example.annotations.UseCase.class
        ))
public class myappApp {

	public static void main(String[] args) {
		SpringApplication.run(myappApp.class, args);
	}

}
