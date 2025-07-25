'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Fuel, Truck, Flame, Navigation, RefreshCw, QrCode, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// Mock data 
const mockStations = [
  {
    id: 1,
    name: "Forte Oil - Ipaja",
    address: "123 Ipaja Road, Lagos",
    latitude: 6.5244,
    longitude: 3.3792,
    fuel_price: 617,
    diesel_price: 750,
    gas_price: 450,
    fuel_available: true,
    diesel_available: true,
    gas_available: false,
    last_updated: "2 mins ago"
  },
  {
    id: 2,
    name: "Mobil - Idiroko",
    address: "456 Idiroko Street, Lagos",
    latitude: 6.4698,
    longitude: 3.2906,
    fuel_price: 620,
    diesel_price: null,
    gas_price: 455,
    fuel_available: true,
    diesel_available: false,
    gas_available: true,
    last_updated: "5 mins ago"
  },
  {
    id: 3,
    name: "Total - Victoria Island",
    address: "789 Victoria Island, Lagos",
    latitude: 6.4281,
    longitude: 3.4219,
    fuel_price: 625,
    diesel_price: 780,
    gas_price: 460,
    fuel_available: true,
    diesel_available: true,
    gas_available: true,
    last_updated: "1 min ago"
  },
  {
    id: 4,
    name: "NNPC - Surulere",
    address: "321 Adeniran Ogunsanya, Surulere",
    latitude: 6.5028,
    longitude: 3.3611,
    fuel_price: 610,
    diesel_price: 740,
    gas_price: 440,
    fuel_available: false,
    diesel_available: true,
    gas_available: true,
    last_updated: "8 mins ago"
  }
];

const mockAlerts = [
  { id: 1, message: "Fuel restocked at Forte - Ipaja", type: "success" },
  { id: 2, message: "Diesel low at Mobil - Idiroko", type: "warning" },
  { id: 3, message: "New station added: Shell - Lekki", type: "info" }
];

// Calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Header Component
const Header = () => (
  <header className="bg-gradient-to-r from-gray-900 to-black text-white p-6 shadow-lg">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Fuel className="h-8 w-8 text-green-400" />
          <h1 className="text-2xl font-bold">Negzus</h1>
        </div>
        <nav className="flex space-x-6">
          <a href="#dashboard" className="hover:text-green-400 transition-colors">Dashboard</a>
          <a href="#stations" className="hover:text-green-400 transition-colors">Stations</a>
          <a href="#payments" className="hover:text-green-400 transition-colors">Payments</a>
        </nav>
      </div>
    </div>
  </header>
);

// Summary Stats Component
const SummaryStats = ({ stations }) => {
  const totalStations = stations.length;
  const availableStations = stations.filter(s => s.fuel_available || s.diesel_available || s.gas_available).length;
  const avgFuelPrice = stations
    .filter(s => s.fuel_price)
    .reduce((acc, s) => acc + s.fuel_price, 0) / stations.filter(s => s.fuel_price).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Stations</p>
            <p className="text-3xl font-bold text-white">{totalStations}</p>
          </div>
          <MapPin className="h-12 w-12 text-blue-400" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Available Now</p>
            <p className="text-3xl font-bold text-green-400">{availableStations}</p>
          </div>
          <CheckCircle className="h-12 w-12 text-green-400" />
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Avg Fuel Price</p>
            <p className="text-3xl font-bold text-yellow-400">₦{avgFuelPrice.toFixed(0)}</p>
          </div>
          <Fuel className="h-12 w-12 text-yellow-400" />
        </div>
      </div>
    </div>
  );
};

