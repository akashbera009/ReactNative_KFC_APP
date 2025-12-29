// user slice
type UpdateUserPayload = {
    id: string;
    data: {
        name?: string;
        email?: string;
        avatar?: string;
    };
};
interface userfetchedType {
    currentUser: userDatailsType | null,
    loading: string
}

interface orderFetchedType {
  orders: OrderHistory[],
  loading: string
}
type FavoriteState = {
    favorites: string[];
};