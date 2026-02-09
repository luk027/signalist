import TradingViewWidget from '@/components/TradingViewWidget';
import WatchlistButton from '@/components/WatchlistButton';
import {
    SYMBOL_INFO_WIDGET_CONFIG,
    CANDLE_CHART_WIDGET_CONFIG,
    BASELINE_WIDGET_CONFIG,
    TECHNICAL_ANALYSIS_WIDGET_CONFIG,
    COMPANY_PROFILE_WIDGET_CONFIG,
    COMPANY_FINANCIALS_WIDGET_CONFIG,
} from '@/lib/constants';

interface StockDetailsProps {
    params: Promise<{ symbol: string }>;
}

const StockDetails = async ({ params }: StockDetailsProps) => {
    const { symbol } = await params;
    const upperSymbol = symbol.toUpperCase();
    const scriptUrl = 'https://s3.tradingview.com/external-embedding/embed-widget-';

    return (
        <div className="grid stock-details-container">
            <div className="xl:col-span-2 space-y-6">
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}symbol-info.js`}
                    config={SYMBOL_INFO_WIDGET_CONFIG(upperSymbol)}
                    height={170}
                />
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}advanced-chart.js`}
                    config={CANDLE_CHART_WIDGET_CONFIG(upperSymbol)}
                    height={600}
                />
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}advanced-chart.js`}
                    config={BASELINE_WIDGET_CONFIG(upperSymbol)}
                    height={600}
                />
            </div>
            <div className="xl:col-span-1 space-y-6">
                <WatchlistButton symbol={upperSymbol} />
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}technical-analysis.js`}
                    config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(upperSymbol)}
                    height={400}
                />
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}symbol-profile.js`}
                    config={COMPANY_PROFILE_WIDGET_CONFIG(upperSymbol)}
                    height={440}
                />
                <TradingViewWidget
                    scriptUrl={`${scriptUrl}financials.js`}
                    config={COMPANY_FINANCIALS_WIDGET_CONFIG(upperSymbol)}
                    height={464}
                />
            </div>
        </div>
    );
};

export default StockDetails;
