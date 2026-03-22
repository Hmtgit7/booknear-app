import {
  PrismaClient,
  UserRole,
  UserStatus,
  SalonStatus,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.service.deleteMany();
  await prisma.salonFavorite.deleteMany();
  await prisma.salonStaff.deleteMany();
  await prisma.salon.deleteMany();
  await prisma.salonOwner.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@booknear.com',
      phone: '+919999999999',
      passwordHash:
        '$2b$10$MfnZUB/IzV1d8QI4P5a7A.hJm0W/3.DW.1cXmNJ8/UZyXBmC4wzHa', // bcrypt hash of 'admin123'
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  console.log('✅ Created admin user:', adminUser.email);

  // Create salon owner user
  const ownerUser = await prisma.user.create({
    data: {
      email: 'owner@booknear.com',
      phone: '+919999999998',
      passwordHash:
        '$2b$10$MfnZUB/IzV1d8QI4P5a7A.hJm0W/3.DW.1cXmNJ8/UZyXBmC4wzHa', // owner123
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.SALON_OWNER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  console.log('✅ Created salon owner:', ownerUser.email);

  // Create salon owner profile
  const salonOwner = await prisma.salonOwner.create({
    data: {
      userId: ownerUser.id,
      businessName: 'Luxury Lounge Salon',
      businessRegistration: 'BRN123456',
    },
  });

  // Create salon
  const salon = await prisma.salon.create({
    data: {
      ownerId: salonOwner.id,
      name: 'Luxury Lounge Salon',
      description:
        'Premium salon services including spa, massage, and grooming',
      phone: '+911234567890',
      email: 'info@luxurylounge.com',
      website: 'https://luxurylounge.com',
      status: SalonStatus.ACTIVE,
      address: '123 Main Street',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'IN',
      latitude: 28.7041,
      longitude: 77.1025,
      openingTime: '10:00',
      closingTime: '20:00',
      daysOpen: 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
    },
  });

  console.log('✅ Created salon:', salon.name);

  // Create services
  const hairService = await prisma.service.create({
    data: {
      salonId: salon.id,
      name: 'Haircut & Styling',
      description: 'Professional haircut and styling service',
      category: 'haircut',
      duration: 60,
      price: 500,
      discountPrice: 400,
    },
  });

  const massageService = await prisma.service.create({
    data: {
      salonId: salon.id,
      name: 'Full Body Massage',
      description: 'Relaxing full body massage service',
      category: 'massage',
      duration: 90,
      price: 2000,
      discountPrice: 1500,
    },
  });

  const facialService = await prisma.service.create({
    data: {
      salonId: salon.id,
      name: 'Facial Treatment',
      description: 'Premium facial treatment with organic products',
      category: 'facial',
      duration: 45,
      price: 1000,
      discountPrice: 800,
    },
  });

  console.log('✅ Created 3 services');

  // Create staff members
  const staffUser = await prisma.user.create({
    data: {
      email: 'staff@booknear.com',
      phone: '+919999999997',
      passwordHash:
        '$2b$10$MfnZUB/IzV1d8QI4P5a7A.hJm0W/3.DW.1cXmNJ8/UZyXBmC4wzHa', // staff123
      firstName: 'Jane',
      lastName: 'Smith',
      role: UserRole.SALON_STAFF,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  const salonStaff = await prisma.salonStaff.create({
    data: {
      userId: staffUser.id,
      salonId: salon.id,
      role: 'specialist',
      specialties: ['haircut', 'coloring', 'styling'],
      isAvailable: true,
    },
  });

  console.log('✅ Created staff member:', staffUser.firstName);

  // Create customer users
  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@booknear.com',
      phone: '+919999999996',
      passwordHash:
        '$2b$10$MfnZUB/IzV1d8QI4P5a7A.hJm0W/3.DW.1cXmNJ8/UZyXBmC4wzHa', // customer123
      firstName: 'Alice',
      lastName: 'Johnson',
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
      emailVerified: true,
      phoneVerified: true,
    },
  });

  const customer = await prisma.customer.create({
    data: {
      userId: customerUser.id,
      city: 'Delhi',
      state: 'Delhi',
      country: 'IN',
    },
  });

  console.log('✅ Created customer:', customerUser.firstName);

  // Create favorite salon
  await prisma.salonFavorite.create({
    data: {
      customerId: customer.id,
      salonId: salon.id,
    },
  });

  console.log('✅ Created salon favorite');

  // Create appointment
  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + 1);

  await prisma.appointment.create({
    data: {
      customerId: customer.id,
      salonId: salon.id,
      serviceId: hairService.id,
      staffId: salonStaff.id,
      appointmentDate,
      startTime: '14:00',
      endTime: '15:00',
      totalAmount: hairService.discountPrice || hairService.price,
      notes: 'Please cut short with fade',
    },
  });

  console.log('✅ Created appointment');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
