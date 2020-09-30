package store_links.converter.dto;

import java.util.Objects;

public class StoreLinksDto {

    private Long id_game;

    private String domain_name;

    private String link;

    public StoreLinksDto() {
    }

    public StoreLinksDto(Long id_game, String domain_name, String link) {
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
        StoreLinksDto that = (StoreLinksDto) o;
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
        return "StoreLinksDto{" +
                "id_game=" + id_game +
                ", domain_name='" + domain_name + '\'' +
                ", link='" + link + '\'' +
                '}';
    }
}
