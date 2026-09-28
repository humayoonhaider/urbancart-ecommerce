import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  User,
  MapPin,
  CreditCard,
  Award,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Shield,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { SavedAddress } from '../types';

export const Profile: React.FC = () => {
  const {
    userProfile,
    updateProfile,
    addAddress,
    deleteAddress,
    setDefaultAddress,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'cards' | 'security'>('profile');

  // Profile Form state
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);

  // Add Address Modal
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState('Home');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrProvince, setNewAddrProvince] = useState('');
  const [newAddrZip, setNewAddrZip] = useState('');
  const [newAddrIsDefault, setNewAddrIsDefault] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone });
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrStreet || !newAddrCity) {
      showToast('Incomplete Address', 'Street address and city are required.', 'warning');
      return;
    }

    addAddress({
      label: newAddrLabel,
      address: newAddrStreet,
      city: newAddrCity,
      province: newAddrProvince || 'Federal Capital',
      postalCode: newAddrZip || '44000',
      country: 'Pakistan',
      isDefault: newAddrIsDefault
    });

    setIsAddAddressOpen(false);
    setNewAddrStreet('');
    setNewAddrCity('');
    setNewAddrProvince('');
    setNewAddrZip('');
  };

  const handleResetSession = () => {
    localStorage.clear();
    showToast('Storage Reset', 'Demo localStorage was cleared. Reloading page...', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl font-heading shadow-md">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white font-heading">
                {userProfile.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                {userProfile.tier}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Member since {userProfile.memberSince} • {userProfile.rewardPoints} Reward Points
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout: Navigation Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="bg-white dark:bg-neutral-900 p-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-row lg:flex-col gap-1 overflow-x-auto">
          {[
            { id: 'profile', label: 'Personal Details', icon: User },
            { id: 'addresses', label: 'Address Book', icon: MapPin },
            { id: 'cards', label: 'Payment Cards', icon: CreditCard },
            { id: 'security', label: 'Preferences & Demo Reset', icon: Shield }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer text-left w-full ${
                activeTab === tab.id
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* TAB 1: Profile Form */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-heading mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                Personal Information
              </h3>

              <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 max-w-xl">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: Addresses */}
          {activeTab === 'addresses' && (
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-heading">
                  Shipping Addresses
                </h3>
                <button
                  onClick={() => setIsAddAddressOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold cursor-pointer hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userProfile.addresses.map(addr => (
                  <div
                    key={addr.id}
                    className={`p-5 rounded-2xl border flex flex-col justify-between ${
                      addr.isDefault
                        ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-950/20'
                        : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-neutral-900 dark:text-white font-heading">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {addr.address} <br />
                        {addr.city}, {addr.province} {addr.postalCode} <br />
                        {addr.country}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                      {!addr.isDefault ? (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="font-semibold text-blue-600 hover:underline cursor-pointer"
                        >
                          Set as Default
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Default shipping
                        </span>
                      )}

                      {userProfile.addresses.length > 1 && (
                        <button
                          onClick={() => deleteAddress(addr.id)}
                          className="text-neutral-400 hover:text-red-500 cursor-pointer p-1"
                          title="Delete address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Cards */}
          {activeTab === 'cards' && (
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col gap-6">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-heading pb-4 border-b border-neutral-100 dark:border-neutral-800">
                Saved Payment Methods (Simulated)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userProfile.savedCards.map(card => (
                  <div
                    key={card.id}
                    className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-md flex flex-col justify-between h-44 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">UrbanCard</span>
                      <CreditCard className="w-6 h-6 text-blue-400" />
                    </div>

                    <div className="text-lg font-mono tracking-widest font-bold">
                      •••• •••• •••• {card.lastFour}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-neutral-400">Cardholder</div>
                        <div className="font-semibold uppercase">{card.cardHolder}</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-neutral-400">Expires</div>
                        <div className="font-mono">{card.expiry}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Security & Demo Reset */}
          {activeTab === 'security' && (
            <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs flex flex-col gap-6">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white font-heading pb-4 border-b border-neutral-100 dark:border-neutral-800">
                Data Storage &amp; Session Management
              </h3>

              <div className="flex flex-col gap-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  UrbanCart runs 100% on frontend state and browser HTML5 <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded">localStorage</code>. No external cookies, tracking telemetry, or remote servers store your information.
                </p>

                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 flex items-center justify-between gap-4">
                  <div>
                    <h5 className="font-bold text-neutral-900 dark:text-white">Reset Local Demo Storage</h5>
                    <p className="text-xs text-neutral-500 mt-0.5">Clears cart, wishlist, and restores default mock database.</p>
                  </div>
                  <button
                    onClick={handleResetSession}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Reset Storage
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Address Modal */}
      {isAddAddressOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add New Address"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsAddAddressOpen(false)}
        >
          <div
            className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold font-heading text-neutral-900 dark:text-white">
                Add New Delivery Address
              </h3>
              <button onClick={() => setIsAddAddressOpen(false)} className="p-1 text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAddress} className="flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                  Label (e.g. Home, Studio, Beach House)
                </label>
                <input
                  type="text"
                  required
                  value={newAddrLabel}
                  onChange={(e) => setNewAddrLabel(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={newAddrStreet}
                  onChange={(e) => setNewAddrStreet(e.target.value)}
                  placeholder="House/Street details"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={newAddrCity}
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    placeholder="e.g. Lahore"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                    Province
                  </label>
                  <input
                    type="text"
                    value={newAddrProvince}
                    onChange={(e) => setNewAddrProvince(e.target.value)}
                    placeholder="e.g. Punjab"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={newAddrZip}
                  onChange={(e) => setNewAddrZip(e.target.value)}
                  placeholder="54000"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newAddrIsDefault}
                  onChange={(e) => setNewAddrIsDefault(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                />
                <span>Set as default shipping address</span>
              </label>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddAddressOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-500"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
