'use client';
import { useState, useEffect, useCallback } from 'react';

const WATCHLIST_KEY = 'signalist_watchlist';

const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(WATCHLIST_KEY);
            if (stored) {
                try {
                    setWatchlist(JSON.parse(stored));
                } catch {
                    setWatchlist([]);
                }
            }
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (isLoaded && typeof window !== 'undefined') {
            localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
        }
    }, [watchlist, isLoaded]);

    const addToWatchlist = useCallback((symbol: string) => {
        const upperSymbol = symbol.toUpperCase();
        setWatchlist((prev) => {
            if (prev.includes(upperSymbol)) return prev;
            return [...prev, upperSymbol];
        });
    }, []);

    const removeFromWatchlist = useCallback((symbol: string) => {
        const upperSymbol = symbol.toUpperCase();
        setWatchlist((prev) => prev.filter((s) => s !== upperSymbol));
    }, []);

    const isInWatchlist = useCallback(
        (symbol: string) => watchlist.includes(symbol.toUpperCase()),
        [watchlist]
    );

    return {
        watchlist,
        isLoaded,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
    };
};

export default useWatchlist;
