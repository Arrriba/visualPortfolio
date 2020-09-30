package category.control;

import category.converter.CategoryConverter;
import category.converter.dto.CategoryDto;
import category.dao.CategoryDao;
import game.converter.GameConverter;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class CategoryController {

    @EJB
    private CategoryDao categoryDao;

    @EJB
    private CategoryConverter categoryConverter;

    @EJB
    private GameConverter gameConverter;

    /**
     * Converts the category entities from dao to dto
     * @return <list>CategoryDto</list>
     */
    public List<CategoryDto> getAllCategories(){
        return this.categoryDao
                .getAllCategories()
                .stream()
                .map(x -> this.categoryConverter
                        .convertCategoryEntityToCategoryDto(x, x.getGameEntityList()
                        .stream()
                        .map(this.gameConverter::convertGameEntityToViewGameDto)
                        .collect(Collectors.toList())))
                .collect(Collectors.toList());
    }
}
