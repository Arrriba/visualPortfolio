package game.resource;

import game.converter.dto.IdDto;
import game.converter.dto.IdGameDto;
import game.converter.dto.ReviewDto;
import game.converter.dto.UserReviewDto;
import game.facade.GameFacade;
import genre.converter.dto.GenreDto;
import genre.converter.dto.GenreIdsListDto;
import user.converter.dto.UserIdDto;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
@Path("/game")
public class GameResource {

    @EJB
    private GameFacade gameFacade;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllGames(){
        return Response
                .status(Response.Status.OK)
                .entity(this.gameFacade.getAllGames())
                .build();
    }

    @POST
    @Path("/wishlist/all")
    @Produces(MediaType.APPLICATION_JSON)
    //@Consumes(MediaType.APPLICATION_JSON)
    public Response getUserWishlist(UserIdDto userIdDto){
        return Response
                .status(Response.Status.OK)
                .entity(this.gameFacade.getAllGamesWishlist(userIdDto))
                .build();
    }

    @POST
    @Path("/genres/filter")
    @Produces(MediaType.APPLICATION_JSON)
    //@Consumes(MediaType.APPLICATION_JSON)
    public Response getGamesByGenres(GenreIdsListDto genreIdsListDto){
        return Response
                .status(Response.Status.OK)
                .entity(this.gameFacade.getGamesByGenres(genreIdsListDto))
                .build();
    }

    @POST
    @Path("/review/add")
    @Produces(MediaType.APPLICATION_JSON)
    //@Consumes(MediaType.APPLICATION_JSON)
    public Response addReview(ReviewDto reviewDto){
        this.gameFacade.addReview(reviewDto);
        return Response
                .ok()
                .build();
    }

    @GET
    @Path("/detailed-games")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCompleteGameData(){
        return Response.ok(this.gameFacade.getCompleteGameData()).build();
    }

    @POST
    @Path("/detailed")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getGameById(IdDto id){
        return Response.ok(this.gameFacade.getGameById(id)).build();
    }

//    @POST
//    @Path("/review/all")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getAllGameReviews(IdGameDto idGameDto){
//        return Response
//                .status(Response.Status.OK)
//                .entity(this.gameFacade.getGameReviews(idGameDto))
//                .build();
//    }

    @POST
    @Path("/review/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllGameReviews(IdGameDto idGameDto){
        return Response
                .status(Response.Status.OK)
                .entity(this.gameFacade.getGameReviews(idGameDto))
                .build();
    }

    @POST
    @Path("/userReviews")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUserReviews(IdGameDto idGameDto){
        return Response
                .status(Response.Status.OK)
                .entity(this.gameFacade.getUserReviews(idGameDto))
                .build();
    }

    @POST
    @Path("/review/get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserReview(UserReviewDto idGameDto){
        return Response
                .status(Response.Status.OK)
                .entity(this.gameFacade.getUserReview(idGameDto))
                .build();
    }

}
