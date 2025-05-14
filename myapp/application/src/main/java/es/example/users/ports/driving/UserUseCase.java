package es.example.users.ports.driving;

import es.example.users.models.User;

import java.util.List;

public interface UserUseCase {
    
    User createUser(User user);
    User getUser(Long id);
    List<User> getAllUsers();
    boolean deleteUser(Long id);
    User updateUser(Long id, User updateUser);
}