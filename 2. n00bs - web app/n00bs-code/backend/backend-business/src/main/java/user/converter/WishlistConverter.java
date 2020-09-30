package user.converter;

import user.converter.dto.UserDto;
import user.converter.dto.WishlistDto;
import user.entity.UserEntity;
import user.entity.WishlistEntity;

import javax.ejb.Stateless;

@Stateless
public class WishlistConverter {
    public WishlistEntity convertWishlistDtoToWishlistEntity(WishlistDto wishlistDto){
        return new WishlistEntity(
                wishlistDto.getId_user(),
                wishlistDto.getId_game()
        );
    }

    public WishlistDto convertWishlistEntityToWishlistDto(WishlistEntity wishlistEntity){
        return new WishlistDto(
                wishlistEntity.getId_user(),
                wishlistEntity.getId_game()
        );
    }


}
