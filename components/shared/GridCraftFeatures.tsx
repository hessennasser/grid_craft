import React from 'react';
import { Code, Layers, Grid, LucideIcon } from 'lucide-react';

interface ColorScheme {
    bg: string;
    icon: string;
    text: string;
    button: string;
    hover: string;
}

interface FeatureCardProps {
    Icon: LucideIcon;
    title: string;
    description: string;
    color: ColorScheme;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, description, color }) => (
    <div className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl ${color.hover} group`}>
        <div className="flex items-center justify-center mb-6">
            <div className={`w-20 h-20 flex items-center justify-center ${color.bg} rounded-full transition-transform duration-500 group-hover:rotate-12`}>
                <Icon className={`w-10 h-10 ${color.icon}`} />
            </div>
        </div>
        <h3 className={`text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 ${color.text} transition-colors duration-300`}>
            {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
            {description}
        </p>
        <button className={`px-6 py-3 rounded-full ${color.button} text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 transform`}>
            Learn More
        </button>
    </div>
);

const GridCraftFeatures: React.FC = () => (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-extrabold mb-8 text-gray-900 dark:text-gray-100 animate-fade-in-down">
                Why Choose GridCraft?
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-16 max-w-4xl mx-auto animate-fade-in-up">
                GridCraft revolutionizes responsive grid layout creation by generating code for multiple frameworks. Seamlessly switch between CSS, Tailwind, or Bootstrap to match your project needs. Our intuitive interface allows you to customize every aspect of your grid, from rows and columns to gaps and breakpoints, all with unparalleled ease.
            </p>

            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 blur-3xl"></div>
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <FeatureCard
                        Icon={Code}
                        title="CSS Grid Mastery"
                        description="Harness the power of CSS Grid Layout with GridCraft's intuitive interface. Define complex layouts with precision, controlling rows, columns, and alignment effortlessly. Our generated code ensures cross-browser compatibility and optimal performance."
                        color={{
                            bg: "bg-blue-100 dark:bg-blue-800",
                            icon: "text-blue-600 dark:text-blue-400",
                            text: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
                            button: "bg-blue-600 hover:bg-blue-700",
                            hover: "hover:border-blue-300 dark:hover:border-blue-700"
                        }}
                    />
                    <FeatureCard
                        Icon={Layers}
                        title="Tailwind CSS Integration"
                        description="Accelerate your development with Tailwind CSS integration. GridCraft generates utility-first classes that perfectly align with Tailwind's philosophy. Rapidly prototype and build responsive designs without leaving your HTML, all while maintaining full customization control."
                        color={{
                            bg: "bg-teal-100 dark:bg-teal-800",
                            icon: "text-teal-600 dark:text-teal-400",
                            text: "group-hover:text-teal-600 dark:group-hover:text-teal-400",
                            button: "bg-teal-600 hover:bg-teal-700",
                            hover: "hover:border-teal-300 dark:hover:border-teal-700"
                        }}
                    />
                    <FeatureCard
                        Icon={Grid}
                        title="Bootstrap Grid System"
                        description="Master Bootstrap's 12-column grid system with ease. GridCraft's visual editor allows you to craft responsive layouts using Bootstrap's extensive class-based system. Generate clean, semantic HTML that leverages Bootstrap's flexibility for any device or screen size."
                        color={{
                            bg: "bg-purple-100 dark:bg-purple-800",
                            icon: "text-purple-600 dark:text-purple-400",
                            text: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
                            button: "bg-purple-600 hover:bg-purple-700",
                            hover: "hover:border-purple-300 dark:hover:border-purple-700"
                        }}
                    />
                </div>
            </div>
        </div>
    </section>
);

export default GridCraftFeatures;