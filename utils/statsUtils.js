// Utility functions for calculating statistics

export function getInventoryStats(products) {
    const stats = {
        totalCars: 0,
        totalBikes: 0,
        totalSpares: 0,
        totalKits: 0,
        availableCars: 0,
        availableBikes: 0,
        rentedCars: 0,
        rentedBikes: 0,
        totalCarUnits: 0,
        totalBikeUnits: 0,
        availableCarUnits: 0,
        availableBikeUnits: 0,
        rentedCarUnits: 0,
        rentedBikeUnits: 0,
        spares: [], // All spares
        carSpares: [], // Only car spares
        bikeSpares: [], // Only bike spares
        cars: [], // Detailed cars list
        bikes: [] // Detailed bikes list
    };

    products.forEach(product => {
        if (product.type === 'car') {
            stats.totalCars++;
            stats.totalCarUnits += 2; // Each vehicle has 2 units
            const carInfo = {
                name: product.name,
                price: product.price,
                rented: product.rented || false,
                units: 2
            };
            stats.cars.push(carInfo);

            if (!product.rented) {
                stats.availableCars++;
                stats.availableCarUnits += 2;
            } else {
                stats.rentedCars++;
                stats.rentedCarUnits += 2;
            }
        } else if (product.type === 'bike') {
            stats.totalBikes++;
            stats.totalBikeUnits += 2; // Each vehicle has 2 units
            const bikeInfo = {
                name: product.name,
                price: product.price,
                rented: product.rented || false,
                units: 2
            };
            stats.bikes.push(bikeInfo);

            if (!product.rented) {
                stats.availableBikes++;
                stats.availableBikeUnits += 2;
            } else {
                stats.rentedBikes++;
                stats.rentedBikeUnits += 2;
            }
        } else if (product.type === 'part') {
            stats.totalSpares++;
            // Add spare part details
            const spareInfo = {
                name: product.name,
                stock: product.stock || 0,
                price: product.price,
                category: product.category
            };
            stats.spares.push(spareInfo);

            if (product.category === 'Super Car Parts') {
                stats.carSpares.push(spareInfo);
            } else if (product.category === 'Super Bike Parts') {
                stats.bikeSpares.push(spareInfo);
            }
        } else if (product.type === 'kit') {
            stats.totalKits++;
        }
    });

    return stats;
}

export function getRentalStats(orders) {
    const currentRentals = [];
    const totalRentals = orders.length;

    orders.forEach(order => {
        order.items.forEach(item => {
            if (item.type === 'car' || item.type === 'bike') {
                currentRentals.push({
                    name: item.name,
                    type: item.type,
                    startDate: order.startDate,
                    endDate: order.endDate,
                    customer: order.customerInfo?.name || 'N/A',
                    units: item.quantity || 1
                });
            }
        });
    });

    return {
        currentRentals,
        totalRentals,
        activeRentals: currentRentals.length
    };
}

export function getSalesStats(orders) {
    const sparesSold = {};
    let totalUnitsSold = 0;
    let totalRevenue = 0;

    orders.forEach(order => {
        order.items.forEach(item => {
            if (item.type === 'spare') {
                const key = item.name;
                if (!sparesSold[key]) {
                    sparesSold[key] = {
                        name: item.name,
                        units: 0,
                        revenue: 0
                    };
                }
                sparesSold[key].units += item.quantity || 1;
                sparesSold[key].revenue += item.price * (item.quantity || 1);
                totalUnitsSold += item.quantity || 1;
                totalRevenue += item.price * (item.quantity || 1);
            }
        });
    });

    return {
        sparesSold: Object.values(sparesSold),
        totalUnitsSold,
        totalRevenue
    };
}

export function getVisitorStats(visits) {
    const now = new Date();
    const oneHourAgo = new Date(now - 60 * 60 * 1000);
    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const stats = {
        lastHour: 0,
        today: 0,
        thisMonth: 0,
        thisYear: 0,
        allTime: visits.length
    };

    visits.forEach(visit => {
        const visitDate = new Date(visit.timestamp);

        if (visitDate > oneHourAgo) stats.lastHour++;
        if (visitDate > oneDayAgo) stats.today++;
        if (visitDate > oneMonthAgo) stats.thisMonth++;
        if (visitDate > oneYearAgo) stats.thisYear++;
    });

    return stats;
}

export function formatAirportTimestamp(date = new Date()) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = days[date.getDay()];
    const dateNum = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // 12-hour format for India
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const hoursStr = String(hours).padStart(2, '0');

    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}, ${dateNum} ${month} ${year} ${hoursStr}:${minutes}:${seconds} ${ampm}`;
}
