export interface BillingAddressFormType {
    name: string;
    email: string;
    address: string;
    city: { text: string };
    country: string;
    connection: boolean;
}