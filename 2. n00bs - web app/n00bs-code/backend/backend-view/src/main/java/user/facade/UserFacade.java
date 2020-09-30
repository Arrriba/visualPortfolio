package user.facade;

import user.control.UserController;
import user.converter.dto.UserDto;
import user.converter.dto.UserIdDto;
import user.converter.dto.WishlistDto;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class UserFacade {

    @EJB
    private UserController userController;

    public List<UserDto> getAllUsers(){
        return this.userController.getAllUsers();
    }

    public void createUser(UserDto userDto){
        this.userController.createUser(userDto);
    }

    public UserDto getUserByEmail(String email){
        return this.userController.getUserByEmail(email);
    }

    public UserDto getUserById(UserIdDto email){
        return this.userController.getUserById(email.getId());
    }

    public void addToWishlist(WishlistDto wishlistDto){
        this.userController.addToWishlist(wishlistDto);
    }

    public void removeFromWishlist(WishlistDto wishlistDto){
        this.userController.removeFromWishlist(wishlistDto);
    }

    public List<WishlistDto> getAllWishlist(){
        return this.userController.getAllWishlist();
    }

    public boolean isInWishlist(WishlistDto wishlistDto){
        return this.userController.getAllWishlist().contains(wishlistDto);
    }

    //public List<WishlistDto> getUserWishlist(){
    //    return this.userController.getAllUsers();
    //}


}
