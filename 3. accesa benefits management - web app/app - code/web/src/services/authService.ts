export default class AuthService {
    public static isAuthenticated = false;
    public static invalidPassCount = 0;

    public static getAuthStatus() {
        return this.isAuthenticated;
    }

    public static login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            fetch('https://localhost:44301/api/authentication/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        this.isAuthenticated = true;
                        this.invalidPassCount = 0;
                        localStorage.setItem('invC', '0');
                        resolve();
                    }
                    else if (res.status === 404) {
                        reject(new Error('Email adress is not registered.'))
                    } else if (res.status === 423) {
                        reject(new Error('You account is locked. Please reset your password.'))
                    } else if (res.status === 403) {
                        reject(new Error('Your password has expired.'));
                    } else if (res.status === 401) {
                        const currentCount: any = localStorage.getItem('invC');
                        const count = parseInt(currentCount);
                        if (count === 4) {
                            this.lockAccount(email);
                            this.logout();
                            reject(new Error('Your account has been blocked. Please reset your password.'));
                        }
                        this.invalidPassCount = count + 1;
                        localStorage.setItem('invC', this.invalidPassCount.toString());
                        reject(new Error(`Password invalid. You have ${5 - this.invalidPassCount} tries left.`))
                    }
                })
                .catch(err => reject(err))
        })

    }

    public static lockAccount(email: string) {
        return new Promise((resolve, reject) => {
            fetch('https://localhost:44301/api/authentication/lock', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(email)
            })
                .then(async (res) => {
                    await localStorage.setItem('invC', '0');
                    this.invalidPassCount = 0;
                    resolve();
                })
                .catch(err => reject(new Error('Account has been blocked')))
        })
    }

    public static changePassword(email: string, oldPassword: string, newPassword: string) {
        return new Promise((resolve, reject) => {
            fetch('https://localhost:44301/api/authentication/changepassword', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    oldPassword,
                    newPassword
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        resolve();
                    } else if (res.status === 401) {
                        const currentCount: any = localStorage.getItem('invC');
                        const count = parseInt(currentCount);
                        if (count === 4) {
                            const error = {
                                id: 1,
                                msg: 'Your account has been blocked. Please reset your password.'
                            }
                            reject(error);
                        }
                        this.invalidPassCount = count + 1;
                        localStorage.setItem('invC', this.invalidPassCount.toString());
                        const error = {
                            id: 0,
                            msg: `Password invalid. You have ${5 - this.invalidPassCount} tries left.`
                        }
                        reject(error)
                    } else if (res.status === 400) {
                        const error = {
                            id: 0,
                            msg: 'New password can not be the same as the old one.'
                        }
                        reject(error)
                    }
                })
                .catch(err => reject(new Error('Account has been blocked')))
        })
    }

    public static resetPassword(email: string) {
        return new Promise((resolve, reject) => {
            fetch('https://localhost:44301/api/authentication/resetpassword', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email: email,
                    OldPassword: 'sakdfmasofm',
                    NewPassword: 'fasasmdfas'
                })
            })
                .then(res => resolve())
                .catch(err => reject(new Error('Account has been blocked')))
        })
    }

    public static logout() {
        return new Promise((resolve, reject) => {
            this.isAuthenticated = false;
            this.removeUserInfo();
            resolve();
        })
    }

    public static autoAuthUser() {
        if (localStorage.getItem('isLogged') === null || localStorage.getItem('isLogged') === '0') {
            return;
        } else {
            this.isAuthenticated = true;
            const email: any = localStorage.getItem('email');
            this.saveUserInfo(email);
        }
    }

    public static getUserInfo() {
        const user = {
            isLogged: localStorage.getItem('isLogged'),
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password')
        }
        return user;
    }

    public static saveUserInfo(email: string) {
        localStorage.setItem('isLogged', '1');
        localStorage.setItem('email', email);
    }

    public static removeUserInfo() {
        localStorage.setItem('invC', '0');
        localStorage.setItem('isLogged', '0');
        localStorage.removeItem('email');
    }
}