package game.facade;

import game.control.GameController;
import game.converter.dto.*;
import game.converter.dto.CompleteGameDto;
import game.converter.dto.IdDto;
import genre.converter.dto.GenreIdsListDto;
import user.converter.dto.UserIdDto;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class GameFacade {

    @EJB
    private GameController gameController;

    public List<ViewGameDto> getAllGames(){
        return this.gameController.getAllGames();
    }

    public List<ViewGameDto> getAllGamesWishlist(UserIdDto userIdDto){
        return this.gameController.getAllGamesWishlist(userIdDto.getId());
    }

    public List<ViewGameDto> getGamesByGenres(GenreIdsListDto genreIdsListDto){
        return this.gameController.getGamesByGenres(genreIdsListDto);
    }

    public void addReview(ReviewDto reviewDto){
        this.gameController.addReview(reviewDto);
    }

    public List<CompleteGameDto> getCompleteGameData(){
        return this.gameController.getCompleteGameData();
    }

    public List<ReviewDto> getGameReviews(IdGameDto idGameDto){
        //return this.gameController.getGameReviews(idGameDto.getId());
    	return this.gameController.getGameReviews(idGameDto.getId());

    }
    public CompleteGameDto getGameById(IdDto id){
        return this.gameController.getGameById(id);
	}
	
    public List<ReviewDto> getUserReview(UserReviewDto idGameDto){
        //return this.gameController.getGameReviews(idGameDto.getId());
        return this.gameController.getUserReview(idGameDto);

    }

    public List<ReviewDto> getUserReviews(IdGameDto idGameDto) {
        return this.gameController.getUserReviews(idGameDto);
    }
}
