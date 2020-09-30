package genre.resource;

import genre.facade.GenreFacade;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Cazacu Arina
 */

@Stateless
@Path("/genre")
public class GenreResource {

    @EJB
    private GenreFacade genreFacade;

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllGenres(){
        return Response
                .status(Response.Status.OK)
                .entity(this.genreFacade.getAllGenres())
                .build();
    }
}
