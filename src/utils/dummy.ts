import { ICourse } from "@/typings/types";

const mockRecommendedCourses: ICourse[] = [
  {
    title: "Web Development Fundamentals",
    instructor: {
      name: "John Doe",
      firebaseId: "",
      email: "",
      role: "instructor",
      interest: [],
    },
    rating: 4.7,
    id: "",
    description: "",
    category: "",
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  {
    title: "Python Programming for Beginners",
    instructor: {
      name: "Jane Smith",
      firebaseId: "",
      email: "",
      role: "instructor",
      interest: [],
    },
    rating: 4.5,
    id: "",
    description: "",
    category: "",
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  // Add more recommended courses as needed
];

const mockTrendingCourses: ICourse[] = [
  {
    title: "React Native Masterclass",
    instructor: {
      name: "Alex Johnson",
      firebaseId: "",
      email: "",
      role: "instructor",
      interest: [],
    },
    rating: 4.8,
    id: "",
    description: "",
    category: "",
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  {
    title: "Data Science and Machine Learning",
    instructor: {
      name: "Emily White",
      firebaseId: "",
      email: "",
      role: "instructor",
      interest: [],
    },
    rating: 4.6,
    id: "",
    description: "",
    category: "",
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  // Add more trending courses as needed
];

const mockPopularCourses: ICourse[] = [
  {
    title: "UX Design: From Basics to Advanced",
    instructor: {
      name: "David Miller",
      firebaseId: "",
      email: "",
      role: "instructor",
      interest: [],
    },
    rating: 4.9,
    id: "",
    description: "",
    category: "",
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  {
    title: "Digital Marketing Strategies",
    instructor: {
      name: "Sophia Lee",
      firebaseId: "",
      email: "",
      role: "instructor",
      interest: [],
    },
    rating: 4.7,
    id: "",
    description: "",
    category: "",
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  // Add more popular courses as needed
];

const mockNewestCourses: ICourse[] = [
  {
    title: "Blockchain and Cryptocurrency Explained",
    instructor: {
      name: "Michael Brown",
      firebaseId: "",
      email: "",
      role: "instructor",
      interest: [],
    },
    rating: 4.5,
    id: "",
    description: "",
    category: "",
    tags: [],
    isFree: false,
    price: 0,
    totalDuration: 0,
    modules: [],
    reviews: [],
  },
  {
    title: "iOS App Development with Swift",
    instructor: {
      name: "Christopher Evans",
      firebaseId: "",
      email: "",
      role: "instructor",
      interest: [],
    },
    rating: 4.6,
    id: "",
    description: "",
    category: "",
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
  "Recommended for You",
  "Trending Courses",
  "Popular Courses",
  "Newest Courses",
];

export const MockData = {
  ["Recommended for You"]: mockRecommendedCourses,
  ["Trending Courses"]: mockTrendingCourses,
  ["Popular Courses"]: mockPopularCourses,
  ["Newest Courses"]: mockNewestCourses,
};

const ExploreData = [
  mockRecommendedCourses,
  mockTrendingCourses,
  mockPopularCourses,
  mockNewestCourses,
];
const PopularInstructorsData = [
  {
    name: "John Doe",
    profilePictureUrl: "https://example.com/profiles/john_doe.jpg",
    bio: "John is a seasoned software engineer with over 10 years of experience in web development. He specializes in JavaScript frameworks and has a passion for teaching.",
    courses: [
      "JavaScript Essentials",
      "Advanced React",
      "Node.js for Beginners",
    ],
  },
  {
    name: "Jane Smith",
    profilePictureUrl: "https://example.com/profiles/jane_smith.jpg",
    bio: "Jane is a data scientist with expertise in machine learning and AI. She has worked with several top tech companies and enjoys breaking down complex concepts for her students.",
    courses: [
      "Machine Learning 101",
      "Deep Learning with TensorFlow",
      "Data Visualization with Python",
    ],
  },
  {
    name: "Alice Johnson",
    profilePictureUrl: "https://example.com/profiles/alice_johnson.jpg",
    bio: "Alice is a professional graphic designer with a keen eye for detail. She has been in the industry for over 8 years and loves to share her knowledge on design principles and tools.",
    courses: [
      "Graphic Design Basics",
      "Adobe Illustrator Mastery",
      "Creating Stunning Visuals with Photoshop",
    ],
  },
  {
    name: "Bob Brown",
    profilePictureUrl: "https://example.com/profiles/bob_brown.jpg",
    bio: "Bob is a cybersecurity expert who has worked with numerous organizations to secure their systems. He has a knack for teaching complex security concepts in an easy-to-understand manner.",
    courses: [
      "Introduction to Cybersecurity",
      "Ethical Hacking Fundamentals",
      "Network Security Essentials",
    ],
  },
  {
    name: "Catherine Green",
    profilePictureUrl: "https://example.com/profiles/catherine_green.jpg",
    bio: "Catherine is a business strategist with a background in marketing and management. She has helped several startups grow and succeed, and enjoys sharing her insights with aspiring entrepreneurs.",
    courses: [
      "Marketing Strategies for Beginners",
      "Startup Management",
      "Business Planning and Execution",
    ],
  },
];

const dummyCourse: ICourse = {
  id: "course-001",
  title: "Mastering React Native",
  description:
    "An in-depth course covering everything you need to know to build powerful mobile apps using React Native.",
  instructor: {
    firebaseId: "user-123",
    email: "johndoe@example.com",
    name: "John Doe",
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Senior mobile developer with 8+ years of experience in React Native.",
    role: "instructor",
    rating: 4.8,
    interest: ["Mobile Development", "React Native", "JavaScript"],
  },
  thumbnail: "https://source.unsplash.com/featured/?reactnative,code",
  category: "Mobile Development",
  tags: ["react-native", "mobile", "javascript", "cross-platform"],
  isFree: false,
  price: 49.99,
  rating: 4.7,
  totalDuration: 420, // in minutes
  modules: [
    {
      id: "module-1",
      title: "Introduction to React Native",
      order: 1,
      description: "Basics of React Native, environment setup, and tools.",
      lessons: [
        {
          id: "lesson-1",
          title: "What is React Native?",
          videoUrl: "https://example.com/video/intro-to-react-native",
          thumbnail: "https://source.unsplash.com/featured/?mobile",
          duration: 10,
          order: 1,
          description: "Overview of React Native and its core features.",
        },
        {
          id: "lesson-2",
          title: "Environment Setup",
          videoUrl: "https://example.com/video/environment-setup",
          thumbnail: "https://source.unsplash.com/featured/?setup",
          duration: 20,
          order: 2,
          description:
            "Step-by-step guide to set up React Native dev environment.",
        },
      ],
    },
    {
      id: "module-2",
      title: "Core Components and Layouts",
      order: 2,
      description: "Learn about components, styling, and layout systems.",
      lessons: [
        {
          id: "lesson-3",
          title: "Text, View, and Image",
          videoUrl: "https://example.com/video/core-components",
          thumbnail: "https://source.unsplash.com/featured/?components",
          duration: 15,
          order: 1,
          description: "Understanding basic building blocks of React Native.",
        },
        {
          id: "lesson-4",
          title: "Flexbox and Styling",
          videoUrl: "https://example.com/video/flexbox-styling",
          thumbnail: "https://source.unsplash.com/featured/?flexbox",
          duration: 25,
          order: 2,
          description: "Using Flexbox to create responsive layouts.",
        },
      ],
    },
  ],
  reviews: [
    {
      id: "review-001",
      user: {
        firebaseId: "user-456",
        email: "janesmith@example.com",
        name: "Jane Smith",
        profileImg: "https://randomuser.me/api/portraits/women/1.jpg",
        role: "student",
        interest: ["React Native", "Frontend Development"],
        rating: 4.5,
      },
      rating: 5,
      comment: "Amazing course! Loved the explanations and hands-on examples.",
      date: new Date("2024-12-01"),
    },
    {
      id: "review-002",
      user: {
        firebaseId: "user-789",
        email: "markjones@example.com",
        name: "Mark Jones",
        profileImg: "https://randomuser.me/api/portraits/men/2.jpg",
        role: "student",
        interest: ["Mobile Apps", "React Native"],
        rating: 4.2,
      },
      rating: 4,
      comment: "Great content, would love more advanced topics.",
      date: new Date("2024-12-05"),
    },
  ],
};

export { sectionTitles, ExploreData, PopularInstructorsData, dummyCourse };
