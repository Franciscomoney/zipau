import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { access_token } = body;

    if (!access_token) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const journeyId = crypto.randomUUID();

    const subscriptionData = {
      accounts: {
        transactionHistory: true,
        balance: true,
        details: true,
        checkFundsAvailability: true
      },
      payments: {
        limit: 99999999,
        currency: "EUR",
        amount: 999999999
      }
    };

    const response = await fetch('https://sandbox-apis.bankofcyprus.com/df-boc-org-sb/sb/psd2/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'accept': 'application/json',
        'app_name': 'zipa',
        'timeStamp': timestamp.toString(),
        'content-type': 'application/json',
        'journeyId': journeyId,
      },
      body: JSON.stringify(subscriptionData),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.error_description || 'Failed to create subscription' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      subscription_id: result.subscriptionId,
      journey_id: journeyId,
      timestamp: timestamp,
      redirect_url: `https://sandbox-apis.bankofcyprus.com/df-boc-org-sb/sb/psd2/oauth2/authorize?response_type=code&redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:2020'}/bank-success`)}&scope=UserOAuth2Security&client_id=e0aa7524ace12e4d901818d5501a1a49&subscriptionid=${result.subscriptionId}`
    });

  } catch (error) {
    console.error('Bank of Cyprus subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}