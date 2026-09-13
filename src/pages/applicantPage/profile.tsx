import {
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

export default function ProfilePage() {
  const profile = {
    fullName: "Ama Serwaa Boateng",
    email: "ama.serwaa@email.com",
    phone: "+233 20 123 4567",
    dob: "12 March 2002",
    gender: "Female",
    nationality: "Ghanaian",
    address: "P.O. Box 245, Accra",
    city: "Accra",
    country: "Ghana",
    programme: "BSc Computer Science",
    academicYear: "2026/2027",
    paymentStatus: "Paid",
    applicationStatus: "Under Review",
  };

  const infoCards = [
    {
      label: "Email",
      value: profile.email,
      icon: Mail,
    },
    {
      label: "Phone",
      value: profile.phone,
      icon: Phone,
    },
    {
      label: "Date of Birth",
      value: profile.dob,
      icon: Calendar,
    },
    {
      label: "Nationality",
      value: profile.nationality,
      icon: MapPin,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans">
      <div className="max-w-[1100px] mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <span>Applicant Portal</span>
          <span>/</span>
          <span className="text-gray-600">Profile</span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-[28px] font-semibold text-[#1A1E24]">
            Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            View and manage your personal application information.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-6">
          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#1F3A5F] text-white flex items-center justify-center text-lg font-semibold">
                AS
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800">{profile.fullName}</h2>
                <p className="text-sm text-gray-500 mt-1">Applicant</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1F3A5F]/10 flex items-center justify-center">
                    <ShieldCheck size={18} className="text-[#1F3A5F]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Application Status</p>
                    <p className="text-sm font-semibold text-gray-800">{profile.applicationStatus}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1.5 rounded-full bg-amber-50 text-amber-700">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                    <CreditCard size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Payment Status</p>
                    <p className="text-sm font-semibold text-gray-800">{profile.paymentStatus}</p>
                  </div>
                </div>
                <CheckCircle2 size={18} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1F3A5F]/10 flex items-center justify-center">
                  <User size={18} className="text-[#1F3A5F]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Personal Information</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Basic applicant details</p>
                </div>
              </div>

              <button type="button" className="text-xs font-semibold text-[#1F3A5F] hover:underline">
                Edit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {infoCards.map(({ label, value, icon: Icon }) => (
                <div key={label} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide">
                    <Icon size={14} />
                    {label}
                  </div>
                  <p className="mt-3 text-sm font-medium text-gray-800 break-all">{value}</p>
                </div>
              ))}

              <div className="sm:col-span-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wide">
                  <MapPin size={14} />
                  Address
                </div>
                <p className="mt-3 text-sm font-medium text-gray-800">
                  {profile.address}, {profile.city}, {profile.country}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Application Details</h3>
                <p className="text-xs text-gray-500 mt-0.5">Submitted programme information</p>
              </div>
              <Bell size={18} className="text-gray-400" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Programme</span>
                <span className="font-semibold text-gray-800">{profile.programme}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Academic Year</span>
                <span className="font-semibold text-gray-800">{profile.academicYear}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Gender</span>
                <span className="font-semibold text-gray-800">{profile.gender}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E4E7EB] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Security</h3>
                <p className="text-xs text-gray-500 mt-0.5">Account and data protection</p>
              </div>
              <ShieldCheck size={18} className="text-[#1F3A5F]" />
            </div>

            <div className="space-y-4">
              <div className="rounded-xl bg-gray-50 p-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">Account verified</span>
                <CheckCircle2 size={18} className="text-green-600" />
              </div>

              <div className="rounded-xl bg-gray-50 p-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">Two-step verification</span>
                <span className="text-xs font-semibold text-[#1F3A5F]">Enabled</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1F3A5F] text-white text-sm font-semibold hover:bg-[#274772] transition"
          >
            Save Changes
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
