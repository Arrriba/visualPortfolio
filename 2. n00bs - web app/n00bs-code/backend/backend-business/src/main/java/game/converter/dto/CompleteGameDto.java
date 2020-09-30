package game.converter.dto;

import company.entity.CompanyEntity;
import genre.entity.GenreEntity;
import platform.entity.PlatformEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * @author Bungardean Tudor-Ionut
 */
public class CompleteGameDto {

    private Long id;

    private String name;

    private String release_date;

    private String summary;

    private Double rating;

    private String cover_url;

    private List<CompanyEntity> companyEntityList = new ArrayList<>();

    private List<GenreEntity> genreEntityList = new ArrayList<>();

    private List<PlatformEntity> platformEntityList = new ArrayList<>();

    public CompleteGameDto() {
    }

    public CompleteGameDto(Long id, String name, String release_date, String summary, Double rating, String cover_url, List<CompanyEntity> companyEntityList, List<GenreEntity> genreEntityList, List<PlatformEntity> platformEntityList) {
        this.id = id;
        this.name = name;
        this.release_date = release_date;
        this.summary = summary;
        this.rating = rating;
        this.cover_url = cover_url;
        this.companyEntityList = companyEntityList;
        this.genreEntityList = genreEntityList;
        this.platformEntityList = platformEntityList;
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

    public List<CompanyEntity> getCompanyEntityList() {
        return companyEntityList;
    }

    public void setCompanyEntityList(List<CompanyEntity> companyEntityList) {
        this.companyEntityList = companyEntityList;
    }

    public List<GenreEntity> getGenreEntityList() {
        return genreEntityList;
    }

    public void setGenreEntityList(List<GenreEntity> genreEntityList) {
        this.genreEntityList = genreEntityList;
    }

    public List<PlatformEntity> getPlatformEntityList() {
        return platformEntityList;
    }

    public void setPlatformEntityList(List<PlatformEntity> platformEntityList) {
        this.platformEntityList = platformEntityList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CompleteGameDto that = (CompleteGameDto) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(release_date, that.release_date) &&
                Objects.equals(summary, that.summary) &&
                Objects.equals(rating, that.rating) &&
                Objects.equals(cover_url, that.cover_url) &&
                Objects.equals(companyEntityList, that.companyEntityList) &&
                Objects.equals(genreEntityList, that.genreEntityList) &&
                Objects.equals(platformEntityList, that.platformEntityList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, release_date, summary, rating, cover_url, companyEntityList, genreEntityList, platformEntityList);
    }

    @Override
    public String toString() {
        return "CompleteGameDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", release_date='" + release_date + '\'' +
                ", summary='" + summary + '\'' +
                ", rating=" + rating +
                ", cover_url='" + cover_url + '\'' +
                ", companyEntityList=" + companyEntityList +
                ", genreEntityList=" + genreEntityList +
                ", platformEntityList=" + platformEntityList +
                '}';
    }
}
