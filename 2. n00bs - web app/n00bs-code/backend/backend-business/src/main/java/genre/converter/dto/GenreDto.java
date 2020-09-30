package genre.converter.dto;

import java.util.Objects;

public class GenreDto {

    private Long id;

    private String name;

    public GenreDto() {
    }

    public GenreDto(Long id, String name) {
        this.name = name;
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GenreDto that = (GenreDto) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, id);
    }

    @Override
    public String toString() {
        return "GenreDto{" +
                "name='" + name + '\'' +
                ", id='" + id +
                '}';
    }
}
