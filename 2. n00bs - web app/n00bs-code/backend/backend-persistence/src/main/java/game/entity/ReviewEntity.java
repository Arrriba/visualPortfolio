package game.entity;

import javax.persistence.*;

/**
 * @author Cazacu Arina
 */

@Entity
@Table(name = "comment_rating")
@NamedQueries(
        {
                @NamedQuery(name = ReviewEntity.GET_GAME_RATINGS, query = "Select review.rating from ReviewEntity review where review.id_game = :id"),
                @NamedQuery(name = ReviewEntity.GET_ALL_REVIEWS, query = "Select review from ReviewEntity review"),
                @NamedQuery(name = ReviewEntity.GET_GAME_REVIEWS, query = "Select review from ReviewEntity review join UserEntity user on user.id=review.id_user where review.id_game = :id"),
                @NamedQuery(name = ReviewEntity.GET_USER_REVIEW, query = "Select review from ReviewEntity review join UserEntity user on user.id=review.id_user where review.id_game = :id_game and review.id_user = :id_user"),
                @NamedQuery(name = ReviewEntity.GET_USER_REVIEWS, query = "Select review from ReviewEntity review where review.id_user = :" + ReviewEntity.ID)

        }
)
public class ReviewEntity {
    //extends BaseEntity<Long> {

    //Query names
    //public static final String GET_ALL_WISHLIST = "WishlistEntity.getAllWishlist";
//    public static final String GET_USER_BY_EMAIL = "UserEntity.getUserByEmail";
    public static final String GET_GAME_RATINGS = "ReviewEntity.getGameRatings";
    public static final String GET_ALL_REVIEWS = "ReviewEntity.getAllReviews";
    public static final String GET_GAME_REVIEWS = "ReviewEntity.getGameReviews";
    public static final String GET_USER_REVIEW = "ReviewEntity.getUserReview";
    public static final String ID = "id";
    public static final String GET_USER_REVIEWS = "ReviewEntity.getUserReviews";

    //public static final String GET_GAME_VIEW_REVIEWS = "ReviewEntity.getGameViewReviews";

    //public static final String GET_ALL_REVIEWS

    @Id
    @Column(name="id_user", nullable = false)
    private Long id_user;

    @Id
    @Column(name = "id_game", nullable = false)
    private Long id_game;

    @Column(name = "comment")
    private String comment;

    @Column(name = "rating", nullable = false)
    private double rating;

//    @Column(name="username")
//    private String username;


    public ReviewEntity(Long id_user, Long id_game, String comment, double rating) {
        this.id_user = id_user;
        this.id_game = id_game;
        this.comment = comment;
        this.rating = rating;
    }

//    public ReviewEntity(Long id_user, Long id_game, String comment, double rating, String username) {
//        this.id_user = id_user;
//        this.id_game = id_game;
//        this.comment = comment;
//        this.rating = rating;
//        this.username = username;
//    }

    public ReviewEntity(){

    }

    public Long getId_user() {
        return id_user;
    }

    public void setId_user(Long id_user) {
        this.id_user = id_user;
    }

    public Long getId_game() {
        return id_game;
    }

    public void setId_game(Long id_game) {
        this.id_game = id_game;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
}
