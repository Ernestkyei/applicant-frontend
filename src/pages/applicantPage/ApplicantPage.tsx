// src/pages/Home/ApplicantPortal.tsx

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  Circle,
  FileText,
  Clock,
  AlertCircle,
  Send,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User as UserIcon,
  BookOpen,
  Home,
  FileCheck,
  Plus,
  Trash2,
  Pencil,
  ShieldCheck,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  country: string;
}

interface SubjectGrade {
  name: string;
  grade: string;
}

interface EducationInfo {
  highSchool: string;
  schoolCourse: string;
  graduationYear: string;
  wassceAggregate: string;
  coreSubjects: SubjectGrade[];
  electiveSubjects: SubjectGrade[];
}

interface ApplicationFormProps {
  onApply: (
    programs: string[],
    personalInfo: PersonalInfo,
    educationInfo: EducationInfo
  ) => void;
  isSubmitting: boolean;
}

interface ApplicationSuccessProps {
  applicationReference: string;
}

// ============================================================
// APPLICATION COLORS
// ============================================================

const PRIMARY_COLOR = "#1F3A5F";
const PRIMARY_HOVER_COLOR = "#2A4A7A";

// ============================================================
// CONSTANTS
// ============================================================

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say",
];

const GRADE_OPTIONS = [
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

type SchoolCourse =
  | "general_science"
  | "general_arts"
  | "business"
  | "technical"
  | "home_economics"
  | "visual_arts"
  | "agricultural_science";

const SCHOOL_COURSES: {
  value: SchoolCourse;
  label: string;
}[] = [
  {
    value: "general_science",
    label: "General Science",
  },
  {
    value: "general_arts",
    label: "General Arts",
  },
  {
    value: "business",
    label: "Business",
  },
  {
    value: "technical",
    label: "Technical",
  },
  {
    value: "home_economics",
    label: "Home Economics",
  },
  {
    value: "visual_arts",
    label: "Visual Arts",
  },
  {
    value: "agricultural_science",
    label: "Agricultural Science",
  },
];

// ============================================================
// CORE SUBJECTS
// ============================================================

const CORE_SUBJECTS = [
  "Mathematics",
  "English",
  "Integrated Science",
  "Social Studies",
];

// ============================================================
// ELECTIVE SUBJECTS
// ============================================================

const ELECTIVE_SUBJECTS_BY_COURSE: Record<
  SchoolCourse,
  string[]
> = {
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

// ============================================================
// HELPERS
// ============================================================

const getSchoolCourseLabel = (
  course: string
): string => {
  const found = SCHOOL_COURSES.find(
    (c) => c.value === course
  );

  return found?.label || "";
};

const getSubjectsForSchoolCourse = (
  course: SchoolCourse
) => ({
  core: CORE_SUBJECTS.map((name) => ({
    name,
    grade: "",
  })),

  electives:
    ELECTIVE_SUBJECTS_BY_COURSE[course].map(
      (name) => ({
        name,
        grade: "",
      })
    ),
});

// ============================================================
// UNIVERSITY PROGRAMS
// ============================================================

const PROGRAMS = [
  "BSc Computer Science",
  "BSc Nursing",
  "BA Economics",
  "BSc Civil Engineering",
  "LLB Law",
  "BSc Pharmacy",
  "BSc Business Administration",
  "BA Sociology",
];

// ============================================================
// COUNTRIES
// ============================================================

interface Country {
  name: string;
  code: string;
}

const COUNTRY_OPTIONS: Country[] = [
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

// ============================================================
// FLAG HELPER
// ============================================================

const getFlagEmoji = (
  countryCode: string
): string => {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) =>
      String.fromCodePoint(
        127397 + char.charCodeAt(0)
      )
    )
    .join("");
};

// ============================================================
// COUNTRY SELECT
// ============================================================

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function CountrySelect({
  value,
  onChange,
  placeholder = "Search or select your country...",
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      e: MouseEvent
    ) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const filtered = query
    ? COUNTRY_OPTIONS.filter((country) =>
        country.name
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : COUNTRY_OPTIONS;

  const handleSelect = (
    country: Country
  ) => {
    onChange(country.name);
    setOpen(false);
    setQuery("");
  };

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <MapPin
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"
      />

      <div className="relative">
        <input
          type="text"
          value={open ? query : value}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm outline-none transition"
          style={{
            borderColor: open
              ? PRIMARY_COLOR
              : undefined,
            boxShadow: open
              ? `0 0 0 2px ${PRIMARY_COLOR}20`
              : undefined,
          }}
        />

        {value && !open && (
          <span className="absolute right-9 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
            {getFlagEmoji(
              COUNTRY_OPTIONS.find(
                (country) =>
                  country.name === value
              )?.code || "UN"
            )}
          </span>
        )}
      </div>

      <ChevronRight
        size={16}
        className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform pointer-events-none ${
          open ? "rotate-90" : ""
        }`}
      />

      {open && (
        <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          {filtered.length === 0 ? (
            <div className="px-3 py-2.5 text-sm text-gray-400">
              No countries found
            </div>
          ) : (
            filtered.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() =>
                  handleSelect(country)
                }
                className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm transition-colors"
                style={{
                  backgroundColor:
                    country.name === value
                      ? `${PRIMARY_COLOR}12`
                      : undefined,
                  color:
                    country.name === value
                      ? PRIMARY_COLOR
                      : undefined,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    `${PRIMARY_COLOR}12`;
                  e.currentTarget.style.color =
                    PRIMARY_COLOR;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    country.name === value
                      ? `${PRIMARY_COLOR}12`
                      : "";
                  e.currentTarget.style.color =
                    country.name === value
                      ? PRIMARY_COLOR
                      : "";
                }}
              >
                <span
                  className="text-lg"
                  style={{
                    width: "1.3em",
                    flexShrink: 0,
                  }}
                >
                  {getFlagEmoji(country.code)}
                </span>

                <span className="flex-1">
                  {country.name}
                </span>

                {country.name === "Ghana" && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    Local
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// SHARED CLASSES
// ============================================================

const selectClass =
  "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none bg-white transition";

const smallSelectClass =
  "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-white transition";

const gradeSelectClass =
  "w-[76px] px-2 py-2.5 border border-gray-200 rounded-lg text-sm outline-none bg-white transition";

// ============================================================
// APPLICATION SUCCESS
// ============================================================

function ApplicationSuccess({
  applicationReference,
}: ApplicationSuccessProps) {
  return (
    <div className="bg-white border border-[#E4E7EB] rounded-2xl shadow-sm overflow-hidden">

      {/* SUCCESS HEADER */}

      <div className="px-6 md:px-10 pt-10 pb-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2
                size={32}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        <h1 className="font-serif text-[25px] md:text-[28px] font-semibold text-[#1A1E24]">
          Application Submitted Successfully
        </h1>

        <p className="text-sm text-gray-500 max-w-[520px] mx-auto mt-3 leading-relaxed">
          Your application has been successfully
          submitted and is now being processed by
          the Admissions Registry.
        </p>
      </div>

      {/* APPLICATION REFERENCE */}

      <div className="px-6 md:px-10 pb-6">
        <div
          className="rounded-xl border p-5 text-center"
          style={{
            backgroundColor: `${PRIMARY_COLOR}06`,
            borderColor: `${PRIMARY_COLOR}20`,
          }}
        >
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">
            Application Reference
          </p>

          <p
            className="text-xl md:text-2xl font-bold tracking-wide mt-2"
            style={{
              color: PRIMARY_COLOR,
            }}
          >
            {applicationReference}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Please keep this reference number for
            future enquiries about your application.
          </p>
        </div>
      </div>

      {/* WHAT HAPPENS NEXT */}

      <div className="px-6 md:px-10 pb-7">
        <div className="border border-gray-200 rounded-xl overflow-hidden">

          <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800">
              What happens next?
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Your application will go through the
              following process.
            </p>
          </div>

          <div className="p-5 space-y-5">

            {/* STEP 1 */}

            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: `${PRIMARY_COLOR}12`,
                }}
              >
                <FileCheck
                  size={16}
                  style={{
                    color: PRIMARY_COLOR,
                  }}
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Application Received
                </p>

                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Your application and the information
                  you provided have been received by the
                  Admissions Registry.
                </p>
              </div>
            </div>

            {/* STEP 2 */}

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                <Clock
                  size={16}
                  className="text-yellow-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Application Under Review
                </p>

                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  The Admissions team will review your
                  application and verify the information
                  provided.
                </p>
              </div>
            </div>

            {/* STEP 3 */}

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Bell
                  size={16}
                  className="text-gray-500"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Admission Decision
                </p>

                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  You will be notified when a decision
                  has been made regarding your
                  application.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* APPLICATION STATUS */}

      <div className="px-6 md:px-10 pb-7">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-yellow-200 bg-yellow-50 rounded-xl px-4 py-3.5">

          <div className="flex items-center gap-3">
            <Clock
              size={18}
              className="text-yellow-600"
            />

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Application Status
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                Your application is waiting for review.
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-3 py-1.5 rounded-full w-fit">
            Pending Review
          </span>

        </div>
      </div>

      {/* ACTION BUTTONS */}

      <div className="px-6 md:px-10 pb-8">
        <div className="flex flex-col sm:flex-row gap-3">

          <button
            type="button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="flex-1 py-3.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <FileText size={16} />
            View Application
          </button>

          <Link
            to="/"
            className="flex-1 py-3.5 rounded-xl text-white text-sm font-semibold transition flex items-center justify-center gap-2"
            style={{
              backgroundColor: PRIMARY_COLOR,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                PRIMARY_HOVER_COLOR;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                PRIMARY_COLOR;
            }}
          >
            <Home size={16} />
            Back to Home
          </Link>

        </div>
      </div>

      {/* SUPPORT */}

      <div className="border-t border-gray-100 px-6 md:px-10 py-5 text-center">
        <p className="text-xs text-gray-400">
          Need help with your application?
        </p>

        <button
          type="button"
          className="text-xs font-semibold mt-1 hover:underline"
          style={{
            color: PRIMARY_COLOR,
          }}
        >
          Contact Admissions Support
        </button>
      </div>

    </div>
  );
}

// ============================================================
// APPLICATION FORM
// ============================================================

function ApplicationForm({
  onApply,
  isSubmitting,
}: ApplicationFormProps) {
  const [step, setStep] = useState<number>(1);

  const [programs, setPrograms] =
    useState<string[]>([]);

  const [academicYear, setAcademicYear] =
    useState("2026/2027");

  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfo>({
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

  const [educationInfo, setEducationInfo] =
    useState<EducationInfo>({
      highSchool: "",
      schoolCourse: "",
      graduationYear: "",
      wassceAggregate: "",
      coreSubjects: CORE_SUBJECTS.map(
        (name) => ({
          name,
          grade: "",
        })
      ),
      electiveSubjects: [],
    });

  const [confirmed, setConfirmed] =
    useState(false);

  // ============================================================
  // PROGRAMME SELECTION
  // ============================================================

  const handleProgramChange = (
    index: number,
    value: string
  ) => {
    setPrograms((prev) => {
      const updated = [...prev];

      updated[index] = value;

      return updated;
    });
  };

  // ============================================================
  // PERSONAL INFORMATION
  // ============================================================

  const handlePersonalChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================================
  // EDUCATION INFORMATION
  // ============================================================

  const handleEducationChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setEducationInfo({
      ...educationInfo,
      [e.target.name]: e.target.value,
    });
  };

  // ============================================================
  // SCHOOL COURSE CHANGE
  // ============================================================

  const handleSchoolCourseChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const course =
      e.target.value as SchoolCourse | "";

    if (!course) {
      setEducationInfo((prev) => ({
        ...prev,
        schoolCourse: "",
        coreSubjects:
          CORE_SUBJECTS.map((name) => ({
            name,
            grade: "",
          })),
        electiveSubjects: [],
      }));

      return;
    }

    const { core } =
      getSubjectsForSchoolCourse(course);

    setEducationInfo((prev) => ({
      ...prev,
      schoolCourse: course,
      coreSubjects: core,
      electiveSubjects: [],
    }));
  };

  // ============================================================
  // CORE SUBJECT CHANGE
  // ============================================================

  const handleCoreSubjectChange = (
    index: number,
    grade: string
  ) => {
    const updated = [
      ...educationInfo.coreSubjects,
    ];

    updated[index] = {
      ...updated[index],
      grade,
    };

    setEducationInfo({
      ...educationInfo,
      coreSubjects: updated,
    });
  };

  // ============================================================
  // ADD ELECTIVE SUBJECT
  // ============================================================

  const addElectiveSubject = () => {
    if (!educationInfo.schoolCourse) {
      return;
    }

    const availableSubjects =
      ELECTIVE_SUBJECTS_BY_COURSE[
        educationInfo.schoolCourse as SchoolCourse
      ];

    const selectedSubjects =
      educationInfo.electiveSubjects.map(
        (subject) => subject.name
      );

    const nextAvailableSubject =
      availableSubjects.find(
        (subject) =>
          !selectedSubjects.includes(subject)
      );

    if (!nextAvailableSubject) {
      return;
    }

    setEducationInfo((prev) => ({
      ...prev,
      electiveSubjects: [
        ...prev.electiveSubjects,
        {
          name: nextAvailableSubject,
          grade: "",
        },
      ],
    }));
  };

  // ============================================================
  // CHANGE ELECTIVE SUBJECT
  // ============================================================

  const handleElectiveSubjectNameChange = (
    index: number,
    name: string
  ) => {
    setEducationInfo((prev) => {
      const updated = [
        ...prev.electiveSubjects,
      ];

      updated[index] = {
        ...updated[index],
        name,
      };

      return {
        ...prev,
        electiveSubjects: updated,
      };
    });
  };

  // ============================================================
  // CHANGE ELECTIVE GRADE
  // ============================================================

  const handleElectiveSubjectGradeChange = (
    index: number,
    grade: string
  ) => {
    setEducationInfo((prev) => {
      const updated = [
        ...prev.electiveSubjects,
      ];

      updated[index] = {
        ...updated[index],
        grade,
      };

      return {
        ...prev,
        electiveSubjects: updated,
      };
    });
  };

  // ============================================================
  // REMOVE ELECTIVE SUBJECT
  // ============================================================

  const removeElectiveSubject = (
    index: number
  ) => {
    setEducationInfo((prev) => ({
      ...prev,
      electiveSubjects:
        prev.electiveSubjects.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // ============================================================
  // VALIDATION
  // ============================================================

  const isStep1Complete =
    Boolean(
      programs.length === 3 &&
        programs[0] &&
        programs[1] &&
        programs[2] &&
        academicYear
    );

  const isStep2Complete =
    Boolean(
      personalInfo.firstName &&
        personalInfo.lastName &&
        personalInfo.email
    );

  const isStep3Complete =
    Boolean(
      educationInfo.highSchool &&
        educationInfo.schoolCourse
    );

  const isFormComplete =
    isStep1Complete &&
    isStep2Complete &&
    isStep3Complete;

  // ============================================================
  // AVAILABLE ELECTIVES
  // ============================================================

  const availableElectives =
    educationInfo.schoolCourse
      ? ELECTIVE_SUBJECTS_BY_COURSE[
          educationInfo.schoolCourse as SchoolCourse
        ].filter(
          (subject) =>
            !educationInfo.electiveSubjects.some(
              (selected) =>
                selected.name === subject
            )
        )
      : [];

  const canAddAnotherElective =
    availableElectives.length > 0;

  // ============================================================
  // NEXT STEP
  // ============================================================

  const nextStep = () => {
    if (
      step === 1 &&
      !isStep1Complete
    ) {
      alert(
        "Please select all three programme choices and an academic year."
      );

      return;
    }

    if (
      step === 2 &&
      !isStep2Complete
    ) {
      alert(
        "Please fill in your first name, last name and email address."
      );

      return;
    }

    if (
      step === 3 &&
      !isStep3Complete
    ) {
      alert(
        "Please enter your school and select the course you studied."
      );

      return;
    }

    setStep((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // PREVIOUS STEP
  // ============================================================

  const prevStep = () => {
    setStep((prev) => prev - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // EDIT FROM PREVIEW
  // ============================================================

  const editStep = (targetStep: number) => {
    setConfirmed(false);
    setStep(targetStep);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !isFormComplete ||
      !confirmed ||
      isSubmitting
    ) {
      return;
    }

    onApply(
      programs,
      personalInfo,
      educationInfo
    );
  };

  // ============================================================
  // PROGRESS STEPS
  // ============================================================

  const progressSteps = [
    {
      number: 1,
      label: "Programmes",
      complete: isStep1Complete,
    },
    {
      number: 2,
      label: "Personal",
      complete: isStep2Complete,
    },
    {
      number: 3,
      label: "Education",
      complete: isStep3Complete,
    },
    {
      number: 4,
      label: "Review",
      complete: false,
    },
  ];

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="bg-white border border-[#E4E7EB] rounded-2xl shadow-sm overflow-hidden">

      {/* HEADER */}

      <div className="px-6 md:px-8 pt-7 pb-5 border-b border-[#E9ECEF]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${PRIMARY_COLOR}12`,
                }}
              >
                <FileText
                  size={16}
                  style={{
                    color: PRIMARY_COLOR,
                  }}
                />
              </div>

              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{
                  color: PRIMARY_COLOR,
                }}
              >
                Undergraduate Admission
              </span>
            </div>

            <h2 className="font-serif text-[22px] font-semibold text-[#1A1E24]">
              New Application
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete your application carefully
              before submitting.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Academic Year
            </p>

            <p
              className="text-sm font-semibold mt-1"
              style={{
                color: PRIMARY_COLOR,
              }}
            >
              {academicYear}
            </p>
          </div>
        </div>

        {/* PROGRESS */}

        <div className="mt-7">

          <div className="hidden sm:flex items-center">
            {progressSteps.map(
              (item, index) => {
                const isActive =
                  step === item.number;

                const isPast =
                  step > item.number;

                return (
                  <React.Fragment
                    key={item.number}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          item.number < step
                        ) {
                          setStep(
                            item.number
                          );
                        }
                      }}
                      className={`flex items-center gap-2 ${
                        item.number < step
                          ? "cursor-pointer"
                          : "cursor-default"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition ${
                          isPast ||
                          isActive
                            ? "text-white border-transparent"
                            : "text-gray-400 bg-white border-gray-200"
                        }`}
                        style={
                          isPast ||
                          isActive
                            ? {
                                backgroundColor:
                                  PRIMARY_COLOR,
                              }
                            : undefined
                        }
                      >
                        {isPast ? (
                          <CheckCircle2
                            size={16}
                          />
                        ) : (
                          item.number
                        )}
                      </span>

                      <span
                        className={`text-xs font-medium ${
                          isActive
                            ? "text-[#1A1E24]"
                            : isPast
                            ? "text-gray-600"
                            : "text-gray-400"
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>

                    {index <
                      progressSteps.length -
                        1 && (
                      <div
                        className="flex-1 h-px mx-3"
                        style={{
                          backgroundColor:
                            step >
                            item.number
                              ? PRIMARY_COLOR
                              : "#E5E7EB",
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              }
            )}
          </div>

          {/* MOBILE PROGRESS */}

          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700">
                Step {step} of 4
              </span>

              <span
                className="text-xs font-medium"
                style={{
                  color: PRIMARY_COLOR,
                }}
              >
                {progressSteps[step - 1]
                  ?.label}
              </span>
            </div>

            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(step / 4) * 100}%`,
                  backgroundColor:
                    PRIMARY_COLOR,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* =====================================================
            STEP 1 - PROGRAMMES
        ====================================================== */}

        {step === 1 && (
          <div className="p-6 md:p-8 space-y-6">

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-gray-800">
                  Programme Choices{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    color: PRIMARY_COLOR,
                    backgroundColor: `${PRIMARY_COLOR}12`,
                  }}
                >
                  3 choices required
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-5">
                Select three programmes in your
                preferred order. Choice 1 is your
                primary programme.
              </p>

              <div className="space-y-4">

                {[0, 1, 2].map(
                  (index) => (
                    <div
                      key={index}
                      className="relative"
                    >
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Programme Choice{" "}
                        {index + 1}{" "}
                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <select
                        value={
                          programs[index] ||
                          ""
                        }
                        onChange={(e) =>
                          handleProgramChange(
                            index,
                            e.target.value
                          )
                        }
                        className={selectClass}
                        required
                      >
                        <option value="">
                          Select{" "}
                          {index === 0
                            ? "first"
                            : index === 1
                            ? "second"
                            : "third"}{" "}
                          programme...
                        </option>

                        {PROGRAMS.map(
                          (program) => (
                            <option
                              key={program}
                              value={
                                program
                              }
                              disabled={
                                programs.some(
                                  (
                                    selected,
                                    selectedIndex
                                  ) =>
                                    selectedIndex !==
                                      index &&
                                    selected ===
                                      program
                                )
                              }
                            >
                              {program}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  )
                )}

              </div>

              <div
                className="mt-5 rounded-xl p-4 border"
                style={{
                  backgroundColor: `${PRIMARY_COLOR}06`,
                  borderColor: `${PRIMARY_COLOR}20`,
                }}
              >
                <div className="flex gap-3">
                  <AlertCircle
                    size={17}
                    className="flex-shrink-0 mt-0.5"
                    style={{
                      color: PRIMARY_COLOR,
                    }}
                  />

                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{
                        color:
                          PRIMARY_COLOR,
                      }}
                    >
                      Programme preference
                    </p>

                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Choose your programmes
                      carefully. The order you
                      provide will be used as your
                      admission preference.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACADEMIC YEAR */}

            <div className="pt-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Academic Year{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <select
                value={academicYear}
                onChange={(e) =>
                  setAcademicYear(
                    e.target.value
                  )
                }
                className={selectClass}
                required
              >
                <option value="2026/2027">
                  2026/2027
                </option>

                <option value="2027/2028">
                  2027/2028
                </option>
              </select>
            </div>

            <button
              type="button"
              onClick={nextStep}
              disabled={!isStep1Complete}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                !isStep1Complete
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "text-white"
              }`}
              style={
                isStep1Complete
                  ? {
                      backgroundColor:
                        PRIMARY_COLOR,
                    }
                  : undefined
              }
            >
              Continue to Personal Details
              <ChevronRight size={17} />
            </button>

          </div>
        )}

        {/* =====================================================
            STEP 2 - PERSONAL DETAILS
        ====================================================== */}

        {step === 2 && (
          <div className="p-6 md:p-8 space-y-5">

            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-semibold text-gray-800">
                Personal Information
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Enter your personal and contact
                information.
              </p>
            </div>

            {/* FIRST + LAST NAME */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  First Name{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <UserIcon
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="firstName"
                    value={
                      personalInfo.firstName
                    }
                    onChange={
                      handlePersonalChange
                    }
                    placeholder="Enter your first name"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Name{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <UserIcon
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="lastName"
                    value={
                      personalInfo.lastName
                    }
                    onChange={
                      handlePersonalChange
                    }
                    placeholder="Enter your last name"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                    required
                  />
                </div>
              </div>

            </div>

            {/* DOB + GENDER */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date of Birth
                </label>

                <div className="relative">
                  <Calendar
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                    style={{
                      color: PRIMARY_COLOR,
                    }}
                  />

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={
                      personalInfo.dateOfBirth
                    }
                    onChange={
                      handlePersonalChange
                    }
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Gender
                </label>

                <div className="relative">
                  <UserIcon
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                    style={{
                      color: PRIMARY_COLOR,
                    }}
                  />

                  <select
                    name="gender"
                    value={
                      personalInfo.gender
                    }
                    onChange={
                      handlePersonalChange
                    }
                    className={`${smallSelectClass} pl-9`}
                  >
                    <option value="">
                      Select gender...
                    </option>

                    {GENDER_OPTIONS.map(
                      (g) => (
                        <option
                          key={g}
                          value={g}
                        >
                          {g}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

            </div>

            {/* EMAIL */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={
                    personalInfo.email
                  }
                  onChange={
                    handlePersonalChange
                  }
                  placeholder="Enter your email address"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                  required
                />
              </div>
            </div>

            {/* PHONE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  name="phoneNumber"
                  value={
                    personalInfo.phoneNumber
                  }
                  onChange={
                    handlePersonalChange
                  }
                  placeholder="Enter your phone number"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                />
              </div>
            </div>

            {/* NATIONALITY */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nationality
              </label>

              <CountrySelect
                value={
                  personalInfo.nationality
                }
                onChange={(val) =>
                  setPersonalInfo({
                    ...personalInfo,
                    nationality: val,
                  })
                }
              />
            </div>

            {/* ADDRESS */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Address
              </label>

              <div className="relative">
                <Home
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="address"
                  value={
                    personalInfo.address
                  }
                  onChange={
                    handlePersonalChange
                  }
                  placeholder="Enter your address"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                />
              </div>
            </div>

            {/* CITY + COUNTRY */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={personalInfo.city}
                  onChange={
                    handlePersonalChange
                  }
                  placeholder="Enter your city"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={
                    personalInfo.country
                  }
                  onChange={
                    handlePersonalChange
                  }
                  placeholder="Enter your country"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                />
              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex gap-3 pt-3">

              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft size={16} />
                Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={!isStep2Complete}
                className={`flex-[2] py-3 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2 ${
                  !isStep2Complete
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-white"
                }`}
                style={
                  isStep2Complete
                    ? {
                        backgroundColor:
                          PRIMARY_COLOR,
                      }
                    : undefined
                }
              >
                Continue to Education
                <ChevronRight size={16} />
              </button>

            </div>
          </div>
        )}

        {/* =====================================================
            STEP 3 - EDUCATION
        ====================================================== */}

        {step === 3 && (
          <div className="p-6 md:p-8 space-y-5">

            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-semibold text-gray-800">
                Education Information
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Provide your secondary school and
                WASSCE information.
              </p>
            </div>

            {/* SCHOOL + COURSE */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  High School / Secondary School{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <div className="relative">
                  <BookOpen
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="highSchool"
                    value={
                      educationInfo.highSchool
                    }
                    onChange={
                      handleEducationChange
                    }
                    placeholder="e.g. Prempeh College"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Course Studied in School{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <select
                  value={
                    educationInfo.schoolCourse
                  }
                  onChange={
                    handleSchoolCourseChange
                  }
                  className={smallSelectClass}
                  required
                >
                  <option value="">
                    Select the course you did...
                  </option>

                  {SCHOOL_COURSES.map(
                    (c) => (
                      <option
                        key={c.value}
                        value={c.value}
                      >
                        {c.label}
                      </option>
                    )
                  )}
                </select>

                {educationInfo.schoolCourse && (
                  <p className="text-xs text-gray-500 mt-1.5">
                    Select the subjects you
                    actually studied below.
                  </p>
                )}
              </div>

            </div>

            {/* GRADUATION + AGGREGATE */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Graduation Year
                </label>

                <input
                  type="text"
                  name="graduationYear"
                  value={
                    educationInfo.graduationYear
                  }
                  onChange={
                    handleEducationChange
                  }
                  placeholder="e.g. 2025"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  WASSCE Aggregate
                </label>

                <input
                  type="text"
                  name="wassceAggregate"
                  value={
                    educationInfo.wassceAggregate
                  }
                  onChange={
                    handleEducationChange
                  }
                  placeholder="e.g. 12"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                />
              </div>

            </div>

            {educationInfo.schoolCourse && (
              <>
                {/* CORE SUBJECTS */}

                <div className="border border-gray-200 rounded-xl p-4 md:p-5">

                  <div className="flex items-center gap-2 mb-4">

                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${PRIMARY_COLOR}12`,
                      }}
                    >
                      <CheckCircle2
                        size={14}
                        style={{
                          color:
                            PRIMARY_COLOR,
                        }}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Core Subjects
                      </p>

                      <p className="text-[11px] text-gray-400">
                        Required subjects
                      </p>
                    </div>

                  </div>

                  <div className="space-y-2">

                    {educationInfo.coreSubjects.map(
                      (subject, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-gray-50"
                        >
                          <span className="text-sm text-gray-600 truncate">
                            {subject.name}
                          </span>

                          <select
                            value={
                              subject.grade
                            }
                            onChange={(e) =>
                              handleCoreSubjectChange(
                                index,
                                e.target.value
                              )
                            }
                            className={gradeSelectClass}
                            aria-label={`Grade for ${subject.name}`}
                          >
                            <option value="">
                              Grade
                            </option>

                            {GRADE_OPTIONS.map(
                              (grade) => (
                                <option
                                  key={grade}
                                  value={grade}
                                >
                                  {grade}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      )
                    )}

                  </div>
                </div>

                {/* ELECTIVE SUBJECTS */}

                <div className="border border-gray-200 rounded-xl p-4 md:p-5">

                  <div className="mb-4">
                    <div className="flex items-center gap-2">

                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: `${PRIMARY_COLOR}12`,
                        }}
                      >
                        <BookOpen
                          size={14}
                          style={{
                            color:
                              PRIMARY_COLOR,
                          }}
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {getSchoolCourseLabel(
                            educationInfo.schoolCourse
                          )}{" "}
                          Electives
                        </p>

                        <p className="text-[11px] text-gray-400">
                          Select the subjects you
                          took
                        </p>
                      </div>

                    </div>
                  </div>

                  <div className="space-y-2">

                    {educationInfo
                      .electiveSubjects
                      .length === 0 ? (
                      <div className="border border-dashed border-gray-300 rounded-lg p-5 text-center">

                        <BookOpen
                          size={20}
                          className="mx-auto text-gray-300 mb-2"
                        />

                        <p className="text-sm text-gray-500">
                          No elective subjects
                          selected yet.
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Add the elective
                          subjects you studied.
                        </p>

                      </div>
                    ) : (
                      educationInfo.electiveSubjects.map(
                        (subject, index) => (
                          <div
                            key={`${subject.name}-${index}`}
                            className="grid grid-cols-[minmax(0,1fr)_76px_36px] gap-2 items-center"
                          >

                            <select
                              value={
                                subject.name
                              }
                              onChange={(e) =>
                                handleElectiveSubjectNameChange(
                                  index,
                                  e.target.value
                                )
                              }
                              className={`${smallSelectClass} min-w-0`}
                              aria-label={`Elective subject ${index + 1}`}
                            >
                              {ELECTIVE_SUBJECTS_BY_COURSE[
                                educationInfo.schoolCourse as SchoolCourse
                              ].map(
                                (
                                  subjectName
                                ) => {
                                  const alreadySelected =
                                    educationInfo.electiveSubjects.some(
                                      (
                                        selected,
                                        selectedIndex
                                      ) =>
                                        selectedIndex !==
                                          index &&
                                        selected.name ===
                                          subjectName
                                    );

                                  if (
                                    alreadySelected
                                  ) {
                                    return null;
                                  }

                                  return (
                                    <option
                                      key={
                                        subjectName
                                      }
                                      value={
                                        subjectName
                                      }
                                    >
                                      {
                                        subjectName
                                      }
                                    </option>
                                  );
                                }
                              )}
                            </select>

                            <select
                              value={
                                subject.grade
                              }
                              onChange={(e) =>
                                handleElectiveSubjectGradeChange(
                                  index,
                                  e.target.value
                                )
                              }
                              className={
                                gradeSelectClass
                              }
                              aria-label={`Grade for ${subject.name}`}
                            >
                              <option value="">
                                Grade
                              </option>

                              {GRADE_OPTIONS.map(
                                (grade) => (
                                  <option
                                    key={grade}
                                    value={grade}
                                  >
                                    {grade}
                                  </option>
                                )
                              )}
                            </select>

                            <button
                              type="button"
                              onClick={() =>
                                removeElectiveSubject(
                                  index
                                )
                              }
                              className="w-9 h-9 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition"
                              title="Remove subject"
                              aria-label={`Remove ${subject.name}`}
                            >
                              <Trash2
                                size={15}
                              />
                            </button>

                          </div>
                        )
                      )
                    )}

                  </div>

                  <div className="mt-3">

                    <button
                      type="button"
                      onClick={
                        addElectiveSubject
                      }
                      disabled={
                        !canAddAnotherElective
                      }
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                        !canAddAnotherElective
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "text-white"
                      }`}
                      style={
                        canAddAnotherElective
                          ? {
                              backgroundColor:
                                PRIMARY_COLOR,
                            }
                          : undefined
                      }
                    >
                      <Plus size={15} />
                      Add Subject
                    </button>

                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    Select only the elective
                    subjects you actually took in
                    secondary school.
                  </p>

                </div>
              </>
            )}

            {/* BUTTONS */}

            <div className="flex gap-3 pt-2">

              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft size={16} />
                Back
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={!isStep3Complete}
                className={`flex-[2] py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                  !isStep3Complete
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-white"
                }`}
                style={
                  isStep3Complete
                    ? {
                        backgroundColor:
                          PRIMARY_COLOR,
                      }
                    : undefined
                }
              >
                Review Application
                <ChevronRight size={17} />
              </button>

            </div>
          </div>
        )}

        {/* =====================================================
            STEP 4 - PREVIEW & CONFIRM
        ====================================================== */}

        {step === 4 && (
          <div className="p-6 md:p-8 space-y-5">

            {/* REVIEW HEADER */}

            <div
              className="rounded-xl p-5 border"
              style={{
                backgroundColor: `${PRIMARY_COLOR}06`,
                borderColor: `${PRIMARY_COLOR}20`,
              }}
            >
              <div className="flex items-start gap-3">

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${PRIMARY_COLOR}15`,
                  }}
                >
                  <ShieldCheck
                    size={20}
                    style={{
                      color: PRIMARY_COLOR,
                    }}
                  />
                </div>

                <div>
                  <h3
                    className="text-base font-semibold"
                    style={{
                      color: PRIMARY_COLOR,
                    }}
                  >
                    Review Your Application
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Please check all the information
                    below carefully. You can edit any
                    section before submitting your
                    application.
                  </p>
                </div>

              </div>
            </div>

            {/* PROGRAMME SECTION */}

            <div className="border border-gray-200 rounded-xl overflow-hidden">

              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">

                <div className="flex items-center gap-2">
                  <FileText
                    size={16}
                    style={{
                      color: PRIMARY_COLOR,
                    }}
                  />

                  <h4 className="text-sm font-semibold text-gray-800">
                    Programme Choices
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    editStep(1)
                  }
                  className="flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{
                    color: PRIMARY_COLOR,
                  }}
                >
                  <Pencil size={12} />
                  Edit
                </button>

              </div>

              <div className="p-4 space-y-3">

                {[0, 1, 2].map(
                  (index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <span
                        className="w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor:
                            PRIMARY_COLOR,
                        }}
                      >
                        {index + 1}
                      </span>

                      <div>
                        <p className="text-[11px] text-gray-400">
                          {index === 0
                            ? "First Choice"
                            : index === 1
                            ? "Second Choice"
                            : "Third Choice"}
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                          {programs[index] ||
                            "—"}
                        </p>
                      </div>

                    </div>
                  )
                )}

                <div className="pt-3 mt-1 border-t border-gray-100">

                  <p className="text-[11px] text-gray-400">
                    Academic Year
                  </p>

                  <p className="text-sm font-semibold text-gray-800 mt-0.5">
                    {academicYear}
                  </p>

                </div>

              </div>
            </div>

            {/* PERSONAL SECTION */}

            <div className="border border-gray-200 rounded-xl overflow-hidden">

              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">

                <div className="flex items-center gap-2">
                  <UserIcon
                    size={16}
                    style={{
                      color: PRIMARY_COLOR,
                    }}
                  />

                  <h4 className="text-sm font-semibold text-gray-800">
                    Personal Information
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    editStep(2)
                  }
                  className="flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{
                    color: PRIMARY_COLOR,
                  }}
                >
                  <Pencil size={12} />
                  Edit
                </button>

              </div>

              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">

                <div>
                  <p className="text-[11px] text-gray-400">
                    Full Name
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.firstName}{" "}
                    {personalInfo.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    Email
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-0.5 break-all">
                    {personalInfo.email ||
                      "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    Phone Number
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.phoneNumber ||
                      "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    Date of Birth
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.dateOfBirth ||
                      "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    Gender
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.gender ||
                      "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    Nationality
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.nationality ||
                      "—"}
                  </p>
                </div>

                <div className="sm:col-span-2">

                  <p className="text-[11px] text-gray-400">
                    Address
                  </p>

                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {[
                      personalInfo.address,
                      personalInfo.city,
                      personalInfo.country,
                    ]
                      .filter(Boolean)
                      .join(", ") ||
                      "—"}
                  </p>

                </div>

              </div>
            </div>

            {/* EDUCATION SECTION */}

            <div className="border border-gray-200 rounded-xl overflow-hidden">

              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">

                <div className="flex items-center gap-2">
                  <BookOpen
                    size={16}
                    style={{
                      color: PRIMARY_COLOR,
                    }}
                  />

                  <h4 className="text-sm font-semibold text-gray-800">
                    Education Information
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    editStep(3)
                  }
                  className="flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{
                    color: PRIMARY_COLOR,
                  }}
                >
                  <Pencil size={12} />
                  Edit
                </button>

              </div>

              <div className="p-4 space-y-5">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <p className="text-[11px] text-gray-400">
                      High School
                    </p>

                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {educationInfo.highSchool ||
                        "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      Course Studied
                    </p>

                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {getSchoolCourseLabel(
                        educationInfo.schoolCourse
                      ) || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      Graduation Year
                    </p>

                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {educationInfo.graduationYear ||
                        "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">
                      WASSCE Aggregate
                    </p>

                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {educationInfo.wassceAggregate ||
                        "—"}
                    </p>
                  </div>

                </div>

                {/* CORE */}

                <div>

                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Core Subjects
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                    {educationInfo.coreSubjects.map(
                      (subject) => (
                        <div
                          key={subject.name}
                          className="flex items-center justify-between gap-3 px-3 py-2.5 bg-gray-50 rounded-lg"
                        >

                          <span className="text-xs text-gray-600">
                            {subject.name}
                          </span>

                          <span
                            className={`text-xs font-bold px-2 py-1 rounded ${
                              subject.grade
                                ? "bg-white"
                                : "text-gray-400"
                            }`}
                            style={
                              subject.grade
                                ? {
                                    color:
                                      PRIMARY_COLOR,
                                  }
                                : undefined
                            }
                          >
                            {subject.grade ||
                              "Not selected"}
                          </span>

                        </div>
                      )
                    )}

                  </div>
                </div>

                {/* ELECTIVES */}

                <div>

                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    Elective Subjects
                  </p>

                  {educationInfo
                    .electiveSubjects
                    .length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                      {educationInfo.electiveSubjects.map(
                        (subject) => (
                          <div
                            key={subject.name}
                            className="flex items-center justify-between gap-3 px-3 py-2.5 bg-gray-50 rounded-lg"
                          >

                            <span className="text-xs text-gray-600">
                              {subject.name}
                            </span>

                            <span
                              className={`text-xs font-bold px-2 py-1 rounded ${
                                subject.grade
                                  ? "bg-white"
                                  : "text-gray-400"
                              }`}
                              style={
                                subject.grade
                                  ? {
                                      color:
                                        PRIMARY_COLOR,
                                    }
                                  : undefined
                              }
                            >
                              {subject.grade ||
                                "Not selected"}
                            </span>

                          </div>
                        )
                      )}

                    </div>
                  ) : (
                    <div className="px-3 py-3 rounded-lg bg-gray-50 text-xs text-gray-400">
                      No elective subjects
                      selected.
                    </div>
                  )}

                </div>

              </div>
            </div>

            {/* CONFIRMATION */}

            <div
              className={`border rounded-xl p-4 transition ${
                confirmed
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-200"
              }`}
            >

              <label className="flex items-start gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) =>
                    setConfirmed(
                      e.target.checked
                    )
                  }
                  className="mt-0.5 w-4 h-4 rounded"
                  style={{
                    accentColor:
                      PRIMARY_COLOR,
                  }}
                />

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    I confirm that the information
                    provided is accurate.
                  </p>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    I understand that providing
                    false or inaccurate information
                    may affect my application.
                  </p>

                </div>

              </label>

            </div>

            {/* SUBMIT INFORMATION */}

            <div
              className="rounded-xl p-4 border"
              style={{
                backgroundColor: `${PRIMARY_COLOR}06`,
                borderColor: `${PRIMARY_COLOR}20`,
              }}
            >

              <div className="flex items-start gap-3">

                <AlertCircle
                  size={17}
                  className="flex-shrink-0 mt-0.5"
                  style={{
                    color: PRIMARY_COLOR,
                  }}
                />

                <p className="text-xs text-gray-600 leading-relaxed">
                  Once you submit this application,
                  your information will be sent for
                  processing. Please make sure all
                  details are correct before
                  continuing.
                </p>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex gap-3 pt-2">

              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft size={16} />
                Back
              </button>

              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !isFormComplete ||
                  !confirmed
                }
                className={`flex-[2] py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                  isSubmitting ||
                  !isFormComplete ||
                  !confirmed
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-white"
                }`}
                style={
                  !isSubmitting &&
                  isFormComplete &&
                  confirmed
                    ? {
                        backgroundColor:
                          PRIMARY_COLOR,
                      }
                    : undefined
                }
              >

                {isSubmitting ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Application
                  </>
                )}

              </button>

            </div>

          </div>
        )}

      </form>
    </div>
  );
}