// Station Card Component
const StationCard = ({ station, userLocation, onPayment }) => {
  const distance = userLocation ? 
    calculateDistance(userLocation.lat, userLocation.lng, station.latitude, station.longitude) : 
    null;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{station.name}</h3>
          <p className="text-gray-400 mb-2 flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            {station.address}
          </p>
          {distance && (
            <p className="text-green-400 text-sm flex items-center">
              <Navigation className="h-4 w-4 mr-1" />
              {distance.toFixed(1)} km away
            </p>
          )}
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          {station.last_updated}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Fuel className={`h-5 w-5 mr-2 ${station.fuel_available ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-white font-medium">Petrol</span>
          </div>
          <p className="text-lg font-bold text-white">
            {station.fuel_price ? `₦${station.fuel_price}` : 'N/A'}
          </p>
          <p className={`text-xs ${station.fuel_available ? 'text-green-400' : 'text-red-400'}`}>
            {station.fuel_available ? 'Available' : 'Out of Stock'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Truck className={`h-5 w-5 mr-2 ${station.diesel_available ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-white font-medium">Diesel</span>
          </div>
          <p className="text-lg font-bold text-white">
            {station.diesel_price ? `₦${station.diesel_price}` : 'N/A'}
          </p>
          <p className={`text-xs ${station.diesel_available ? 'text-green-400' : 'text-red-400'}`}>
            {station.diesel_available ? 'Available' : 'Out of Stock'}
          </p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Flame className={`h-5 w-5 mr-2 ${station.gas_available ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-white font-medium">Gas</span>
          </div>
          <p className="text-lg font-bold text-white">
            {station.gas_price ? `₦${station.gas_price}` : 'N/A'}
          </p>
          <p className={`text-xs ${station.gas_available ? 'text-green-400' : 'text-red-400'}`}>
            {station.gas_available ? 'Available' : 'Out of Stock'}
          </p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button 
          onClick={() => onPayment(station)}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center font-medium"
        >
          <QrCode className="h-4 w-4 mr-2" />
          Pay with QR
        </button>
        <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center font-medium">
          <Navigation className="h-4 w-4 mr-2" />
          Get Directions
        </button>
      </div>
    </div>
  );
};

// QR Payment Modal
const QRPaymentModal = ({ station, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">QR Payment</h3>
          <p className="text-gray-400 mb-6">{station?.name}</p>
          
          <div className="bg-white p-6 rounded-lg mb-6">
            <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
              <QrCode className="h-24 w-24 text-gray-600" />
            </div>
          </div>
          
          <p className="text-gray-400 mb-6">
            Scan this QR code with your mobile app to complete payment
          </p>
          
          <div className="flex space-x-3">
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Payment Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alert Component
const AlertCard = ({ alert }) => {
  const getAlertColor = (type) => {
    switch (type) {
      case 'success': return 'border-green-400 bg-green-900/20';
      case 'warning': return 'border-yellow-400 bg-yellow-900/20';
      case 'info': return 'border-blue-400 bg-blue-900/20';
      default: return 'border-gray-400 bg-gray-900/20';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'info': return <AlertCircle className="h-5 w-5 text-blue-400" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className={`border-l-4 p-4 rounded-lg ${getAlertColor(alert.type)} mb-3`}>
      <div className="flex items-center">
        {getAlertIcon(alert.type)}
        <p className="ml-3 text-white">{alert.message}</p>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function GasStationDashboard() {
  const [stations, setStations] = useState(mockStations);
  const [alerts] = useState(mockAlerts);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyStations, setNearbyStations] = useState(mockStations);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, []);

  // Filter nearby stations
  useEffect(() => {
    if (userLocation) {
      const filtered = stations.filter(station => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          station.latitude,
          station.longitude
        );
        return distance <= 50; // 50km radius
      });
      setNearbyStations(filtered.sort((a, b) => {
        const distanceA = calculateDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
        const distanceB = calculateDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
        return distanceA - distanceB;
      }));
    } else {
      setNearbyStations(stations);
    }
  }, [userLocation, stations]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setStations([...mockStations]);
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const handlePayment = (station) => {
    setSelectedStation(station);
    setShowQRModal(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="max-w-7xl mx-auto p-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-gray-400">Real-time fuel availability and pricing</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center font-medium disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Summary Stats */}
        <SummaryStats stations={nearbyStations} />

        {/* Nearby Stations */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            {userLocation ? 'Nearby Stations' : 'All Stations'}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {nearbyStations.map((station) => (
              <StationCard
                key={station.id}
                station={station}
                userLocation={userLocation}
                onPayment={handlePayment}
              />
            ))}
          </div>
        </section>

        {/* Alerts Section */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6">Recent Alerts</h3>
          <div className="max-w-2xl">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </section>
      </main>

      {/* QR Payment Modal */}
      <QRPaymentModal
        station={selectedStation}
        isOpen={showQRModal}
        onClose={() => {
          setShowQRModal(false);
          setSelectedStation(null);
        }}
      />
    </div>
  );
}