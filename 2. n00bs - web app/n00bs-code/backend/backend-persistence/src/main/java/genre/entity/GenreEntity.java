package genre.entity;

import utils.BaseEntity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "genres")
@NamedQueries(
        {
                @NamedQuery(name = GenreEntity.GET_ALL_GENRES, query = "Select genre from GenreEntity genre")
        }
)

public class GenreEntity extends BaseEntity<Long> {
    public static final String GET_ALL_GENRES = "GenreEntity.getAllGenres";

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;


    public GenreEntity(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public GenreEntity() {
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
    public String toString(){
        return "GenreEntity{" +
                "name='" + name + '\'' +
                ", id=" + id +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GenreEntity that = (GenreEntity) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(id, that.id) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, id);
    }

}
