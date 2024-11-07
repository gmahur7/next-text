import React from "react";
import FeatureCard from "./FeatureCard";

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <FeatureCard
        icon="🚀"
        title="Instant Setup"
        description="Create a room link instantly. No sign-up needed."
      />
      <FeatureCard
        icon="🔒"
        title="Secure"
        description="Secure your chats with passcode protection."
      />
      <FeatureCard
        icon="💻"
        title="Cross-Platform"
        description="Compatible with any device using a modern web browser."
      />
    </section>
  );
}