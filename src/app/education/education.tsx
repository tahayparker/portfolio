export interface Education {
    school: string;
    degree: string;
    field: string;
    duration: string;
    description: string[];
    location: string;
}

export const educationHistory: Education[] = [
    {
        school: "University of Wollongong in Dubai",
        degree: "Bachelor of Engineering (Honours)",
        field: "Computer and Autonomous Systems",
        duration: "2023 - 2027",
        location: "Dubai, UAE",
        description: [
        ]
    },
    {
        school: "GEMS United Indian School",
        degree: "High School Diploma",
        field: "Computer Science & Mathematics",
        duration: "2018 - 2023",
        location: "Abu Dhabi, UAE",
        description: [
            "Head of IT & Design | UIS Model United Nations Core Team (2020 - 2022)",
            "IT Coordinator - Digital Media | UIS Student Council (2021)",
            "Media Award | Yas F1 in Schools (2021)"
        ]
    }
];
