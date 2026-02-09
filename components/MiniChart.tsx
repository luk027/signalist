'use client';
import { useRef, useEffect } from 'react';

interface MiniChartProps {
    symbol: string;
}

const MiniChart = ({ symbol }: MiniChartProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        if (containerRef.current.dataset.loaded) return;

        const config = {
            symbol: symbol.toUpperCase(),
            width: '100%',
            height: 80,
            locale: 'en',
            dateRange: '1M',
            colorTheme: 'dark',
            isTransparent: true,
            autosize: false,
            largeChartUrl: '',
            chartOnly: false,
            noTimeScale: true,
        };

        containerRef.current.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
        script.async = true;
        script.innerHTML = JSON.stringify(config);
        containerRef.current.appendChild(script);
        containerRef.current.dataset.loaded = 'true';

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
                delete containerRef.current.dataset.loaded;
            }
        };
    }, [symbol]);

    return <div ref={containerRef} className="w-full h-20 overflow-hidden rounded" />;
};

export default MiniChart;
