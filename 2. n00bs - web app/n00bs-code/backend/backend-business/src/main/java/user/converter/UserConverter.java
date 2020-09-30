package user.converter;

import user.converter.dto.UserDto;
import user.entity.UserEntity;

import javax.ejb.Stateless;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class UserConverter {

    /**
     * Converts the user entity to dto
     * @param userEntity used for the UserDto
     * @return new UserDto
     */
    public UserDto convertUserEntityToUserDto(UserEntity userEntity){
        return new UserDto(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getEmail(),
                userEntity.getUid()
        );
    }


    /**
     * Converts the user dto to entity
     * @param userDto user for the UserEntity
     * @return new UserEntity
     */
    public UserEntity convertUserDtoToUserEntity(UserDto userDto){
        return new UserEntity(
                userDto.getUsername(),
                userDto.getEmail(),
                userDto.getUid()
        );
    }


}
