import {compareDate} from "../../assets/reuseable functions/compareDate"


// buttonText: compareDate(this.date) === "Today" ? "Join Now" : "Add to Calender",
// buttonLink: compareDate(this.date) === "Today" ? "/join" : "/calender",
// dateText: compareDate(this.date),

const upcomingClassesRaw = [
    {
        date: "2025-04-20",
        time: "10:00 AM",
        title: "Introduction to JavaScript",
        lessonType: "Live",
        lessonTypeBgColor: "#ede9fc",
        instructor: "John Doe",
        duration: "2 hours",
        bgColor: "#4F46E5"
    },
    {
        date: "2025-04-21",
        time: "2:00 PM",
        title: "Advanced CSS Techniques",
        lessonType: "Recorded",
        instructor: "Jane Smith",
        duration: "1.5 hours",
        bgColor: "#FB923C",
        lessonTypeBgColor: "#fdedd4"
    },
    {
        date: "2025-04-22",
        time: "11:00 AM",
        title: "React for Beginners",
        lessonType: "Live",
        instructor: "Emily Johnson",
        duration: "3 hours",
        bgColor: "#22C55E",
        lessonTypeBgColor: "#dcfae8"
    },
    {
        date: "2025-04-23",
        time: "1:00 PM",
        title: "Node.js and Express",
        lessonType: "Recorded",
        instructor: "Michael Brown",
        duration: "2.5 hours",
        bgColor: "#A855F7",
        lessonTypeBgColor: "#f3e8ff"
    },
]

export const upcomingClasses = upcomingClassesRaw.map((upClass) => {
    return {
        ...upClass,
        dateText: compareDate(upClass.date),
        buttonText: compareDate(upClass.date) === "Today" ? "Join Now" : "Add to Calendar",
        buttonLink: compareDate(upClass.date) === "Today" ? "/join" : "/calendar",
    }
})