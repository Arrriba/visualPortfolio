package game.converter.dto;

public class ViewReviewDto {
    private Long id_user;
    private String username;
    private Long id_game;
    private double rating;
    private String review;

    public ViewReviewDto(Long id_user, String username, Long id_game, double rating, String review){
        this.id_user = id_user;
        this.username = username;
        this.id_game = id_game;
        this.rating = rating;
        this.review = review;
    }

    public ViewReviewDto(){

    }

    public Long getId_user() {
        return id_user;
    }

    public void setId_user(Long id_user) {
        this.id_user = id_user;
    }

    public Long getId_game() {
        return id_game;
    }

    public void setId_game(Long id_game) {
        this.id_game = id_game;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
