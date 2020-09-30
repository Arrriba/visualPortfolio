using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Revolut.DtoModels;
using Revolut.Model;

namespace Revolut.Mapping
{
    public interface IGroupMapping
    {
        DtoGroup GetGroupDtoFromGroup(Group group);
        Group GetGroupFromGroupDTO(DtoGroup dtoGroup);

        GroupKey GetGroupKeyFromGroupDTO(DtoGroup dtoGroup);
        Group GetGroupFromGroupKey(GroupKey groupKey);
        GroupKey GetGroupKeyFromGroupAdd(GroupAdd groupAdd);

        //CreateGroupDto GetCreateGroupDtoFromGroup(Group group);
        //Group GetGroupFromCreateGroupDTO(CreateGroupDto dtoGroup);
    }
}
