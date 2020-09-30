package game.converter.dto;

public class UserReviewDto {
    private Long id_user;
    private Long id_game;

    public UserReviewDto(){

    }

    public UserReviewDto(Long id_user, Long id_game) {
        this.id_user = id_user;
        this.id_game = id_game;
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
}
