import User from "./User";
export default class CustomAlert {
    status: number;
    message: string;
    error?: Error | string;
    user?: User;
    constructor(status: number, message: string, error?: Error | string, user?: User);
}
