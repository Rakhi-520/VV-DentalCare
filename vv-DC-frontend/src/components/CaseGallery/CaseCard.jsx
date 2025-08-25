import React from "react";
import { Link } from "react-router-dom";
import BeforeAfter from "./BeforeAfter.jsx";  
import "./CaseCard.css";

export default function CaseCard({ item }) {
  if (!item) return null;
  return (
    <li className="case_card">
      <Link to={`/cases/${item.id}`} className="case_link" aria-label={`Open ${item.title}`}>
        <BeforeAfter
          before={item.beforeSrc}
          after={item.afterSrc}
          altBefore={item.altBefore}  
          altAfter={item.altAfter}    
          initial={50}
        />
      </Link>

      <div className="case_meta">
        <h3 className="case_title">{item.title}</h3>
        {item.filenameNote && (
          <p className="case_text">{item.filenameNote}</p>
        )}
      </div>
    </li>
  );
}
