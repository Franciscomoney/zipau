import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Prepare form data for JCC payment gateway status check
    const formData = new URLSearchParams();
    formData.append('userName', 'zipa-api');
    formData.append('password', 'wwsmt-O2');
    formData.append('orderId', orderId);

    // Make request to JCC payment gateway
    const response = await fetch('https://gateway-test.jcc.com.cy/payment/rest/getOrderStatusExtended.do', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const result = await response.json();

    if (result.errorCode && result.errorCode !== '0') {
      return NextResponse.json(
        { error: result.errorMessage || 'Status check failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      orderStatus: result.orderStatus,
      actionCode: result.actionCode,
      actionCodeDescription: result.actionCodeDescription,
      amount: result.amount,
      currency: result.currency,
      orderNumber: result.orderNumber,
      // Additional fields that might be useful
      errorCode: result.errorCode,
      errorMessage: result.errorMessage,
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}