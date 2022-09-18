"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRatioForEachAuction = void 0;
const formatNumber = ({ currentHighestBidValue, minimumRequiredAsk, }) => {
    return ((currentHighestBidValue / minimumRequiredAsk) * 100).toFixed(2) + "%";
};
const calculateRatioForEachAuction = (auctions) => {
    return auctions.map((auction) => {
        const auctionRatioProgress = !auction.currentHighestBidValue || !auction.minimumRequiredAsk
            ? null
            : formatNumber(auction);
        return {
            uuid: auction.uuid,
            state: auction.state,
            endingTime: auction.endingTime,
            auctionRatioProgress,
            currentHighestBidValue: auction.currentHighestBidValue,
            minimumRequiredAsk: auction.minimumRequiredAsk,
        };
    });
};
exports.calculateRatioForEachAuction = calculateRatioForEachAuction;
