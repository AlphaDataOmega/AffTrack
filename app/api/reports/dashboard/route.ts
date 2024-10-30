import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : new Date();

    // Get visits count
    const visitsCount = await prisma.visit.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    // Get leads count
    const leadsCount = await prisma.lead.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    // Get transfers count
    const transfersCount = await prisma.transfer.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        status: 'ACCEPTED'
      }
    });

    // Get conversions and revenue
    const conversions = await prisma.conversion.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        },
        status: 'COMPLETED'
      },
      select: {
        value: true
      }
    });

    const totalRevenue = conversions.reduce((sum, conv) => sum + (conv.value || 0), 0);
    const conversionsCount = conversions.length;

    // Get trend data
    const trendData = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('day', "createdAt") as date,
        COUNT(DISTINCT CASE WHEN "Visit"."id" IS NOT NULL THEN "Visit"."id" END) as visits,
        COUNT(DISTINCT CASE WHEN "Lead"."id" IS NOT NULL THEN "Lead"."id" END) as leads,
        COUNT(DISTINCT CASE WHEN "Transfer"."id" IS NOT NULL AND "Transfer"."status" = 'ACCEPTED' THEN "Transfer"."id" END) as transfers,
        COUNT(DISTINCT CASE WHEN "Conversion"."id" IS NOT NULL AND "Conversion"."status" = 'COMPLETED' THEN "Conversion"."id" END) as conversions,
        COALESCE(SUM(CASE WHEN "Conversion"."status" = 'COMPLETED' THEN "Conversion"."value" ELSE 0 END), 0) as revenue
      FROM generate_series(
        ${startDate}::timestamp,
        ${endDate}::timestamp,
        '1 day'
      ) as series(date)
      LEFT JOIN "Visit" ON DATE_TRUNC('day', "Visit"."createdAt") = series.date
      LEFT JOIN "Lead" ON DATE_TRUNC('day', "Lead"."createdAt") = series.date
      LEFT JOIN "Transfer" ON DATE_TRUNC('day', "Transfer"."createdAt") = series.date
      LEFT JOIN "Conversion" ON DATE_TRUNC('day', "Conversion"."createdAt") = series.date
      GROUP BY series.date
      ORDER BY series.date ASC
    `;

    return NextResponse.json({
      data: {
        metrics: {
          visits: visitsCount,
          leads: leadsCount,
          transfers: transfersCount,
          conversions: conversionsCount,
          revenue: totalRevenue
        },
        trend: trendData
      }
    });

  } catch (error) {
    console.error('Dashboard report error:', error);
    return NextResponse.json(
      { error: "Failed to generate dashboard report" },
      { status: 500 }
    );
  }
}