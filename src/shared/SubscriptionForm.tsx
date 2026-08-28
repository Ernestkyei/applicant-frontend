// src/components/SubscriptionForm/index.tsx

import { useState } from "react";
import { 
  ArrowRight, 
  User,
  Mail,
  Phone,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Building2,
  Smartphone,
  AlertCircle,
  Calendar,
  Globe,
  MapPin,
  Home,
  Users,
  ChevronRight,
  Lock,
  Check
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Package {
  name: string;
  price: number;
  code: string;
  features: string[];
  highlight: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  paymentMethod: string;
}

interface SubscriptionFormProps {
  pkg: Package;
  onSubscribe: (data: FormData) => void;
  loading: boolean;
}

const GENDER_OPTIONS = ["Male", "Female"];

export default function SubscriptionForm({ pkg, onSubscribe, loading }: SubscriptionFormProps) {
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    country: 'Ghana',
    paymentMethod: 'mobile_money',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'firstName': return !value ? 'First name is required' : '';
      case 'lastName': return !value ? 'Last name is required' : '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
      case 'phoneNumber': return !value ? 'Phone number is required' : '';
      case 'dateOfBirth': return !value ? 'Date of birth is required' : '';
      case 'gender': return !value ? 'Gender is required' : '';
      case 'nationality': return !value ? 'Nationality is required' : '';
      case 'address': return !value ? 'Address is required' : '';
      case 'city': return !value ? 'City is required' : '';
      default: return '';
    }
  };

  const handleBlur = (name: string) => {
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, formData[name as keyof FormData]);
    if (error) {
      setErrors({ ...errors, [name]: error });
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    const fields = ['firstName', 'lastName', 'email', 'phoneNumber', 'dateOfBirth', 'gender', 'nationality', 'address', 'city'];

    fields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep('payment');
    }
  };

  const handleBack = () => {
    setStep('details');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleSelectChange = (name: string, value: string | null) => {
    const safeValue = value || '';
    setFormData({ ...formData, [name]: safeValue });
    if (touched[name]) {
      const error = validateField(name, safeValue);
      setErrors({ ...errors, [name]: error });
    }
  };

  const paymentMethods = [
    { id: 'mobile_money', label: 'Mobile Money', description: 'MTN, Vodafone, AirtelTigo' },
    { id: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard, Amex' },
    { id: 'bank_transfer', label: 'Bank Transfer', description: 'Direct bank transfer' },
  ];

  const getPaymentIcon = (id: string) => {
    switch (id) {
      case 'mobile_money': return Smartphone;
      case 'card': return CreditCard;
      case 'bank_transfer': return Building2;
      default: return CreditCard;
    }
  };

  const getStepNumber = () => {
    if (step === 'details') return 1;
    return 2;
  };

  return (
    <Card className="overflow-hidden rounded-2xl border-0 bg-white shadow-2xl shadow-slate-200/60 transition-all duration-300 hover:shadow-3xl hover:shadow-slate-200/70">
      <CardContent className="p-0">
        {/* ============================================================
            HEADER
            ============================================================ */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0F1A30] via-[#14213D] to-[#1F3A5F] px-8 py-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-amber-500/10 blur-2xl" />
          
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="flex items-center gap-2.5 text-2xl font-bold text-white">           
                Complete Your Subscription
              </h3>
              <p className="mt-1.5 text-sm text-blue-200/80">
                Get your access code instantly after payment
              </p>
            </div>
            <Badge className="border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm shadow-lg shadow-black/10">
              Step {getStepNumber()} of 2
            </Badge>
          </div>
        </div>

        {/* ============================================================
            PROGRESS STEPS
            ============================================================ */}
        <div className="border-b border-slate-100 bg-slate-50/50 px-8 py-6">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[
              { step: 1, label: 'Personal', icon: User },
              { step: 2, label: 'Payment', icon: CreditCard },
            ].map((item) => {
              const isActive = getStepNumber() === item.step;
              const isCompleted = getStepNumber() > item.step;
          
              
              return (
                <div key={item.step} className="flex items-center gap-3">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300
                    ${isActive 
                      ? 'bg-[#14213D] text-white shadow-lg shadow-[#14213D]/30 scale-110 ring-4 ring-[#14213D]/10' 
                      : isCompleted
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-white text-slate-400 shadow-sm border border-slate-200'
                    }
                  `}>
                    {isCompleted ? <Check className="h-5 w-5" /> : item.step}
                  </div>
                  <div className={`hidden sm:block ${isActive ? 'text-[#14213D]' : 'text-slate-400'}`}>
                    <p className={`text-xs font-medium ${isActive ? 'text-[#14213D]' : 'text-slate-400'}`}>
                      {item.label}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {item.step === 1 && 'Your details'}
                      {item.step === 2 && 'Secure checkout'}
                    </p>
                  </div>
                  {item.step < 2 && (
                    <ChevronRight className="h-4 w-4 text-slate-300 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            FORM CONTENT
            ============================================================ */}
        <div className="px-8 py-8">
          <form onSubmit={handleSubmit}>
            {/* ============================================================
                STEP 1: PERSONAL DETAILS
                ============================================================ */}
            {step === 'details' && (
              <div className="space-y-6">
                <div className="rounded-xl bg-blue-50/80 p-4 border border-blue-100/80 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-blue-100 p-1.5">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-800">No Password Needed</p>
                      <p className="text-xs text-blue-600/80">
                        You'll receive an <strong>Access Code</strong> after payment to access your application.
                        No need to remember a password!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('firstName')}
                        placeholder="Enter your first name"
                        className={`h-11 pl-10 rounded-xl border-slate-200 bg-slate-50/50 focus:border-[#14213D] focus:bg-white focus:ring-2 focus:ring-[#14213D]/20 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${
                          errors.firstName && touched.firstName ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20' : ''
                        }`}
                      />
                    </div>
                    {errors.firstName && touched.firstName && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('lastName')}
                        placeholder="Enter your last name"
                        className={`h-11 pl-10 rounded-xl border-slate-200 bg-slate-50/50 focus:border-[#14213D] focus:bg-white focus:ring-2 focus:ring-[#14213D]/20 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${
                          errors.lastName && touched.lastName ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20' : ''
                        }`}
                      />
                    </div>
                    {errors.lastName && touched.lastName && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="you@example.com"
                        className={`h-11 pl-10 rounded-xl border-slate-200 bg-slate-50/50 focus:border-[#14213D] focus:bg-white focus:ring-2 focus:ring-[#14213D]/20 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${
                          errors.email && touched.email ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20' : ''
                        }`}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-slate-700">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('phoneNumber')}
                        placeholder="0244-123-456"
                        className={`h-11 pl-10 rounded-xl border-slate-200 bg-slate-50/50 focus:border-[#14213D] focus:bg-white focus:ring-2 focus:ring-[#14213D]/20 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${
                          errors.phoneNumber && touched.phoneNumber ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20' : ''
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && touched.phoneNumber && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="dateOfBirth" className="text-sm font-medium text-slate-700">
                      Date of Birth <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600" />
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('dateOfBirth')}
                        style={{ accentColor: '#2563eb' }}
                        className={`h-11 pl-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400 hover:bg-blue-50/30 accent-blue-600 ${
                          errors.dateOfBirth && touched.dateOfBirth ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20' : ''
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && touched.dateOfBirth && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="gender" className="text-sm font-medium text-slate-700">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Select
                        value={formData.gender}
                        onValueChange={(value: string | null) => handleSelectChange('gender', value)}
                      >
                        <SelectTrigger className={`h-11 pl-10 rounded-xl border-slate-200 bg-slate-50/50 text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${
                          errors.gender && touched.gender ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20' : ''
                        }`}>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border border-blue-100 bg-white shadow-lg">
                          {GENDER_OPTIONS.map((option) => (
                            <SelectItem
                              key={option}
                              value={option}
                              className="cursor-pointer text-slate-700 transition-colors data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700 data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-700 focus:bg-blue-50 focus:text-blue-700"
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.gender && touched.gender && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="nationality" className="text-sm font-medium text-slate-700">
                    Nationality <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('nationality')}
                      placeholder="e.g. Ghanaian"
                      className={`h-11 pl-10 rounded-xl border-slate-200 bg-slate-50/50 focus:border-[#14213D] focus:bg-white focus:ring-2 focus:ring-[#14213D]/20 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${
                        errors.nationality && touched.nationality ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20' : ''
                      }`}
                    />
                  </div>
                  {errors.nationality && touched.nationality && (
                    <p className="flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      {errors.nationality}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="address" className="text-sm font-medium text-slate-700">
                      Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('address')}
                        placeholder="Enter your street address"
                        className={`h-11 pl-10 rounded-xl border-slate-200 bg-slate-50/50 focus:border-[#14213D] focus:bg-white focus:ring-2 focus:ring-[#14213D]/20 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${
                          errors.address && touched.address ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20' : ''
                        }`}
                      />
                    </div>
                    {errors.address && touched.address && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-sm font-medium text-slate-700">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('city')}
                        placeholder="e.g. Accra"
                        className={`h-11 pl-10 rounded-xl border-slate-200 bg-slate-50/50 focus:border-[#14213D] focus:bg-white focus:ring-2 focus:ring-[#14213D]/20 transition-all hover:border-blue-400 hover:bg-blue-50/30 ${
                          errors.city && touched.city ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-400/20' : ''
                        }`}
                      />
                    </div>
                    {errors.city && touched.city && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3 w-3" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full h-12 rounded-xl bg-[#14213D] text-white font-semibold shadow-lg shadow-[#14213D]/30 hover:shadow-xl hover:shadow-[#14213D]/40 hover:bg-[#0F1A30] transition-all duration-300 group"
                >
                  Continue to Payment
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}

            {/* ============================================================
                STEP 2: PAYMENT
                ============================================================ */}
            {step === 'payment' && (
              <div className="space-y-6">
                <div className="rounded-xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-5 border border-blue-100/80 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-[#14213D] p-2.5 shadow-lg shadow-[#14213D]/20">
                        <Sparkles className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Selected Package</p>
                        <p className="font-bold text-slate-900">{pkg.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Total</p>
                      <p className="text-2xl font-bold text-[#14213D]">GHS {pkg.price}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block text-sm font-medium text-slate-700">
                    Select Payment Method
                  </Label>
                  <div className="grid grid-cols-1 gap-3">
                    {paymentMethods.map((method) => {
                      const Icon = getPaymentIcon(method.id);
                      const isSelected = formData.paymentMethod === method.id;
                      return (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/30 ${
                            isSelected
                              ? 'border-[#14213D] bg-blue-50/50 shadow-md shadow-[#14213D]/10'
                              : 'border-slate-200'
                          }`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={isSelected}
                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                            className="sr-only"
                          />
                          <div className={`rounded-lg p-2.5 transition-colors ${
                            isSelected ? 'bg-[#14213D] text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${isSelected ? 'text-[#14213D]' : 'text-slate-700'}`}>
                              {method.label}
                            </p>
                            <p className="text-xs text-slate-400">{method.description}</p>
                          </div>
                          {isSelected && <Check className="h-5 w-5 text-[#14213D]" />}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-emerald-50/80 p-4 border border-emerald-100/80 shadow-sm">
                  <div className="mt-0.5 rounded-full bg-emerald-100 p-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Secure Payment + Access Code</p>
                    <p className="text-xs text-emerald-600/80">
                      After successful payment, your <strong>Access Code</strong> will be sent to your email and phone.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 h-12 rounded-xl border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-[2] h-12 rounded-xl bg-gradient-to-r from-[#14213D] to-[#1F3A5F] text-white font-semibold shadow-lg shadow-[#14213D]/30 hover:shadow-xl hover:shadow-[#14213D]/40 hover:bg-[#0F1A30] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Lock className="h-4 w-4" />
                        Pay GHS {pkg.price} & Get Access Code
                      </span>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    After payment, you'll receive your <strong className="text-[#14213D]">Access Code</strong> instantly via email and SMS.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
}