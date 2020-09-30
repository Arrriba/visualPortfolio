package user.entity;

import utils.BaseEntity;

import javax.persistence.*;
import java.util.Objects;

/**
 * @author Bungardean Tudor-Ionut
 */

@Entity
@Table(name = "users")
@NamedQueries(
        {
                @NamedQuery(name = UserEntity.GET_ALL_USERS, query = "Select user from UserEntity user"),
                @NamedQuery(name = UserEntity.GET_USER_BY_EMAIL, query = "Select user from UserEntity user where user.email = :email"),
                @NamedQuery(name = UserEntity.GET_USER_BY_ID, query = "Select user from UserEntity user where user.id = :id")

                //@NamedQuery(name = UserEntity.GET_ALL_EMAILS, query = "Select user.email from UserEntity user")

        }
)
public class UserEntity extends BaseEntity<Long> {

    //Query names
    public static final String GET_ALL_USERS = "UserEntity.getAllUsers";
    public static final String GET_USER_BY_EMAIL = "UserEntity.getUserByEmail";
    public static final String GET_USER_BY_ID = "UserEntity.getUserById";

    //public static final String GET_ALL_EMAILS = "UserEntity.getAllEmails";


    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "uid", nullable = false)
    private String uid;

    public UserEntity() {
    }

    public UserEntity(String username, String email, String uid) {
        this.username = username;
        this.email = email;
        this.uid = uid;
    }

    public UserEntity(Long id,String username, String email, String uid) {
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

    public void setEmail(String password) {
        this.email = password;
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
        UserEntity that = (UserEntity) o;
        return Objects.equals(username, that.username) &&
                Objects.equals(email, that.email) &&
                Objects.equals(uid, that.uid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, email, uid);
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "id='" + id + '\'' +
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
