package category.converter;

import category.converter.dto.CategoryDto;
import category.entity.CategoryEntity;
import game.converter.dto.ViewGameDto;

import javax.ejb.Stateless;
import java.util.List;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class CategoryConverter {

    /**
     * Converts the category entity to dto
     * @param categoryEntity used for the CategoryDto
     * @param viewGameDtoList user for the CategoryDto
     * @return CategoryDto
     */
    public CategoryDto convertCategoryEntityToCategoryDto(CategoryEntity categoryEntity, List<ViewGameDto> viewGameDtoList){
        return new CategoryDto(
                categoryEntity.getName(),
                viewGameDtoList
        );
    }
}
