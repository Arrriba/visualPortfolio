package category.resource;

import category.facade.CategoryFacade;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
@Path("/category")
public class CategoryResource {

    @EJB
    private CategoryFacade categoryFacade;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCategories(){
        return Response
                .status(Response.Status.OK)
                .entity(this.categoryFacade.getAllCategories())
                .build();
    }
}
