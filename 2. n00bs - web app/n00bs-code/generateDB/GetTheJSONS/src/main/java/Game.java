import java.util.ArrayList;

public class Game {

    //(id)
    private Long id;
    //(id,url)
    private Pair<Long, String> cover;
    //number is seconds of time
    private String first_release_date;
    //[(idGenre,name)...]
    private ArrayList<Pair<Long, String>> genres;
    //[(id?,(idCompany,name))...]
    private ArrayList<Pair<Long, Pair<Long, String>>> involved_companies;
    //name
    private String name;
    //summary
    private String summary;
    //[(idPlatform,name)...]
    private ArrayList<Pair<Long, String>> platforms;

    public Game(Pair<Long, String> cover, String first_release_date, ArrayList<Pair<Long, String>> genres, ArrayList<Pair<Long, Pair<Long, String>>> involved_companies, String name, String summary, ArrayList<Pair<Long, String>> platforms) {
        this.cover = cover;
        this.first_release_date = first_release_date;
        this.genres = genres;
        this.involved_companies = involved_companies;
        this.name = name;
        this.summary=summary;
        this.platforms = platforms;
    }

    public Game() {
    }

    public Long getId(){ return id; }

    public Pair<Long, String> getCover() {
        return cover;
    }

    public String getFirst_release_date() {
        return first_release_date;
    }

    public ArrayList<Pair<Long, String>> getGenres() {
        return genres;
    }

    public ArrayList<Pair<Long, Pair<Long, String>>> getInvolved_companies() {
        return involved_companies;
    }

    public String getName() {
        return name;
    }

    public String getSummary(){ return summary; };

    public ArrayList<Pair<Long, String>> getPlatforms() {
        return platforms;
    }

    public void setId(Long id){ this.id = id; }

    public void setCover(Pair<Long, String> cover) { this.cover = cover; }

    public void setFirst_release_date(String first_release_date) {
        this.first_release_date = first_release_date;
    }

    public void setGenres(ArrayList<Pair<Long, String>> genres) {
        this.genres = genres;
    }

    public void setInvolved_companies(ArrayList<Pair<Long, Pair<Long, String>>> involved_companies) {
        this.involved_companies = involved_companies;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSummary(String summary) { this.summary= summary; }

    public void setPlatforms(ArrayList<Pair<Long, String>> platforms) {
        this.platforms = platforms;
    }

    @Override
    public String toString() {
        String result = "{\n";
        result += " id: " + id + "\n";
        result += "  name: " + name + "\n";
        result += " summary: " + summary + "\n";
        result += "  release date: " + first_release_date + "\n";

        String genrePartial = "  genres: ";
        for (Pair<Long, String> genre : genres) {
            genrePartial += genre.getValue() + ", ";
        }
        genrePartial = genrePartial.substring(0, genrePartial.length() - 2);
        result += genrePartial + "\n";

        String platformPartial = "  platforms: ";
        for (Pair<Long,String> platform: platforms){
            platformPartial += platform.getValue() + ", ";
        }
        platformPartial = platformPartial.substring(0, platformPartial.length() - 2);
        result += platformPartial + "\n";

        String companyPartial = "  companies: ";
        for(Pair<Long,Pair<Long,String>> entry : involved_companies){
            companyPartial += entry.getValue().getValue() + ", ";
        }
        companyPartial = companyPartial.substring(0, companyPartial.length() -2);
        result += companyPartial + "\n";

        result += "  cover: " + cover.getValue() + "\n";

        result += "}";

        return result;
    }
}


