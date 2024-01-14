export interface UserId {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    password: string;
    userStore: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    verified?: boolean;
    profile: string;
    googleAuth?: boolean;
}

export interface Support {
    text: string;
    price: number;
    start: Date;
    end: Date;
}

export interface Personal {
    pdf: string;
    price: string;
}

export interface Commercial {
    pdf: string;
    price: string;
}

export interface Buyout {
    pdf: string;
    price: string;
}

export interface Licenses {
    personal: Personal;
    commercial: Commercial;
    buyout: Buyout;
}

export interface Files {
    images: string[];
    sourceFile: string;
    thumbnail: string;
}

export interface Feature {
    heading: string;
    list: string[];
}

export interface Service {
    text: string;
    price: number;
}

export interface ProductId {
    licenses: Licenses;
    files: Files;
    _id: string;
    title: string;
    categories: string[];
    type: string;
    isVisible: boolean;
    description: string;
    features: Feature[];
    services: Service[];
    liveLink: string;
    softwares: string[];
    tags: string[];
    views: number;
    downloads: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    ratings: string[];
    comments: string[];
    buyout: string;
}

export interface Service2 {
    text: string;
    price: number;
}

export interface DownloadProduct {
    support: Support;
    _id: string;
    userId: string;
    license: string;
    productId: ProductId;
    isDownloaded: boolean;
    services: Service2[];
    __v: number;
}

export interface Plan {
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

export interface BillingType {
    _id: string;
    userId: UserId;
    downloadProduct: DownloadProduct;
    invoice_no: number;
    status: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    plan: Plan;
}
