using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revolut.DtoModels;
using Revolut.Model;

namespace Revolut.Mapping
{
    public interface IUserMapping
    {
        DtoUser GetUserDtoFromUser(User user);
        User GetUserFromUserDTO(DtoUser dtoUser);

        CreateUserDto GetCreateUserDtoFromUser(User user);
        User GetUserFromCreateUserDTO(CreateUserDto dtoUser);
    }

}
