package genre.facade;

import genre.control.GenreController;
import genre.control.GenreController;
import genre.converter.dto.GenreDto;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

/**
 * @author Cazacu Arina
 */

@Stateless
public class GenreFacade {

    @EJB
    private GenreController genreController;

    public List<GenreDto> getAllGenres(){
        return this.genreController.getAllGenres();
    }
}
