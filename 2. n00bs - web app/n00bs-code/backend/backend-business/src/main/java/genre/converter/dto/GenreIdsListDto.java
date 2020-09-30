package genre.converter.dto;

import java.util.List;

public class GenreIdsListDto {
    private List<Long> genreIds;

    public GenreIdsListDto(){

    }

    public GenreIdsListDto(List<Long> genreIds) {
        this.genreIds = genreIds;
    }

    public List<Long> getGenreIds() {
        return genreIds;
    }

    public void setGenreIds(List<Long> genreIds) {
        this.genreIds = genreIds;
    }
}
