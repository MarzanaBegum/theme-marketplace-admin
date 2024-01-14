import AnalyticsIcon from "../components/CustomSvg/AnalyticsIcon";
import DashboardIcon from "./../components/CustomSvg/DashboardIcon";
import PricingIcon from "./../components/CustomSvg/PricingIcon";
import CustomersIcon from "./../components/CustomSvg/CustomersIcon";
import ProductIcon from "./../components/CustomSvg/ProductIcon";
import Transaction from "./../components/CustomSvg/Transaction";
import Logout from "../components/CustomSvg/Logout";

export const dateFilterOptions = [
    { value: "month", label: "This month" },
    { value: "hour", label: "Last hour" },
    { value: "week", label: "Last week" },
    { value: "year", label: "Last year" },
];

export const SideNav = [
    {
        id: 1,
        Icon: DashboardIcon,
        url: "/dashboard",
        title: "dashboard",
    },
    {
        id: 2,
        Icon: AnalyticsIcon,
        url: "/analytics",
        title: "analytics",
    },
    {
        id: 3,
        Icon: PricingIcon,
        url: "/pricing",
        title: "pricing",
    },
    {
        id: 4,
        Icon: CustomersIcon,
        url: "/customers",
        title: "customers",
    },
    {
        id: 5,
        Icon: ProductIcon,
        url: "/products",
        title: "products",
    },
    {
        id: 6,
        Icon: Transaction,
        url: "/transactions",
        title: "transaction",
    },
    {
        id: 7,
        Icon: Logout,
        url: "/logout",
        title: "logout",
    },
];

export const revenueDetails = [
    {
        id: "1",
        title: "TODAY’S SUBCRIPTION REVENUE",
        price: 12426,
        benefitPercent: 36,
    },
    {
        id: "2",
        title: "TOTAL REVENUE",
        price: 12426,
        benefitPercent: 36,
    },
    {
        id: "3",
        title: "TOTAL DOWNLOADS",
        price: 90566,
        benefitPercent: 36,
    },
    {
        id: "4",
        title: "TOTAL SUBSCRIBERS",
        price: 33455,
        benefitPercent: 36,
    },
];
export const subscriptionDetails = [
    {
        id: "6390ceb29546d67ea07cb695",
        title: "Freebie",
        price: {
            monthly: 23,
        },
        features: [
            {
                id: 1,
                text: "20,000+ of PNG & SVG graphics",
                isValid: true,
            },
            {
                id: 2,
                text: "Access to 100 million stock images",
                isValid: true,
            },
            {
                id: 3,
                text: "Upload custom icons and fonts",
                isValid: false,
            },
            {
                id: 4,
                text: "Access to 100 million stock images",
                isValid: false,
            },
            {
                id: 5,
                text: "Upload graphics & video in up to 4k",
                isValid: false,
            },
            {
                id: 6,
                text: "Unlimited Projects",
                isValid: false,
            },
            {
                id: 7,
                text: "Instant Access to our design system",
                isValid: false,
            },
            {
                id: 8,
                text: "Create teams to collaborate on designs",
                isValid: false,
            },
        ],
        isTrial: true,
    },
    {
        id: "6390e61c23d76ae991ca5544",
        title: "Professional",
        price: {
            annually: 2343,
            monthly: 23,
        },
        features: [
            {
                id: 1,
                text: "20,000+ of PNG & SVG graphics",
                isValid: true,
            },
            {
                id: 2,
                text: "Access to 100 million stock images",
                isValid: true,
            },
            {
                id: 3,
                text: "Upload custom icons and fonts",
                isValid: false,
            },
            {
                id: 4,
                text: "Access to 100 million stock images",
                isValid: false,
            },
            {
                id: 5,
                text: "Upload graphics & video in up to 4k",
                isValid: false,
            },
            {
                id: 6,
                text: "Unlimited Projects",
                isValid: false,
            },
            {
                id: 7,
                text: "Instant Access to our design system",
                isValid: false,
            },
            {
                id: 8,
                text: "Create teams to collaborate on designs",
                isValid: false,
            },
        ],
        isTrial: false,
    },
    {
        id: "6390e66823d76ae991ca554c",
        title: "Enterprise",
        price: {
            annually: 2343,
            monthly: 23,
        },
        features: [
            {
                id: 1,
                text: "20,000+ of PNG & SVG graphics",
                isValid: true,
            },
            {
                id: 2,
                text: "Access to 100 million stock images",
                isValid: true,
            },
            {
                id: 3,
                text: "Upload custom icons and fonts",
                isValid: false,
            },
            {
                id: 4,
                text: "Access to 100 million stock images",
                isValid: false,
            },
            {
                id: 5,
                text: "Upload graphics & video in up to 4k",
                isValid: false,
            },
            {
                id: 6,
                text: "Unlimited Projects",
                isValid: false,
            },
            {
                id: 7,
                text: "Instant Access to our design system",
                isValid: false,
            },
            {
                id: 8,
                text: "Create teams to collaborate on designs",
                isValid: false,
            },
        ],
        isTrial: false,
    },
];

export const tableHead = [
    "Name",
    "Product name",
    "Subscriber plan",
    "Purchase date",
    "Total Price",
];

export const customerTableHead = [
    "Name",
    "Email",
    "Join Date",
    "Subscription Type",
];
export const productDetails = [
    {
        id: "1",
        title: "Total products",
        benefitPercent: 36,
        products: 120000,
        img: "/images/total-product.svg",
    },
    {
        id: "2",
        title: "Most Viewed Products",
        benefitPercent: 36,
        products: 8346,
        img: "/images/view-product.svg",
    },
    {
        id: "3",
        title: "Top Downloaded",
        benefitPercent: 36,
        products: 120000,
        img: "/images/total-product.svg",
    },
    {
        id: "4",
        title: "Trending Products",
        benefitPercent: 36,
        products: 120000,
        img: "/images/total-product.svg",
    },
];

