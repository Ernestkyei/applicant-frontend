import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Bell, 
  Upload, 
  CheckCircle2, 
  Circle, 
  FileText, 
  CreditCard, 
  User, 
  LogOut, 
  Lock, 
  XCircle,
  Menu,
  X,
  Clock,
  AlertCircle,
  Check,
  FileCheck,
  Send,
  Eye,
  Loader2,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User as UserIcon,
  BookOpen,
  Home,
  FilePlus,
  Award
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

interface Document {
  id: string;
  name: string;
  status: 'verified' | 'pending' | 'missing' | 'uploaded' | 'not_uploaded';
  file?: File;
  fileUrl?: string;
  uploadDate?: string;
}

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

interface EducationInfo {
  highSchool: string;
  graduationYear: string;
  wassceAggregate: string;
  subjects: { name: string; grade: string }[];
}

interface Application {
  id: string;
  year: string;
  ref: string;
  program: string;
  programType?: string;
  stage: number;
  open: boolean;
  outcome: 'pending' | 'approved' | 'rejected' | null;
  documents: Document[];
  personalInfo?: PersonalInfo;
  educationInfo?: EducationInfo;
  submittedDate?: string;
  decisionDate?: string;
  isDraft?: boolean;
}

interface CycleSwitcherProps {
  applications: Application[];
  selectedYear: string;
  onSelect: (year: string) => void;
}

interface StatusTimelineProps {
  app: Application;
}

interface DocumentChecklistProps {
  app: Application;
  onUpload: (appYear: string, docId: string, file: File) => void;
  onRemove: (appYear: string, docId: string) => void;
}

interface NavItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active: boolean;
}

interface ApplicationFormProps {
  onApply: (program: string, personalInfo: PersonalInfo, educationInfo: EducationInfo) => void;
  isSubmitting: boolean;
}

// ============================================================
// CONSTANTS
// ============================================================

// PROGRESS STAGES - CORRECT ORDER
const PROGRESS_STAGES = [
  { 
    key: 'not_started', 
    label: 'Not Started', 
    icon: <FilePlus size={16} />,
    description: 'Application not yet started',
    isStart: true
  },
  { 
    key: 'submitted', 
    label: 'Submitted', 
    icon: <Send size={16} />,
    description: 'Application submitted successfully'
  },
  { 
    key: 'documents_verified', 
    label: 'Documents Verified', 
    icon: <FileCheck size={16} />,
    description: 'All documents have been verified'
  },
  { 
    key: 'under_review', 
    label: 'Under Review', 
    icon: <Eye size={16} />,
    description: 'Application is being reviewed by the committee'
  },
  { 
    key: 'decision', 
    label: 'Decision', 
    icon: <Award size={16} />,
    description: 'Final decision has been made'
  },
];

const STAGES: string[] = ["Not Started", "Submitted", "Documents Verified", "Under Review", "Decision"];

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const GRADE_OPTIONS = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];
const SUBJECTS = [
  "Mathematics",
  "English",
  "Integrated Science",
  "Social Studies",
  "Elective Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Geography",
  "History",
  "Government",
  "Economics",
  "Accounting",
  "Business Management",
  "French",
  "Twi",
  "Ga",
  "Ewe"
];

