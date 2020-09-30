package user.dao;

import user.entity.UserEntity;
import user.entity.WishlistEntity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class UserDao {

    @PersistenceContext(unitName = "backend-persistence")
    private EntityManager entityManager;

    /**
     * Returns all users from the database
     * @return <list>UserEntity</list>
     */
    public List<UserEntity> getAllUsers(){
        try {
            return this.entityManager
                    .createNamedQuery(UserEntity.GET_ALL_USERS, UserEntity.class)
                    .getResultList();
        }
        catch(NoResultException e){
            throw new NoResultException();
        }
    }

    /**
     * Persists the user into the database
     * @param userEntity persisted into the database
     */
    public void persistUser(UserEntity userEntity){
        this.entityManager.persist(userEntity);
    }

    public UserEntity getUserByEmail(String email){
        return this.entityManager
                .createNamedQuery(UserEntity.GET_USER_BY_EMAIL, UserEntity.class)
                .setParameter("email",email)
                .getSingleResult();
    }

    public UserEntity getUserById(Long email){
        return this.entityManager
                .createNamedQuery(UserEntity.GET_USER_BY_ID, UserEntity.class)
                .setParameter("id",email)
                .getSingleResult();
    }

//    public List<String> getAllEmails(){
//        return this.entityManager
//                .createNamedQuery(UserEntity.GET_ALL_EMAILS, String.class)
//                .getResultList();
//    }

    public void persistWishlist(WishlistEntity wishlistEntity){
        this.entityManager.persist(wishlistEntity);
    }

    public void removeFromWishlist(WishlistEntity wishlistEntity){
        WishlistEntity we = this.entityManager.merge(wishlistEntity);
        this.entityManager.remove(we);
    }

    public boolean isInWishlist(WishlistEntity wishlistEntity){
        return this.entityManager
                .contains(wishlistEntity);
    }

    public List<WishlistEntity> getAllWishlist(){
        return this.entityManager
                .createNamedQuery(WishlistEntity.GET_ALL_WISHLIST, WishlistEntity.class)
                .getResultList();
    }
}