export const filterCategoryData = [
    "themes",
    "coded templates",
    "icons",
    "illustrations",
    "images",
];

export const filterSubCategoryData = [
    "e-commerce",
    "shopify",
    "education",
    "wordpress",
    "dashboard",
    "woo commerce",
    "real estate",
    "entertainment",
    "health",
];

export const softwereUseData = [
    "Figma",
    "Adobe XD",
    "After Effects",
    "Invision",
    "Sketch",
    "Atom ",
    "Photoshop",
    "Anaconda",
    "Sketch",
    "Angular JS",
    "PyCharm",
    "Others",
    "Wordpress",
];

export const uploadData = [
    "Last hours",
    "Today",
    "This week",
    "This month",
    "This year",
];

export const rateData = ["Under $100", "$100-200", "$200-300"];

export const customersTabTitles = [
    {
        title: "All Customers",
        value: "all",
    },
    {
        title: "Active",
        value: "active",
    },
    {
        title: "Inactive",
        value: "inactive",
    },
    {
        title: "Banned",
        value: "banned",
    },
];
export const customersData = [
    {
        id: "1",
        name: "Chandra Sen",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
    {
        id: "2",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmailjjjjjjjjjjjj.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "inactive",
    },
    {
        id: "3",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "banned",
    },
    {
        id: "4",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
    {
        id: "5",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "inactive",
    },
    {
        id: "6",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
    {
        id: "7",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
    {
        id: "8",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
    {
        id: "9",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
    {
        id: "10",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
    {
        id: "11",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
    {
        id: "12",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
    {
        id: "13",
        name: "Chandra Kumari",
        email: "skibrahimibu420@gmail.com",
        subscription_type: "Professional",
        join_date: "15 May 2020",
        type: "active",
    },
];

export const options = [
    { value: "month", label: "This month" },
    { value: "hour", label: "Last hour" },
    { value: "week", label: "Last week" },
    { value: "year", label: "Last year" },
];

export const sortOptions = [
    { value: "most-viewed", label: "Most viewed" },
    { value: "top-download", label: "Top downloaded" },
    { value: "trending", label: "Trending" },
];

export const productCategory = [
    "all products",
    "themes",
    "coded templates",
    "icons",
    "illustrations",
    "images",
    "hidden products",
];
export const productTab = [
    {
        title: "All Products",
        value: "all products",
    },
    {
        title: "Themes",
        value: "theme",
    },
    {
        title: "Templates",
        value: "template",
    },
    {
        title: "Icons",
        value: "icon",
    },
    {
        title: "Illustrations",
        value: "illustration",
    },
    {
        title: "Images",
        value: "image",
    },
    {
        title: "Hidden Products",
        value: "hidden products",
    },
];

export const prodcuts = [
    {
        id: 1,
        productTitle: "product title",
        productCategory: "themes",
        productImage: "/fakeProductIcon/product1.svg",
    },
    {
        id: 2,
        productTitle: "product title",
        productCategory: "themes",
        productImage: "/fakeProductIcon/product2.svg",
    },
    {
        id: 3,
        productTitle: "product title",
        productCategory: "themes",
        productImage: "/fakeProductIcon/product3.svg",
    },
    {
        id: 4,
        productTitle: "product title",
        productCategory: "coded templates",
        productImage: "/fakeProductIcon/product1.svg",
    },
    {
        id: 5,
        productTitle: "product title",
        productCategory: "coded templates",
        productImage: "/fakeProductIcon/product2.svg",
    },
    {
        id: 6,
        productTitle: "product title",
        productCategory: "coded templates",
        productImage: "/fakeProductIcon/product3.svg",
    },
    {
        id: 7,
        productTitle: "product title",
        productCategory: "all products",
        productImage: "/fakeProductIcon/product1.svg",
    },
    {
        id: 8,
        productTitle: "product title",
        productCategory: "all products",
        productImage: "/fakeProductIcon/product2.svg",
    },
    {
        id: 9,
        productTitle: "product title",
        productCategory: "all products",
        productImage: "/fakeProductIcon/product3.svg",
    },
    {
        id: 10,
        productTitle: "product title",
        productCategory: "themes",
        productImage: "/fakeProductIcon/product1.svg",
    },
];

export const modalRadio = [
    {
        id: 1,
        label: "Hidden this product from site",
        value: "hide-product",
    },
    {
        id: 2,
        label: "Edit this product",
        value: "edit-product",
    },
];

export const transactionsData = [
    {
        id: "1",
        name: "Chandra Sen",
        product_name: "Professional Subscription ggggggggggggggg",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "2",
        name: "Chandra Kumari",
        product_name: "Buyout Licensce",
        plan: "Freebie",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "3",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "4",
        name: "Chandra Kumari",
        product_name: "Buyout Licensce",
        plan: "Freebie",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "5",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "6",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "7",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "8",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "9",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "10",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "11",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "12",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
    {
        id: "13",
        name: "Chandra Sen",
        product_name: "Professional Subscription",
        plan: "Professional",
        purchase_date: "15 May 2020",
        total_price: "$500",
    },
];
export const transactionsTableHead = [
    "User Name",
    "Product name",
    "Plan",
    "Purchase date",
    "Total Price",
];

export const ReplaceData = [
    {
        id: 1,
        label: "Web Themes",
        value: "theme",
    },
    {
        id: 2,
        label: "Coded Template",
        value: "template",
    },
    {
        id: 3,
        label: "Icons",
        value: "icon",
    },
    {
        id: 4,
        label: "Illustrations",
        value: "illustration",
    },
    {
        id: 5,
        label: "Image",
        value: "image",
    },
];
