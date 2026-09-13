import React, { useState } from "react";
import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Loader2,
  Mail,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  Trash2,
  User as UserIcon,
  Pencil,
} from "lucide-react";

import {
  ELECTIVE_SUBJECTS_BY_COURSE,
  GRADE_OPTIONS,
  GENDER_OPTIONS,
  PRIMARY_COLOR,
  PROGRAMS,
  SCHOOL_COURSES,
  CORE_SUBJECTS,
  selectClass,
  smallSelectClass,
  gradeSelectClass,
  getSchoolCourseLabel,
  getSubjectsForSchoolCourse,
  createInitialEducationInfo,
  createInitialPersonalInfo,
} from "./constants";
import { CountrySelect } from "./CountrySelect";
import type { ApplicationFormProps, EducationInfo, PersonalInfo, SchoolCourse } from "./types";

export function ApplicationForm({ onApply, isSubmitting }: ApplicationFormProps) {
  const [step, setStep] = useState<number>(1);
  const [programs, setPrograms] = useState<string[]>([]);
  const [academicYear, setAcademicYear] = useState("2026/2027");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(createInitialPersonalInfo());
  const [educationInfo, setEducationInfo] = useState<EducationInfo>(createInitialEducationInfo());
  const [confirmed, setConfirmed] = useState(false);

  const handleProgramChange = (index: number, value: string) => {
    setPrograms((previous) => {
      const updated = [...previous];
      updated[index] = value;
      return updated;
    });
  };

  const handlePersonalChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPersonalInfo({
      ...personalInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleEducationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEducationInfo({
      ...educationInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSchoolCourseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const course = event.target.value as SchoolCourse | "";

    if (!course) {
      setEducationInfo((previous) => ({
        ...previous,
        schoolCourse: "",
        coreSubjects: CORE_SUBJECTS.map((name) => ({ name, grade: "" })),
        electiveSubjects: [],
      }));
      return;
    }

    const { core } = getSubjectsForSchoolCourse(course);

    setEducationInfo((previous) => ({
      ...previous,
      schoolCourse: course,
      coreSubjects: core,
      electiveSubjects: [],
    }));
  };

  const handleCoreSubjectChange = (index: number, grade: string) => {
    const updated = [...educationInfo.coreSubjects];
    updated[index] = { ...updated[index], grade };

    setEducationInfo({
      ...educationInfo,
      coreSubjects: updated,
    });
  };

  const addElectiveSubject = () => {
    if (!educationInfo.schoolCourse) {
      return;
    }

    const availableSubjects =
      ELECTIVE_SUBJECTS_BY_COURSE[educationInfo.schoolCourse as SchoolCourse];
    const selectedSubjects = educationInfo.electiveSubjects.map((subject) => subject.name);
    const nextAvailableSubject = availableSubjects.find(
      (subject) => !selectedSubjects.includes(subject)
    );

    if (!nextAvailableSubject) {
      return;
    }

    setEducationInfo((previous) => ({
      ...previous,
      electiveSubjects: [
        ...previous.electiveSubjects,
        { name: nextAvailableSubject, grade: "" },
      ],
    }));
  };

  const handleElectiveSubjectNameChange = (index: number, name: string) => {
    setEducationInfo((previous) => {
      const updated = [...previous.electiveSubjects];
      updated[index] = { ...updated[index], name };
      return { ...previous, electiveSubjects: updated };
    });
  };

  const handleElectiveSubjectGradeChange = (index: number, grade: string) => {
    setEducationInfo((previous) => {
      const updated = [...previous.electiveSubjects];
      updated[index] = { ...updated[index], grade };
      return { ...previous, electiveSubjects: updated };
    });
  };

  const removeElectiveSubject = (index: number) => {
    setEducationInfo((previous) => ({
      ...previous,
      electiveSubjects: previous.electiveSubjects.filter((_, i) => i !== index),
    }));
  };

  const isStep1Complete = Boolean(
    programs.length === 3 && programs[0] && programs[1] && programs[2] && academicYear
  );
  const isStep2Complete = Boolean(
    personalInfo.firstName && personalInfo.lastName && personalInfo.email
  );
  const isStep3Complete = Boolean(educationInfo.highSchool && educationInfo.schoolCourse);
  const isFormComplete = isStep1Complete && isStep2Complete && isStep3Complete;

  const availableElectives = educationInfo.schoolCourse
    ? ELECTIVE_SUBJECTS_BY_COURSE[educationInfo.schoolCourse as SchoolCourse].filter(
        (subject) =>
          !educationInfo.electiveSubjects.some((selected) => selected.name === subject)
      )
    : [];
  const canAddAnotherElective = availableElectives.length > 0;

  const nextStep = () => {
    if (step === 1 && !isStep1Complete) {
      alert("Please select all three programme choices and an academic year.");
      return;
    }

    if (step === 2 && !isStep2Complete) {
      alert("Please fill in your first name, last name and email address.");
      return;
    }

    if (step === 3 && !isStep3Complete) {
      alert("Please enter your school and select the course you studied.");
      return;
    }

    setStep((previous) => previous + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setStep((previous) => previous - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const editStep = (targetStep: number) => {
    setConfirmed(false);
    setStep(targetStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormComplete || !confirmed || isSubmitting) {
      return;
    }

    onApply(programs, personalInfo, educationInfo);
  };

  const progressSteps = [
    { number: 1, label: "Programmes", complete: isStep1Complete },
    { number: 2, label: "Personal", complete: isStep2Complete },
    { number: 3, label: "Education", complete: isStep3Complete },
    { number: 4, label: "Review", complete: false },
  ];

  return (
    <div className="bg-white border border-[#E4E7EB] rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 md:px-8 pt-7 pb-5 border-b border-[#E9ECEF]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${PRIMARY_COLOR}12` }}
              >
                <FileText size={16} style={{ color: PRIMARY_COLOR }} />
              </div>

              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: PRIMARY_COLOR }}
              >
                Undergraduate Admission
              </span>
            </div>

            <h2 className="font-serif text-[22px] font-semibold text-[#1A1E24]">
              New Application
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete your application carefully before submitting.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Academic Year
            </p>

            <p className="text-sm font-semibold mt-1" style={{ color: PRIMARY_COLOR }}>
              {academicYear}
            </p>
          </div>
        </div>

        <div className="mt-7">
          <div className="hidden sm:flex items-center">
            {progressSteps.map((item, index) => {
              const isActive = step === item.number;
              const isPast = step > item.number;

              return (
                <React.Fragment key={item.number}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.number < step) {
                        setStep(item.number);
                      }
                    }}
                    className={`flex items-center gap-2 ${
                      item.number < step ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition ${
                        isPast || isActive
                          ? "text-white border-transparent"
                          : "text-gray-400 bg-white border-gray-200"
                      }`}
                      style={
                        isPast || isActive
                          ? { backgroundColor: PRIMARY_COLOR }
                          : undefined
                      }
                    >
                      {isPast ? <CheckCircle2 size={16} /> : item.number}
                    </span>

                    <span
                      className={`text-xs font-medium ${
                        isActive ? "text-[#1A1E24]" : isPast ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>

                  {index < progressSteps.length - 1 && (
                    <div
                      className="flex-1 h-px mx-3"
                      style={{
                        backgroundColor: step > item.number ? PRIMARY_COLOR : "#E5E7EB",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700">
                Step {step} of 4
              </span>

              <span className="text-xs font-medium" style={{ color: PRIMARY_COLOR }}>
                {progressSteps[step - 1]?.label}
              </span>
            </div>

            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(step / 4) * 100}%`,
                  backgroundColor: PRIMARY_COLOR,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-gray-800">
                  Programme Choices <span className="text-red-500">*</span>
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
                Select three programmes in your preferred order. Choice 1 is your primary programme.
              </p>

              <div className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="relative">
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Programme Choice {index + 1} <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={programs[index] || ""}
                      onChange={(event) => handleProgramChange(index, event.target.value)}
                      className={selectClass}
                      required
                    >
                      <option value="">
                        Select {index === 0 ? "first" : index === 1 ? "second" : "third"} programme...
                      </option>

                      {PROGRAMS.map((program) => (
                        <option
                          key={program}
                          value={program}
                          disabled={programs.some(
                            (selected, selectedIndex) =>
                              selectedIndex !== index && selected === program
                          )}
                        >
                          {program}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
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
                    style={{ color: PRIMARY_COLOR }}
                  />

                  <div>
                    <p className="text-xs font-semibold" style={{ color: PRIMARY_COLOR }}>
                      Programme preference
                    </p>

                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Choose your programmes carefully. The order you provide will be used as your admission preference.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                Academic Year <span className="text-red-500">*</span>
              </label>

              <select
                value={academicYear}
                onChange={(event) => setAcademicYear(event.target.value)}
                className={selectClass}
                required
              >
                <option value="2026/2027">2026/2027</option>
                <option value="2027/2028">2027/2028</option>
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
              style={isStep1Complete ? { backgroundColor: PRIMARY_COLOR } : undefined}
            >
              Continue to Personal Details
              <ChevronRight size={17} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-6 md:p-8 space-y-5">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-semibold text-gray-800">Personal Information</h3>
              <p className="text-xs text-gray-500 mt-1">
                Enter your personal and contact information.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <UserIcon
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="firstName"
                    value={personalInfo.firstName}
                    onChange={handlePersonalChange}
                    placeholder="Enter your first name"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <UserIcon
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="lastName"
                    value={personalInfo.lastName}
                    onChange={handlePersonalChange}
                    placeholder="Enter your last name"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
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
                  <Calendar
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                    style={{ color: PRIMARY_COLOR }}
                  />

                  <input
                    type="date"
                    name="dateOfBirth"
                    value={personalInfo.dateOfBirth}
                    onChange={handlePersonalChange}
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
                    style={{ color: PRIMARY_COLOR }}
                  />

                  <select
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handlePersonalChange}
                    className={`${smallSelectClass} pl-9`}
                  >
                    <option value="">Select gender...</option>
                    {GENDER_OPTIONS.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
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
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={personalInfo.email}
                  onChange={handlePersonalChange}
                  placeholder="Enter your email address"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                  required
                />
              </div>
            </div>

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
                  value={personalInfo.phoneNumber}
                  onChange={handlePersonalChange}
                  placeholder="Enter your phone number"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nationality
              </label>

              <CountrySelect
                value={personalInfo.nationality}
                onChange={(value) =>
                  setPersonalInfo({
                    ...personalInfo,
                    nationality: value,
                  })
                }
              />
            </div>

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
                  value={personalInfo.address}
                  onChange={handlePersonalChange}
                  placeholder="Enter your address"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
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
                  value={personalInfo.country}
                  onChange={handlePersonalChange}
                  placeholder="Enter your country"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                />
              </div>
            </div>

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
                style={isStep2Complete ? { backgroundColor: PRIMARY_COLOR } : undefined}
              >
                Continue to Education
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-6 md:p-8 space-y-5">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-base font-semibold text-gray-800">Education Information</h3>
              <p className="text-xs text-gray-500 mt-1">
                Provide your secondary school and WASSCE information.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  High School / Secondary School <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <BookOpen
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="highSchool"
                    value={educationInfo.highSchool}
                    onChange={handleEducationChange}
                    placeholder="e.g. Prempeh College"
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Course Studied in School <span className="text-red-500">*</span>
                </label>

                <select
                  value={educationInfo.schoolCourse}
                  onChange={handleSchoolCourseChange}
                  className={smallSelectClass}
                  required
                >
                  <option value="">Select the course you did...</option>
                  {SCHOOL_COURSES.map((course) => (
                    <option key={course.value} value={course.value}>
                      {course.label}
                    </option>
                  ))}
                </select>

                {educationInfo.schoolCourse && (
                  <p className="text-xs text-gray-500 mt-1.5">
                    Select the subjects you actually studied below.
                  </p>
                )}
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
                  value={educationInfo.wassceAggregate}
                  onChange={handleEducationChange}
                  placeholder="e.g. 12"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none"
                />
              </div>
            </div>

            {educationInfo.schoolCourse && (
              <>
                <div className="border border-gray-200 rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${PRIMARY_COLOR}12` }}
                    >
                      <CheckCircle2 size={14} style={{ color: PRIMARY_COLOR }} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">Core Subjects</p>
                      <p className="text-[11px] text-gray-400">Required subjects</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {educationInfo.coreSubjects.map((subject, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-gray-50"
                      >
                        <span className="text-sm text-gray-600 truncate">{subject.name}</span>

                        <select
                          value={subject.grade}
                          onChange={(event) => handleCoreSubjectChange(index, event.target.value)}
                          className={gradeSelectClass}
                          aria-label={`Grade for ${subject.name}`}
                        >
                          <option value="">Grade</option>
                          {GRADE_OPTIONS.map((grade) => (
                            <option key={grade} value={grade}>
                              {grade}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 md:p-5">
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${PRIMARY_COLOR}12` }}
                      >
                        <BookOpen size={14} style={{ color: PRIMARY_COLOR }} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {getSchoolCourseLabel(educationInfo.schoolCourse)} Electives
                        </p>
                        <p className="text-[11px] text-gray-400">Select the subjects you took</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {educationInfo.electiveSubjects.length === 0 ? (
                      <div className="border border-dashed border-gray-300 rounded-lg p-5 text-center">
                        <BookOpen size={20} className="mx-auto text-gray-300 mb-2" />
                        <p className="text-sm text-gray-500">No elective subjects selected yet.</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Add the elective subjects you studied.
                        </p>
                      </div>
                    ) : (
                      educationInfo.electiveSubjects.map((subject, index) => (
                        <div
                          key={`${subject.name}-${index}`}
                          className="grid grid-cols-[minmax(0,1fr)_76px_36px] gap-2 items-center"
                        >
                          <select
                            value={subject.name}
                            onChange={(event) =>
                              handleElectiveSubjectNameChange(index, event.target.value)
                            }
                            className={`${smallSelectClass} min-w-0`}
                            aria-label={`Elective subject ${index + 1}`}
                          >
                            {ELECTIVE_SUBJECTS_BY_COURSE[
                              educationInfo.schoolCourse as SchoolCourse
                            ].map((subjectName) => {
                              const alreadySelected = educationInfo.electiveSubjects.some(
                                (selected, selectedIndex) =>
                                  selectedIndex !== index && selected.name === subjectName
                              );

                              if (alreadySelected) {
                                return null;
                              }

                              return (
                                <option key={subjectName} value={subjectName}>
                                  {subjectName}
                                </option>
                              );
                            })}
                          </select>

                          <select
                            value={subject.grade}
                            onChange={(event) =>
                              handleElectiveSubjectGradeChange(index, event.target.value)
                            }
                            className={gradeSelectClass}
                            aria-label={`Grade for ${subject.name}`}
                          >
                            <option value="">Grade</option>
                            {GRADE_OPTIONS.map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => removeElectiveSubject(index)}
                            className="w-9 h-9 flex-shrink-0 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition"
                            title="Remove subject"
                            aria-label={`Remove ${subject.name}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={addElectiveSubject}
                      disabled={!canAddAnotherElective}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                        !canAddAnotherElective
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "text-white"
                      }`}
                      style={canAddAnotherElective ? { backgroundColor: PRIMARY_COLOR } : undefined}
                    >
                      <Plus size={15} />
                      Add Subject
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    Select only the elective subjects you actually took in secondary school.
                  </p>
                </div>
              </>
            )}

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
                style={isStep3Complete ? { backgroundColor: PRIMARY_COLOR } : undefined}
              >
                Review Application
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-6 md:p-8 space-y-5">
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
                  style={{ backgroundColor: `${PRIMARY_COLOR}15` }}
                >
                  <ShieldCheck size={20} style={{ color: PRIMARY_COLOR }} />
                </div>

                <div>
                  <h3 className="text-base font-semibold" style={{ color: PRIMARY_COLOR }}>
                    Review Your Application
                  </h3>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Please check all the information below carefully. You can edit any section before submitting your application.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <FileText size={16} style={{ color: PRIMARY_COLOR }} />
                  <h4 className="text-sm font-semibold text-gray-800">Programme Choices</h4>
                </div>

                <button
                  type="button"
                  onClick={() => editStep(1)}
                  className="flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{ color: PRIMARY_COLOR }}
                >
                  <Pencil size={12} />
                  Edit
                </button>
              </div>

              <div className="p-4 space-y-3">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                      {index + 1}
                    </span>

                    <div>
                      <p className="text-[11px] text-gray-400">
                        {index === 0 ? "First Choice" : index === 1 ? "Second Choice" : "Third Choice"}
                      </p>

                      <p className="text-sm font-semibold text-gray-800">{programs[index] || "—"}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-3 mt-1 border-t border-gray-100">
                  <p className="text-[11px] text-gray-400">Academic Year</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{academicYear}</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <UserIcon size={16} style={{ color: PRIMARY_COLOR }} />
                  <h4 className="text-sm font-semibold text-gray-800">Personal Information</h4>
                </div>

                <button
                  type="button"
                  onClick={() => editStep(2)}
                  className="flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{ color: PRIMARY_COLOR }}
                >
                  <Pencil size={12} />
                  Edit
                </button>
              </div>

              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-[11px] text-gray-400">Full Name</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5 break-all">
                    {personalInfo.email || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">Phone Number</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.phoneNumber || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">Date of Birth</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.dateOfBirth || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">Gender</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.gender || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">Nationality</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {personalInfo.nationality || "—"}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-[11px] text-gray-400">Address</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">
                    {[personalInfo.address, personalInfo.city, personalInfo.country]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} style={{ color: PRIMARY_COLOR }} />
                  <h4 className="text-sm font-semibold text-gray-800">Education Information</h4>
                </div>

                <button
                  type="button"
                  onClick={() => editStep(3)}
                  className="flex items-center gap-1 text-xs font-semibold hover:underline"
                  style={{ color: PRIMARY_COLOR }}
                >
                  <Pencil size={12} />
                  Edit
                </button>
              </div>

              <div className="p-4 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] text-gray-400">High School</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {educationInfo.highSchool || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">Course Studied</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {getSchoolCourseLabel(educationInfo.schoolCourse) || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">Graduation Year</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {educationInfo.graduationYear || "—"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-400">WASSCE Aggregate</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {educationInfo.wassceAggregate || "—"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-2">Core Subjects</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {educationInfo.coreSubjects.map((subject) => (
                      <div
                        key={subject.name}
                        className="flex items-center justify-between gap-3 px-3 py-2.5 bg-gray-50 rounded-lg"
                      >
                        <span className="text-xs text-gray-600">{subject.name}</span>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded ${
                            subject.grade ? "bg-white" : "text-gray-400"
                          }`}
                          style={subject.grade ? { color: PRIMARY_COLOR } : undefined}
                        >
                          {subject.grade || "Not selected"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-700 mb-2">Elective Subjects</p>
                  {educationInfo.electiveSubjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {educationInfo.electiveSubjects.map((subject) => (
                        <div
                          key={subject.name}
                          className="flex items-center justify-between gap-3 px-3 py-2.5 bg-gray-50 rounded-lg"
                        >
                          <span className="text-xs text-gray-600">{subject.name}</span>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded ${
                              subject.grade ? "bg-white" : "text-gray-400"
                            }`}
                            style={subject.grade ? { color: PRIMARY_COLOR } : undefined}
                          >
                            {subject.grade || "Not selected"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-3 rounded-lg bg-gray-50 text-xs text-gray-400">
                      No elective subjects selected.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`border rounded-xl p-4 transition ${
                confirmed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
              }`}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded"
                  style={{ accentColor: PRIMARY_COLOR }}
                />

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    I confirm that the information provided is accurate.
                  </p>

                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    I understand that providing false or inaccurate information may affect my application.
                  </p>
                </div>
              </label>
            </div>

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
                  style={{ color: PRIMARY_COLOR }}
                />

                <p className="text-xs text-gray-600 leading-relaxed">
                  Once you submit this application, your information will be sent for processing. Please make sure all details are correct before continuing.
                </p>
              </div>
            </div>

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
                disabled={isSubmitting || !isFormComplete || !confirmed}
                className={`flex-[2] py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                  isSubmitting || !isFormComplete || !confirmed
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-white"
                }`}
                style={
                  !isSubmitting && isFormComplete && confirmed
                    ? { backgroundColor: PRIMARY_COLOR }
                    : undefined
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
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
