package store_links.control;

import game.converter.dto.IdDto;
import store_links.converter.StoreLinksConverter;
import store_links.converter.dto.StoreLinksDto;
import store_links.dao.StoreLinksDao;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
public class StoreLinksController {

    @EJB
    private StoreLinksDao storeLinksDao;

    @EJB
    private StoreLinksConverter storeLinksConverter;

    public List<StoreLinksDto> getById(IdDto idDto){
            return this.storeLinksDao.getById(idDto.getId())
                    .stream()
                    .map(this.storeLinksConverter::convertStoreLinksEntityToStoreLinksDto)
                    .collect(Collectors.toList());

    }

}
