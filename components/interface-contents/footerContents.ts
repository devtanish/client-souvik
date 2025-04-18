interface Shop {
    name: string,
    href?: string
}

interface Service {
    name: string,
    href?: string
}

interface Company{
    name: string,
    href?: string
}

export const shop: Shop[] = [{
    name: "Ring",
    href: "/Ring"
}, {
    name: "Earring",
    href: "/Earring"
}, {
    name: "Necklace",
    href: "/Necklace"
}, {
    name: "New",
    href: "/New"
}, {
    name: "Sale",
    href: "/Sale"
}]

export const customeService: Service[] = [{
    name: "Shipping & Returns",
},{
    name: "Store Policy",
},{
    name: "Payment Methods",
},{
    name: "FAQ",
}]

export const company: Company[] = [{
    name: "Blog",
},{
    name: "About Up",
},{
    name: "Careers",
},{
    name: "Customer Stories",
},{
    name: "Contact",
}]