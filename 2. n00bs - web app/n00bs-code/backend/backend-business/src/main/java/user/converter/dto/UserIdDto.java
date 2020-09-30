package user.converter.dto;

import java.util.Objects;

public class UserIdDto {
    private Long id;

    public UserIdDto(){

    }

    public UserIdDto(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserIdDto userDto = (UserIdDto) o;
        return Objects.equals(id, userDto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "id='" + id + '\'' +
                '}';
    }

}
