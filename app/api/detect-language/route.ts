import { NextRequest, NextResponse } from 'next/server';
import { detectUserLanguage } from '@/app/utils/geolocation';
import { GEOLOCATION_DEFAULTS, GEOLOCATION_HEADERS } from '@/app/constants/api/geolocation';

export async function GET(request: NextRequest) {
  try {
    // Get client IP address
    const forwarded = request.headers.get(GEOLOCATION_HEADERS.X_FORWARDED_FOR);
    const realIp = request.headers.get(GEOLOCATION_HEADERS.X_REAL_IP);
    const clientIp = forwarded?.split(',')[0] || realIp || GEOLOCATION_DEFAULTS.IP;
    
    // Get Accept-Language header
    const acceptLanguage = request.headers.get(GEOLOCATION_HEADERS.ACCEPT_LANGUAGE) || undefined;
    
    // Detect language based on IP and headers
    const detectedLanguage = await detectUserLanguage(acceptLanguage);
    
    return NextResponse.json({
      language: detectedLanguage,
      ip: clientIp,
      acceptLanguage: acceptLanguage
    });
  } catch (error) {
    console.error('Language detection error:', error);
    
    // Return default language on error
    return NextResponse.json({
      language: GEOLOCATION_DEFAULTS.LANGUAGE,
      ip: GEOLOCATION_DEFAULTS.IP,
      acceptLanguage: null,
      error: 'Failed to detect language'
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { forceDetection } = body;
    
    if (forceDetection) {
      const acceptLanguage = request.headers.get(GEOLOCATION_HEADERS.ACCEPT_LANGUAGE) || undefined;
      const detectedLanguage = await detectUserLanguage(acceptLanguage);
      
      return NextResponse.json({
        language: detectedLanguage,
        forced: true
      });
    }
    
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error) {
    console.error('Language detection POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}