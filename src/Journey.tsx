import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Journey: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    { 
      id: "1", 
      title: "Co-Learn Sphere", 
      category: "ML Integrated Full Stack Project",
      content: "Co-Learn Sphere is a collaborative learning platform designed to connect students for peer-to-peer learning, resource sharing, and academic discussions. The platform features an integrated machine learning model that predicts a student's future SGPA by analyzing their previous semester results, helping them track progress and set academic goals proactively.",
      link:'https://github.com/rxhuljo/CoLearnSphere'
    },
    { 
      id: "2", 
      title: "Doha Quarry LLC", 
      category: "Internship",
      content: "Completed an internship focused on HR and administrative functions at one of the UAE’s leading quarrying companies. Supported internal management activities, contributed to maintaining organizational efficiency, and observed the integration of technology in mining and materials processing.",
      link:"https://drive.google.com/file/d/11VHGHVY-DcXlb4MjJeOP8yYTqPVwTXP2/view?usp=share_link "
    },
    { 
      id: "3", 
      title: "Google Cybersecurity Certificate", 
      category: "Certification",
      content: "Covered the fundamentals of cybersecurity, including threat types, risk management, network security, and incident response. Gained foundational knowledge in using tools like Linux and SQL to identify and mitigate security vulnerabilities.",
      link:"https://drive.google.com/file/d/1ICW4CepuD-uI_Te5-4V2dGMXUeb8mWPb/view?usp=share_link"
    },
    { 
      id: "4", 
      title: "EC-Council Cybersecurity Essentials", 
      category: "Certification",
      content: "Completed a beginner-friendly course by EC-Council focused on the core principles of cybersecurity. Explored key areas including ethical hacking, network defense, cryptography, and security policies. Developed a foundational understanding of how to secure systems and respond to cyber threats, aligned with industry best practices.",
      link:"https://drive.google.com/file/d/1RfEscdqErBLOKqwq_pH9bGPdsJY9GgX-/view?usp=sharing"
    },
        { 
      id: "5", 
      title: "Inventory Management System", 
      category: "Project",
      content: "Built a simple inventory management system as part of a school-level Computer Science project. Enabled users to add, update, delete, and search inventory records. Developed using Python, MySQL & HTML, with an emphasis on file handling, menu-driven interfaces, and structured data management."
    },

  ];

  return (
    <div className="journey-page">
      <div className="journey-content">
        <motion.h1 
          className="journey-main-title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Beyond Classroom
        </motion.h1>
        
        <div className="cards-container">
          <AnimatePresence mode="wait">
            {selectedCard ? (
              <motion.div
                key="expanded"
                className="expanded-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {cards.map((card) => {
                  if (card.id === selectedCard) {
                    return (
                      <div key={card.id} className="expanded-card">
                        <div className="expanded-header">
                          <div>
                            <h2>{card.title}</h2>
                            <span className="category">{card.category}</span>
                          </div>
                          <button 
                            className="close-button"
                            onClick={() => setSelectedCard(null)}
                          >
                            ✕
                          </button>
                        </div>
                        <div className="expanded-content">
                          <p>{card.content}</p>
                          
                        </div>
                        {card.link && (
                        <a
                          className="back-button"
                          href={card.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          🔗 View 
                        </a>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="cards-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    className="project-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCard(card.id)}
                  >
                    <div className="card-content">
                      <h3>{card.title}</h3>
                      <span className="card-category">{card.category}</span>
                      <p className="card-preview">
                        {card.content.substring(0, 100)}...
                      </p>
                      <div className="card-footer">
                        <span className="read-more">Read more →</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Journey;