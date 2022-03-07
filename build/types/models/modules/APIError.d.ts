export default class APIError extends Error {
    status: number;
    summary: string;
    message: string;
    constructor(status: number, summary: string, message: string);
    get summaryMessage(): string;
    get fullMessage(): string;
}
