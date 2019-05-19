function validateStringLength(value, isNull, length) {
    // value = value.trim();
    if (isNull) {
        if (value === '') {
            return true;
        }
        if (value.length === length) {
            return true;
        }
        return false;
    }
    if (value !== null && value !== '' && value !== undefined)
        if (value.length > 0 && value.length === length) {
            return true;
        }
    return false;
}

function validateStringMaxLength(value, isNull, maxLength) {
    // value = value.trim();
    if (isNull) {
        if (value === '') {
            return true;
        }
        if (value.length < maxLength) {
            return true;
        }
        return false;
    }
    if (value !== null && value !== '' && value !== undefined)
        if (value.length > 0 && value.length < maxLength) {
            return true;
        }
    return false;
}

function isNumber(number, isNull) {
    const regex = /^\d+$/;
    if (isNull) {
        if (number === '') {
            return true;
        }
        if (regex.test(number)) {
            return true;
        }
        return false;
    }
    if (regex.test(number)) {
        return true;
    }
    return false;
}

const validation = {
    validateStringLength,
    validateStringMaxLength,
    isNumber
}

export default validation;