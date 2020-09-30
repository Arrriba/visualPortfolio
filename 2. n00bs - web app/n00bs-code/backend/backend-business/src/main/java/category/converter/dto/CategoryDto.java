package category.converter.dto;

import game.converter.dto.ViewGameDto;

import java.util.List;
import java.util.Objects;

/**
 * @author Bungardean Tudor-Ionut
 */

public class CategoryDto {

    private String name;

    private List<ViewGameDto> viewGameDtoList;

    public CategoryDto() {
    }

    public CategoryDto(String name, List<ViewGameDto> viewGameDtoList) {
        this.name = name;
        this.viewGameDtoList = viewGameDtoList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ViewGameDto> getViewGameDtoList() {
        return viewGameDtoList;
    }

    public void setViewGameDtoList(List<ViewGameDto> viewGameDtoList) {
        this.viewGameDtoList = viewGameDtoList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryDto that = (CategoryDto) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(viewGameDtoList, that.viewGameDtoList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, viewGameDtoList);
    }

    @Override
    public String toString() {
        return "CategoryDto{" +
                "name='" + name + '\'' +
                ", viewGameDtoList=" + viewGameDtoList +
                '}';
    }
}
