import HeroSection from "../components/HeroSection";
import TopCategories from "../components/TopCategories";
import TopCourses from "../components/TopCourses";
import TopInstructors from "../components/TopInstructors";
import InstructorSection from "../components/InstructorSection";

const LandingPage = () => {
  return (
    <div className="w-full ">
      {/* Hero Section */}
      <HeroSection />
      {/* Top Categories */}
      <TopCategories />

      {/* Top Courses */}
      <TopCourses />

      {/* Top Instructors */}
      <TopInstructors />

      <InstructorSection id="instructor" />
    </div>
  );
};

export default LandingPage;
