package es.example.users.adapters.persistence.repositories;

import es.example.users.adapters.persistence.mappers.UserMapper;
import es.example.users.models.User;
import es.example.users.ports.driven.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class UserRepositoryAdapter implements UserRepository {

    private final UserJpaRepository userJpaRepository;
    private final UserMapper userMapper;

    @Override
    public User save(User user) {
        return userMapper.toDomain(userJpaRepository
                .save(userMapper.toEntity(user)));
    }

    @Override
    public User findById(Long id) {
        return userJpaRepository.findById(id).map(userMapper::toDomain).orElse(null);
    }

    @Override
    public List<User> findAll() {
        return userMapper.toDomainList(userJpaRepository.findAll());
    }

    @Override
    public User update(User user) {
        return userMapper.toDomain(userJpaRepository
                .save(userMapper.toEntity(user)));
    }

    @Override
    public boolean deleteById(Long id) {
        if (userJpaRepository.existsById(id)) {
            userJpaRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
