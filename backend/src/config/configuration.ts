function parseNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function buildCorsOrigins(): string[] {
  const explicitList = process.env.CORS_ORIGINS?.split(',')
    .map((x) => x.trim())
    .filter(Boolean);

  if (explicitList && explicitList.length > 0) {
    return [...new Set(explicitList)];
  }

  return [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.PATIENT_WEB_URL || 'http://localhost:3000',
    process.env.DOCTOR_WEB_URL || 'http://localhost:3001',
    process.env.ADMIN_WEB_URL || 'http://localhost:3002',
    'https://docnear.in',
  ];
}

export default () => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseNumber(process.env.PORT, 5000),
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseNumber(process.env.REDIS_PORT, 6379),
    password: process.env.REDIS_PASSWORD || undefined,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  aws: {
    region: process.env.AWS_REGION || 'ap-south-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3MedicalBucket: process.env.S3_MEDICAL_BUCKET || 'docnear-medical-files',
    s3KycBucket: process.env.S3_KYC_BUCKET || 'docnear-kyc-docs',
  },
  msg91: {
    apiKey: process.env.MSG91_API_KEY,
    senderId: process.env.MSG91_SENDER_ID || 'DOCNEAR',
    otpTemplateId: process.env.MSG91_OTP_TEMPLATE_ID,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
  },
  cors: {
    origins: buildCorsOrigins(),
  },
});
