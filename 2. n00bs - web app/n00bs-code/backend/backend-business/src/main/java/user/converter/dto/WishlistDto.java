package user.converter.dto;

import java.util.Objects;

public class WishlistDto {
    private Long id_user;
    private Long id_game;

    public WishlistDto() {
    }

    public WishlistDto(Long id_user, Long id_game) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WishlistDto userDto = (WishlistDto) o;
        return Objects.equals(id_game, userDto.id_game) &&
                Objects.equals(id_user, userDto.id_user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_game, id_user);
    }

    @Override
    public String toString() {
        return "wishlistdto{" +
                "idg='" + id_game + '\'' +
                ", idu='" + id_user + '\'' +
                '}';
    }
}
