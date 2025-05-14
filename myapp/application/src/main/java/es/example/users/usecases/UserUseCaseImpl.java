package es.example.users.usecases;

import es.example.users.models.User;
import es.example.users.ports.driven.UserRepository;
import es.example.users.ports.driving.UserUseCase;

import java.util.Optional;
import java.util.List;

public class UserUseCaseImpl implements UserUseCase {
    private final UserRepository userRepository;

    public UserUseCaseImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

   public User createUser(User user){
        return userRepository.save(user);
    }

    public User getUser(Long id){
        return userRepository.findById(id);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public boolean deleteUser(Long id){
        return userRepository.deleteById(id);
    }

    public User updateUser(Long id, User updateuser){
        return userRepository.update(updateuser);
    }
}