
import { FC, useMemo } from "react";
import { useMarkets } from "@orderly.network/hooks";
import { Flex, Text } from "@orderly.network/ui";

export const PriceCarousel: FC = () => {
    const [markets] = useMarkets();

    const tickerItems = useMemo(() => {
        if (!markets || !Array.isArray(markets) || markets.length === 0) return [];

        return markets.map((market: any) => {
            const symbolFull = market.symbol.replace("PERP_", "").replace("_USDC", "");
            const [base] = symbolFull.split("_");

            const changeVal = market["24h_change"] ?? market.change ?? 0;
            const change = changeVal * 100;
            const price = market.last_price ?? market.lastPrice ?? 0;
            const isPositive = change >= 0;

            // Orderly Network Token Logo CDN
            const logoUrl = `https://oss.orderly.network/static/symbol_logo/${base}.png`;

            return (
                <div key={market.symbol} className="ticker-item oui-h-full">
                    <Flex gap={2} itemAlign="center" className="oui-h-full">
                        <img
                            src={logoUrl}
                            alt={base}
                            className="oui-w-4 oui-h-4 oui-rounded-full"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        <Text size="2xs" weight="bold" className="oui-text-base-contrast-80">
                            {base}
                        </Text>
                        <Text size="2xs" className="oui-text-base-contrast-54">
                            {typeof price === 'number' ? price.toFixed(2) : price}
                        </Text>
                        <Text
                            size="2xs"
                            className={isPositive ? "oui-text-success" : "oui-text-danger"}
                        >
                            {isPositive ? "+" : ""}
                            {change.toFixed(2)}%
                        </Text>
                    </Flex>
                </div>
            );
        });
    }, [markets]);

    if (!markets || markets.length === 0) {
        return (
            <div className="oui-h-8 oui-flex oui-items-center oui-justify-center">
                <Text size="2xs" className="oui-text-base-contrast-36">Connecting to markets...</Text>
            </div>
        );
    }

    return (
        <div className="ticker-wrap oui-h-8 oui-flex oui-items-center">
            <div className="ticker-content" style={{ paddingLeft: 0 }}>
                {tickerItems}
                {tickerItems}
            </div>
        </div>
    );
};

export default PriceCarousel;
