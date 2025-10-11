import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Bank of Cyprus OAuth2 token request
    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', 'e0aa7524ace12e4d901818d5501a1a49');
    formData.append('client_secret', 'daa14d5fcc6f88aea4b62ef673f5529e');
    formData.append('scope', 'TPPOAuth2Security');

    const response = await fetch('https://sandbox-apis.bankofcyprus.com/df-boc-org-sb/sb/psd2/oauth2/token', {
      method: 'POST',
      headers: {
        'X-IBM-Client-Id': 'e0aa7524ace12e4d901818d5501a1a49',
        'X-IBM-Client-Secret': 'daa14d5fcc6f88aea4b62ef673f5529e',
        'accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.error_description || 'Failed to obtain auth token' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      access_token: result.access_token,
      token_type: result.token_type,
      expires_in: result.expires_in,
    });

  } catch (error) {
    console.error('Bank of Cyprus auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}