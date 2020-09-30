package category.dao;

import category.entity.CategoryEntity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class CategoryDao {

    @PersistenceContext(unitName = "backend-persistence")
    private EntityManager entityManager;

    /**
     * Returns all categories from the database
     * @return <list>CategoryEntity</list>
     */
    public List<CategoryEntity> getAllCategories(){
        return this.entityManager
                .createNamedQuery(CategoryEntity.GET_ALL_CATEGORIES, CategoryEntity.class)
                .getResultList();
    }
}
