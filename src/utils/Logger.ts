export class Logger {
    static warning(TAG: string, a: any) {
        console.warn(`W\\${this.getTime()}\\: ` + TAG + " " + a + "\n");
    }

    static debug(TAG: string, a: any) {
        console.log(`D\\${this.getTime()}\\: ` + TAG + " " + a + "\n");
    }

    static error(TAG: string, a: any) {
        console.error(`E\\${this.getTime()}\\: ` + TAG + " " + a + "\n");
    }

    private static getTime(): string {
        return new Date(Date.now()).toUTCString();
    }
}
