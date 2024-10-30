import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { parse } from 'accept-language-parser';
import { getGeoData } from './geo';

interface ClientInfo {
  ip: string;
  userAgent: string;
  referer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  language: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
}

export function getClientInfo(request: NextRequest): ClientInfo {
  // Get IP address
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             request.ip || 
             '0.0.0.0';

  // Get user agent
  const userAgent = request.headers.get('user-agent') || '';

  // Get referer
  const referer = request.headers.get('referer');

  // Get UTM parameters from URL
  const url = new URL(request.url);
  const utmSource = url.searchParams.get('utm_source');
  const utmMedium = url.searchParams.get('utm_medium');
  const utmCampaign = url.searchParams.get('utm_campaign');
  const utmContent = url.searchParams.get('utm_content');
  const utmTerm = url.searchParams.get('utm_term');

  // Get geolocation data
  const geoData = getGeoData(ip);

  // Get language preference
  const acceptLanguage = request.headers.get('accept-language');
  const language = acceptLanguage ? parse(acceptLanguage)[0]?.code || null : null;

  // Parse user agent for device info
  const ua = new UAParser(userAgent);
  const device = ua.getDevice().type || null;
  const browser = ua.getBrowser().name || null;
  const os = ua.getOS().name || null;

  return {
    ip,
    userAgent,
    referer,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    country: geoData?.country || null,
    region: geoData?.region || null,
    city: geoData?.city || null,
    language,
    device,
    browser,
    os,
  };
}