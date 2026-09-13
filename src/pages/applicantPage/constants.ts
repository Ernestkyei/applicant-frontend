import type { Country, EducationInfo, PersonalInfo, SchoolCourse } from "./types";

export const PRIMARY_COLOR = "#1F3A5F";
export const PRIMARY_HOVER_COLOR = "#2A4A7A";

export const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say",
];

export const GRADE_OPTIONS = [
  "A1",
  "B2",
  "B3",
  "C4",
  "C5",
  "C6",
  "D7",
  "E8",
  "F9",
];

export const SCHOOL_COURSES: {
  value: SchoolCourse;
  label: string;
}[] = [
  { value: "general_science", label: "General Science" },
  { value: "general_arts", label: "General Arts" },
  { value: "business", label: "Business" },
  { value: "technical", label: "Technical" },
  { value: "home_economics", label: "Home Economics" },
  { value: "visual_arts", label: "Visual Arts" },
  { value: "agricultural_science", label: "Agricultural Science" },
];

export const CORE_SUBJECTS = [
  "Mathematics",
  "English",
  "Integrated Science",
  "Social Studies",
];

export const ELECTIVE_SUBJECTS_BY_COURSE: Record<SchoolCourse, string[]> = {
  general_science: [
    "Elective Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "ICT",
    "Geography",
  ],
  general_arts: [
    "Literature in English",
    "Government",
    "History",
    "Economics",
    "French",
    "Christian Religious Studies",
    "Islamic Religious Studies",
    "Geography",
    "Ghanaian Language",
    "General Knowledge in Art",
    "Music",
  ],
  business: [
    "Financial Accounting",
    "Cost Accounting",
    "Business Management",
    "Economics",
    "Elective Mathematics",
    "ICT",
  ],
  technical: [
    "Technical Drawing",
    "Building Construction",
    "Woodwork",
    "Metalwork",
    "Applied Electricity",
    "Electronics",
    "Auto Mechanics",
    "Elective Mathematics",
    "Physics",
  ],
  home_economics: [
    "Food and Nutrition",
    "Clothing and Textiles",
    "Management in Living",
    "General Knowledge in Art",
    "Biology",
    "Chemistry",
  ],
  visual_arts: [
    "General Knowledge in Art",
    "Graphic Design",
    "Picture Making",
    "Sculpture",
    "Textiles",
    "Ceramics",
    "Literature in English",
  ],
  agricultural_science: [
    "General Agriculture",
    "Animal Husbandry",
    "Crop Husbandry",
    "Horticulture",
    "Chemistry",
    "Biology",
    "Elective Mathematics",
  ],
};

export const PROGRAMS = [
  "BSc Computer Science",
  "BSc Nursing",
  "BA Economics",
  "BSc Civil Engineering",
  "LLB Law",
  "BSc Pharmacy",
  "BSc Business Administration",
  "BA Sociology",
];

export const COUNTRY_OPTIONS: Country[] = [
  { name: "Ghana", code: "GH" },
  { name: "Nigeria", code: "NG" },
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "Canada", code: "CA" },
  { name: "Australia", code: "AU" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "Italy", code: "IT" },
  { name: "Spain", code: "ES" },
  { name: "Netherlands", code: "NL" },
  { name: "Belgium", code: "BE" },
  { name: "Switzerland", code: "CH" },
  { name: "Sweden", code: "SE" },
  { name: "Norway", code: "NO" },
  { name: "Denmark", code: "DK" },
  { name: "Finland", code: "FI" },
  { name: "Iceland", code: "IS" },
  { name: "Ireland", code: "IE" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Austria", code: "AT" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Hungary", code: "HU" },
  { name: "Romania", code: "RO" },
  { name: "Greece", code: "GR" },
  { name: "Ukraine", code: "UA" },
  { name: "Russia", code: "RU" },
  { name: "South Africa", code: "ZA" },
  { name: "Kenya", code: "KE" },
  { name: "Uganda", code: "UG" },
  { name: "Tanzania", code: "TZ" },
  { name: "Rwanda", code: "RW" },
  { name: "Egypt", code: "EG" },
  { name: "Morocco", code: "MA" },
  { name: "Algeria", code: "DZ" },
  { name: "Ethiopia", code: "ET" },
  { name: "Zimbabwe", code: "ZW" },
  { name: "Zambia", code: "ZM" },
  { name: "Botswana", code: "BW" },
  { name: "Namibia", code: "NA" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Liberia", code: "LR" },
  { name: "Togo", code: "TG" },
  { name: "Benin", code: "BJ" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Ivory Coast", code: "CI" },
  { name: "Senegal", code: "SN" },
  { name: "Mali", code: "ML" },
  { name: "Niger", code: "NE" },
  { name: "Cameroon", code: "CM" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Qatar", code: "QA" },
  { name: "Kuwait", code: "KW" },
  { name: "Israel", code: "IL" },
  { name: "India", code: "IN" },
  { name: "Pakistan", code: "PK" },
  { name: "Bangladesh", code: "BD" },
  { name: "China", code: "CN" },
  { name: "Japan", code: "JP" },
  { name: "South Korea", code: "KR" },
  { name: "Singapore", code: "SG" },
  { name: "Malaysia", code: "MY" },
  { name: "Indonesia", code: "ID" },
  { name: "Philippines", code: "PH" },
  { name: "Thailand", code: "TH" },
  { name: "Vietnam", code: "VN" },
  { name: "New Zealand", code: "NZ" },
  { name: "Brazil", code: "BR" },
  { name: "Argentina", code: "AR" },
  { name: "Mexico", code: "MX" },
  { name: "Chile", code: "CL" },
  { name: "Colombia", code: "CO" },
  { name: "Peru", code: "PE" },
  { name: "Jamaica", code: "JM" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Bahamas", code: "BS" },
  { name: "Barbados", code: "BB" },
  { name: "Haiti", code: "HT" },
];

export const selectClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none bg-white transition";

export const smallSelectClass =
  "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-white transition";

export const gradeSelectClass =
  "w-[76px] px-2 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-white transition";

export const getSchoolCourseLabel = (course: string): string => {
  const found = SCHOOL_COURSES.find((c) => c.value === course);
  return found?.label || "";
};

export const getSubjectsForSchoolCourse = (course: SchoolCourse) => ({
  core: CORE_SUBJECTS.map((name) => ({ name, grade: "" })),
  electives: ELECTIVE_SUBJECTS_BY_COURSE[course].map((name) => ({ name, grade: "" })),
});

export const getFlagEmoji = (countryCode: string): string => {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
};

export const createInitialPersonalInfo = (): PersonalInfo => ({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  nationality: "",
  phoneNumber: "",
  email: "",
  address: "",
  city: "",
  country: "",
});

export const createInitialEducationInfo = (): EducationInfo => ({
  highSchool: "",
  schoolCourse: "",
  graduationYear: "",
  wassceAggregate: "",
  coreSubjects: CORE_SUBJECTS.map((name) => ({ name, grade: "" })),
  electiveSubjects: [],
});
