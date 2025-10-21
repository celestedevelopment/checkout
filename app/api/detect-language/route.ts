import { NextRequest, NextResponse } from 'next/server';
import { detectUserLanguage } from '@/app/utils/geolocation';

export async function GET(request: NextRequest) {
  try {
    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = forwarded?.split(',')[0] || realIp || 'unknown';
    
    // Get Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || undefined;
    
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
      language: 'en',
      ip: 'unknown',
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
      const acceptLanguage = request.headers.get('accept-language') || undefined;
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