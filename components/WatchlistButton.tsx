'use client';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useWatchlist from '@/hooks/useWatchlist';
import { cn } from '@/lib/utils';

interface WatchlistButtonProps {
    symbol: string;
}

const WatchlistButton = ({ symbol }: WatchlistButtonProps) => {
    const { isInWatchlist, addToWatchlist, removeFromWatchlist, isLoaded } = useWatchlist();
    const inWatchlist = isInWatchlist(symbol);

    const handleClick = () => {
        if (inWatchlist) {
            removeFromWatchlist(symbol);
        } else {
            addToWatchlist(symbol);
        }
    };

    if (!isLoaded) {
        return (
            <Button disabled className="watchlist-btn">
                <Star className="h-4 w-4 mr-2" />
                Loading...
            </Button>
        );
    }

    return (
        <Button
            onClick={handleClick}
            className={cn('watchlist-btn', inWatchlist && 'watchlist-remove')}
        >
            <Star className={cn('h-4 w-4 mr-2', inWatchlist && 'fill-current')} />
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </Button>
    );
};

export default WatchlistButton;
