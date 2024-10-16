import Navbar from "../components/base/NavBar";
import HeroSection from "@/components/base/HeroSection";
import FeatureSection from "@/components/base/FeatureSection";
import UserReviews from "@/components/base/UserReview";
import Footer from "@/components/base/Footer";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function LandingPage() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <Navbar 
      user={session?.user} 
      />
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* User Reviews Section */}
      <UserReviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}