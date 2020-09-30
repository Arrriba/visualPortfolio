package store_links.dao;

import store_links.entity.StoreLinksEntity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class StoreLinksDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<StoreLinksEntity> getById(Long id){
        return this.entityManager.createNamedQuery(StoreLinksEntity.GET_BY_ID, StoreLinksEntity.class).setParameter(StoreLinksEntity.ID, id).getResultList();
    }

}
