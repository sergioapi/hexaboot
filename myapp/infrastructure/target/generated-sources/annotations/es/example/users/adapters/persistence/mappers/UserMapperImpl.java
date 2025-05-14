package es.example.users.adapters.persistence.mappers;

import es.example.users.adapters.persistence.entities.UserEntity;
import es.example.users.models.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-14T19:25:47+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserEntity toEntity(User user) {
        if ( user == null ) {
            return null;
        }

        UserEntity userEntity = new UserEntity();

        userEntity.setId( user.getId() );
        userEntity.setText( user.getText() );

        return userEntity;
    }

    @Override
    public User toDomain(UserEntity userEntity) {
        if ( userEntity == null ) {
            return null;
        }

        User user = new User();

        user.setId( userEntity.getId() );
        user.setText( userEntity.getText() );

        return user;
    }

    @Override
    public List<User> toDomainList(List<UserEntity> userEntities) {
        if ( userEntities == null ) {
            return null;
        }

        List<User> list = new ArrayList<User>( userEntities.size() );
        for ( UserEntity userEntity : userEntities ) {
            list.add( toDomain( userEntity ) );
        }

        return list;
    }
}
