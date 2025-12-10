import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatAirportTimestamp } from './statsUtils';

export function generateInventoryPDF(inventoryStats) {
    const doc = new jsPDF();
    const timestamp = formatAirportTimestamp();

    // Header
    doc.setFontSize(18);
    doc.text('PISTON RENTAL-X PRO', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('INVENTORY REPORT', 105, 30, { align: 'center' });
    doc.setFontSize(10);
    doc.text(timestamp, 105, 38, { align: 'center' });

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    // Inventory table
    const inventoryData = [
        ['Category', 'Total', 'Available', 'Rented'],
        ['Super Cars', inventoryStats.totalCars.toString(), inventoryStats.availableCars.toString(), inventoryStats.rentedCars.toString()],
        ['Super Bikes', inventoryStats.totalBikes.toString(), inventoryStats.availableBikes.toString(), inventoryStats.rentedBikes.toString()],
        ['Spare Parts', inventoryStats.totalSpares.toString(), '-', '-'],
        ['Modification Kits', inventoryStats.totalKits.toString(), '-', '-']
    ];

    autoTable(doc, {
        startY: 50,
        head: [inventoryData[0]],
        body: inventoryData.slice(1),
        theme: 'grid',
        headStyles: { fillColor: [220, 20, 60], textColor: 255 },
        styles: { fontSize: 10 }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.text(`Generated: ${timestamp}`, 20, 285);
    doc.text(`Page ${pageCount}`, 190, 285, { align: 'right' });

    // Download
    doc.save(`Inventory_Report_${Date.now()}.pdf`);
}

export function generateRentalsPDF(rentalStats) {
    const doc = new jsPDF();
    const timestamp = formatAirportTimestamp();

    // Header
    doc.setFontSize(18);
    doc.text('PISTON RENTAL-X PRO', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('RENTAL STATUS REPORT', 105, 30, { align: 'center' });
    doc.setFontSize(10);
    doc.text(timestamp, 105, 38, { align: 'center' });

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    // Summary
    doc.setFontSize(12);
    doc.text(`Total Rentals: ${rentalStats.totalRentals}`, 20, 52);
    doc.text(`Active Rentals: ${rentalStats.activeRentals}`, 20, 60);

    // Rentals table
    if (rentalStats.currentRentals.length > 0) {
        const rentalsData = rentalStats.currentRentals.map(rental => [
            rental.name,
            rental.units.toString(),
            rental.type.toUpperCase(),
            rental.startDate || 'N/A',
            rental.endDate || 'N/A',
            rental.customer
        ]);

        autoTable(doc, {
            startY: 70,
            head: [['Vehicle', 'Units', 'Type', 'Start Date', 'End Date', 'Customer']],
            body: rentalsData,
            theme: 'grid',
            headStyles: { fillColor: [220, 20, 60], textColor: 255 },
            styles: { fontSize: 9 }
        });
    } else {
        doc.text('No active rentals', 20, 75);
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.text(`Generated: ${timestamp}`, 20, 285);
    doc.text(`Page ${pageCount}`, 190, 285, { align: 'right' });

    // Download
    doc.save(`Rentals_Report_${Date.now()}.pdf`);
}

export function generateSalesPDF(salesStats) {
    const doc = new jsPDF();
    const timestamp = formatAirportTimestamp();

    // Header
    doc.setFontSize(18);
    doc.text('PISTON RENTAL-X PRO', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('SPARE PARTS SALES REPORT', 105, 30, { align: 'center' });
    doc.setFontSize(10);
    doc.text(timestamp, 105, 38, { align: 'center' });

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    // Summary
    doc.setFontSize(12);
    doc.text(`Total Units Sold: ${salesStats.totalUnitsSold}`, 20, 52);
    doc.text(`Total Revenue: Rs. ${salesStats.totalRevenue.toLocaleString('en-IN')}`, 20, 60);

    // Sales table
    if (salesStats.sparesSold.length > 0) {
        const salesData = salesStats.sparesSold.map(item => [
            item.name,
            item.units.toString(),
            `Rs. ${item.revenue.toLocaleString('en-IN')}`
        ]);

        autoTable(doc, {
            startY: 70,
            head: [['Spare Part', 'Units Sold', 'Revenue']],
            body: salesData,
            theme: 'grid',
            headStyles: { fillColor: [220, 20, 60], textColor: 255 },
            styles: { fontSize: 10 }
        });
    } else {
        doc.text('No sales recorded', 20, 75);
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.text(`Generated: ${timestamp}`, 20, 285);
    doc.text(`Page ${pageCount}`, 190, 285, { align: 'right' });

    // Download
    doc.save(`Sales_Report_${Date.now()}.pdf`);
}

export function generateAnalyticsPDF(visitorStats) {
    const doc = new jsPDF();
    const timestamp = formatAirportTimestamp();

    // Header
    doc.setFontSize(18);
    doc.text('PISTON RENTAL-X PRO', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text('VISITOR ANALYTICS REPORT', 105, 30, { align: 'center' });
    doc.setFontSize(10);
    doc.text(timestamp, 105, 38, { align: 'center' });

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    // Analytics table
    const analyticsData = [
        ['Period', 'Visitor Count'],
        ['Last Hour', visitorStats.lastHour.toString()],
        ['Today', visitorStats.today.toString()],
        ['This Month', visitorStats.thisMonth.toString()],
        ['This Year', visitorStats.thisYear.toString()],
        ['All Time', visitorStats.allTime.toString()]
    ];

    autoTable(doc, {
        startY: 50,
        head: [analyticsData[0]],
        body: analyticsData.slice(1),
        theme: 'grid',
        headStyles: { fillColor: [220, 20, 60], textColor: 255 },
        styles: { fontSize: 12 }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.text(`Generated: ${timestamp}`, 20, 285);
    doc.text(`Page ${pageCount}`, 190, 285, { align: 'right' });

    // Download
    doc.save(`Analytics_Report_${Date.now()}.pdf`);
}

export function generateSparesStockPDF(sparesList, title) {
    const doc = new jsPDF();
    const timestamp = formatAirportTimestamp();

    // Header
    doc.setFontSize(18);
    doc.text('PISTON RENTAL-X PRO', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(title.toUpperCase() + ' REPORT', 105, 30, { align: 'center' });
    doc.setFontSize(10);
    doc.text(timestamp, 105, 38, { align: 'center' });

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    // Summary
    const highStock = sparesList.filter(s => s.stock > 50).length;
    const mediumStock = sparesList.filter(s => s.stock > 20 && s.stock <= 50).length;
    const lowStock = sparesList.filter(s => s.stock <= 20).length;

    doc.setFontSize(12);
    doc.text(`Total Parts: ${sparesList.length}`, 20, 52);
    doc.setFontSize(10);
    doc.setTextColor(74, 222, 128); // Green
    doc.text(`High Stock (>50): ${highStock}`, 20, 60);
    doc.setTextColor(251, 191, 36); // Yellow (approx)
    doc.text(`Medium Stock (21-50): ${mediumStock}`, 80, 60);
    doc.setTextColor(248, 113, 113); // Red
    doc.text(`Low Stock (<=20): ${lowStock}`, 150, 60);
    doc.setTextColor(0, 0, 0); // Reset to black

    // Inventory table
    if (sparesList.length > 0) {
        const tableData = sparesList
            .sort((a, b) => a.stock - b.stock)
            .map(spare => {
                const stockStatus = spare.stock > 50 ? 'In Stock' : spare.stock > 20 ? 'Limited' : 'Low';
                return [
                    spare.name,
                    spare.stock.toString(),
                    stockStatus,
                    `Rs. ${spare.price?.toLocaleString('en-IN') || 'N/A'}`
                ];
            });

        autoTable(doc, {
            startY: 70,
            head: [['Part Name', 'Stock', 'Status', 'Price']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [220, 20, 60], textColor: 255 },
            styles: { fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 80 },
                1: { halign: 'center' },
                2: { halign: 'center' },
                3: { halign: 'right' }
            }
        });
    } else {
        doc.text('No spare parts data available', 20, 75);
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(8);
    doc.text(`Generated: ${timestamp}`, 20, 285);
    doc.text(`Page ${pageCount}`, 190, 285, { align: 'right' });

    // Download
    const fileName = title.replace(/\s+/g, '_') + `_${Date.now()}.pdf`;
    doc.save(fileName);
}
