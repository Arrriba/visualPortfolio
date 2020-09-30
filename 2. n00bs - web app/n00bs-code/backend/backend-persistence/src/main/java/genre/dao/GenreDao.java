package genre.dao;

import genre.entity.GenreEntity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class GenreDao {
    @PersistenceContext(unitName = "backend-persistence")
    private EntityManager entityManager;

    /**
     * Returns all games from the database
     * @return <list>GenreEntity</list>
     */
    public List<GenreEntity> getAllGenres(){
        return this.entityManager
                .createNamedQuery(GenreEntity.GET_ALL_GENRES, GenreEntity.class)
                .getResultList();
    }
}
