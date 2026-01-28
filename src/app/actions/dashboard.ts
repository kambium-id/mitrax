'use server';

import { db } from '@/lib/db';
import { DashboardMetric } from '@/services/dataService';

type PeriodType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ALL';
interface FilterState {
  type: PeriodType;
  value: string;
}

export async function getDashboardData(filter?: FilterState): Promise<DashboardMetric[]> {
  try {
    // Default to latest daily if no filter
    let periodType = filter?.type || 'DAILY';
    let dateValue = filter?.value;

    let currentQuery = '';
    let previousQuery = '';
    let queryParams: any[] = [];
    
    // Logic to determine Current and Previous dates
    if (periodType === 'ALL') {
       // For ALL, we just get the latest 'ALL' record
       // We can compare with previous 'ALL' if it exists (maybe aggregated differently) 
       // or usually ALL is just one cumulative record.
       // Let's assume we just fetch the single ALL record.
       currentQuery = `SELECT * FROM mitrax_summary WHERE period_type = 'ALL' ORDER BY period_date DESC LIMIT 1`;
       // No previous for ALL typically, unless we snapshot.
    } else {
        // If dateValue is missing, default to today/latest
        let targetDate = dateValue ? new Date(dateValue) : new Date();
        
        // Handle Week format "2026-W01"
        if (periodType === 'WEEKLY' && dateValue && dateValue.includes('-W')) {
            // Convert Week string to Date (Start of week)
            // Simple approach: just use the date string if valid, or fallback
            // Actually, input type="week" returns "2026-W01".
            // We need to parse this.
            // For now, let's assume the user picks a date and we treat it as start of week
            // But FilterDropdown sends "2026-W01". 
            // Postgres doesn't parse "2026-W01" directly into DATE.
            // Let's fallback to just querying by matching string if possible? No, period_date is DATE.
            // We need a helper to convert Www to Date. 
            // Or easier: Just let the Dropdown send a DATE string (start of week) instead of Www.
            // But standard input type='week' gives Www.
            // I'll handle "DAILY" and "MONTHLY" robustly. Weekly might be tricky without a library.
            // Let's assume for this iteration, if Weekly, we try to find the record that *contains* this week?
            // Or better: Change FilterDropdown to send a date string for all types?
            // Actually, let's just stick to the specific date requested.
        }

        // Adjust targetDate based on type if needed (e.g. Month start)
        // Note: input type="month" returns "2026-01". New Date("2026-01") works (UTC).
        
        // Calculate Previous Date
        let prevDate = new Date(targetDate);
        if (periodType === 'DAILY') {
            prevDate.setDate(targetDate.getDate() - 1);
        } else if (periodType === 'WEEKLY') {
            prevDate.setDate(targetDate.getDate() - 7);
        } else if (periodType === 'MONTHLY') {
            prevDate.setMonth(targetDate.getMonth() - 1);
        }

        // Format dates for SQL (YYYY-MM-DD)
        const toSqlDate = (d: Date) => d.toISOString().split('T')[0];
        
        // Handling special case for Month input "YYYY-MM" -> "YYYY-MM-01"
        let sqlTargetDate = toSqlDate(targetDate);
        let sqlPrevDate = toSqlDate(prevDate);
        
        if (periodType === 'MONTHLY' && dateValue && dateValue.length === 7) {
             sqlTargetDate = `${dateValue}-01`;
             // Re-calc prev for month correctly
             let d = new Date(`${dateValue}-01`);
             d.setMonth(d.getMonth() - 1);
             sqlPrevDate = toSqlDate(d);
        }
        
        // Workaround for Week: if input is 2026-W01, we might fail.
        // If filter is passed, use it. If not, use latest logic (fallback).
        
        if (!filter?.value) {
            // Fallback: Get latest 2 records of that type
             currentQuery = `SELECT * FROM mitrax_summary WHERE period_type = $1 ORDER BY period_date DESC LIMIT 1`;
             previousQuery = `SELECT * FROM mitrax_summary WHERE period_type = $1 ORDER BY period_date DESC OFFSET 1 LIMIT 1`;
             queryParams = [periodType];
        } else {
             // Specific date query
             // We need to fetch specific dates.
             // We can do `WHERE period_type = $1 AND period_date = $2`
             // But if specific date is missing in DB, we get empty.
             // Let's try to fetch specific.
             currentQuery = `SELECT * FROM mitrax_summary WHERE period_type = $1 AND period_date = $2 LIMIT 1`;
             previousQuery = `SELECT * FROM mitrax_summary WHERE period_type = $1 AND period_date = $2 LIMIT 1`;
             queryParams = [periodType, sqlTargetDate, sqlPrevDate];
        }
    }

    // Execute Queries
    // Use a single query with UNION ALL or separate? Separate is easier to read.
    // If fallback logic (no value), we run one query with LIMIT 2.
    let current, previous;
    
    if (!filter?.value && periodType !== 'ALL') {
        const res = await db.query(`SELECT * FROM mitrax_summary WHERE period_type = $1 ORDER BY period_date DESC LIMIT 2`, [periodType]);
        current = res.rows[0] || {};
        previous = res.rows[1] || {};
    } else if (periodType === 'ALL') {
        const res = await db.query(currentQuery);
        current = res.rows[0] || {};
        previous = {}; // No trend for ALL
    } else {
        // Specific Date
        const resCurr = await db.query(currentQuery, [periodType, queryParams[1]]);
        const resPrev = await db.query(previousQuery, [periodType, queryParams[2]]);
        current = resCurr.rows[0] || {};
        previous = resPrev.rows[0] || {};
    }

    const hasPrevious = !!previous.id;

    // Helper to calculate trend
    const calculateTrend = (curr: number, prev: number) => {
      if (!hasPrevious || !prev) return '+0.0%';
      const diff = curr - prev;
      const percent = (diff / prev) * 100;
      const sign = percent >= 0 ? '+' : '';
      return `${sign}${percent.toFixed(1)}%`;
    };

    const isTrendUp = (curr: number, prev: number) => {
      if (!hasPrevious || !prev) return true;
      return curr >= prev;
    };
    
    // Formatting Money
    const formatMoney = (val: number) => {
      if (val >= 1000000000) return `Rp ${(val / 1000000000).toFixed(1)}M`;
      if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(1)}Jt`;
      return `Rp ${val.toLocaleString('id-ID')}`;
    };

    const formatNumber = (val: number) => val.toLocaleString('id-ID');

    // Extract Values
    const getVal = (row: any, key: string) => Number(row[key] || 0);

    const metrics: DashboardMetric[] = [
      {
        id: '1',
        label: 'Total Pengiriman',
        value: formatNumber(getVal(current, 'total_awb')),
        trend: calculateTrend(getVal(current, 'total_awb'), getVal(previous, 'total_awb')),
        trendUp: isTrendUp(getVal(current, 'total_awb'), getVal(previous, 'total_awb')),
        category: 'shipment'
      },
      {
        id: '2',
        label: 'Total Paket (Koli)',
        value: formatNumber(getVal(current, 'total_koli')),
        trend: calculateTrend(getVal(current, 'total_koli'), getVal(previous, 'total_koli')),
        trendUp: isTrendUp(getVal(current, 'total_koli'), getVal(previous, 'total_koli')),
        category: 'shipment'
      },
      {
        id: '3',
        label: 'Paket Terkirim',
        value: formatNumber(getVal(current, 'total_koli_delivered')),
        trend: calculateTrend(getVal(current, 'total_koli_delivered'), getVal(previous, 'total_koli_delivered')),
        trendUp: isTrendUp(getVal(current, 'total_koli_delivered'), getVal(previous, 'total_koli_delivered')),
        category: 'shipment'
      },
      {
        id: '4',
        label: 'Total Berat (Kg)',
        value: formatNumber(getVal(current, 'total_weight')),
        trend: calculateTrend(getVal(current, 'total_weight'), getVal(previous, 'total_weight')),
        trendUp: isTrendUp(getVal(current, 'total_weight'), getVal(previous, 'total_weight')),
        category: 'shipment'
      },
      {
        id: '5',
        label: 'Pendapatan Total',
        value: formatMoney(getVal(current, 'shipping_cost_with_insurance')),
        trend: calculateTrend(getVal(current, 'shipping_cost_with_insurance'), getVal(previous, 'shipping_cost_with_insurance')),
        trendUp: isTrendUp(getVal(current, 'shipping_cost_with_insurance'), getVal(previous, 'shipping_cost_with_insurance')),
        category: 'revenue'
      },
      {
        id: '6',
        label: 'Biaya Standar',
        value: formatMoney(getVal(current, 'standard_shipping_cost')),
        trend: calculateTrend(getVal(current, 'standard_shipping_cost'), getVal(previous, 'standard_shipping_cost')),
        trendUp: isTrendUp(getVal(current, 'standard_shipping_cost'), getVal(previous, 'standard_shipping_cost')),
        category: 'revenue'
      },
      {
        id: '7',
        label: 'Biaya Tanpa Asuransi',
        value: formatMoney(getVal(current, 'shipping_cost_no_insurance')),
        trend: calculateTrend(getVal(current, 'shipping_cost_no_insurance'), getVal(previous, 'shipping_cost_no_insurance')),
        trendUp: isTrendUp(getVal(current, 'shipping_cost_no_insurance'), getVal(previous, 'shipping_cost_no_insurance')),
        category: 'revenue'
      },
      {
        id: '8',
        label: 'Biaya Asuransi',
        value: formatMoney(getVal(current, 'insurance_cost')),
        trend: calculateTrend(getVal(current, 'insurance_cost'), getVal(previous, 'insurance_cost')),
        trendUp: isTrendUp(getVal(current, 'insurance_cost'), getVal(previous, 'insurance_cost')),
        category: 'revenue'
      },
      {
        id: '9',
        label: 'Pengiriman Bermasalah',
        value: formatNumber(getVal(current, 'total_abnormal_count')),
        trend: calculateTrend(getVal(current, 'total_abnormal_count'), getVal(previous, 'total_abnormal_count')),
        trendUp: getVal(current, 'total_abnormal_count') <= getVal(previous, 'total_abnormal_count'), // Lower is better
        category: 'status'
      },
      {
        id: '10',
        label: 'Rata-rata Waktu Kirim',
        value: `${getVal(current, 'avg_delivery_time_hours').toFixed(1)} Jam`,
        trend: calculateTrend(getVal(current, 'avg_delivery_time_hours'), getVal(previous, 'avg_delivery_time_hours')),
        trendUp: getVal(current, 'avg_delivery_time_hours') <= getVal(previous, 'avg_delivery_time_hours'), // Lower is better
        category: 'operational'
      },
    ];

    return metrics;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dashboard data');
  }
}

export async function getChartData(filter?: FilterState) {
  try {
    let periodType = filter?.type || 'ALL'; // Default to ALL logic for chart if undefined
    let query = '';
    let params: any[] = [];

    // Chart Logic:
    // If DAILY: Show last 30 Daily records
    // If WEEKLY: Show last 12 Weekly records
    // If MONTHLY: Show last 12 Monthly records
    // If ALL: Show last 12 Monthly records (default trend view)

    if (periodType === 'DAILY') {
        // If specific date selected, maybe show hours? But DB doesn't have hourly.
        // So for DAILY filter, we show the trend of daily stats ending at selected date?
        // Or just last 30 days relative to selected date.
        let endDate = filter?.value ? new Date(filter.value) : new Date();
        const sqlEndDate = endDate.toISOString().split('T')[0];
        query = `
            SELECT period_date, total_awb, shipping_cost_with_insurance, total_abnormal_count 
            FROM mitrax_summary 
            WHERE period_type = 'DAILY' AND period_date <= $1 
            ORDER BY period_date ASC 
            LIMIT 30`;
        params = [sqlEndDate];
    } else if (periodType === 'WEEKLY') {
        let endDate = filter?.value ? new Date(filter.value) : new Date(); // fallback logic
        const sqlEndDate = endDate.toISOString().split('T')[0];
        query = `
            SELECT period_date, total_awb, shipping_cost_with_insurance, total_abnormal_count 
            FROM mitrax_summary 
            WHERE period_type = 'WEEKLY' AND period_date <= $1 
            ORDER BY period_date ASC 
            LIMIT 12`;
        params = [sqlEndDate];
    } else {
        // MONTHLY or ALL
        // For ALL, we usually show Monthly trend.
        // For MONTHLY filter, maybe show days in that month?
        // Let's stick to "Last 12 Months" for simplicity for ALL/MONTHLY context unless refined.
        // Actually, if PeriodType is MONTHLY, maybe we should show DAILY records for that month?
        if (periodType === 'MONTHLY' && filter?.value) {
             let startDate = new Date(filter.value + '-01');
             let endDate = new Date(startDate);
             endDate.setMonth(endDate.getMonth() + 1);
             
             query = `
                SELECT period_date, total_awb, shipping_cost_with_insurance, total_abnormal_count 
                FROM mitrax_summary 
                WHERE period_type = 'DAILY' 
                AND period_date >= $1 AND period_date < $2
                ORDER BY period_date ASC`;
             params = [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]];
        } else {
             // ALL or Default
             query = `
                SELECT period_date, total_awb, shipping_cost_with_insurance, total_abnormal_count 
                FROM mitrax_summary 
                WHERE period_type = 'MONTHLY' 
                ORDER BY period_date ASC 
                LIMIT 12`;
        }
    }

    const result = await db.query(query, params);
    
    // Format data for Chart.js
    const labels = result.rows.map(r => {
        const d = new Date(r.period_date);
        // Format: DD/MM or MMM
        return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    });

    const shipments = result.rows.map(r => Number(r.total_awb || 0));
    const revenue = result.rows.map(r => Number(r.shipping_cost_with_insurance || 0) / 1000000); // In Millions
    const abnormal = result.rows.map(r => Number(r.total_abnormal_count || 0));

    return {
        labels,
        datasets: {
            shipments,
            revenue,
            abnormal
        }
    };

  } catch (error) {
    console.error('Chart Data Error:', error);
    return { labels: [], datasets: { shipments: [], revenue: [], abnormal: [] } };
  }
}
