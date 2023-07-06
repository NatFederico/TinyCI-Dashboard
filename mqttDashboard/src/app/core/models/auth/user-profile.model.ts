import { Profile } from 'oidc-client';

export interface IUserProfile extends Profile{
    sub: string;
    unitn_id: string;
    person_id: number;
    is_guest: boolean;
    name: string;
    family_name: string;
    given_name: string;
    picture: string;
    account_id: string;
    principal_name: string;
    ada_decodes: string;
    ada_roles: string;
    authentication_method: string;
    password_expiration: number;
    password_last_change: number;
    email: string;
    email_verified: boolean;
    email_alias: string;
}
