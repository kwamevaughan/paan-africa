"use client";

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

const PaymentAnalytics = ({ paymentData }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (paymentData) {
      // Simulate analytics data - in a real app, this would come from your backend
      const mockAnalytics = {
        totalPayments: 1247,
        totalRevenue: 125430,
        successRate: 94.2,
        averageAmount: 100.5,
        topCountries: [
          { name: 'Nigeria', count: 456, percentage: 36.6 },
          { name: 'Kenya', count: 234, percentage: 18.8 },
          { name: 'South Africa', count: 189, percentage: 15.2 },
          { name: 'Ghana', count: 156, percentage: 12.5 },
          { name: 'Egypt', count: 98, percentage: 7.9 }
        ],
        paymentMethods: [
          { name: 'Card', count: 892, percentage: 71.5 },
          { name: 'Bank Transfer', count: 234, percentage: 18.8 },
          { name: 'Mobile Money', count: 121, percentage: 9.7 }
        ],
        recentPayments: [
          {
            id: 1,
            reference: 'PAAN_AWARDS_AGENCY_1234567890',
            amount: 300,
            currency: 'USD',
            status: 'success',
            timestamp: new Date().toISOString(),
            type: 'awards_application'
          },
          {
            id: 2,
            reference: 'PAAN_SUMMIT_MEMBERS_1234567891',
            amount: 100,
            currency: 'USD',
            status: 'success',
            timestamp: new Date(Date.now() - 300000).toISOString(),
            type: 'summit_ticket'
          }
        ]
      };
      
      setAnalytics(mockAnalytics);
      setLoading(false);
    }
  }, [paymentData]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalPayments.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <Icon icon="mdi:credit-card" className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <Icon icon="mdi:currency-usd" className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.successRate}%</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <Icon icon="mdi:chart-line" className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Amount</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.averageAmount}</p>
            </div>
            <div className="bg-purple-100 rounded-full p-3">
              <Icon icon="mdi:calculator" className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
          <div className="space-y-3">
            {analytics.topCountries.map((country, index) => (
              <div key={country.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                  <span className="text-sm font-medium text-gray-900">{country.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-paan-red h-2 rounded-full" 
                      style={{ width: `${country.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12 text-right">
                    {country.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {analytics.paymentMethods.map((method, index) => (
              <div key={method.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon 
                    icon={
                      method.name === 'Card' ? 'mdi:credit-card' :
                      method.name === 'Bank Transfer' ? 'mdi:bank' :
                      'mdi:cellphone'
                    } 
                    className="w-5 h-5 text-gray-600" 
                  />
                  <span className="text-sm font-medium text-gray-900">{method.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-paan-blue h-2 rounded-full" 
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12 text-right">
                    {method.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.recentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                    {payment.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {payment.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount} {payment.currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentAnalytics;
