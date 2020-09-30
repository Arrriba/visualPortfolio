import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Locale;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

//DIN JSON SUNT LUATE TOATE CAMPURILE IN AFARA DE id-ul (din DB-ul original) jocurilor
public class Main {

    @SuppressWarnings("unchecked")
    public static void main(String[] args) {
        //List with all the parsed games
        ArrayList<Game> games = new ArrayList<>();

        //JSON parser object to parse read file
        JSONParser jsonParser = new JSONParser();

        try (FileReader reader = new FileReader("all.json")) {
            //Read JSON file
            Object obj = jsonParser.parse(reader);

            JSONArray gamesJSON = (JSONArray) obj;
            System.out.println(gamesJSON);

            gamesJSON.forEach(game -> parseGameObject((JSONObject) game, games));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }

        /*
        * IN ACEST PUNCT AVEM TOATE JOCURILE SI POT FI FOLOSITE
        */

        games.forEach(g -> {
            System.out.println(g.toString());
        });
    }

    private static void parseGameObject(JSONObject game, ArrayList<Game> games) {
        Game newGame = new Game();

        //Get ID
        Long id = (Long) game.get("id");
        newGame.setId(id);

        //Get cover
        JSONObject coverObject = (JSONObject) game.get("cover");
        Long idCover = (Long) coverObject.get("id");
        String cover = (String) coverObject.get("url");
        newGame.setCover(new Pair<>(idCover, cover));

        //Get release date
        try {
            long seconds = (Long) game.get("first_release_date");
            LocalDateTime dateTime = LocalDateTime.ofEpochSecond((Long) game.get("first_release_date"), 0, ZoneOffset.UTC);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d,yyyy", Locale.ENGLISH);
            String formattedDate = dateTime.format(formatter);
            newGame.setFirst_release_date(formattedDate);
        } catch (NullPointerException e) {
            newGame.setFirst_release_date("TBA");
        }

        //Get genres
        ArrayList<Pair<Long, String>> genreList = new ArrayList<>();
        try {
            JSONArray genres = (JSONArray) game.get("genres");
            genres.forEach(genre -> {
                JSONObject obj = (JSONObject) genre;
                genreList.add(new Pair<>((Long) obj.get("id"), (String) obj.get("name")));
            });
        } catch (NullPointerException e) {
            genreList.add(new Pair<Long, String>((long) -1, "TBA"));
        }
        newGame.setGenres(genreList);

        //Get involved companies
        JSONArray companies = (JSONArray) game.get("involved_companies");
        ArrayList<Pair<Long, Pair<Long, String>>> companyList = new ArrayList<>();
        companies.forEach(entry -> {
            JSONObject obj = (JSONObject) entry;
            JSONObject company = (JSONObject) obj.get("company");
            companyList.add(new Pair<>((Long) obj.get("id"), new Pair<>((Long) company.get("id"), (String) company.get("name"))));
        });
        newGame.setInvolved_companies(companyList);

        //Get name
        String name = (String) game.get("name");
        newGame.setName(name);

        String summary = (String) game.get("summary");
        newGame.setSummary(summary);

        //Get platforms
        ArrayList<Pair<Long, String>> platformList = new ArrayList<>();
        try {
            JSONArray platforms = (JSONArray) game.get("platforms");
            platforms.forEach(platform -> {
                JSONObject obj = (JSONObject) platform;
                platformList.add(new Pair<>((Long) obj.get("id"), (String) obj.get("name")));
            });
        } catch (NullPointerException e) {
            platformList.add(new Pair<Long, String>((long) -1, "TBA"));
        }
        newGame.setPlatforms(platformList);

        //Add to final
        games.add(newGame);
        addToDB(newGame);

    }

    static public void addToDB(Game game) {
        try {

            //Introduceti user-ul si parola voastra pentru db!!
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/n00bs", "root", "");

            //Insert game
            String query = "insert IGNORE into games (id, name, rating, summary, release_date, cover_url) values (?, ?, ?, ?, ?, ?)";
            PreparedStatement prepState = con.prepareStatement(query);
            prepState.setLong(1, game.getId());
            prepState.setString(2, game.getName());
            prepState.setFloat(3, 0);
            prepState.setString(4, game.getSummary());
            prepState.setString(5, game.getFirst_release_date());
            prepState.setString(6, game.getCover().getValue());
            prepState.execute();

            //Insert genre
            query = "insert  IGNORE into genres (id, name) values (?, ?)";

            ArrayList<Pair<Long, String>> genres = game.getGenres();
            for (int i = 0; i < genres.size(); i++) {
                prepState = con.prepareStatement(query);
                prepState.setLong(1, genres.get(i).getKey());
                prepState.setString(2, genres.get(i).getValue());
                prepState.execute();
            }

            //Insert games_genres
            query = "insert IGNORE into games_genres (game_id, genre_id) values (?, ?)";

            for (int i=0; i<genres.size(); i++){
                prepState=con.prepareStatement(query);
                prepState.setLong(1,game.getId());
                prepState.setLong(2,genres.get(i).getKey());
                prepState.execute();
            }

            //Insert platforms
            query = "insert IGNORE into platforms (id, name) values (?, ?)";
            ArrayList<Pair<Long,String>> platforms=game.getPlatforms();

            for (int i=0; i<platforms.size(); i++){
                prepState=con.prepareStatement(query);
                prepState.setLong(1,platforms.get(i).getKey());
                prepState.setString(2, platforms.get(i).getValue());
                prepState.execute();
            }

            //Insert games_platforms
            query = "insert IGNORE into games_platforms (game_id, platform_id) values (?, ?)";

            for (int i=0; i<platforms.size(); i++){
                prepState=con.prepareStatement(query);
                prepState.setLong(1, game.getId());
                prepState.setLong(2, platforms.get(i).getKey());
                prepState.execute();
            }

            //Insert publisher
            query = "insert IGNORE into companies (id, company) values (?,?)";
            ArrayList<Pair<Long,Pair<Long,String>>> publishers=game.getInvolved_companies();

            for (int i=0; i<publishers.size(); i++){
                prepState=con.prepareStatement(query);
                prepState.setLong(1, publishers.get(i).getValue().getKey());
                prepState.setString(2, publishers.get(i).getValue().getValue());
                prepState.execute();
            }

            //Insert games_publishers
            query="insert IGNORE into games_companies (id_game, id_company) values (?,?)";

            for (int i=0; i<publishers.size(); i++){
                prepState=con.prepareStatement(query);
                prepState.setLong(1, game.getId());
                prepState.setLong(2, publishers.get(i).getValue().getKey());
                prepState.execute();
            }


            con.close();

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }


    }
}
