import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientInfo } from '@/lib/tracking';
import { getWeightedSplitTestOffer } from '@/lib/split-testing';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get tracking link info with all related data
    const trackingLink = await prisma.trackingLink.findUnique({
      where: { id: params.id },
      include: {
        trafficSource: true,
        landingPage: true,
        placement: {
          include: {
            offer: true,
            splitTest: {
              include: {
                variants: {
                  include: {
                    offer: true
                  }
                }
              }
            }
          }
        }
      },
    });

    if (!trackingLink) {
      return NextResponse.redirect(new URL('/404', request.url));
    }

    // Get visit ID from query params
    const visitId = request.nextUrl.searchParams.get('visit_id');
    
    if (!visitId) {
      return NextResponse.redirect(new URL('/400', request.url));
    }

    // Determine the offer based on placement type
    let selectedOffer = null;
    
    if (trackingLink.placement) {
      if (trackingLink.placement.targetType === 'OFFER') {
        selectedOffer = trackingLink.placement.offer;
      } else if (trackingLink.placement.targetType === 'SPLIT_TEST' && trackingLink.placement.splitTest) {
        // Get weighted random offer from split test variants
        selectedOffer = await getWeightedSplitTestOffer(trackingLink.placement.splitTest);
      }
    }

    // Get client info
    const clientInfo = getClientInfo(request);

    // Record click
    const click = await prisma.click.create({
      data: {
        visitId,
        trackingLinkId: trackingLink.id,
        ipAddress: clientInfo.ip,
        userAgent: clientInfo.userAgent,
        referer: clientInfo.referer,
        utmSource: clientInfo.utmSource,
        utmMedium: clientInfo.utmMedium,
        utmCampaign: clientInfo.utmCampaign,
        utmContent: clientInfo.utmContent,
        utmTerm: clientInfo.utmTerm,
      },
    });

    // Build redirect URL with parameters
    const redirectUrl = new URL(selectedOffer?.url || trackingLink.landingPage.url);
    redirectUrl.searchParams.set('click_id', click.id);
    redirectUrl.searchParams.set('visit_id', visitId);
    
    if (selectedOffer) {
      redirectUrl.searchParams.set('offer_id', selectedOffer.id);
    }
    
    if (trackingLink.placement) {
      redirectUrl.searchParams.set('placement_id', trackingLink.placement.id);
      
      if (trackingLink.placement.splitTest) {
        redirectUrl.searchParams.set('split_test_id', trackingLink.placement.splitTest.id);
      }
    }

    // Add UTM parameters if they exist
    if (clientInfo.utmSource) redirectUrl.searchParams.set('utm_source', clientInfo.utmSource);
    if (clientInfo.utmMedium) redirectUrl.searchParams.set('utm_medium', clientInfo.utmMedium);
    if (clientInfo.utmCampaign) redirectUrl.searchParams.set('utm_campaign', clientInfo.utmCampaign);
    if (clientInfo.utmContent) redirectUrl.searchParams.set('utm_content', clientInfo.utmContent);
    if (clientInfo.utmTerm) redirectUrl.searchParams.set('utm_term', clientInfo.utmTerm);

    // Redirect to destination
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Click tracking error:', error);
    return NextResponse.redirect(new URL('/500', request.url));
  }
}