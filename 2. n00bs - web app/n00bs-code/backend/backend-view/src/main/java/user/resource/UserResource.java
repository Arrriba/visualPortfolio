package user.resource;

import user.converter.dto.EmailDto;
import user.converter.dto.UserDto;
import user.converter.dto.UserIdDto;
import user.converter.dto.WishlistDto;
import user.facade.UserFacade;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
@Path("/user")
public class UserResource {

    @EJB
    private UserFacade userFacade;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers(){
        return Response
                .ok()
                .entity(this.userFacade.getAllUsers())
                .build();
    }

    @POST
    @Path("/getUserByEmail")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUserByEmail(EmailDto email) {
//        this.userFacade
//                .getUserByEmail(email.getEmail());
        try {
            return Response
                    .ok()
                    .entity(this.userFacade.getUserByEmail(email.getEmail()))
                    .build();
        }
        catch (Exception e){
            if(e.getCause() instanceof NoResultException)
                return Response
                    .status(404)
                    .build();
            else
                return Response
                        .status(500)
                        .build();
        }
    }


    @POST
    @Path("/persist")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createUser(UserDto userDto){
        this.userFacade
                .createUser(userDto);
        return Response
                .ok()
                .build();
    }

    @POST
    @Path("/wishlist/add")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addToWishlist(WishlistDto wishlistDto){
        this.userFacade
                .addToWishlist(wishlistDto);
        return Response
                .ok()
                .build();
    }

    @POST
    @Path("/getUserById")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getUserById(UserIdDto wishlistDto){
        return Response
                .ok()
                .entity(this.userFacade.getUserById(wishlistDto))
                .build();
    }

    @POST
    @Path("/wishlist/remove")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeFromWishlist(WishlistDto wishlistDto){
        this.userFacade
                .removeFromWishlist(wishlistDto);
        return Response
                .ok()
                .build();
    }

    @POST
    @Path("/wishlist/exists")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response isInWishlist(WishlistDto wishlistDto){
        if(this.userFacade
                .isInWishlist(wishlistDto)) {
            return Response
                    .ok()
                    .build();
        }
        else{
            return Response
                    .status(404)
                    .build();
        }
    }
}
