import {ICourse} from '@/typings/types';

const mockRecommendedCourses: Array<ICourse> = [
  {
    title: 'Web Development Fundamentals',
    instructor: {
      name: 'John Doe',
      firebaseId: '',
      email: '',
      role: 'instructor',
      interest: [],
    },
    rating: 4.7,
    id: '',
    description: '',
    category: '',
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  {
    title: 'Python Programming for Beginners',
    instructor: {
      name: 'Jane Smith',
      firebaseId: '',
      email: '',
      role: 'instructor',
      interest: [],
    },
    rating: 4.5,
    id: '',
    description: '',
    category: '',
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  // Add more recommended courses as needed
];

const mockTrendingCourses: Array<ICourse> = [
  {
    title: 'React Native Masterclass',
    instructor: {
      name: 'Alex Johnson',
      firebaseId: '',
      email: '',
      role: 'instructor',
      interest: [],
    },
    rating: 4.8,
    id: '',
    description: '',
    category: '',
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  {
    title: 'Data Science and Machine Learning',
    instructor: {
      name: 'Emily White',
      firebaseId: '',
      email: '',
      role: 'instructor',
      interest: [],
    },
    rating: 4.6,
    id: '',
    description: '',
    category: '',
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  // Add more trending courses as needed
];

const mockPopularCourses: Array<ICourse> = [
  {
    title: 'UX Design: From Basics to Advanced',
    instructor: {
      name: 'David Miller',
      firebaseId: '',
      email: '',
      role: 'instructor',
      interest: [],
    },
    rating: 4.9,
    id: '',
    description: '',
    category: '',
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  {
    title: 'Digital Marketing Strategies',
    instructor: {
      name: 'Sophia Lee',
      firebaseId: '',
      email: '',
      role: 'instructor',
      interest: [],
    },
    rating: 4.7,
    id: '',
    description: '',
    category: '',
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  // Add more popular courses as needed
];

const mockNewestCourses: Array<ICourse> = [
  {
    title: 'Blockchain and Cryptocurrency Explained',
    instructor: {
      name: 'Michael Brown',
      firebaseId: '',
      email: '',
      role: 'instructor',
      interest: [],
    },
    rating: 4.5,
    id: '',
    description: '',
    category: '',
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  {
    title: 'iOS App Development with Swift',
    instructor: {
      name: 'Christopher Evans',
      firebaseId: '',
      email: '',
      role: 'instructor',
      interest: [],
    },
    rating: 4.6,
    id: '',
    description: '',
    category: '',
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  // Add more newest courses as needed
];

const sectionTitles = [
  'Recommended for You',
  'Trending Courses',
  'Popular Courses',
  'Newest Courses',
];

export const MockData = {
  ['Recommended for You']: mockRecommendedCourses,
  ['Trending Courses']: mockTrendingCourses,
  ['Popular Courses']: mockPopularCourses,
  ['Newest Courses']: mockNewestCourses,
};

const ExploreData = [
  mockRecommendedCourses,
  mockTrendingCourses,
  mockPopularCourses,
  mockNewestCourses,
];
const PopularInstructorsData = [
  {
    name: 'John Doe',
    profilePictureUrl: 'https://example.com/profiles/john_doe.jpg',
    bio: 'John is a seasoned software engineer with over 10 years of experience in web development. He specializes in JavaScript frameworks and has a passion for teaching.',
    courses: [
      'JavaScript Essentials',
      'Advanced React',
      'Node.js for Beginners',
    ],
  },
  {
    name: 'Jane Smith',
    profilePictureUrl: 'https://example.com/profiles/jane_smith.jpg',
    bio: 'Jane is a data scientist with expertise in machine learning and AI. She has worked with several top tech companies and enjoys breaking down complex concepts for her students.',
    courses: [
      'Machine Learning 101',
      'Deep Learning with TensorFlow',
      'Data Visualization with Python',
    ],
  },
  {
    name: 'Alice Johnson',
    profilePictureUrl: 'https://example.com/profiles/alice_johnson.jpg',
    bio: 'Alice is a professional graphic designer with a keen eye for detail. She has been in the industry for over 8 years and loves to share her knowledge on design principles and tools.',
    courses: [
      'Graphic Design Basics',
      'Adobe Illustrator Mastery',
      'Creating Stunning Visuals with Photoshop',
    ],
  },
  {
    name: 'Bob Brown',
    profilePictureUrl: 'https://example.com/profiles/bob_brown.jpg',
    bio: 'Bob is a cybersecurity expert who has worked with numerous organizations to secure their systems. He has a knack for teaching complex security concepts in an easy-to-understand manner.',
    courses: [
      'Introduction to Cybersecurity',
      'Ethical Hacking Fundamentals',
      'Network Security Essentials',
    ],
  },
  {
    name: 'Catherine Green',
    profilePictureUrl: 'https://example.com/profiles/catherine_green.jpg',
    bio: 'Catherine is a business strategist with a background in marketing and management. She has helped several startups grow and succeed, and enjoys sharing her insights with aspiring entrepreneurs.',
    courses: [
      'Marketing Strategies for Beginners',
      'Startup Management',
      'Business Planning and Execution',
    ],
  },
];

export {sectionTitles, ExploreData, PopularInstructorsData};
