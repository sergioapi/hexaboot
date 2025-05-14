package es.example.users.config;

import es.example.users.ports.driven.UserRepository;
import es.example.users.ports.driving.UserUseCase;
import es.example.users.usecases.UserUseCaseImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {

    @Bean
    public UserUseCase userUseCase(UserRepository userRepository) {
        return new UserUseCaseImpl(userRepository);
    }
}