
export class MoneyService {
    private static baseUrl: String = 'http://wa-dev-start-666.azurewebsites.net/api/users';
    //private static baseUrl: String = 'http://192.168.2.103:44366/api/users';
    //hotspot:
    //private static baseUrl: String = 'http://192.168.43.241:44366/api/users';
    //usb
    //private static baseUrl: String = 'http://192.168.42.93:44366/api/users';


    public static pay(phoneNumber: string, amount: number) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/pay`,
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        Amount: amount
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return "Payment completed!"
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
                }));
    }

    public static payPendingBill(phoneNumber: string, amount: number, idbill: number, payed: number) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/payPending`,
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        Amount: amount,
                        IdBill: idbill,
                        Payed: payed
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return "Payment completed!"
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
                }));
    }


    public static getBalance2(phoneNumber: number) {
        return new Promise<BalanceResponse>((resolve, reject) => {
            fetch(`${this.baseUrl}/${phoneNumber}`)

                .then((response: any) => {
                    if (response.ok)
                        return response.json();
                    else
                        throw new Error(`API error with statusCode: ${response.status}`);
                })
                .then((response) => {

                    resolve(response);
                })
                .catch((error: any) => {
                    const errorMessage = `ErrorMessage: ${error.message}`;
                    reject(errorMessage);
                })
        })
    }

    public static getChange(phoneNumber: string) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/change/${phoneNumber}`)

                .then((response: any) => {
                    if (response.ok)
                        return response.json();
                    else
                        throw new Error(`API error with statusCode: ${response.status}`);
                })
                .then((response) => {

                    resolve(response);
                })
                .catch((error: any) => {
                    const errorMessage = `ErrorMessage: ${error.message}`;
                    reject(errorMessage);
                })
        })
    }

    public static getToPayBills(phoneNumber: string) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/bill/${phoneNumber}`)

                .then((response: any) => {
                    if (response.ok)
                        return response.json();
                    else
                        throw new Error(`API error with statusCode: ${response.status}`);
                })
                .then((response) => {

                    resolve(response);
                })
                .catch((error: any) => {
                    const errorMessage = `ErrorMessage: ${error.message}`;
                    reject(errorMessage);
                })
        })
    }


    public static getWhoOwesMe(phoneNumber: string) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/whoOwes/${phoneNumber}`)

                .then((response: any) => {
                    if (response.ok)
                        return response.json();
                    else
                        throw new Error(`API error with statusCode: ${response.status}`);
                })
                .then((response) => {

                    resolve(response);
                })
                .catch((error: any) => {
                    const errorMessage = `ErrorMessage: ${error.message}`;
                    reject(errorMessage);
                })
        })
    }

    public static postLogin(phoneNumber: string, pass: string) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/login`,

                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        Password: pass
                    })
                })
                .then((respo: any) => {
                    if (respo.ok) {
                        return "Logged in!"

                    } else {
                        throw respo
                    }
                })
                .then((e) =>
                    resolve(e)
                )
                .catch((error: any) => {

                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )

                    // reject(error.message)

                })

        )
    }

    public static postTransfer(phoneNumber: string, targetPhoneNumber: string, amount: number) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/transaction/transfer`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        PhoneNumber: phoneNumber,
                        TargetPhoneNumber: targetPhoneNumber,
                        Amount: amount
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return "Transfer completed!"
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
    public static postTopUp(phoneNumber: number, amount: number) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/transaction/${phoneNumber}/topup`,
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(amount)
                })
                .then(respo => {
                    if (respo.ok) {
                        return "Top up done!";
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                })
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                })
        )
    }

    public static TopUpChange(phoneNumber: number, amount: number) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/change/${phoneNumber}/topup`,
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(amount)
                })
                .then(respo => {
                    if (respo.ok) {
                        return "Top up done!";
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                })
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                })
        )
    }


    public static postRegister(phoneNumber: string,
        pass: string,
        amount: number,
        firstName: string, lastName: string) {
        return new Promise((resolve, reject) =>
            fetch(`${this.baseUrl}/register`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        FirstName: firstName,
                        LastName: lastName,
                        PhoneNumber: phoneNumber,
                        Password: pass,
                        Amount: amount
                    })
                })
                .then((respo) => {
                    if (respo.ok) {
                        return "Registered!"
                    }
                    else throw respo
                })
                .then(re => {
                    resolve(re)
                })
                .catch((error) => {
                    error.text().then(
                        (errMes: string) => reject(errMes)
                    )
                })
        )
    }


}

export interface BalanceResponse {
    balance: number;
}
