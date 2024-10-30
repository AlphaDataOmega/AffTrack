import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientInfo } from '@/lib/tracking';

export async function POST(request: NextRequest) {
  try {
    const clientInfo = getClientInfo(request);
    const body = await request.json();
    
    const { 
      clickId, 
      visitId,
      offerId,
      transferId,
      value,
      transactionId,
      metadata 
    } = body;

    // Validate required fields
    if (!clickId || !visitId || !offerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get click record with related data
    const click = await prisma.click.findUnique({
      where: { id: clickId },
      include: {
        visit: true,
        trackingLink: {
          include: {
            placement: {
              include: {
                splitTest: true
              }
            }
          }
        }
      }
    });

    if (!click) {
      return NextResponse.json(
        { error: "Invalid click ID" },
        { status: 400 }
      );
    }

    // Get lead associated with this click/visit
    const lead = await prisma.lead.findFirst({
      where: {
        OR: [
          { clickId },
          { visitId }
        ]
      }
    });

    if (!lead) {
      return NextResponse.json(
        { error: "No lead found for conversion" },
        { status: 400 }
      );
    }

    // Check for duplicate conversion
    const existingConversion = await prisma.conversion.findFirst({
      where: {
        clickId,
        leadId: lead.id,
        offerId
      }
    });

    if (existingConversion) {
      return NextResponse.json(
        { error: "Duplicate conversion" },
        { status: 409 }
      );
    }

    // Create conversion record
    const conversion = await prisma.conversion.create({
      data: {
        visitId,
        clickId,
        leadId: lead.id,
        offerId,
        transferId,
        value: value || 0,
        transactionId,
        metadata: {
          ...metadata,
          ipAddress: clientInfo.ip,
          userAgent: clientInfo.userAgent,
          location: {
            country: clientInfo.country,
            region: clientInfo.region,
            city: clientInfo.city
          },
          splitTestId: click.trackingLink?.placement?.splitTest?.id,
          utmTags: {
            source: clientInfo.utmSource,
            medium: clientInfo.utmMedium,
            campaign: clientInfo.utmCampaign,
            content: clientInfo.utmContent,
            term: clientInfo.utmTerm
          }
        }
      }
    });

    // Update lead status
    await prisma.lead.update({
      where: { id: lead.id },
      data: { status: 'CONVERTED' }
    });

    // Log conversion activity
    await prisma.activity.create({
      data: {
        type: 'OFFER',
        action: 'CONVERSION',
        targetType: 'OFFER',
        targetId: offerId,
        details: `Conversion recorded for offer ${offerId}`,
        metadata: {
          conversionId: conversion.id,
          value: value,
          transactionId
        },
        ipAddress: clientInfo.ip,
        userAgent: clientInfo.userAgent
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        conversionId: conversion.id,
        status: conversion.status
      }
    });

  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: "Failed to record conversion" },
      { status: 500 }
    );
  }
}