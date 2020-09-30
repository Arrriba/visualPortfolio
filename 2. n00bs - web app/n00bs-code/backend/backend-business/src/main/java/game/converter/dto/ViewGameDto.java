package game.converter.dto;

import java.util.Objects;

/**
 * @author Bungardean Tudor-Ionut
 */
public class ViewGameDto {

    private Long id;

    private String name;

    private String release_date;

    private String summary;

    private Double rating;

    private String cover_url;

    public ViewGameDto() {
    }

    public ViewGameDto(Long id, String name, String release_date, String summary, Double rating, String cover_url) {
        this.id = id;
        this.name = name;
        this.release_date = release_date;
        this.summary = summary;
        this.rating = rating;
        this.cover_url = cover_url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getCover_url() {
        return cover_url;
    }

    public void setCover_url(String cover_url) {
        this.cover_url = cover_url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ViewGameDto that = (ViewGameDto) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(release_date, that.release_date) &&
                Objects.equals(summary, that.summary) &&
                Objects.equals(id, that.id) &&
                Objects.equals(cover_url, that.cover_url) &&
                Objects.equals(rating, that.rating);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id,name, release_date, summary, rating, cover_url);
    }

    @Override
    public String toString() {
        return "ViewGameDto{" +
                "id='" + id + '\'' +

                "name='" + name + '\'' +
                ", release_date='" + release_date + '\'' +
                ", summary='" + summary + '\'' +
                ", rating=" + rating +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