const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app1",
    year: "2026/2027",
    ref: "AES-2026-0341",
    program: "BSc Computer Science",
    programType: "UNDERGRAD",
    stage: 0, // NOT STARTED
    open: true,
    outcome: null,
    isDraft: true,
    documents: [
      { id: "doc1", name: "WASSCE Results Slip", status: "not_uploaded" },
      { id: "doc2", name: "National ID / Passport", status: "not_uploaded" },
      { id: "doc3", name: "Passport Photograph", status: "not_uploaded" },
      { id: "doc4", name: "Birth Certificate", status: "not_uploaded" },
    ],
    personalInfo: {
      firstName: "Kwabena",
      lastName: "Osei",
      dateOfBirth: "2005-03-15",
      gender: "Male",
      nationality: "Ghanaian",
      phoneNumber: "0244123456",
      email: "kwabena@example.com",
      address: "123 Independence Avenue",
      city: "Accra",
      country: "Ghana",
    },
    educationInfo: {
      highSchool: "Prempeh College",
      graduationYear: "2025",
      wassceAggregate: "12",
      subjects: [
        { name: "Mathematics", grade: "" },
        { name: "English", grade: "" },
        { name: "Integrated Science", grade: "" },
        { name: "Social Studies", grade: "" },
        { name: "Elective Mathematics", grade: "" },
        { name: "Physics", grade: "" },
        { name: "Chemistry", grade: "" },
        { name: "Biology", grade: "" },
      ],
    },
  },
  {
    id: "app2",
    year: "2026/2027",
    ref: "AES-2026-0342",
    program: "BSc Nursing",
    programType: "UNDERGRAD",
    stage: 1, // SUBMITTED
    open: true,
    outcome: null,
    submittedDate: "2026-07-20",
    documents: [
      { id: "doc1", name: "WASSCE Results Slip", status: "pending" },
      { id: "doc2", name: "National ID / Passport", status: "pending" },
      { id: "doc3", name: "Passport Photograph", status: "pending" },
      { id: "doc4", name: "Birth Certificate", status: "pending" },
    ],
    personalInfo: {
      firstName: "Ama",
      lastName: "Serwaa",
      dateOfBirth: "2004-08-22",
      gender: "Female",
      nationality: "Ghanaian",
      phoneNumber: "0244789012",
      email: "ama@example.com",
      address: "456 Liberation Road",
      city: "Accra",
      country: "Ghana",
    },
    educationInfo: {
      highSchool: "Mfantsiman Girls",
      graduationYear: "2025",
      wassceAggregate: "10",
      subjects: [
        { name: "Mathematics", grade: "A1" },
        { name: "English", grade: "A1" },
        { name: "Integrated Science", grade: "A1" },
        { name: "Social Studies", grade: "A1" },
        { name: "Elective Mathematics", grade: "B2" },
        { name: "Physics", grade: "B2" },
        { name: "Chemistry", grade: "B2" },
        { name: "Biology", grade: "A1" },
      ],
    },
  },
  {
    id: "app3",
    year: "2026/2027",
    ref: "AES-2026-0339",
    program: "BA Economics",
    programType: "UNDERGRAD",
    stage: 4, // DECISION - Approved
    open: false,
    outcome: "approved",
    submittedDate: "2026-07-14",
    decisionDate: "2026-08-01",
    documents: [
      { id: "doc1", name: "WASSCE Results Slip", status: "verified" },
      { id: "doc2", name: "National ID / Passport", status: "verified" },
      { id: "doc3", name: "Passport Photograph", status: "verified" },
      { id: "doc4", name: "Birth Certificate", status: "verified" },
    ],
    personalInfo: {
      firstName: "Yaw",
      lastName: "Mensah",
      dateOfBirth: "2005-01-10",
      gender: "Male",
      nationality: "Ghanaian",
      phoneNumber: "0244567890",
      email: "yaw@example.com",
      address: "789 High Street",
      city: "Kumasi",
      country: "Ghana",
    },
    educationInfo: {
      highSchool: "Opoku Ware School",
      graduationYear: "2025",
      wassceAggregate: "10",
      subjects: [
        { name: "Mathematics", grade: "A1" },
        { name: "English", grade: "A1" },
        { name: "Integrated Science", grade: "A1" },
        { name: "Social Studies", grade: "A1" },
        { name: "Elective Mathematics", grade: "B2" },
        { name: "Physics", grade: "B2" },
        { name: "Chemistry", grade: "B2" },
        { name: "Biology", grade: "B2" },
      ],
    },
  },
];

const DOC_META: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  verified: { 
    label: "Verified", 
    color: "text-green-700", 
    bg: "bg-green-50",
    icon: <Check size={14} className="text-green-600" />
  },
  uploaded: { 
    label: "Uploaded", 
    color: "text-blue-700", 
    bg: "bg-blue-50",
    icon: <FileCheck size={14} className="text-blue-600" />
  },
  pending: { 
    label: "Pending", 
    color: "text-yellow-700", 
    bg: "bg-yellow-50",
    icon: <Clock size={14} className="text-yellow-600" />
  },
  missing: { 
    label: "Action needed", 
    color: "text-red-700", 
    bg: "bg-red-50",
    icon: <AlertCircle size={14} className="text-red-600" />
  },
  not_uploaded: { 
    label: "Not Uploaded", 
    color: "text-gray-500", 
    bg: "bg-gray-100",
    icon: <Circle size={14} className="text-gray-400" />
  },
};

// ============================================================
// TOP NAVIGATION BAR
// ============================================================

