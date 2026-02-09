'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Search } from 'lucide-react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { POPULAR_STOCK_SYMBOLS } from '@/lib/constants';

const StockSearch = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isNavigating, setIsNavigating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const filteredSymbols = useMemo(() => {
        if (!query.trim()) return POPULAR_STOCK_SYMBOLS.slice(0, 10);
        const upperQuery = query.toUpperCase();
        return POPULAR_STOCK_SYMBOLS.filter(
            (item) =>
                item.symbol.toUpperCase().includes(upperQuery) ||
                item.name.toUpperCase().includes(upperQuery)
        );
    }, [query]);

    const handleSelect = (symbol: string) => {
        setIsNavigating(true);
        setOpen(false);
        setQuery('');
        router.push(`/stocks/${symbol}`);
        setTimeout(() => setIsNavigating(false), 1000);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="search-btn !rounded-xl"
            >
                <Search className="h-4 w-4" />
                <span className="hidden md:inline">Search</span>
                <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border border-gray-600 bg-gray-700 px-1.5 font-mono text-xs text-gray-400">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                title="Search Stocks"
                description="Search for stocks by symbol"
                className="search-dialog"
                showCloseButton={false}
            >
                <div className="search-field">
                    <CommandInput
                        placeholder="Search stock symbols..."
                        value={query}
                        onValueChange={setQuery}
                        className="search-input"
                    />
                    {isNavigating && (
                        <Loader2 className="search-loader" />
                    )}
                </div>
                <CommandList className="search-list">
                    <CommandEmpty className="search-list-empty">
                        No stocks found.
                    </CommandEmpty>
                    {filteredSymbols.length > 0 && (
                        <div className="search-count">
                            {filteredSymbols.length} result{filteredSymbols.length !== 1 ? 's' : ''}
                        </div>
                    )}
                    <CommandGroup>
                        {filteredSymbols.map((item) => (
                            <CommandItem
                                key={item.symbol}
                                value={`${item.symbol} ${item.name}`}
                                onSelect={() => handleSelect(item.symbol)}
                                className="search-item"
                            >
                                <div className="search-item-link">
                                    <span className="search-item-name">{item.symbol}</span>
                                    <span className="text-xs text-gray-400 ml-2">{item.name}</span>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};

export default StockSearch;
