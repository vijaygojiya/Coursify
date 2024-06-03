const mockRecommendedCourses = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    instructor: 'John Doe',
    rating: 4.7,
  },
  {
    id: 2,
    title: 'Python Programming for Beginners',
    instructor: 'Jane Smith',
    rating: 4.5,
  },
  // Add more recommended courses as needed
];

const mockTrendingCourses = [
  {
    id: 3,
    title: 'React Native Masterclass',
    instructor: 'Alex Johnson',
    rating: 4.8,
  },
  {
    id: 4,
    title: 'Data Science and Machine Learning',
    instructor: 'Emily White',
    rating: 4.6,
  },
  // Add more trending courses as needed
];

const mockPopularCourses = [
  {
    id: 5,
    title: 'UX Design: From Basics to Advanced',
    instructor: 'David Miller',
    rating: 4.9,
  },
  {
    id: 6,
    title: 'Digital Marketing Strategies',
    instructor: 'Sophia Lee',
    rating: 4.7,
  },
  // Add more popular courses as needed
];

const mockNewestCourses = [
  {
    id: 7,
    title: 'Blockchain and Cryptocurrency Explained',
    instructor: 'Michael Brown',
    rating: 4.5,
  },
  {
    id: 8,
    title: 'iOS App Development with Swift',
    instructor: 'Christopher Evans',
    rating: 4.6,
  },
  // Add more newest courses as needed
];

const sectionTitles = [
  'Recommended for You',
  'Trending Courses',
  'Popular Courses',
  'Newest Courses',
];
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
