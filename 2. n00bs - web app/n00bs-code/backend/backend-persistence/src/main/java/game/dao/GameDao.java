package game.dao;

import game.entity.GameEntity;
import game.entity.ReviewEntity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class GameDao {

    @PersistenceContext(unitName = "backend-persistence")
    private EntityManager entityManager;

    /**
     * Returns all games from the database
     * @return <list>GameEntity</list>
     */
    public List<GameEntity> getAllGames(){
        return this.entityManager
                .createNamedQuery(GameEntity.GET_ALL_GAMES, GameEntity.class)
                .getResultList();
    }

    public List<GameEntity> getAllGamesWishlist(Long id){
        return this.entityManager
                .createNamedQuery(GameEntity.GET_ALL_GAMES_WISHLIST, GameEntity.class)
                .setParameter("id",id)
                .getResultList();
    }

    public List<GameEntity> getGamesByGenres(List<Long> genreIdsListDto){
        return this.entityManager
                .createNamedQuery(GameEntity.GET_GAMES_BY_GENRES, GameEntity.class)
                .setParameter("list",genreIdsListDto)
                .getResultList();
    }

    public GameEntity getGameById(Long id){
        return this.entityManager
                .createNamedQuery(GameEntity.GET_GAME_BY_ID, GameEntity.class)
                .setParameter(GameEntity.ID, id)
                .getSingleResult();
    }
//    public List<GameEntity> getGameReviews(Long id){
//        return this.entityManager
//                .createNamedQuery(Game.GET_GAMES_BY_GENRES, GameEntity.class)
//                .setParameter("id",genreIdsListDto)
//                .getResultList();
//    }

    public List<ReviewEntity> getAllReviews(){
        return this.entityManager
                .createNamedQuery(ReviewEntity.GET_ALL_REVIEWS, ReviewEntity.class)
                .getResultList();
    }

    public List<ReviewEntity> getGameReviews(Long id){
        return this.entityManager
                .createNamedQuery(ReviewEntity.GET_GAME_REVIEWS, ReviewEntity.class)
                .setParameter("id",id)
                .getResultList();
    }

    public List<ReviewEntity> getUserReview(Long id_game,Long id_user){
        return this.entityManager
                .createNamedQuery(ReviewEntity.GET_USER_REVIEW, ReviewEntity.class)
                .setParameter("id_game",id_game)
                .setParameter("id_user",id_user)
                .getResultList();
    }

    public List<ReviewEntity> getUserReviews(Long id){
        return this.entityManager
                .createNamedQuery(ReviewEntity.GET_USER_REVIEWS, ReviewEntity.class)
                .setParameter(ReviewEntity.ID, id)
                .getResultList();
    }

    public void persistReview(ReviewEntity reviewEntity){
        this.entityManager.persist(reviewEntity);
        GameEntity gameEntity = entityManager.find(GameEntity.class, reviewEntity.getId_game());
        if (gameEntity != null) {
            List<Double> lst = this.entityManager
                    .createNamedQuery(ReviewEntity.GET_GAME_RATINGS, Double.class)
                    .setParameter("id",reviewEntity.getId_game())
                    .getResultList();
            double sum = 0;
            for(int i=0;i<lst.size();i++){
                sum+=lst.get(i);
            }
            double average = sum/lst.size();
            //entityManager.getTransaction().begin();
            gameEntity.setRating(average);
            //entityManager.getTransaction().commit();

        }
    }
}
