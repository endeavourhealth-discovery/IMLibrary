export default class User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
    id: string;
    constructor(username: string, firstName: string, lastName: string, email: string, password: string, avatar: string);
    setId(id: string): void;
}
