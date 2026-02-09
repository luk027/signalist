'use client';
import Link from 'next/link';
import { Star, Trash2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useWatchlist from '@/hooks/useWatchlist';

const WatchlistPage = () => {
    const { watchlist, removeFromWatchlist, isLoaded } = useWatchlist();

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-pulse text-gray-500">Loading watchlist...</div>
            </div>
        );
    }

    if (watchlist.length === 0) {
        return (
            <div className="watchlist-empty-container flex">
                <div className="watchlist-empty">
                    <Star className="watchlist-star" />
                    <h2 className="empty-title">Your watchlist is empty</h2>
                    <p className="empty-description">
                        Start building your watchlist by searching for stocks and adding them to track.
                    </p>
                    <Link href="/">
                        <Button className="yellow-btn px-6">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Explore Stocks
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="watchlist-title">
                    <Star className="inline-block h-6 w-6 mr-2 text-yellow-500 fill-yellow-500" />
                    My Watchlist
                </h1>
                <span className="text-gray-500 text-sm">{watchlist.length} stock{watchlist.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {watchlist.map((symbol) => (
                    <div
                        key={symbol}
                        className="group relative bg-gray-800 border border-gray-600 rounded-lg p-4 hover:border-yellow-500/50 transition-colors"
                    >
                        <Link href={`/stocks/${symbol}`} className="block">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-yellow-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-100 text-lg">{symbol}</h3>
                                    <p className="text-gray-500 text-sm">Click to view details</p>
                                </div>
                            </div>
                        </Link>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromWatchlist(symbol)}
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WatchlistPage;
