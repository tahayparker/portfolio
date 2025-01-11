export interface Volunteering {
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string[];
    technologies?: string[];
    link?: string;
    logo?: {
        light: string;
        dark: string;
    };
}

export const volunteer: Volunteering[] = [
    {
        "company": "University of Wollongong Dubai",
        "position": "Open Days & Induction Week Volunteer",
        "duration": "Aug 2024 - Present",
        "location": "Dubai, UAE",
        "description": [
            "Guided students to appropriate departments based on queries",
            "Assisted freshmen with account setup and system access",
            "Provided comprehensive program information to potential students"
        ],
        "technologies": ["Student Support", "Technical Support", "Communication"],
        "link": "https://uowdubai.ac.ae",
        "logo": {
            "light": "/logos/uowdl.png",
            "dark": "/logos/uowdd.png"
        }
    },
    {
        "company": "University of Wollongong Dubai",
        "position": "Graduation Ceremony Volunteer",
        "duration": "Oct 2024",
        "location": "Dubai, UAE",
        "description": [
            "Directed graduates throughout the ceremony proceedings",
            "Managed guest seating arrangements and inquiries",
            "Contributed to maintaining a welcoming atmosphere"
        ],
        "technologies": ["Event Management", "Guest Relations", "Logistics"],
        "link": "https://uowdubai.ac.ae",
        "logo": {
            "light": "/logos/uowdl.png",
            "dark": "/logos/uowdd.png"
        }
    },
    {
        "company": "Abu Dhabi National Oil Company (ADNOC)",
        "position": "Marathon Marshal",
        "duration": "Dec 2023",
        "location": "Abu Dhabi, UAE",
        "description": [
            "Managed race pack distribution in the Race Village",
            "Assisted with crowd control and event coordination",
            "Provided refreshments and support to marathon runners"
        ],
        "technologies": ["Event Operations", "Crowd Management", "Safety Protocol"],
        "link": "https://adnocabudhabimarathon.com/",
        "logo": {
            "light": "/logos/adnoc.png",
            "dark": "/logos/adnoc.png"
        }
    },
    {
        "company": "International Institute for Environment and Development (IIED)",
        "position": "Development & Climate Days Volunteer",
        "duration": "Dec 2023",
        "location": "Dubai, UAE",
        "description": [
            "Assisted with event setup and logistics coordination",
            "Managed attendee check-in and registration process",
            "Directed attendees to correct session halls"
        ],
        "technologies": ["Event Management", "Registration Systems", "Customer Service"],
        "link": "https://www.iied.org",
        "logo": {
            "light": "/logos/iiedl.png",
            "dark": "/logos/iiedd.png"
        }
    }
]