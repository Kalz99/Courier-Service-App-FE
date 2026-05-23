import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { InputField, TrackingDetailsModal } from '../components/ui';
import logoImg from '../assets/logo.png';

export const TrackingPage: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [searchNumber, setSearchNumber] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const trimmed = trackingNumber.trim();
        if (!trimmed) {
            setError('Please enter a tracking number to look up.');
            return;
        }

        // Trigger search by passing tracking number to search state which opens the modal
        setSearchNumber(trimmed);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-[480px] bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden animate-fade-in">

                {/* Header with Back to Login Link */}
                <div className="flex items-center justify-between w-full select-none">
                    <Link
                        to="/login"
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
                        <span>Back to Login</span>
                    </Link>
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                        Public Tracker
                    </span>
                </div>

                {/* Branding Title */}
                <div className="flex flex-col items-center text-center gap-3.5 mt-2">
                    <div className="flex items-center gap-3">
                        <img
                            src={logoImg}
                            alt="ShipSync Logo"
                            className="w-10 h-10 object-contain"
                        />
                        <h1 className="text-2xl font-bold text-slate-900">
                            ShipSync Tracking
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 max-w-[320px] leading-relaxed">
                        Enter your unique tracking code below to fetch instant real-time package updates, courier milestones, and transit timestamps.
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex flex-col gap-4 w-full mt-2">



                    {/* Input Field Component */}
                    <InputField
                        label="Tracking Number"
                        type="text"
                        placeholder="e.g. TN-20260523-ABCDEF"
                        value={trackingNumber}
                        onChange={(e) => {
                            setTrackingNumber(e.target.value);
                            if (error) setError(null);
                        }}
                        icon={<Search className="w-4 h-4 text-slate-400" />}
                        required
                    />

                    {/* Search Trigger Button Component */}
                    <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-primary text-white font-medium flex items-center justify-center gap-2 transition hover:opacity-95 select-none active:scale-[0.99] cursor-pointer"
                    >
                        <Search className="w-4 h-4" />
                        <span>Search Shipment</span>
                    </button>
                </form>

                {/* Tracking Details Modal */}
                <TrackingDetailsModal
                    isOpen={Boolean(searchNumber)}
                    onClose={() => setSearchNumber(null)}
                    trackingNumber={searchNumber}
                />

                <div className="text-center mt-4">
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                        Protected by ShipSync Secured live transit feeds. All logs encrypted.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TrackingPage;
