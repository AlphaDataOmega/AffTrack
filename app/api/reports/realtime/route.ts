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
    const type = searchParams.get('type') || 'visits';
    const limit = parseInt(searchParams.get('limit') || '50');

    // Calculate time ranges
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

    let items;
    let metrics;

    switch (type) {
      case 'visits':
        items = await prisma.visit.findMany({
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            landingPage: true,
            trafficSource: true
          }
        });

        metrics = {
          lastMinute: await prisma.visit.count({
            where: { createdAt: { gte: oneMinuteAgo } }
          }),
          lastFiveMinutes: await prisma.visit.count({
            where: { createdAt: { gte: fiveMinutesAgo } }
          }),
          lastFifteenMinutes: await prisma.visit.count({
            where: { createdAt: { gte: fifteenMinutesAgo } }
          })
        };
        break;

      case 'leads':
        items = await prisma.lead.findMany({
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            visit: {
              include: {
                landingPage: true,
                trafficSource: true
              }
            }
          }
        });

        metrics = {
          lastMinute: await prisma.lead.count({
            where: { createdAt: { gte: oneMinuteAgo } }
          }),
          lastFiveMinutes: await prisma.lead.count({
            where: { createdAt: { gte: fiveMinutesAgo } }
          }),
          lastFifteenMinutes: await prisma.lead.count({
            where: { createdAt: { gte: fifteenMinutesAgo } }
          })
        };
        break;

      case 'clicks':
        items = await prisma.click.findMany({
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            visit: true,
            trackingLink: {
              include: {
                placement: true,
                offer: true
              }
            }
          }
        });

        metrics = {
          lastMinute: await prisma.click.count({
            where: { createdAt: { gte: oneMinuteAgo } }
          }),
          lastFiveMinutes: await prisma.click.count({
            where: { createdAt: { gte: fiveMinutesAgo } }
          }),
          lastFifteenMinutes: await prisma.click.count({
            where: { createdAt: { gte: fifteenMinutesAgo } }
          })
        };
        break;

      case 'transfers':
        items = await prisma.transfer.findMany({
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            feed: true,
            lead: true
          }
        });

        metrics = {
          lastMinute: await prisma.transfer.count({
            where: { createdAt: { gte: oneMinuteAgo } }
          }),
          lastFiveMinutes: await prisma.transfer.count({
            where: { createdAt: { gte: fiveMinutesAgo } }
          }),
          lastFifteenMinutes: await prisma.transfer.count({
            where: { createdAt: { gte: fifteenMinutesAgo } }
          })
        };
        break;

      case 'conversions':
        items = await prisma.conversion.findMany({
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            visit: true,
            click: true,
            lead: true,
            offer: true,
            transfer: true
          }
        });

        metrics = {
          lastMinute: await prisma.conversion.count({
            where: { createdAt: { gte: oneMinuteAgo } }
          }),
          lastFiveMinutes: await prisma.conversion.count({
            where: { createdAt: { gte: fiveMinutesAgo } }
          }),
          lastFifteenMinutes: await prisma.conversion.count({
            where: { createdAt: { gte: fifteenMinutesAgo } }
          })
        };
        break;

      default:
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 }
        );
    }

    return NextResponse.json({
      data: {
        metrics,
        items
      }
    });

  } catch (error) {
    console.error('Realtime report error:', error);
    return NextResponse.json(
      { error: "Failed to generate realtime report" },
      { status: 500 }
    );
  }
}