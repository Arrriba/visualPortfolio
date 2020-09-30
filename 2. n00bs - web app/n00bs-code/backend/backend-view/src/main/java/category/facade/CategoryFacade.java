package category.facade;

import category.control.CategoryController;
import category.converter.dto.CategoryDto;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

/**
 * @author Bungardean Tudor-Ionut
 */

@Stateless
public class CategoryFacade {

    @EJB
    private CategoryController categoryController;

    public List<CategoryDto> getAllCategories(){
        return this.categoryController.getAllCategories();
    }
}
