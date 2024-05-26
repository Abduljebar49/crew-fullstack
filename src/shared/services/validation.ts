import { MIN_PASSWORD_LENGTH } from "../config/constants"

const IsInvalidEmail = (value: string): boolean => {
    if (/\S+@\S+\.\S+/.test(value)) return false
    return true
}
const IsEmptyString = (value: string) => {
    if (value !== undefined && value.length > 0) return false
    return true
}
const IsDifferentString = (value1: string, value2: string) => {
    if (value1 === value2) return false
    return true
}
const containsUppercase = (value: string) => {
    return /[A-Z]/.test(value)
}
const containsNumber = (value: string) => {
    return /[0-9]/.test(value)
}
const containsSpecial = (value: string) => {
    return /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
}
const minLength = (value: string) => {
    return value.length >= MIN_PASSWORD_LENGTH
}
const emptyPassword = (value: string) => {
    return value.length > 0
}

const phoneNumberAutoFormat = (phoneNumber: string): string => {
    const number = phoneNumber.trim().replace(/[^0-9]/g, "");
    if (number.length < 4) return number;
    if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
    if (number.length < 11) return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
};

export default {
    IsInvalidEmail,
    IsEmptyString,
    IsDifferentString,
    containsUppercase,
    containsNumber,
    containsSpecial,
    emptyPassword,
    minLength,
    phoneNumberAutoFormat
}
