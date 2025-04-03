// controllers/analyticsController.js
export const getAnalyticsData = async (req, res) => {
    try {
      // Generate dates for last 30 days
      const dates = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString().split('T')[0];
      });
  
      // Generate dummy data
      const data = {
        summary: {
          customers: 1245,
          sellers: 86,
          products: 342,
          orders: 876,
          revenue: 58432.50
        },
        salesTrends: dates.map(date => ({
          date,
          orders: Math.floor(Math.random() * 30) + 10,
          revenue: parseFloat((Math.random() * 2000 + 500).toFixed(2))
        })),
        productCategories: [
          { name: "Electronics", value: 124 },
          { name: "Clothing", value: 89 },
          { name: "Home & Kitchen", value: 76 },
          { name: "Books", value: 45 },
          { name: "Sports", value: 32 }
        ],
        paymentMethods: [
          { name: "Credit Card", value: 542 },
          { name: "PayPal", value: 321 },
          { name: "Bank Transfer", value: 156 },
          { name: "Cash on Delivery", value: 87 }
        ],
        regionalSales: [
          { region: "North", orders: 215, revenue: 14532.50 },
          { region: "South", orders: 187, revenue: 12456.75 },
          { region: "East", orders: 156, revenue: 9876.30 },
          { region: "West", orders: 198, revenue: 13245.90 },
          { region: "Central", orders: 120, revenue: 8321.05 }
        ],
        topSellers: [
          { name: "TechGadgets Inc", products: 42, sales: 215 },
          { name: "FashionHub", products: 38, sales: 187 },
          { name: "HomeEssentials", products: 35, sales: 156 },
          { name: "BookWorld", products: 28, sales: 132 },
          { name: "SportsZone", products: 25, sales: 118 }
        ],
        customerDemographics: [
          { age: "18-24", count: 215 },
          { age: "25-34", count: 345 },
          { age: "35-44", count: 287 },
          { age: "45-54", count: 156 },
          { age: "55+", count: 87 }
        ]
      };
  
      res.json(data);
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(500).json({ error: 'Failed to generate analytics data' });
    }
  };