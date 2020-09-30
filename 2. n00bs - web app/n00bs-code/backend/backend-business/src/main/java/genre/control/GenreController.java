package genre.control;

import genre.converter.GenreConverter;
import genre.converter.dto.GenreDto;
import genre.dao.GenreDao;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
public class GenreController {

    @EJB
    private GenreDao genreDao;

    @EJB
    private GenreConverter genreConverter;

    public List<GenreDto> getAllGenres(){
        return this.genreDao.getAllGenres()
                .stream()
                .map(this.genreConverter::convertGenreEntityToGenreDto)
                .collect(Collectors.toList());
    }
}
