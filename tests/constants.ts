import { IAccount } from './models';

export class Accounts {
    public static createAccount(
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
}

export enum LeadSources {
    event = 'Event',
    friendships = 'Friendships, acquaintances',
    media = 'Media, internet',
    others = 'Others (please specify)',
}
