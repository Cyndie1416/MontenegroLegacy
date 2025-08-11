/**
 * MontenegroLegacy Report Generation System
 * Handles report generation with soft copy/hard copy options and page-specific report types
 */

(function($) {
    'use strict';

    // Report types for each page
    const reportTypes = {
            core: [
        { id: 'overview', name: 'Core Overview', icon: 'fas fa-tachometer-alt' },
            { id: 'financial', name: 'Financial Summary', icon: 'fas fa-dollar-sign' },
            { id: 'performance', name: 'Performance Metrics', icon: 'fas fa-chart-line' },
            { id: 'businesses', name: 'Business Status Report', icon: 'fas fa-store' }
        ],
        piggery: [
            { id: 'inventory', name: 'Pig Inventory Report', icon: 'fas fa-hand-holding-heart' },
            { id: 'financial', name: 'Financial Report', icon: 'fas fa-dollar-sign' },
            { id: 'health', name: 'Health Status Report', icon: 'fas fa-heartbeat' },
            { id: 'feed', name: 'Feed Inventory Report', icon: 'fas fa-seedling' }
        ],
        grocery: [
            { id: 'inventory', name: 'Product Inventory Report', icon: 'fas fa-shopping-basket' },
            { id: 'financial', name: 'Sales Report', icon: 'fas fa-dollar-sign' },
            { id: 'expiry', name: 'Expiry Date Report', icon: 'fas fa-calendar-times' },
            { id: 'supplier', name: 'Supplier Report', icon: 'fas fa-truck' }
        ],
        thrift: [
            { id: 'inventory', name: 'Item Inventory Report', icon: 'fas fa-tshirt' },
            { id: 'financial', name: 'Sales Report', icon: 'fas fa-dollar-sign' },
            { id: 'donations', name: 'Donations Report', icon: 'fas fa-gift' },
            { id: 'category', name: 'Category Performance', icon: 'fas fa-tags' }
        ],
        apartments: [
            { id: 'occupancy', name: 'Occupancy Report', icon: 'fas fa-building' },
            { id: 'financial', name: 'Rental Income Report', icon: 'fas fa-dollar-sign' },
            { id: 'maintenance', name: 'Maintenance Report', icon: 'fas fa-tools' },
            { id: 'tenants', name: 'Tenant Information', icon: 'fas fa-users' }
        ],
        cafe: [
            { id: 'sales', name: 'Sales Report', icon: 'fas fa-coffee' },
            { id: 'inventory', name: 'Inventory Report', icon: 'fas fa-warehouse' },
            { id: 'menu', name: 'Menu Performance', icon: 'fas fa-utensils' },
            { id: 'staff', name: 'Staff Schedule Report', icon: 'fas fa-user-clock' }
        ]
    };

    // Page data for reports
    const pageData = {
            core: {
        title: 'MontenegroLegacy Core Report',
            metrics: [
                { name: 'Total Monthly Revenue', value: '₱139,690' },
                { name: 'Active Businesses', value: '5' },
                { name: 'Overall Performance', value: '87%' },
                { name: 'Action Items', value: '14' }
            ],
            goals: [
                { name: 'Piggery Revenue Goal', value: '68%' },
                { name: 'Grocery Revenue Goal', value: '82%' },
                { name: 'Thrift Revenue Goal', value: '85%' },
                { name: 'Apartments Revenue Goal', value: '92%' },
                { name: 'Cafe Revenue Goal', value: '88%' }
            ]
        },
        piggery: {
            title: 'Piggery Management Report',
            metrics: [
                { name: 'Total Pigs', value: '145' },
                { name: 'Monthly Revenue', value: '₱18,500' },
                { name: 'Feed Inventory', value: '65%' },
                { name: 'Health Alerts', value: '3' }
            ]
        },
        grocery: {
            title: 'Grocery Store Report',
            metrics: [
                { name: 'Total Products', value: '1,250' },
                { name: 'Monthly Revenue', value: '₱45,200' },
                { name: 'Low Stock Items', value: '23' },
                { name: 'Expiring Soon', value: '8' }
            ]
        },
        thrift: {
            title: 'Thrift Store Report',
            metrics: [
                { name: 'Total Items', value: '890' },
                { name: 'Monthly Revenue', value: '₱12,300' },
                { name: 'Donations This Month', value: '156' },
                { name: 'Categories', value: '12' }
            ]
        },
        apartments: {
            title: 'Apartments Management Report',
            metrics: [
                { name: 'Total Units', value: '24' },
                { name: 'Occupied Units', value: '22' },
                { name: 'Monthly Revenue', value: '₱38,400' },
                { name: 'Maintenance Requests', value: '5' }
            ]
        },
        cafe: {
            title: 'Small Cafe Report',
            metrics: [
                { name: 'Daily Sales', value: '₱8,500' },
                { name: 'Menu Items', value: '45' },
                { name: 'Staff Members', value: '8' },
                { name: 'Customer Rating', value: '4.5/5' }
            ]
        }
    };

    // Generate report modal
    function showReportModal() {
        const currentPage = getCurrentPage();
        const pageReportTypes = reportTypes[currentPage] || reportTypes.core;
        
        const modalHtml = `
            <div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="reportModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="reportModalLabel">
                                <i class="fas fa-file-alt text-primary"></i> Export Business Data
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6 class="font-weight-bold text-primary mb-3">
                                        <i class="fas fa-print"></i> Output Format
                                    </h6>
                                    <div class="form-group">
                                        <div class="custom-control custom-radio mb-2">
                                            <input type="radio" id="softCopy" name="outputFormat" class="custom-control-input" value="soft" checked>
                                            <label class="custom-control-label" for="softCopy">
                                                <i class="fas fa-file-pdf text-danger"></i> Soft Copy (PDF)
                                            </label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                            <input type="radio" id="hardCopy" name="outputFormat" class="custom-control-input" value="hard">
                                            <label class="custom-control-label" for="hardCopy">
                                                <i class="fas fa-print text-primary"></i> Hard Copy (Print)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h6 class="font-weight-bold text-primary mb-3">
                                        <i class="fas fa-list"></i> Report Type
                                    </h6>
                                    <div class="form-group">
                                        <select class="form-control" id="reportType">
                                            ${pageReportTypes.map(type => 
                                                `<option value="${type.id}">
                                                    <i class="${type.icon}"></i> ${type.name}
                                                </option>`
                                            ).join('')}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mt-3">
                                <div class="col-12">
                                    <h6 class="font-weight-bold text-primary mb-3">
                                        <i class="fas fa-cog"></i> Report Options
                                    </h6>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="includeCharts" checked>
                                            <label class="custom-control-label" for="includeCharts">
                                                Include charts and visualizations
                                            </label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="includeDate" checked>
                                            <label class="custom-control-label" for="includeDate">
                                                Include date and time stamp
                                            </label>
                                        </div>
                                        <div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="includeLogo" checked>
                                            <label class="custom-control-label" for="includeLogo">
                                                Include VentureBoard logo
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                            <button type="button" class="btn btn-primary" id="generateReportBtn">
                                <i class="fas fa-download"></i> Generate Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        $('#reportModal').remove();
        
        // Add modal to body
        $('body').append(modalHtml);
        
        // Show modal
        $('#reportModal').modal('show');
        
        // Handle report generation
        $('#generateReportBtn').on('click', function() {
            generateReport();
        });
    }

    // Get current page identifier
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        if (filename === 'index.html' || filename === '') return 'core';
        if (filename === 'piggery.html') return 'piggery';
        if (filename === 'grocery.html') return 'grocery';
        if (filename === 'thrift.html') return 'thrift';
        if (filename === 'apartments.html') return 'apartments';
        if (filename === 'cafe.html') return 'cafe';
        
        return 'core';
    }

    // Generate the actual report
    function generateReport() {
        const outputFormat = $('input[name="outputFormat"]:checked').val();
        const reportType = $('#reportType').val();
        const includeCharts = $('#includeCharts').is(':checked');
        const includeDate = $('#includeDate').is(':checked');
        const includeLogo = $('#includeLogo').is(':checked');
        
        const currentPage = getCurrentPage();
        const pageData = getPageData(currentPage, reportType);
        
        if (outputFormat === 'soft') {
            generateSoftCopy(pageData, reportType);
        } else {
            generateHardCopy(pageData, reportType);
        }
        
        // Close modal
        $('#reportModal').modal('hide');
        
        // Show success message
        showSuccessMessage(outputFormat);
    }

    // Get page-specific data
    function getPageData(page, reportType) {
        const baseData = pageData[page] || pageData.core;
        
        return {
            ...baseData,
            reportType: reportType,
            generatedAt: new Date().toLocaleString(),
            page: page
        };
    }

    // Generate soft copy (PDF)
    function generateSoftCopy(data, reportType) {
        // Create a temporary div for the report content
        const reportContent = createReportContent(data, reportType);
        
        // For now, we'll create a simple HTML file that can be printed
        // In a real implementation, you'd use a library like jsPDF or html2pdf
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${data.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .logo { font-size: 24px; font-weight: bold; color: #4e73df; }
                    .title { font-size: 20px; margin: 10px 0; }
                    .date { color: #666; font-size: 14px; }
                    .section { margin: 20px 0; }
                    .metric { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
                    .metric-name { font-weight: bold; }
                    .metric-value { color: #4e73df; font-size: 18px; }
                    .footer { margin-top: 30px; text-align: center; color: #666; }
                </style>
            </head>
            <body>
                ${reportContent}
            </body>
            </html>
        `);
        printWindow.document.close();
        
        // Trigger print dialog
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }

    // Generate hard copy (print)
    function generateHardCopy(data, reportType) {
        const reportContent = createReportContent(data, reportType);
        
        // Create a print-friendly version
        const printDiv = $('<div>').html(reportContent).appendTo('body');
        
        // Add print styles
        const printStyles = `
            <style>
                @media print {
                    body * { visibility: hidden; }
                    .print-content, .print-content * { visibility: visible; }
                    .print-content { position: absolute; left: 0; top: 0; }
                }
            </style>
        `;
        $('head').append(printStyles);
        
        // Trigger print
        window.print();
        
        // Clean up
        printDiv.remove();
        $('head style:last').remove();
    }

    // Create report content
    function createReportContent(data, reportType) {
        let content = '';
        
        if (data.includeLogo) {
            content += '<div class="header"><div class="logo">VentureBoard</div></div>';
        }
        
        content += `<div class="title">${data.title}</div>`;
        
        if (data.includeDate) {
            content += `<div class="date">Generated on: ${data.generatedAt}</div>`;
        }
        
        content += `<div class="section"><h3>Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}</h3></div>`;
        
        if (data.metrics) {
            content += '<div class="section"><h4>Key Metrics</h4>';
            data.metrics.forEach(metric => {
                content += `
                    <div class="metric">
                        <div class="metric-name">${metric.name}</div>
                        <div class="metric-value">${metric.value}</div>
                    </div>
                `;
            });
            content += '</div>';
        }
        
        if (data.goals) {
            content += '<div class="section"><h4>Performance Goals</h4>';
            data.goals.forEach(goal => {
                content += `
                    <div class="metric">
                        <div class="metric-name">${goal.name}</div>
                        <div class="metric-value">${goal.value}</div>
                    </div>
                `;
            });
            content += '</div>';
        }
        
        content += '<div class="footer">VentureBoard Business Administration System</div>';
        
        return content;
    }

    // Show success message
    function showSuccessMessage(outputFormat) {
        const message = outputFormat === 'soft' 
            ? 'PDF report is being generated and will open in a new window.'
            : 'Print dialog will open for hard copy generation.';
            
        // Create a temporary success alert
        const alertHtml = `
            <div class="alert alert-success alert-dismissible fade show position-fixed" 
                 style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                <i class="fas fa-check-circle"></i>
                <strong>Success!</strong> ${message}
                <button type="button" class="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        `;
        
        $('body').append(alertHtml);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            $('.alert-success').fadeOut(() => $(this).remove());
        }, 5000);
    }

    // Initialize report functionality
    function initReports() {
        // Replace all "Generate Report" buttons with "Export Business Data"
        $('a:contains("Generate Report")').each(function() {
            const $btn = $(this);
            $btn.html('<i class="fas fa-file-export fa-sm text-white-50"></i> Export Business Data');
            $btn.attr('href', 'javascript:void(0)');
            $btn.on('click', function(e) {
                e.preventDefault();
                showReportModal();
            });
        });
    }

    // Initialize when document is ready
    $(document).ready(function() {
        initReports();
    });

})(jQuery);
