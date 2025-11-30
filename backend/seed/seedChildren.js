
const mongoose = require('mongoose');
const faker = require('faker'); 
const Child = require('../models/Child'); 
require('dotenv').config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};


const amharicFirstNames = {
  male: ['Yonas', 'Dawit', 'Elias', 'Biruk', 'Natnael', 'Samuel', 'Henok', 'Tewodros', 'Abel', 'Mikias'],
  female: ['Selamawit', 'Ruth', 'Eyerusalem', 'Helen', 'Mahlet', 'Betelhem', 'Liya', 'Naol', 'Tseday', 'Feven']
};


const familyNames = [
  'Kebede', 'Tadesse', 'Gebremedhin', 'Alemayehu', 'Getachew',
  'Tesfaye', 'Worku', 'Mengistu', 'Assefa', 'Demissie',
  'Bekele', 'Solomon', 'Hailu', 'Yilma', 'Negash'
];


const regions = ['Amhara', 'Oromia', 'SNNPR', 'Tigray', 'Somali', 'Afar', 'Sidama', 'Gambela', 'Harari', 'Addis Ababa'];
const woredas = ['Gondar', 'Bahir Dar', 'Debre Markos', 'Jimma', 'Hawassa', 'Adama', 'Mekelle', 'Jijiga', 'Dire Dawa', 'Arba Minch'];


const generateChild = () => {
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const firstName = gender === 'male'
    ? amharicFirstNames.male[Math.floor(Math.random() * amharicFirstNames.male.length)]
    : amharicFirstNames.female[Math.floor(Math.random() * amharicFirstNames.female.length)];
  
  const familyName = familyNames[Math.floor(Math.random() * familyNames.length)];
  const ageMonths = Math.floor(Math.random() * 60) + 6; // 6–59 months (under-5)
  const birthDate = faker.date.between('2019-01-01', '2025-01-01');

  return {
    fullName: `${firstName} ${familyName}`,
    gender,
    dateOfBirth: birthDate,
    ageInMonths: ageMonths,
    region: regions[Math.floor(Math.random() * regions.length)],
    zone: faker.address.city(),
    woreda: woredas[Math.floor(Math.random() * woredas.length)],
    kebele: faker.datatype.number({ min: 1, max: 20 }).toString().padStart(2, '0'),
    motherName: `${amharicFirstNames.female[Math.floor(Math.random() * amharicFirstNames.female.length)]} ${familyName}`,
    phoneNumber: `+2519${Math.floor(Math.random() * 90000000 + 10000000)}`,
    weightKg: (ageMonths < 24 
      ? faker.datatype.float({ min: 6, max: 13, precision: 0.1 })
      : faker.datatype.float({ min: 10, max: 20, precision: 0.1 })
    ),
    heightCm: faker.datatype.float({ min: 60, max: 110, precision: 0.1 }),
    muacCm: faker.datatype.float({ min: 11.0, max: 14.5, precision: 0.1 }), // Mid-Upper Arm Circumference
    hasEdema: faker.datatype.boolean(),
    registrationDate: faker.date.recent(180),
  };
};


const seedChildren = async (count = 200) => {
  await connectDB();

  try {
    
    await Child.deleteMany({});
    console.log('Existing children cleared');

    const children = [];
    for (let i = 0; i < count; i++) {
      children.push(generateChild());
    }

    await Child.insertMany(children);
    console.log(`${count} Ethiopian children seeded successfully!`);
    console.log('Sample:');
    console.log(children[0]);
  } catch (err) {
    console.error('Seeding error:', err.message);
  } finally {
    mongoose.connection.close();
    console.log('DB connection closed.');
  }
};


seedChildren(200); 