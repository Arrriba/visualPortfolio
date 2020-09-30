package company.entity;

import utils.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * @author Bungardean Tudor-Ionut
 */

@Entity
@Table(name = "companies")
public class CompanyEntity extends BaseEntity<Long> {

    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "company", nullable = false)
    private String company;

    public CompanyEntity() {
    }

    public CompanyEntity(Long id, String company){
        this.id = id;
        this.company = company;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public void setId(Long id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CompanyEntity that = (CompanyEntity) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(company, that.company);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, company);
    }

    @Override
    public String toString() {
        return "CompanyEntity{" +
                "id=" + id +
                ", company='" + company + '\'' +
                '}';
    }
}
