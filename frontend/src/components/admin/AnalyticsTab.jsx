import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { 
  Users, Package, ShoppingCart, DollarSign, 
  CreditCard, Truck, MapPin, PieChart,
  BarChart2, LineChart as LineChartIcon
} from "lucide-react";
import { 
  LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analysis");
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return <div className="text-red-500 p-4">Failed to load analytics data</div>;
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8'>
      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <AnalyticsCard
          title='Total Customers'
          value={analyticsData.summary.customers.toLocaleString()}
          icon={Users}
          color='from-blue-500 to-indigo-700'
        />
        <AnalyticsCard
          title='Total Sellers'
          value={analyticsData.summary.sellers.toLocaleString()}
          icon={Users}
          color='from-purple-500 to-pink-700'
        />
        <AnalyticsCard
          title='Total Products'
          value={analyticsData.summary.products.toLocaleString()}
          icon={Package}
          color='from-emerald-500 to-green-700'
        />
        <AnalyticsCard
          title='Total Revenue'
          value={`$${analyticsData.summary.revenue.toLocaleString()}`}
          icon={DollarSign}
          color='from-amber-500 to-orange-700'
        />
      </div>

      {/* Sales Trends */}
      <div className="bg-gray-800/60 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <LineChartIcon className="mr-2" /> Sales Trends (Last 30 Days)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={analyticsData.salesTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Orders"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Product Categories */}
      <div className="bg-gray-800/60 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <PieChart className="mr-2" /> Product Categories
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <RechartsPieChart>
            <Pie
              data={analyticsData.productCategories}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {analyticsData.productCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Methods */}
      <div className="bg-gray-800/60 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <CreditCard className="mr-2" /> Payment Methods
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analyticsData.paymentMethods}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Transactions" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Regional Sales */}
      <div className="bg-gray-800/60 rounded-lg p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <MapPin className="mr-2" /> Regional Sales
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analyticsData.regionalSales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="region" stroke="#D1D5DB" />
            <YAxis stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" name="Orders" fill="#10B981" />
            <Bar dataKey="revenue" name="Revenue ($)" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <div className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative bg-gradient-to-br ${color}`}>
    <div className='flex justify-between items-center'>
      <div className='z-10'>
        <p className='text-gray-300 text-sm mb-1 font-semibold'>{title}</p>
        <h3 className='text-white text-3xl font-bold'>{value}</h3>
      </div>
      <Icon className="h-10 w-10 opacity-20" />
    </div>
  </div>
);

export default AnalyticsTab;