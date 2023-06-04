export function calculateElectricityBill(usage) {
    const tiers = [
        { limit: 50, rate: 1678 },
        { limit: 100, rate: 1734 },
        { limit: 200, rate: 2014 },
        { limit: 300, rate: 2536 },
        { limit: 400, rate: 2834 },
        { rate: 2927 }
    ];

    let totalBill = 0;
    let remainingUsage = usage;

    for (let i = 0; i < tiers.length; i++) {
        if (remainingUsage <= 0) {
            break;
        }

        const currentTier = tiers[i];
        const currentRate = currentTier.rate;
        const tierUsage = currentTier.limit ? Math.min(remainingUsage, currentTier.limit) : remainingUsage;

        totalBill += tierUsage * currentRate;
        remainingUsage -= tierUsage;
    }

    return totalBill.toFixed(1);
}

export function calculateElectricityFromAmount(amount) {
    // Calculate the amount without tax
    var amountWithoutTax = amount / 1.1;

    // Array to store pricing tiers and their corresponding consumption limits
    var pricingTiers = [
        { limit: 50, price: 1678 },
        { limit: 100, price: 1734 },
        { limit: 200, price: 2014 },
        { limit: 300, price: 2536 },
        { limit: 400, price: 2834 },
        { limit: Infinity, price: 2927 } // Set the last limit to Infinity
    ];

    // Calculate electricity consumption from the amount without tax
    var consumption = 0;
    for (var i = 0; i < pricingTiers.length; i++) {
        var tier = pricingTiers[i];

        if (amountWithoutTax <= tier.limit * tier.price) {
            consumption += amountWithoutTax / tier.price;
            break;
        } else {
            consumption += tier.limit;
            amountWithoutTax -= tier.limit * tier.price;
        }
    }

    console.log("===consumption", consumption);

    return Math.ceil(consumption);
}