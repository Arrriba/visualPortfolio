
const validatePass = (p1: string, p2: string) => {
    if (p1 != p2) {
        return false
    }
    else {
        return true
    }
};

const validateAmount = (a: string) => {
    var numbers = /^[0-9]+$/
    var nr = Number(parseInt(a, 10));
    if (numbers.test(a) && nr >= 200) {
        return true
    } else {
        return false
    }
}

const validatePayAmount = (a: string) =>{
    var numbers = /^[0-9]*(.[0-9]+)$/
    var nr = Number(parseFloat(a));
    if (numbers.test(a)) {
        return true
    } else {
        return false
    }

}

const validate = (text: string, type: string) => {

    var letters = /^[a-z A-Z]+$/
    var numbers = /^[0-9]+$/

    if (type == 'firstName') {
        if (letters.test(text)) {
            return true
        }
        else {
            return false
        }
    }

    if (type == 'payAmount') {
        if (numbers.test(text) || numbers.test('')) 
            return true
        
        else 
            return false
        
    }

    if (type == 'lastName') {
        if (letters.test(text)) {
            return true
        }
        else {
            return false
        }
    }
    if (type == 'phoneNumber') {
        if (numbers.test(text) || numbers.test('')) {
            return true
        }
        else {
            return false
        }
    }
}

export { validateAmount,validatePayAmount };
export { validatePass, validate };