function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  const navItems: NavItem[] = [
    { icon: FileText, label: "My Applications", active: true },
    { icon: Upload, label: "Documents", active: false },
    { icon: CreditCard, label: "Payments", active: false },
    { icon: User, label: "Profile", active: false },
  ];

  return (
    <nav className="bg-[#14181F] px-6 flex items-center justify-between h-[62px] border-b border-[#2A2F36] sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        <GraduationCap size={19} className="text-amber-600" />
        <span className="font-serif text-[16px] font-semibold text-white">
          Admissions Registry
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {navItems.map((it, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-1.5 text-[13px] cursor-pointer px-3 py-1.5 rounded-md transition-all ${
              it.active 
                ? 'text-white bg-white/10 font-semibold' 
                : 'text-[#9AA4B1] font-medium hover:text-white hover:bg-white/5'
            }`}
          >
            <it.icon size={14} />
            {it.label}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <Bell size={17} className="text-[#9AA4B1] cursor-pointer hover:text-white transition" />
        <div className="flex items-center gap-2 text-[#C7CDD6] text-[13px]">
          <div className="w-7 h-7 rounded-full bg-[#1F3A5F] text-white flex items-center justify-center font-serif text-xs font-semibold">
            KO
          </div>
          <span className="hidden sm:inline">Kwabena</span>
          <LogOut size={14} className="ml-1.5 cursor-pointer text-[#9AA4B1] hover:text-white transition" />
        </div>

        <button
          className="md:hidden text-white hover:text-amber-600 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[62px] left-0 right-0 bg-[#14181F] px-6 py-4 flex flex-col gap-2 border-t border-[#2A2F36]">
          {navItems.map((it, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-2.5 text-[14px] cursor-pointer px-3 py-2.5 rounded-md transition ${
                it.active 
                  ? 'text-white bg-white/10 font-semibold' 
                  : 'text-[#9AA4B1] font-medium hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <it.icon size={16} />
              {it.label}
            </div>
          ))}
          <div className="border-t border-[#2A2F36] mt-2 pt-3">
            <div className="flex items-center gap-2.5 text-[#9AA4B1] text-[14px] px-3 py-2.5 rounded-md cursor-pointer hover:text-white hover:bg-white/5 transition">
              <LogOut size={16} />
              Sign Out
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// ============================================================
// PROGRESS BAR - CORRECT PROCEDURE
// ============================================================

function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Progress</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================
// APPLICATION PROGRESS - CORRECT STAGES
// ============================================================

function ApplicationProgress({ 
  currentStage, 
  outcome,
  isDraft 
}: { 
  currentStage: number; 
  outcome: 'pending' | 'approved' | 'rejected' | null;
  isDraft?: boolean;
}) {
  const isCompleted = outcome === 'approved' || outcome === 'rejected';
  const isApproved = outcome === 'approved';
  const isRejected = outcome === 'rejected';
  const isNotStarted = currentStage === 0;

  // If draft/not started, show a different message
  if (isDraft || isNotStarted) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <FilePlus size={24} className="text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-700">Application Not Started</p>
            <p className="text-xs text-gray-500">Complete your application form and submit to begin the review process.</p>
            <button className="mt-2 px-4 py-1.5 bg-[#1F3A5F] text-white rounded-md text-xs font-medium hover:bg-[#2A4A7A] transition">
              Continue Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative mb-6">
        <div className="flex justify-between items-center">
          {PROGRESS_STAGES.map((stage, index) => {
            // Skip "Not Started" for active applications
            if (stage.isStart && !isNotStarted) return null;
            
            const adjustedIndex = stage.isStart ? 0 : index;
            const isActive = adjustedIndex <= currentStage;
            const isCurrent = adjustedIndex === currentStage;
            const isLast = index === PROGRESS_STAGES.length - 1;
            
            let statusColor = 'bg-gray-300';
            let textColor = 'text-gray-400';
            
            if (isRejected && isActive && index === PROGRESS_STAGES.length - 1) {
              statusColor = 'bg-red-600';
              textColor = 'text-red-600';
            } else if (isApproved && isActive) {
              statusColor = 'bg-green-600';
              textColor = 'text-green-600';
            } else if (isActive && !isCompleted) {
              statusColor = 'bg-blue-600';
              textColor = 'text-blue-600';
            }

            return (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center flex-1">
                  <div className="relative">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500
                      ${isActive ? `${statusColor} border-${statusColor}` : 'bg-gray-100 border-gray-300'}
                      ${isCurrent && !isCompleted ? 'ring-4 ring-blue-200 animate-pulse' : ''}
                    `}>
                      {isActive && !isRejected ? (
                        <CheckCircle2 size={20} className={isApproved ? 'text-green-600' : 'text-white'} />
                      ) : isRejected && isActive && index === PROGRESS_STAGES.length - 1 ? (
                        <XCircle size={20} className="text-white" />
                      ) : (
                        <Circle size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                      )}
                    </div>
                    {isCurrent && !isCompleted && (
                      <div className="absolute -top-1 -right-1">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping" />
                      </div>
                    )}
                  </div>

                  <div className="mt-2 text-center">
                    <div className={`
                      text-xs font-medium transition-colors duration-300
                      ${isActive ? textColor : 'text-gray-400'}
                    `}>
                      {stage.label}
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5 hidden md:block">
                      {stage.description}
                    </div>
                  </div>
                </div>

                {!isLast && index < PROGRESS_STAGES.length - 1 && (
                  <div className="flex-1 h-[2px] mx-2 mt-[-20px]">
                    <div className={`
                      h-full transition-all duration-500
                      ${index < currentStage ? 
                        (isRejected && index === currentStage - 1 ? 'bg-red-600' : 'bg-green-600') 
                        : 'bg-gray-200'
                      }
                    `} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Status Message */}
      <div className={`mt-2 px-4 py-2.5 rounded-md text-sm flex items-center gap-3 ${
        isApproved ? 'bg-green-50 border border-green-200 text-green-800' :
        isRejected ? 'bg-red-50 border border-red-200 text-red-800' :
        'bg-blue-50 border border-blue-200 text-blue-800'
      }`}>
        {isApproved ? (
          <>
            <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
            <span>Congratulations! Your application has been approved.</span>
          </>
        ) : isRejected ? (
          <>
            <XCircle size={18} className="text-red-600 flex-shrink-0" />
            <span>We regret to inform you that your application was not successful.</span>
          </>
        ) : (
          <>
            <Loader2 size={18} className="text-blue-600 animate-spin flex-shrink-0" />
            <span>Your application is currently at: <strong>{PROGRESS_STAGES.find((_, i) => i === currentStage)?.label || 'Processing'}</strong></span>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// CYCLE SWITCHER
// ============================================================

function CycleSwitcher({ applications, selectedYear, onSelect }: CycleSwitcherProps) {
  if (applications.length <= 1) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {applications.map((app: Application) => {
        const isSelected = app.year === selectedYear;
        return (
          <button
            key={app.id || app.year}
            onClick={() => onSelect(app.year)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[12.5px] font-semibold cursor-pointer transition-all ${
              isSelected 
                ? 'bg-[#E8EEF5] border-[1.5px] border-[#1F3A5F] text-[#1F3A5F]' 
                : 'bg-white border border-[#E4E7EB] text-[#5C6B7A] hover:border-[#9AA4B1]'
            }`}
          >
            {!app.open && <Lock size={11} className="text-[#9AA4B1]" />}
            {app.year}
            {app.open && (
              <span className="text-[9.5px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-[3px] tracking-wide">
                CURRENT
              </span>
            )}
            {!app.open && app.outcome === "rejected" && (
              <span className="text-[9.5px] font-bold text-red-700 bg-red-50 px-1.5 py-0.5 rounded-[3px] tracking-wide">
                REJECTED
              </span>
            )}
            {!app.open && app.outcome === "approved" && (
              <span className="text-[9.5px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-[3px] tracking-wide">
                APPROVED
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// STATUS TIMELINE
// ============================================================

function StatusTimeline({ app }: StatusTimelineProps) {
  const isRejectedAtEnd = app.outcome === "rejected";
  const isApprovedAtEnd = app.outcome === "approved";
  const currentStage = Math.min(app.stage, STAGES.length - 1);
  
  return (
    <div className="bg-white border border-[#E4E7EB] rounded-xl p-7 md:p-8 shadow-sm">
      <div className="flex justify-between items-start flex-wrap gap-3 mb-6">
        <div>
          <div className="font-mono text-[11px] text-[#9AA4B1] mb-1">
            REF: {app.ref} · CYCLE {app.year}
          </div>
          <div className="font-serif text-[19px] font-semibold text-[#1A1E24]">
            {app.program}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {app.isDraft && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-semibold border border-gray-300">
              <FilePlus size={14} />
              Draft
            </div>
          )}
          {!app.isDraft && app.open && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-semibold border border-blue-200">
              <Loader2 size={14} className="animate-spin" />
              In Progress
            </div>
          )}
          {!app.open && app.outcome === "rejected" && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-[11px] font-semibold border border-red-200">
              <XCircle size={14} />
              Not Admitted
            </div>
          )}
          {!app.open && app.outcome === "approved" && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-[11px] font-semibold border border-green-200">
              <CheckCircle2 size={14} />
              Admitted
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <ProgressBar current={currentStage + 1} total={STAGES.length} />
      </div>

      {/* Use the new ApplicationProgress component */}
      <ApplicationProgress 
        currentStage={app.stage} 
        outcome={app.outcome}
        isDraft={app.isDraft}
      />

      <div className={`mt-6 px-4 py-3.5 rounded-md text-[13px] border flex items-start gap-3 ${
        isRejectedAtEnd 
          ? 'bg-red-50 text-red-800 border-red-200' 
          : isApprovedAtEnd
          ? 'bg-green-50 text-green-800 border-green-200'
          : app.open && !app.isDraft
          ? 'bg-blue-50 text-blue-800 border-blue-200'
          : app.isDraft
          ? 'bg-gray-50 text-gray-600 border-gray-200'
          : 'bg-[#F7F8FA] text-[#5C6B7A] border-[#E4E7EB]'
      }`}>
        {app.isDraft ? (
          <>
            <FilePlus size={18} className="flex-shrink-0 mt-0.5 text-gray-500" />
            <span>This application is in draft mode. Complete all sections and submit to begin the review process.</span>
          </>
        ) : isRejectedAtEnd ? (
          <>
            <XCircle size={18} className="flex-shrink-0 mt-0.5 text-red-600" />
            <span>This application was not successful for this cycle. You're welcome to apply again in the next admissions cycle.</span>
          </>
        ) : isApprovedAtEnd ? (
          <>
            <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5 text-green-600" />
            <span>Congratulations! You have been admitted to {app.program} for the {app.year} academic year.</span>
          </>
        ) : app.open ? (
          <>
            <Loader2 size={18} className="flex-shrink-0 mt-0.5 text-blue-600 animate-spin" />
            <span>Your application is currently with a registrar for review. We'll notify you the moment there's an update — typically within 5–7 working days.</span>
          </>
        ) : (
          <>
            <Lock size={18} className="flex-shrink-0 mt-0.5 text-[#9AA4B1]" />
            <span>This application has been decided and this cycle is now closed.</span>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// APPLICATION FORM - FULL MULTI-STEP FORM
// ============================================================

function ApplicationForm({ onApply, isSubmitting }: ApplicationFormProps) {
  const [step, setStep] = useState<number>(1);
  const [program, setProgram] = useState("");
  const [academicYear, setAcademicYear] = useState("2026/2027");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
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
  const [educationInfo, setEducationInfo] = useState<EducationInfo>({
    highSchool: "",
    graduationYear: "",
    wassceAggregate: "",
    subjects: SUBJECTS.slice(0, 8).map((name: string) => ({ name, grade: "" })),
  });

  const programs = [
    "BSc Computer Science",
    "BSc Nursing",
    "BA Economics",
    "BSc Civil Engineering",
    "LLB Law",
    "BSc Pharmacy",
    "BSc Business Administration",
    "BA Sociology",
  ];

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEducationInfo({ ...educationInfo, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index: number, grade: string) => {
    const updatedSubjects = [...educationInfo.subjects];
    updatedSubjects[index] = { ...updatedSubjects[index], grade };
    setEducationInfo({ ...educationInfo, subjects: updatedSubjects });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !personalInfo.firstName || !personalInfo.lastName) return;
    
    onApply(program, personalInfo, educationInfo);
  };

  const nextStep = () => {
    if (step === 1) {
      if (!program || !academicYear) {
        alert("Please select a program and academic year");
        return;
      }
    }
    if (step === 2) {
      if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email) {
        alert("Please fill in all required fields (First Name, Last Name, Email)");
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const isStep1Complete = program && academicYear;
  const isStep2Complete = personalInfo.firstName && personalInfo.lastName && personalInfo.email;
  const isStep3Complete = educationInfo.highSchool;
  const isFormComplete = isStep1Complete && isStep2Complete && isStep3Complete;

  return (
    <div className="bg-white border border-[#E4E7EB] rounded-xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-[20px] font-semibold text-[#1A1E24]">
            New Application
          </h2>
          <p className="text-sm text-gray-500 mt-1">Fill in your details to apply</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Step {step} of 3</span>
          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select Program <span className="text-red-500">*</span>
              </label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              >
                <option value="">Choose a program...</option>
                {programs.map((p: string) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Academic Year <span className="text-red-500">*</span>
              </label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              >
                <option value="2026/2027">2026/2027</option>
                <option value="2027/2028">2027/2028</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700 flex items-center gap-2">
                <AlertCircle size={16} />
                You'll need to provide your personal and education details in the next steps.
              </p>
            </div>

            <button
              type="button"
              onClick={nextStep}
              disabled={!isStep1Complete}
              className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition ${
                !isStep1Complete
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#1F3A5F] text-white hover:bg-[#2A4A7A]'
              }`}
            >
              Next: Personal Details <ChevronRight size={16} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalChange}
                    placeholder="Enter your first name"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalChange}
                    placeholder="Enter your last name"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={personalInfo.dateOfBirth}
                    onChange={handlePersonalChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Gender
                </label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handlePersonalChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Select gender...</option>
                    {GENDER_OPTIONS.map((g: string) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalChange}
                  placeholder="Enter your email address"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={personalInfo.phoneNumber}
                  onChange={handlePersonalChange}
                  placeholder="Enter your phone number"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nationality
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="nationality"
                  value={personalInfo.nationality}
                  onChange={handlePersonalChange}
                  placeholder="Enter your nationality"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Address
              </label>
              <div className="relative">
                <Home size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={personalInfo.address}
                  onChange={handlePersonalChange}
                  placeholder="Enter your address"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={personalInfo.city}
                  onChange={handlePersonalChange}
                  placeholder="Enter your city"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={personalInfo.country}
                  onChange={handlePersonalChange}
                  placeholder="Enter your country"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold text-sm text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="flex-[2] py-3 bg-[#1F3A5F] text-white rounded-lg font-semibold text-sm hover:bg-[#2A4A7A] transition flex items-center justify-center gap-2"
              >
                Next: Education <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                High School / Secondary School <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <BookOpen size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="highSchool"
                  value={educationInfo.highSchool}
                  onChange={handleEducationChange}
                  placeholder="Enter your high school name"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Graduation Year
                </label>
                <input
                  type="text"
                  name="graduationYear"
                  value={educationInfo.graduationYear}
                  onChange={handleEducationChange}
                  placeholder="e.g. 2025"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  WASSCE Aggregate
                </label>
                <input
                  type="text"
                  name="wassceAggregate"
                  value={educationInfo.wassceAggregate}
                  onChange={handleEducationChange}
                  placeholder="e.g. 12"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WASSCE Subjects & Grades
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {educationInfo.subjects.map((subject: { name: string; grade: string }, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-32 flex-shrink-0">{subject.name}</span>
                    <select
                      value={subject.grade}
                      onChange={(e) => handleSubjectChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    >
                      <option value="">Select grade</option>
                      {GRADE_OPTIONS.map((grade: string) => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Application Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Program:</div>
                <div className="font-medium">{program}</div>
                <div className="text-gray-500">Academic Year:</div>
                <div className="font-medium">{academicYear}</div>
                <div className="text-gray-500">Name:</div>
                <div className="font-medium">{personalInfo.firstName} {personalInfo.lastName}</div>
                <div className="text-gray-500">Email:</div>
                <div className="font-medium">{personalInfo.email}</div>
                <div className="text-gray-500">High School:</div>
                <div className="font-medium">{educationInfo.highSchool}</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700 flex items-center gap-2">
                <AlertCircle size={16} />
                Review your application before submitting. You can go back to make changes.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold text-sm text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isFormComplete}
                className={`flex-[2] py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition ${
                  isSubmitting || !isFormComplete
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
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
// DOCUMENT CHECKLIST
// ============================================================

function DocumentChecklist({ app, onUpload, onRemove }: DocumentChecklistProps) {
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentDocId, setCurrentDocId] = useState<string>("");

  const handleUploadClick = (docId: string) => {
    setCurrentDocId(docId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentDocId) return;

    setUploadingId(currentDocId);
    
    setTimeout(() => {
      onUpload(app.year, currentDocId, file);
      setUploadingId(null);
      setCurrentDocId("");
    }, 1500);
    
    e.target.value = '';
  };

  const verifiedCount = app.documents.filter((d: Document) => d.status === "verified").length;
  const totalCount = app.documents.length;
  const allVerified = verifiedCount === totalCount;

  return (
    <div className="bg-white border border-[#E4E7EB] rounded-xl p-6 md:p-7 shadow-sm">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      />

      <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-3">
          <div className="font-serif text-[16px] font-semibold text-[#1A1E24]">
            Documents
          </div>
          {allVerified && app.open && !app.isDraft && (
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-[10px] font-semibold border border-green-200">
              <Check size={12} />
              Complete
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(verifiedCount / totalCount) * 100}%` }}
              />
            </div>
            <span className="text-[11px] text-[#5C6B7A] font-medium">
              {verifiedCount}/{totalCount}
            </span>
          </div>
          {!app.open && (
            <span className="text-[11px] text-[#9AA4B1] flex items-center gap-1">
              <Lock size={11} />
              Read-only
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {app.documents.map((d: Document) => {
          const meta = DOC_META[d.status] || DOC_META.pending;
          const isUploaded = d.status === 'uploaded' || d.status === 'verified';
          const isPending = d.status === 'pending';
          const isMissing = d.status === 'missing';
          const isNotUploaded = d.status === 'not_uploaded';

          return (
            <div 
              key={d.id} 
              className={`flex items-center justify-between flex-wrap gap-2 p-3 rounded-lg transition-all ${
                isMissing ? 'bg-red-50 border border-red-200' : 
                isPending ? 'bg-yellow-50 border border-yellow-200' :
                isNotUploaded ? 'bg-gray-50 border border-gray-200' :
                'bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="flex items-center gap-3 min-w-[180px]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isMissing ? 'bg-red-100' :
                  isPending ? 'bg-yellow-100' :
                  isNotUploaded ? 'bg-gray-100' :
                  'bg-green-100'
                }`}>
                  {meta.icon}
                </div>
                <div>
                  <span className="text-[13.5px] text-[#1A1E24] font-medium block">
                    {d.name}
                  </span>
                  {isUploaded && d.uploadDate && (
                    <span className="text-[10px] text-gray-400">
                      Uploaded: {d.uploadDate}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 ${meta.color} ${meta.bg}`}>
                  {meta.icon}
                  {meta.label}
                </span>

                {app.open && !app.isDraft && isUploaded && (
                  <button
                    onClick={() => onRemove(app.year, d.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition"
                    title="Remove document"
                  >
                    <Trash2 size={14} />
                  </button>
                )}

                {app.open && (isPending || isMissing || isNotUploaded) && !app.isDraft && (
                  <button 
                    onClick={() => handleUploadClick(d.id)}
                    disabled={uploadingId === d.id}
                    className={`border border-[#E4E7EB] rounded-md px-3 py-1.5 text-[11.5px] font-semibold text-[#1F3A5F] transition-all flex items-center gap-1 ${
                      uploadingId === d.id 
                        ? 'opacity-60 cursor-not-allowed' 
                        : 'hover:bg-[#F7F8FA] cursor-pointer'
                    }`}
                  >
                    {uploadingId === d.id ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={14} />
                        Upload
                      </>
                    )}
                  </button>
                )}

                {app.isDraft && (
                  <span className="text-[10px] text-gray-400 italic">
                    Submit application to upload documents
                  </span>
                )}

                {!app.open && isUploaded && (
                  <button
                    className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition"
                    title="Download"
                  >
                    <Download size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {app.open && !app.isDraft && app.documents.some(d => d.status === 'pending' || d.status === 'missing' || d.status === 'not_uploaded') && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700 flex items-center gap-2">
            <AlertCircle size={14} />
            Please upload all required documents to complete your application.
          </p>
        </div>
      )}

      {app.isDraft && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-600 flex items-center gap-2">
            <FilePlus size={14} />
            Submit your application to start the document upload process.
          </p>
        </div>
      )}

      {allVerified && app.open && !app.isDraft && (
        <div className="mt-4">
          <button className="w-full py-3 bg-green-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-800 transition">
            <Send size={16} />
            Submit Application for Review
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN APPLICANT PORTAL
// ============================================================

export default function ApplicantPortal() {
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [selectedYear, setSelectedYear] = useState<string>(
    applications.find((a: Application) => a.open)?.year || applications[0]?.year || ""
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const app = applications.find((a: Application) => a.year === selectedYear);

  const handleUpload = (appYear: string, docId: string, file: File) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.year !== appYear) return a;
        
        const updatedDocs = a.documents.map((d) => {
          if (d.id === docId) {
            return {
              ...d,
              status: 'uploaded' as const,
              file: file,
              fileUrl: URL.createObjectURL(file),
              uploadDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }),
            };
          }
          return d;
        });

        const allUploaded = updatedDocs.every((d) => d.status === 'uploaded' || d.status === 'verified');
        
        return {
          ...a,
          documents: updatedDocs,
          stage: allUploaded ? 2 : a.stage,
        };
      })
    );
  };

  const handleRemove = (appYear: string, docId: string) => {
    setApplications((prev) =>
      prev.map((a) => {
        if (a.year !== appYear) return a;
        
        const updatedDocs = a.documents.map((d) => {
          if (d.id === docId) {
            return {
              ...d,
              status: 'pending' as const,
              file: undefined,
              fileUrl: undefined,
              uploadDate: undefined,
            };
          }
          return d;
        });

        return {
          ...a,
          documents: updatedDocs,
          stage: 1,
        };
      })
    );
  };

  const handleApply = (program: string, personalInfo: PersonalInfo, educationInfo: EducationInfo) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newYear = "2026/2027";
      const newRef = `AES-2026-${String(applications.length + 1).padStart(4, '0')}`;
      
      const newApplication: Application = {
        id: `app-${Date.now()}`,
        year: newYear,
        ref: newRef,
        program: program,
        programType: "UNDERGRAD",
        stage: 0,
        open: true,
        outcome: null,
        isDraft: true,
        personalInfo: personalInfo,
        educationInfo: educationInfo,
        documents: [
          { id: `doc1-${Date.now()}`, name: "WASSCE Results Slip", status: "not_uploaded" },
          { id: `doc2-${Date.now()}`, name: "National ID / Passport", status: "not_uploaded" },
          { id: `doc3-${Date.now()}`, name: "Passport Photograph", status: "not_uploaded" },
          { id: `doc4-${Date.now()}`, name: "Birth Certificate", status: "not_uploaded" },
        ],
      };

      setApplications((prev) => [...prev, newApplication]);
      setSelectedYear(newYear);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (!app) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] font-sans">
        <TopNav />
        <div className="max-w-[760px] mx-auto px-6 py-10">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h2>
            <p className="text-gray-600 text-sm mb-6">Start your application journey today</p>
            <ApplicationForm onApply={handleApply} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans">
      <TopNav />
      
      <div className="max-w-[760px] mx-auto px-6 py-10 flex flex-col gap-5">
        <div className="flex justify-between items-end flex-wrap gap-3.5">
          <div>
            <h1 className="font-serif text-[22px] font-semibold text-[#1A1E24]">
              Welcome back, {app.personalInfo?.firstName || "Applicant"} 👋
            </h1>
            <p className="text-[13.5px] text-[#5C6B7A] mt-1 flex items-center gap-2">
              <span>Here's where things stand with your application.</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[10px] font-medium border border-blue-200">
                <Eye size={12} />
                Live Tracking
              </span>
            </p>
          </div>
          <CycleSwitcher 
            applications={applications} 
            selectedYear={selectedYear} 
            onSelect={setSelectedYear} 
          />
        </div>
        
        <StatusTimeline app={app} />
        
        <DocumentChecklist 
          app={app} 
          onUpload={handleUpload}
          onRemove={handleRemove}
        />
        
        <ApplicationForm onApply={handleApply} isSubmitting={isSubmitting} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <button className="flex items-center justify-center gap-2 px-4 py-3.5 bg-white border border-[#E4E7EB] rounded-xl text-[13px] font-medium text-[#1A1E24] hover:border-[#9AA4B1] transition-all cursor-pointer hover:shadow-sm">
            <FileText size={16} />
            View All Applications
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3.5 bg-white border border-[#E4E7EB] rounded-xl text-[13px] font-medium text-[#1A1E24] hover:border-[#9AA4B1] transition-all cursor-pointer hover:shadow-sm">
            <Send size={16} />
            Contact Support
          </button>
        </div>

        <div className="mt-4 p-4 bg-white border border-[#E4E7EB] rounded-xl">
          <p className="text-xs font-semibold text-[#5C6B7A] mb-2">Status Legend</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-green-600" />
              <span className="text-xs text-[#5C6B7A]">Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileCheck size={14} className="text-blue-600" />
              <span className="text-xs text-[#5C6B7A]">Uploaded</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-yellow-600" />
              <span className="text-xs text-[#5C6B7A]">Pending</span>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertCircle size={14} className="text-red-600" />
              <span className="text-xs text-[#5C6B7A]">Action Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Circle size={14} className="text-gray-400" />
              <span className="text-xs text-[#5C6B7A]">Not Uploaded</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}