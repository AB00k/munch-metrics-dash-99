
export const dashboardData = {
  monthlyOrders: {
    total: 1458,
    projected: 1750,
    target: 2000,
    percentToTarget: 73
  },
  kpis: [
    {
      title: "Orders",
      value: 1458,
      change: 12.3,
      icon: "utensils"
    },
    {
      title: "Revenue",
      value: 124750,
      change: 8.5,
      icon: "banknote",
      prefix: "AED"
    },
    {
      title: "Conversion Rate",
      value: 24.8,
      change: 1.7,
      icon: "percent",
      suffix: "%"
    },
    {
      title: "Ads Spend",
      value: 28650,
      change: -4.2,
      icon: "megaphone",
      prefix: "AED"
    },
    {
      title: "New Customers",
      value: 342,
      change: 18.9,
      icon: "user-plus"
    },
    {
      title: "Old Customers",
      value: 1116,
      change: 5.3,
      icon: "users"
    },
    {
      title: "Avg Basket Value",
      value: 85.56,
      change: 3.7,
      icon: "shopping-bag",
      prefix: "AED",
      decimal: true
    },
    {
      title: "Menu To Cart Clicks",
      value: 32.4,
      change: 2.1,
      icon: "mouse-pointer-click",
      suffix: "%"
    },
    {
      title: "Cart To Order Clicks",
      value: 76.8,
      change: 4.6,
      icon: "shopping-cart",
      suffix: "%"
    },
    {
      title: "Cancelled Orders",
      value: 87,
      change: -2.3,
      icon: "x-circle"
    }
  ],
  platforms: [
    { name: "Website", orders: 648, percentage: 44.4 },
    { name: "Mobile App", orders: 524, percentage: 35.9 },
    { name: "Food Delivery", orders: 198, percentage: 13.6 },
    { name: "Phone", orders: 88, percentage: 6.1 }
  ],
  locations: [
    { name: "Downtown", orders: 524, percentage: 35.9 },
    { name: "Marina", orders: 386, percentage: 26.5 },
    { name: "Business Bay", orders: 312, percentage: 21.4 },
    { name: "JBR", orders: 236, percentage: 16.2 }
  ]
};
