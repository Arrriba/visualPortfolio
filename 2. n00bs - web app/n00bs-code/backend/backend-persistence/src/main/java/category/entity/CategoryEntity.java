package category.entity;

import game.entity.GameEntity;
import utils.BaseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * @author Bungardean Tudor-Ionut
 */

@Entity
@Table(name = "categories")
@NamedQueries(
        {
                @NamedQuery(name = CategoryEntity.GET_ALL_CATEGORIES, query = "Select category from CategoryEntity category")
        }
)
public class CategoryEntity extends BaseEntity<Long> {

    public static final String GET_ALL_CATEGORIES = "getAllCategories";

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinTable(name = "games_categories",
            joinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name = "game_id", referencedColumnName = "id", nullable = false)
    )
    private List<GameEntity> gameEntityList = new ArrayList<>();

    public CategoryEntity() {
    }

    public CategoryEntity(String name, List<GameEntity> gameEntityList) {
        this.name = name;
        this.gameEntityList = gameEntityList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<GameEntity> getGameEntityList() {
        return gameEntityList;
    }

    public void setGameEntityList(List<GameEntity> gameEntityList) {
        this.gameEntityList = gameEntityList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryEntity that = (CategoryEntity) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(gameEntityList, that.gameEntityList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, gameEntityList);
    }

    @Override
    public String toString() {
        return "CategoryEntity{" +
                "name='" + name + '\'' +
                ", gameEntityList=" + gameEntityList +
                '}';
    }
}
