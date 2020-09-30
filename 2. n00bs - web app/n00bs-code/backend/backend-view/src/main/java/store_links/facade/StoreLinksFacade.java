package store_links.facade;


import game.converter.dto.IdDto;
import store_links.control.StoreLinksController;
import store_links.converter.dto.StoreLinksDto;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

@Stateless
public class StoreLinksFacade {

    @EJB
    private StoreLinksController storeLinksController;

    public List<StoreLinksDto> getById(IdDto idDto){
        return this.storeLinksController.getById(idDto);
    }

}
