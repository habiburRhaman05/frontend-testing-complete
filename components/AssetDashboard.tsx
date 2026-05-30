"use client"
import React, { useState, useEffect } from 'react';
import CoinCard from './CoinCard';

export interface AssetData {
  id: string;
  name: string;
  symbol: string;
  price: number;
}

export const AssetDashboard: React.FC = () => {
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Real Public API: CoinGecko Top 10 Crypto Markets
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch network market statistics');
        }
        
        const data = await response.json();
        
        // Real API response-কে আমাদের AssetData ইন্টারফেসের সাথে ম্যাপ করা হচ্ছে
        const mappedAssets: AssetData[] = data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          price: coin.current_price,
        }));

        setAssets(mappedAssets);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  // সার্চ কুয়েরি অনুযায়ী ফিল্টার
  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Network Market Statistics</h2>

      <input
        type="text"
        placeholder="Search assets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 px-4 py-2 rounded mb-4 text-white focus:outline-none"
      />

      {/* 1. Loading State */}
      {loading && (
        <div data-testid="loading-spinner" className="text-center py-6 text-gray-400">
          Loading network updates...
        </div>
      )}

      {/* 2. Error State */}
      {error && (
        <div data-testid="error-message" className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {/* 3. Empty State (When search doesn't match) */}
      {!loading && !error && filteredAssets.length === 0 && (
        <p className="text-gray-400 text-center py-4">No matching assets found.</p>
      )}

      {/* 4. Success State & Data Render */}
      {!loading && !error && filteredAssets.length > 0 && (
        <div className="space-y-2">
          {filteredAssets.map((asset) => (
           <CoinCard asset={asset}  key={asset.id}/>
          ))}
        </div>
      )}
    </div>
  );
};