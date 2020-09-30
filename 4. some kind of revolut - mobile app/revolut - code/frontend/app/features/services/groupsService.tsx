



export class GroupsService {
    private static baseUrl: String = 'http://wa-dev-start-666.azurewebsites.net/api/groups';
    private static baseUrlf: String = 'http://wa-dev-start-666.azurewebsites.net/api/friends';

    //private static baseUrl: String = 'http://192.168.2.103:44366/api/groups';
    //private static baseUrlf: String = 'http://192.168.2.103:44366/api/friends';
    //hotspot:
    //private static baseUrl: String = 'http://192.168.43.241:44366/api/groups';
    //private static baseUrlf: String = 'http://192.168.43.241:44366/api/friends';
    //usb:
    //private static baseUrl: String = 'http://192.168.42.93:44366/api/groups';
    //private static baseUrlf: String = 'http://192.168.42.93:44366/api/friends';

    public static postNewGroup(phoneNumber: string, groupName: string) {
        return new Promise((resolve, reject) =>
            //fetch(`${this.baseUrl}/transaction/transfer`,
            fetch(`${this.baseUrl}/new`,

                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        Name: groupName
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return "Group Created!"
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                }
                )
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                })
        )
    }

    public static splitBill(phoneNumber: string, groupName: string, amount: string) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/split/${amount}`,

                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        Name: groupName
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return respo.json()
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                }
                )
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                    //reject(error)
                })
        )
    }

    public static split(phoneNumber: string, groupName: string, amount: number) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/split/${amount}`,

                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        Name: groupName
                    })
                })
                .then((respo) => {
                    if (respo.ok)// {
                        //respo.text().then(
                        //    (errMes: string) => resolve(errMes)
                        //)        
                        //          }
                        return respo.json()
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                }
                )
                .catch((error) => {
                    error.then(
                        (errMes: string) => reject(errMes)
                    )
                })

            //reject(error)                })
        )
    }



    public static getGroupPhones(phoneNumber: string, groupName: string) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/phones`,

                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        Name: groupName
                    })
                })
                .then((respo) => {
                    if (respo.ok)
                        return respo.json()
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                }
                )
                .catch((error) => {


                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                        .catch((x: any) => reject(x))
                }))
    }

    public static renameGroup(phoneNumber: string, groupName: string, newGroupName: string) {
        return new Promise((resolve, reject) =>
            //fetch(`${this.baseUrl}/transaction/transfer`,
            fetch(`${this.baseUrl}/name/${newGroupName}`,

                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        AdminPhoneNumber: phoneNumber,
                        Name: groupName
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return "Group renamed!"
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                }
                )
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                })
        )
    }

    public static postDeleteGroup(phoneNumber: string, groupName: string) {
        return new Promise((resolve, reject) =>
            //fetch(`${this.baseUrl}/transaction/transfer`,
            fetch(`${this.baseUrl}/delete`,

                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        Name: groupName
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return "Group deleted."
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                }
                )
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                })
        )
    }



    public static postAddToGroup(phoneNumber: string, friendPhoneNumber: string, groupName: string) {
        return new Promise((resolve, reject) =>
            //fetch(`${this.baseUrl}/transaction/transfer`,
            fetch(`${this.baseUrl}/add`,

                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        FriendPhoneNumber: friendPhoneNumber,
                        Name: groupName
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return 'Friend added to group!'
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                }
                )
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                })
        )
    }

    public static postRemoveFromGroup(phoneNumber: string, friendPhoneNumber: string, groupName: string) {
        return new Promise((resolve, reject) =>
            //fetch(`${this.baseUrl}/transaction/transfer`,
            fetch(`${this.baseUrl}/remove`,

                {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        FriendPhoneNumber: friendPhoneNumber,
                        Name: groupName
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return 'Friend removed from group!'
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                }
                )
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                })
        )
    }


    public static getGroupsDetails(phoneNumber: string, name: string) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/details/${name}/${phoneNumber}`,
                {
                    method: 'GET',
                    headers: {
                        //Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }

                })
                //fetch(`${this.baseUrl}/transaction/${phoneNumber}`)
                .then((response) => {
                    if (response.ok)
                        return response.json()
                    else
                        throw response
                })
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                });
        })
    }

    public static getGroupsMembers(phoneNumber: string, groupName: string) {
        return new Promise((resolve, reject) => {
            //fetch(`${this.baseUrl}/members/${groupName}/${phoneNumber}`,
            fetch(`${this.baseUrl}/members/${groupName}/${phoneNumber}`,

                //http://192.168.2.103:44366/api/groups/members/666/11

                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                //fetch(`${this.baseUrl}/transaction/${phoneNumber}`)
                .then((response) => {
                    if (response.ok)
                        return response.json()
                    else
                        throw response
                })
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                });
        })
    }

    public static getMyGroups(phoneNumber: string) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/${phoneNumber}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    if (response.ok)
                        return response.json()
                    else
                        throw response
                })
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                });
        })
    }

    public static postAddFriend(phoneNumber: string, targetPhoneNumber: string) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrlf}/add`,

                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        TargetPhoneNumber: targetPhoneNumber
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return "Friend added!"
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                }
                )
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                })
        )
    }
    public static getFriends(phoneNumber: string) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrlf}/${phoneNumber}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then((response) => {
                    if (response.ok)
                        return response.json()
                    else
                        throw response
                })
                .then((response) => {

                    resolve(response);
                })
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                });
        })
    }


}