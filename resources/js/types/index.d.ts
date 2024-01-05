export interface User {
    id: number;
    first_name?: string;
    last_name?: string;
    email: string;
    email_verified_at: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    education?: 'Basic' | 'Secondary' | 'Higher';
    hobbies?: string[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
