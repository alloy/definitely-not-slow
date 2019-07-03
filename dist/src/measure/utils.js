"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sum(xs) {
    return xs.reduce((sum, x) => sum + x, 0);
}
exports.sum = sum;
function mean(xs) {
    return sum(xs) / xs.length;
}
exports.mean = mean;
function max(xs, mapper) {
    return xs.reduce((max, x) => mapper(x) > mapper(max) ? x : max, xs[0]);
}
exports.max = max;
function median(xs) {
    const sorted = xs.slice().sort();
    const lower = sorted[Math.floor(xs.length / 2)];
    const upper = sorted[Math.ceil(xs.length / 2)];
    return mean([lower, upper]);
}
exports.median = median;
function stdDev(xs) {
    return Math.sqrt(variance(xs));
}
exports.stdDev = stdDev;
function variance(xs) {
    const avg = mean(xs);
    return mean(xs.map(x => Math.pow((avg - x), 2)));
}
exports.variance = variance;
function coefficientOfVariation(xs) {
    const standardDeviation = stdDev(xs);
    const avg = mean(xs);
    return standardDeviation / avg;
}
exports.coefficientOfVariation = coefficientOfVariation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWVhc3VyZS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFNBQWdCLEdBQUcsQ0FBQyxFQUFZO0lBQzlCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUZELGtCQUVDO0FBRUQsU0FBZ0IsSUFBSSxDQUFDLEVBQVk7SUFDL0IsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUM3QixDQUFDO0FBRkQsb0JBRUM7QUFFRCxTQUFnQixHQUFHLENBQUksRUFBTyxFQUFFLE1BQXdCO0lBQ3RELE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFGRCxrQkFFQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxFQUFZO0lBQ2pDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE9BQU8sSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUxELHdCQUtDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLEVBQVk7SUFDakMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFGRCx3QkFFQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxFQUFZO0lBQ25DLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBQSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUhELDRCQUdDO0FBRUQsU0FBZ0Isc0JBQXNCLENBQUMsRUFBWTtJQUNqRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckIsT0FBTyxpQkFBaUIsR0FBRyxHQUFHLENBQUM7QUFDakMsQ0FBQztBQUpELHdEQUlDIn0=