import { NextResponse } from 'next/server';

/**
 * Contact form data structure
 */
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Response structure
 */
interface ApiResponse {
  success: boolean;
  error?: string;
  messageId?: string;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize input to prevent XSS and injection
 */
function sanitize(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 5000); // Limit length
}

/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 * Currently logs to console - can be extended to:
 * - Send email notifications
 * - Store in database
 * - Integrate with CRM
 * - Send to Slack/Discord webhook
 */
export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse request body
    const body = await request.json() as Partial<ContactFormData>;

    // Validate required fields
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const formData: ContactFormData = {
      name: sanitize(body.name),
      email: body.email.trim().toLowerCase(),
      phone: body.phone ? sanitize(body.phone) : undefined,
      message: sanitize(body.message),
    };

    // Generate a unique message ID
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // Log the submission (for development/debugging)
    console.log('=== Contact Form Submission ===');
    console.log('Message ID:', messageId);
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Phone:', formData.phone || 'Not provided');
    console.log('Message:', formData.message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('==============================');

    // TODO: Add email notification
    // await sendEmailNotification(formData, messageId);

    // TODO: Store in database
    // await storeInDatabase(formData, messageId);

    // Return success response
    return NextResponse.json({
      success: true,
      messageId,
    });
  } catch (error) {
    console.error('Contact form error:', error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { success: false, error: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/contact
 *
 * Handle CORS preflight requests
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
