import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface RegistrationData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female" | "";
  age: number;
  role: "payer" | "earner" | "";
  preferredGender: "male" | "female" | "both" | "";
  ageRange: [number, number];
  location: string;
}

const Step1 = ({ data, onChange }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="space-y-4"
  >
    <h2 className="text-2xl font-bold text-center mb-6">Basic Information</h2>
    
    <div className="grid grid-cols-2 gap-3">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={data.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={data.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          required
          className="mt-1"
        />
      </div>
    </div>

    <div>
      <Label htmlFor="username">Username</Label>
      <Input
        id="username"
        value={data.username}
        onChange={(e) => onChange("username", e.target.value)}
        required
        className="mt-1"
      />
    </div>

    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={data.email}
        onChange={(e) => onChange("email", e.target.value)}
        required
        className="mt-1"
      />
    </div>

    <div>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        value={data.password}
        onChange={(e) => onChange("password", e.target.value)}
        required
        className="mt-1"
      />
    </div>

    <div>
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        type="password"
        value={data.confirmPassword}
        onChange={(e) => onChange("confirmPassword", e.target.value)}
        required
        className="mt-1"
      />
    </div>

    <div>
      <Label className="mb-3 block">Gender</Label>
      <RadioGroup value={data.gender} onValueChange={(v) => onChange("gender", v)}>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="cursor-pointer">Male</Label>
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="cursor-pointer">Female</Label>
          </div>
        </div>
      </RadioGroup>
    </div>

    <div>
      <Label htmlFor="age">Age: {data.age}</Label>
      <Slider
        id="age"
        min={18}
        max={80}
        step={1}
        value={[data.age]}
        onValueChange={(v) => onChange("age", v[0])}
        className="mt-3"
      />
    </div>
  </motion.div>
);

const Step2 = ({ data, onChange }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-center mb-6">Choose Your Role</h2>
    
    <RadioGroup value={data.role} onValueChange={(v) => onChange("role", v)}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
          data.role === "payer"
            ? "border-primary bg-primary/5"
            : "border-border bg-card"
        }`}
      >
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="payer" id="payer" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="payer" className="text-lg font-semibold cursor-pointer">
              I will pay
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Connect with people and pay for conversations
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
          data.role === "earner"
            ? "border-primary bg-primary/5"
            : "border-border bg-card"
        }`}
      >
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="earner" id="earner" className="mt-1" />
          <div className="flex-1">
            <Label htmlFor="earner" className="text-lg font-semibold cursor-pointer">
              I want to get paid
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Earn money by chatting with interested people
            </p>
          </div>
        </div>
      </motion.div>
    </RadioGroup>
  </motion.div>
);

const Step3 = ({ data, onChange }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className="space-y-5"
  >
    <h2 className="text-2xl font-bold text-center mb-6">Preferences</h2>

    <div>
      <Label className="mb-3 block">Interested in</Label>
      <RadioGroup
        value={data.preferredGender}
        onValueChange={(v) => onChange("preferredGender", v)}
      >
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="pref-male" />
            <Label htmlFor="pref-male" className="cursor-pointer">Men</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="pref-female" />
            <Label htmlFor="pref-female" className="cursor-pointer">Women</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="pref-both" />
            <Label htmlFor="pref-both" className="cursor-pointer">Both</Label>
          </div>
        </div>
      </RadioGroup>
    </div>

    <div>
      <Label className="mb-3 block">
        Age Range: {data.ageRange[0]} - {data.ageRange[1]}
      </Label>
      <Slider
        min={18}
        max={80}
        step={1}
        value={data.ageRange}
        onValueChange={(v) => onChange("ageRange", v)}
        className="mt-3"
      />
    </div>

    <div>
      <Label htmlFor="location">Location (Optional)</Label>
      <Input
        id="location"
        value={data.location}
        onChange={(e) => onChange("location", e.target.value)}
        placeholder="City, Country"
        className="mt-1"
      />
    </div>

    <div className="p-4 rounded-xl bg-muted/50 space-y-2 text-sm">
      <h3 className="font-semibold">Summary</h3>
      <p>Name: {data.firstName} {data.lastName}</p>
      <p>Username: @{data.username}</p>
      <p>Role: {data.role === "payer" ? "Paying user" : "Earning user"}</p>
      <p>Looking for: {data.preferredGender === "both" ? "Everyone" : data.preferredGender}</p>
    </div>
  </motion.div>
);

export default function Register() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [data, setData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: 25,
    role: "",
    preferredGender: "",
    ageRange: [18, 50],
    location: "",
  });

  const handleChange = (field: keyof RegistrationData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = () => {
    if (step === 1) {
      if (!data.firstName || !data.lastName || !data.username || !data.email || !data.password) {
        toast.error("Please fill in all required fields");
        return false;
      }
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords don't match");
        return false;
      }
      if (!data.gender) {
        toast.error("Please select your gender");
        return false;
      }
      if (data.age < 18) {
        toast.error("You must be at least 18 years old");
        return false;
      }
    }
    if (step === 2 && !data.role) {
      toast.error("Please select your role");
      return false;
    }
    if (step === 3 && !data.preferredGender) {
      toast.error("Please select your preference");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    
    setLoading(true);
    try {
      await api.post("/auth/register", data);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass-card rounded-3xl p-8 shadow-2xl">
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`h-2 rounded-full ${
                  i === step ? "w-8" : "w-2"
                } ${i <= step ? "bg-primary" : "bg-muted"}`}
                animate={{ width: i === step ? 32 : 8 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <Step1 key="step1" data={data} onChange={handleChange} />
            )}
            {step === 2 && (
              <Step2 key="step2" data={data} onChange={handleChange} />
            )}
            {step === 3 && (
              <Step3 key="step3" data={data} onChange={handleChange} />
            )}
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                size="lg"
                className="flex-1"
              >
                <ChevronLeft />
                Back
              </Button>
            )}
            
            {step < 3 ? (
              <Button onClick={handleNext} size="lg" className="flex-1">
                Next
                <ChevronRight />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                size="lg"
                className="flex-1"
              >
                {loading ? "Creating..." : "Complete"}
                <Check />
              </Button>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Already have an account? <span className="text-primary font-semibold">Sign in</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
