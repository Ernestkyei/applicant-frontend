import type { ComponentType } from "react";

export type SchoolCourse =
  | "general_science"
  | "general_arts"
  | "business"
  | "technical"
  | "home_economics"
  | "visual_arts"
  | "agricultural_science";

export interface PersonalInfo {
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

export interface SubjectGrade {
  name: string;
  grade: string;
}

export interface EducationInfo {
  highSchool: string;
  schoolCourse: string;
  graduationYear: string;
  wassceAggregate: string;
  coreSubjects: SubjectGrade[];
  electiveSubjects: SubjectGrade[];
}

export interface NavItem {
  icon: ComponentType<{
    size?: number;
    className?: string;
  }>;
  label: string;
  active: boolean;
}

export interface Country {
  name: string;
  code: string;
}

export interface ApplicationFormProps {
  onApply: (
    programs: string[],
    personalInfo: PersonalInfo,
    educationInfo: EducationInfo
  ) => void;
  isSubmitting: boolean;
}

export interface ApplicationSuccessProps {
  applicationReference: string;
}
