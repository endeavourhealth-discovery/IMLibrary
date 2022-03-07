import { PasswordStrength } from "../../enums/modules/PasswordStrength";
export declare function verifyIsEmail(email: string): boolean;
export declare function verifyPasswordsMatch(password1: string, password2: string): boolean;
export declare function verifyEmailsMatch(email1: string, email2: string): boolean;
export declare function verifyIsName(name: string): boolean;
export declare function verifyIsUsername(name: string): boolean;
export declare function checkPasswordStrength(password: string): PasswordStrength;
declare const _default: {
    verifyEmailsMatch: typeof verifyEmailsMatch;
    verifyIsEmail: typeof verifyIsEmail;
    verifyIsName: typeof verifyIsName;
    verifyIsUsername: typeof verifyIsUsername;
    verifyPasswordsMatch: typeof verifyPasswordsMatch;
    checkPasswordStrength: typeof checkPasswordStrength;
};
export default _default;
