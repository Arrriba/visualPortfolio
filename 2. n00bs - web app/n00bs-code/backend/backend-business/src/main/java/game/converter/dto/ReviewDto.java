package game.converter.dto;

public class ReviewDto {
    private Long id_user;
    private Long id_game;
    private double rating;
    private String review;

    public ReviewDto(Long id_user, Long id_game, double rating, String review){
        this.id_user = id_user;
        this.id_game = id_game;
        this.rating = rating;
        this.review = review;
    }

    public ReviewDto(){

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
}
