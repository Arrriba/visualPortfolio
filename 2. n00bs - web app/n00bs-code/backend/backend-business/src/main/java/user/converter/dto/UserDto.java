package user.converter.dto;

import java.util.Objects;

/**
 * @author Bungardean Tudor-Ionut
 */

public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String uid;

    public UserDto() {
    }


    public UserDto(String username, String email, String uid) {
        this.username = username;
        this.email = email;
        this.uid = uid;
    }

    public UserDto(Long id,String username, String email, String uid) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.uid = uid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto userDto = (UserDto) o;
        return Objects.equals(username, userDto.username) &&
                Objects.equals(email, userDto.email) &&
                Objects.equals(uid, userDto.uid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, email, uid);
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", uid='" + uid + '\'' +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
