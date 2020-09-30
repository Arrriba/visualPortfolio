package game.entity;

import utils.BaseEntity;

import javax.persistence.*;
import java.util.Objects;

/**
 * @author Cazacu Arina
 */

@Entity
@Table(name = "games_genres")
@NamedQueries(
        {
                //@NamedQuery(name = WishlistEntity.GET_ALL_WISHLIST, query = "Select wishlist from WishlistEntity wishlist"),
        }
)
public class GamesGenresEntity {
    //extends BaseEntity<Long> {

    //Query names
    //public static final String GET_ALL_WISHLIST = "WishlistEntity.getAllWishlist";
//    public static final String GET_USER_BY_EMAIL = "UserEntity.getUserByEmail";

    @Id
    @Column(name="game_id", nullable = false)
    private Long game_id;

    @Id
    @Column(name = "genre_id", nullable = false)
    private Long genre_id;



    public GamesGenresEntity(Long game_id, Long genre_id) {
        this.genre_id = genre_id;
        this.game_id = game_id;
    }

    public GamesGenresEntity() {

    }

    public Long getGame_id() {
        return game_id;
    }

    public void setGame_id(Long game_id) {
        this.game_id = game_id;
    }

    public Long getGenre_id() {
        return genre_id;
    }

    public void setGenre_id(Long genre_id) {
        this.genre_id = genre_id;
    }


//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        WishlistEntity that = (WishlistEntity) o;
//        return Objects.equals(id_game, that.getId_game()) &&
//                Objects.equals(id_user, that.getId_user());
//    }
//
//    @Override
//    public int hashCode() {
//        return Objects.hash(id_game,id_user);
//    }
//
//    @Override
//    public String toString() {
//        return "wishlistEnt{" +
//                "idg='" + id_game + '\'' +
//                "IDU='" + id_user + '\'' +
//                '}';
//    }


}
