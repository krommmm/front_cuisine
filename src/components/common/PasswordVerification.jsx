import { useState, useEffect } from "react";

export function PasswordVerification({ inputPassword }) {

    const [majuscule, setMajuscule] = useState("false");
    const [minuscule, setMinuscule] = useState("false");
    const [space, setSpace] = useState("true");
    const [chiffre, setChiffre] = useState("false");
    const [specialChar, setSpecialChar] = useState("false");
    const [charLength, setCharLength] = useState("false");
    const [isPassword, setIsPassword] = useState(false);


    useEffect(() => {
        const password = testPassword();
        const isPasswordValid = testAllRegex(password);
        setIsPassword(isPasswordValid);
        // setMajuscule(JSON.stringify(password.majuscule));
        // setMinuscule(JSON.stringify(password.minuscule));
        // setSpace(JSON.stringify(!password.space));
        // setChiffre(JSON.stringify(password.chiffre));
        // setSpecialChar(JSON.stringify(password.specialChar));
        // setCharLength(JSON.stringify(password.charLength));

    }, [inputPassword]);

    function testAllRegex(password) {
        return (password.majuscule && password.minuscule && !password.space && password.chiffre && password.specialChar && password.charLength) ? true : false;
    }

    function testPassword() {
        let password = inputPassword;
        const isPasswordValid = {
            majuscule: regexTestpasswordMaj(password),
            minuscule: regexTestpasswordMin(password),
            space: regexTestpasswordSpace(password),
            chiffre: regexTestpasswordNumber(password),
            specialChar: regexTestpasswordSpecialChar(password),
            charLength: regexTestpassword12Char(password)
        };
        return isPasswordValid;
    }


    function regexTestpasswordMaj(password) {
        let testMajuscule = /[A-Z]/;
        return testMajuscule.test(password) ? true : false;
    }
    function regexTestpasswordMin(password) {
        let testMinuscule = /[a-z]/;
        return testMinuscule.test(password) ? true : false;
    }
    function regexTestpasswordSpace(password) {
        let testNoSpace = /(?=.*[\s])/gi;
        return testNoSpace.test(password) ? true : false;
    }
    function regexTestpasswordNumber(password) {
        let testChiffre = /[0-9]/;
        return testChiffre.test(password) ? true : false;
    }
    function regexTestpasswordSpecialChar(password) {
        let testCharSpecial = /[\^>$*<%+=@!,;:?.]/;
        return testCharSpecial.test(password) ? true : false;
    }
    function regexTestpassword12Char(password) {
        let test12Char = /^.{12,}$/;
        return test12Char.test(password) ? true : false;
    }

    return (
        <div className={`passwordVerification state-${isPassword}`}>
            <i className={`fa-solid fa-check passwordCheck`}></i>
        </div>
    );
}