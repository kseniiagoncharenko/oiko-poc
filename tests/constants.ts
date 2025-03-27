import { IAccount } from './models';

export class Accounts {
    private static createAccount(
        firstName: string,
        lastName: string,
        email: string,
        branchAccount: string,
        saAccount: string,
        accountName: string,
        leadSource: string
    ): IAccount {
        return {
            firstName,
            lastName,
            email,
            branchAccount,
            saAccount,
            accountName,
            leadSource,
        };
    }

    public static createGermanAccountWithEventSource(): IAccount {
        return this.createAccount(
            'e2euser',
            'test',
            'e2euser@test.com',
            'Oikocredit Deutschland, Büro Berlin',
            'Oikocredit Ostdeutscher Förderkreis e. V.',
            'E2E Company' + new Date().getTime(),
            LeadSources.event
        );
    }
}

export enum LeadSources {
    event = 'Event',
    friendships = 'Friendships, acquaintances',
    media = 'Media, internet',
    others = 'Others (please specify)',
}
