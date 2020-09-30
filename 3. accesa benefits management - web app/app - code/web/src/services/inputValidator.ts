    export default class InputValidator {

    private static onlyNumbers = new RegExp(/^\d+$/);
    private static onlyChars = new RegExp(/^[a-z]+$/i);
    private static specialChars = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/);
    private static email = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    public static validateEmail(email: string) {
        let error = '';

        if (email === '') {
            error = 'Field can not be empty.'
            return error;
        } else if (this.email.test(email.toLocaleLowerCase()) === false) {
            error = 'Email is invalid.';
            return error;
        }
        return error;
    }

    public static validatePasswords(text: string) {
        let error = '';

        if (text === '') {
            error = 'Field can not be empty.'
            return error;
        } else if (this.specialChars.test(text) === false) {
            error = 'Not secure enought, sorry';
            return error;
        }
        return error;
    }


}