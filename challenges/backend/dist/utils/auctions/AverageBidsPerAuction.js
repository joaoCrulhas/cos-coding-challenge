"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.averageBidsPerAuction = void 0;
const averageBidsPerAuction = (auctions) => {
    if (!auctions.length) {
        return 0;
    }
    return Math.ceil(auctions.reduce((pv, { numBids }) => {
        return pv + numBids;
    }, 0) / auctions.length);
};
exports.averageBidsPerAuction = averageBidsPerAuction;
