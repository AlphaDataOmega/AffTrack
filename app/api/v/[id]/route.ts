import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientInfo } from '@/lib/tracking';
import { v4 as uuidv4 } from 'uuid';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get landing page info
    const landingPage = await prisma.landingPage.findUnique({
      where: { id: params.id },
      include: {
        trackingLinks: {
          include: {
            trafficSource: true,
            placement: true,
            offer: true,
          }
        }
      },
    });

    if (!landingPage || landingPage.status !== 'ACTIVE') {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    // Get client info
    const clientInfo = getClientInfo(request);

    // Create visit record
    const visit = await prisma.visit.create({
      data: {
        id: uuidv4(), // Generate UUID for visit tracking
        ipAddress: clientInfo.ip,
        userAgent: clientInfo.userAgent,
        referer: clientInfo.referer,
        landingPageId: landingPage.id,
        trafficSourceId: landingPage.trackingLinks[0]?.trafficSourceId, // Use first tracking link's source if available
        utmSource: clientInfo.utmSource,
        utmMedium: clientInfo.utmMedium,
        utmCampaign: clientInfo.utmCampaign,
        utmContent: clientInfo.utmContent,
        utmTerm: clientInfo.utmTerm,
        country: clientInfo.country,
        region: clientInfo.region,
        city: clientInfo.city,
      },
    });

    // Build redirect URL with parameters
    const redirectUrl = new URL(landingPage.url);
    redirectUrl.searchParams.set('visit_id', visit.id);
    
    // Add UTM parameters if they exist
    if (clientInfo.utmSource) redirectUrl.searchParams.set('utm_source', clientInfo.utmSource);
    if (clientInfo.utmMedium) redirectUrl.searchParams.set('utm_medium', clientInfo.utmMedium);
    if (clientInfo.utmCampaign) redirectUrl.searchParams.set('utm_campaign', clientInfo.utmCampaign);
    if (clientInfo.utmContent) redirectUrl.searchParams.set('utm_content', clientInfo.utmContent);
    if (clientInfo.utmTerm) redirectUrl.searchParams.set('utm_term', clientInfo.utmTerm);

    // Redirect to landing page
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Visit tracking error:', error);
    return NextResponse.redirect(new URL('/500', request.url));
  }
}