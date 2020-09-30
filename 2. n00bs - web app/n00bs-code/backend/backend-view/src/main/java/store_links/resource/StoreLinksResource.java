package store_links.resource;


import game.converter.dto.IdDto;
import store_links.facade.StoreLinksFacade;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Stateless
@Path("/store_links")
public class StoreLinksResource {

    @EJB
    private StoreLinksFacade storeLinksFacade;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response getById(IdDto idDto){
        return Response.ok(this.storeLinksFacade.getById(idDto)).build();
    }
}
