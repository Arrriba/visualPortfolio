using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revolut.DtoModels;
using Revolut.Model;

namespace Revolut.Mapping
{
    public class UserMapping : IUserMapping
    {
        public DtoUser GetUserDtoFromUser(User user)
        {
            var dtoUser = new DtoUser()
            {
                //Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Amount = user.Amount
            };

            return dtoUser;
        }

        public User GetUserFromUserDTO(DtoUser dtoUser)
        {
            var user = new User()
            {
                //Id = dtoUser.Id,
                FirstName = dtoUser.FirstName,
                LastName = dtoUser.LastName,
                Amount = dtoUser.Amount
            };

            return user;
        }

        public CreateUserDto GetCreateUserDtoFromUser(User user)
        {
            var dtoUser = new CreateUserDto()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Amount = user.Amount,
                PhoneNumber = user.PhoneNumber,
                Password =  user.Password
            };

            return dtoUser;
        }

        public User GetUserFromCreateUserDTO(CreateUserDto dtoUser)
        {
            var user = new User()
            {
                FirstName = dtoUser.FirstName,
                LastName = dtoUser.LastName,
                Amount = dtoUser.Amount,
                PhoneNumber = dtoUser.PhoneNumber,
                Password = dtoUser.Password
            };

            return user;
        }
    }
}
