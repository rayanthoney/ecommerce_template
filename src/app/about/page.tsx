import { AboutContent } from "@/components/layout/about";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | RayAnthoney E-Commerce",
    description: "Learn more about our mission and vision.",
};

export default function AboutPage() {
    return <AboutContent />;
}
