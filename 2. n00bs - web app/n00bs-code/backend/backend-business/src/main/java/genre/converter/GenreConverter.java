package genre.converter;
import genre.converter.dto.GenreDto;
import genre.entity.GenreEntity;

import javax.ejb.Stateless;
@Stateless
public class GenreConverter {
    public GenreDto convertGenreEntityToGenreDto(GenreEntity genreEntity){
        return new GenreDto(
                genreEntity.getId(),
                genreEntity.getName()
        );
    }
}
