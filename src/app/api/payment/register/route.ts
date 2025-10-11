import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = '978', description, orderNumber } = body;

    if (!amount || !description || !orderNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare form data for JCC payment gateway
    const formData = new URLSearchParams();
    formData.append('amount', amount.toString());
    formData.append('currency', currency);
    formData.append('userName', 'zipa-api');
    formData.append('password', 'wwsmt-O2');
    formData.append('returnUrl', `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:2020'}/payment/success`);
    formData.append('description', description);
    formData.append('language', 'en');
    formData.append('orderNumber', orderNumber);

    // Make request to JCC payment gateway
    const response = await fetch('https://gateway-test.jcc.com.cy/payment/rest/register.do', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.json();

    if (result.errorCode && result.errorCode !== '0') {
      return NextResponse.json(
        { error: result.errorMessage || 'Payment registration failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      formUrl: result.formUrl,
      errorCode: result.errorCode,
    });

  } catch (error) {
    console.error('Payment registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}