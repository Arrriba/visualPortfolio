package user.control;

import user.converter.UserConverter;
import user.converter.WishlistConverter;
import user.converter.dto.UserDto;
import user.converter.dto.WishlistDto;
import user.dao.UserDao;
import user.entity.WishlistEntity;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class UserController {

    @EJB
    private UserDao userDao;

    @EJB
    private UserConverter userConverter;

    @EJB
    private WishlistConverter wishlistConverter;
    /**
     * Converts the user entities from dao to dto
     * @return <list>UserDto</list>
     */
    public List<UserDto> getAllUsers(){
        return this.userDao.getAllUsers()
                .stream()
                .map(this.userConverter::convertUserEntityToUserDto)
                .collect(Collectors.toList());
    }


    public List<WishlistDto> getAllWishlist(){
        return this.userDao.getAllWishlist()
                .stream()
                .map(this.wishlistConverter::convertWishlistEntityToWishlistDto)
                .collect(Collectors.toList());
    }

    /**
     * Converts the user dto to entity
     * Calls the persistUser method from dao using the converted entity as param
     * @param userDto used in the conversion
     */
    public void createUser(UserDto userDto){
        this.userDao.persistUser(this.userConverter.convertUserDtoToUserEntity(userDto));
    }

    public UserDto getUserByEmail(String email){
        return this.userConverter.convertUserEntityToUserDto(this.userDao.getUserByEmail(email));
    }

    public UserDto getUserById(Long email){
        return this.userConverter.convertUserEntityToUserDto(this.userDao.getUserById(email));
    }

    public void addToWishlist(WishlistDto wishlistDto){
        this.userDao.persistWishlist(this.wishlistConverter.convertWishlistDtoToWishlistEntity((wishlistDto)));
    }

    public void removeFromWishlist(WishlistDto wishlistDto){
        this.userDao.removeFromWishlist(this.wishlistConverter.convertWishlistDtoToWishlistEntity((wishlistDto)));
    }

    public boolean isInWishlist(WishlistDto wishlistDto){
        return this.userDao.isInWishlist(this.wishlistConverter.convertWishlistDtoToWishlistEntity(wishlistDto));
    }

//    public List<String> getAllEmails(){
//        return this.userDao.getAllEmails();
//    }
}