// ============================================================
// MAIN APPLICANT PORTAL
// ============================================================

export default function ApplicantPortal() {
  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);

  const [applicationSubmitted, setApplicationSubmitted] =
    useState<boolean>(false);

  const [applicationReference, setApplicationReference] =
    useState<string>("");

  // ============================================================
  // APPLICATION SUBMISSION
  // ============================================================

  const handleApply = (
    programs: string[],
    personalInfo: PersonalInfo,
    educationInfo: EducationInfo
  ) => {
    setIsSubmitting(true);

    // Temporary submission simulation.
    // Replace this later with your real API request.
    setTimeout(() => {
      console.log(
        "Application submitted:",
        {
          programs,
          personalInfo,
          educationInfo,
        }
      );

      // Generate temporary application reference.
      const reference = `ADM-${Date.now()
        .toString()
        .slice(-8)}`;

      setApplicationReference(reference);

      setIsSubmitting(false);

      // Show successful submission page.
      setApplicationSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans">

      {/* PAGE HEADER */}

      <div className="max-w-[760px] mx-auto px-6 pt-8 pb-2">
        <div className="flex items-center gap-2 text-xs text-gray-400">

          <Link
            to="/"
            className="hover:text-gray-600 transition"
          >
            Home
          </Link>

          <ChevronRight size={13} />

          <span className="text-gray-600">
            {applicationSubmitted
              ? "Application Submitted"
              : "New Application"}
          </span>

        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-6 py-6 flex flex-col gap-5">

        {!applicationSubmitted ? (
          <>
            {/* APPLICATION FORM */}

            <ApplicationForm
              onApply={handleApply}
              isSubmitting={isSubmitting}
            />

            {/* BOTTOM ACTIONS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">

              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-white border border-[#E4E7EB] rounded-xl text-[13px] font-medium text-[#1A1E24] hover:border-[#9AA4B1] transition-all cursor-pointer hover:shadow-sm"
              >
                <FileText size={16} />
                View All Applications
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-white border border-[#E4E7EB] rounded-xl text-[13px] font-medium text-[#1A1E24] hover:border-[#9AA4B1] transition-all cursor-pointer hover:shadow-sm"
              >
                <Send size={16} />
                Contact Support
              </button>

            </div>

            {/* STATUS LEGEND */}

            <div className="mt-2 p-4 bg-white border border-[#E4E7EB] rounded-xl">

              <p className="text-xs font-semibold text-[#5C6B7A] mb-2">
                Status Legend
              </p>

              <div className="flex flex-wrap gap-4">

                <div className="flex items-center gap-1.5">
                  <CheckCircle2
                    size={14}
                    className="text-green-600"
                  />

                  <span className="text-xs text-[#5C6B7A]">
                    Verified
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <FileCheck
                    size={14}
                    style={{
                      color: PRIMARY_COLOR,
                    }}
                  />

                  <span className="text-xs text-[#5C6B7A]">
                    Uploaded
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock
                    size={14}
                    className="text-yellow-600"
                  />

                  <span className="text-xs text-[#5C6B7A]">
                    Pending
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <AlertCircle
                    size={14}
                    className="text-red-600"
                  />

                  <span className="text-xs text-[#5C6B7A]">
                    Action Needed
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Circle
                    size={14}
                    className="text-gray-400"
                  />

                  <span className="text-xs text-[#5C6B7A]">
                    Not Uploaded
                  </span>
                </div>

              </div>
            </div>
          </>
        ) : (
          <>
            {/* APPLICATION SUCCESS */}

            <ApplicationSuccess
              applicationReference={
                applicationReference
              }
            />

            {/* SUCCESS PAGE ACTIONS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">

              <button
                type="button"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-white border border-[#E4E7EB] rounded-xl text-[13px] font-medium text-[#1A1E24] hover:border-[#9AA4B1] transition-all cursor-pointer hover:shadow-sm"
              >
                <FileText size={16} />
                View Application
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3.5 bg-white border border-[#E4E7EB] rounded-xl text-[13px] font-medium text-[#1A1E24] hover:border-[#9AA4B1] transition-all cursor-pointer hover:shadow-sm"
              >
                <Send size={16} />
                Contact Support
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}