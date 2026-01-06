export type UpdateUserPayload = {
    id: string;
    data: {
        name?: string;
        email?: string;
        avatar?: string;
    };
};
export interface userfetchedType {
    currentUser: userDatailsType | null,
    loading: string
}
export interface orderFetchedType {
    orders: OrderHistory[],
    loading: boolean
}
export type FavoriteState = {
    favorites: string[];
    loading : boolean
};
export type menuSliceInitialState = {
    menuData: menuDataType[];
    loading: boolean;
}
export interface AuthState {
    isAuthenticated: boolean | null;
    biometricEnabled: boolean;
    biometricSupported: boolean;
    loading: boolean;
    error?: string;
    biometricChecked: boolean;
}
export type userDatailsType = {
    id: string,
    name: string | undefined,
    mobileNo: string,
    email?: string | undefined,
    avatar?: string | undefined,
    orderCount?: number;
    address?: savedAddress[]
}
export type cartItemStateType = {
    cartItems: CartItemType[],
    loading: string
}