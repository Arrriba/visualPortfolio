package utils;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

/**
 * @author Bungardean Tudor-Ionut
 */

@MappedSuperclass
public class BaseEntity<T> implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private T id;

    public BaseEntity() {
    }

    public T getId() {
        return id;
    }

    public void setId(T id) {
        this.id = id;
    }
}

