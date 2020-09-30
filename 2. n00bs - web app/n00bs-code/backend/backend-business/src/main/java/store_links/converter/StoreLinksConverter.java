package store_links.converter;

import store_links.converter.dto.StoreLinksDto;
import store_links.entity.StoreLinksEntity;

import javax.ejb.Stateless;

@Stateless
public class StoreLinksConverter {
    public StoreLinksDto convertStoreLinksEntityToStoreLinksDto(StoreLinksEntity storeLinksEntity){
        return new StoreLinksDto(
                storeLinksEntity.getId_game(),
                storeLinksEntity.getDomain_name(),
                storeLinksEntity.getLink()
        );
    }
}
