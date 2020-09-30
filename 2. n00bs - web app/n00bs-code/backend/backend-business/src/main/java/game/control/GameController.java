package game.control;

import game.converter.GameConverter;
import game.converter.dto.*;
import game.dao.GameDao;
import genre.converter.dto.GenreIdsListDto;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class GameController {

    @EJB
    private GameDao gameDao;

    @EJB
    private GameConverter gameConverter;

    /**
     * Converts the game entities from dao to dto
     * @return <list>ViewGameDto</list>
     */
    public List<ViewGameDto> getAllGames(){
        return this.gameDao.getAllGames()
                .stream()
                .map(this.gameConverter::convertGameEntityToViewGameDto)
                .collect(Collectors.toList());
    }

    public List<ViewGameDto> getAllGamesWishlist(Long id){
        return this.gameDao.getAllGamesWishlist(id)
                .stream()
                .map(this.gameConverter::convertGameEntityToViewGameDto)
                .collect(Collectors.toList());
    }

    public List<ViewGameDto> getGamesByGenres(GenreIdsListDto genreIdsListDto){
        return this.gameDao.getGamesByGenres(genreIdsListDto.getGenreIds())
                .stream()
                .map(this.gameConverter::convertGameEntityToViewGameDto)
                .collect(Collectors.toList());
    }

    public void addReview(ReviewDto reviewDto){
            this.gameDao.persistReview(this.gameConverter.convertReviewDtoToReviewEntity(reviewDto));
    }

    public List<ReviewDto> getAllReviews(){
        return this.gameDao.getAllReviews()
        	.stream()
                .map(this.gameConverter::convertReviewEntityToReviewDto)
                .collect(Collectors.toList());
    }
    
    public List<CompleteGameDto> getCompleteGameData(){
        return this.gameDao.getAllGames()
                .stream()
                .map(this.gameConverter::convertGameEntityToCompleteGameDto)
                .collect(Collectors.toList());
    }

    public CompleteGameDto getGameById(IdDto id){
        return this.gameConverter
                .convertGameEntityToCompleteGameDto(this.gameDao.getGameById(id.getId()));
        //Long id = l.get(0).getId_user();
    }

    public List<ReviewDto> getGameReviews(Long id){
        return this.gameDao.getGameReviews(id)
                .stream()
                .map(this.gameConverter::convertReviewEntityToReviewDto)
                .collect(Collectors.toList());
        //Long id = l.get(0).getId_user();
    }

    public List<ReviewDto> getUserReview(UserReviewDto id){
        return this.gameDao.getUserReview(id.getId_game(),id.getId_user())
                .stream()
                .map(this.gameConverter::convertReviewEntityToReviewDto)
                .collect(Collectors.toList());
        //Long id = l.get(0).getId_user();
    }

    public List<ReviewDto> getUserReviews(IdGameDto idGameDto) {
        return this.gameDao.getUserReviews(idGameDto.getId())
                .stream()
                .map(this.gameConverter::convertReviewEntityToReviewDto)
                .collect(Collectors.toList());
    }
}
