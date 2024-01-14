export interface UserId {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    verified: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    userStore: string;
    profile: string;
    googleAuth?: boolean;
}

export interface CurrentPlan {
    _id: string;
    userId: string;
    planName: string;
    planPrice: number;
    interval: string;
    downloadLimit: number;
    planStart: string;
    planEnd: string;
    priceId: string;
    isTrial: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CustomerType {
    _id: string;
    userId: UserId;
    customerId: string;
    notifications: string[];
    wishList: string[];
    downloadProducts: string[];
    freebieUse: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    currentPlan: CurrentPlan;
}
