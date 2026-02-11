// This file contains all the content for the portfolio
// Edit this file to update your portfolio content
// THIS IS SYNCED WITH backend/data.md

export const portfolioData = {
  config: {
    contactEmail: "work.srivastav@gmail.com",
    heroTitle: "Hi, I'm Siddharth",
    heroSubtitle: "AI Engineer | Level 99 Gamer | Tech Enthusast",
    phone: "+91-9599692344",
    location: "Bangalore, Karnataka"
  },
  
  about: {
    paragraphs: [
      "I am an AI & ML Engineering Student and IEEE AESS Vice Chair with experience building Machine Learning and computer vision systems. My work focuses on developing scalable AI solutions, from real-time object detection assistants to traffic prediction models with high accuracy.",
      "I have a strong foundation in Python and MLOps. When I'm not deploying models, I'm dominating in competitive gaming lobbies. I bring the same strategic depth and reaction time from the arena to my engineering challenges."
    ],
    skills: [
      "Python", "C++", "C", "SQL", "TensorFlow", "PyTorch", "OpenCV", 
      "Scikit-learn", "Data Science", "MLOps", "Docker", "Flutter", "Figma", "VSCode"
    ]
  },
  
  education: [
    {
      institution: "CHRIST University, Bangalore",
      degree: "BTech in Artificial Intelligence and Machine Learning",
      period: "June 2023 - May 2027",
      proficientIn: "#ArtificialIntelligence #MachineLearning #ComputerVision"
    }
  ],
  
  experience: [
    {
      company: "Intel Unnati",
      role: "AI/ML Trainee",
      period: "May 2025 – Jul 2025",
      description: [
        "Built ML models for network traffic analysis; improved prediction accuracy by 15%.",
        "Reduced simulated network latency by 20% through optimization techniques."
      ]
    },
    {
      company: "Faramond Technologies",
      role: "AI/ML Intern",
      period: "Apr 2025 – Jun 2025",
      description: [
        "Improved model interpretability by 25% and reduced preprocessing time by 30%.",
        "Deployed ML models for real-time prediction pipelines."
      ]
    },
    {
      company: "Acmegrade",
      role: "Machine Learning Intern",
      period: "Oct 2023 – Dec 2023",
      description: [
        "Built ML pipelines using Scikit-learn; improved accuracy by 18%.",
        "Automated preprocessing and evaluation, reducing workflow time by 40%."
      ]
    },
    {
      company: "IEEE AESS",
      role: "Student Vice Chair",
      period: "Jan 2026 – Present",
      description: [
        "Leading the IEEE AESS Student Chapter"
      ]
    }
  ],
  
  projects: [
    {
      title: "Ambulance Traffic Predictor",
      tech: ["Python", "Pandas", "Scikit-learn"],
      description: "Built traffic prediction system achieving 94% accuracy and reducing response time by 22%. Analyzed traffic patterns to optimize ambulance routing.",
      github: "#",
      live: "#"
    },
    {
      title: "Automated MLOps Pipeline",
      tech: ["Python", "Docker", "GitHub Actions"],
      description: "Designed CI/CD pipeline improving deployment speed by 40%. Automated model training, testing, and deployment workflows.",
      github: "#",
      live: "#"
    },
    {
      title: "AI Personal Assistant with Object Detection",
      tech: ["Python", "YOLO", "OpenCV"],
      description: "Developed real-time object detection assistant with 95% accuracy and reduced latency by 60ms. Integrated voice commands for hands-free operation.",
      github: "#",
      live: "#"
    }
  ]
};
