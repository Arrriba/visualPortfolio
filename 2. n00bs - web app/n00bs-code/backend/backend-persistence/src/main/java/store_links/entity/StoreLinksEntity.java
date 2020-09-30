package store_links.entity;


import utils.BaseEntity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "store_links")

@NamedQueries(
        {
                @NamedQuery(name = StoreLinksEntity.GET_BY_ID, query = "Select store_links from StoreLinksEntity store_links where store_links.id_game = :" + StoreLinksEntity.ID)

        }
)
public class StoreLinksEntity {

    public static final String ID = "id_game";
    public static final String GET_BY_ID = "StoreLinksEntity.getById";
    @Id
    @Column(name = "id_game")
    private Long id_game;

    @Column(name = "domain_name")
    private String domain_name;

    @Column(name = "link")
    private String link;

    public StoreLinksEntity() {
    }

    public StoreLinksEntity(Long id_game, String domain_name, String link) {
        this.id_game = id_game;
        this.domain_name = domain_name;
        this.link = link;
    }

    public Long getId_game() {
        return id_game;
    }

    public void setId_game(Long id_game) {
        this.id_game = id_game;
    }

    public String getDomain_name() {
        return domain_name;
    }

    public void setDomain_name(String domain_name) {
        this.domain_name = domain_name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StoreLinksEntity that = (StoreLinksEntity) o;
        return Objects.equals(id_game, that.id_game) &&
                Objects.equals(domain_name, that.domain_name) &&
                Objects.equals(link, that.link);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_game, domain_name, link);
    }

    @Override
    public String toString() {
        return "StoreLinksEntity{" +
                ID + "_game=" + id_game +
                ", domain_name='" + domain_name + '\'' +
                ", link='" + link + '\'' +
                '}';
    }
}
