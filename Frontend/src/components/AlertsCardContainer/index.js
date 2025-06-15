import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion";
import { Card, CardContent, CardHeader, CardTitle } from "../RiskCard";
import Badge from "../Badge";
import classes from "./AlertsCardContainer.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function AlertCardContainer({ data }) {
  const {
    hostname,
    ip,
    port,
    protocol,
    alert,
    reference,
    severity,
    compliance_breached,
  } = data;

  const navigate = useNavigate();
  const handleSeeDetails = () => {
    navigate(`/risk/${ip}`, { state: { data } });
  };

  return (
    <div
      className={`${classes.container} dark:bg-muted`}
      onClick={handleSeeDetails}
    >
      <header className={`${classes.header} dark:bg-muted`}>
        <div className={classes.headerContainer}>
          <div className={classes.headerLeft}>
            <MdOutlineMessage color="white" size="1.5rem" />
            <div>
              <h1 className={classes.title}>
                <span className={classes.link}>{hostname}</span>
              </h1>
              <div className={classes.subtitle}>
                <span onClick={handleSeeDetails}>{ip}</span>
              </div>
            </div>
          </div>
          <div className={classes.headerRight}>
            <h3 className={classes.sectionTitle}>Severity Level</h3>
            <Badge severity={severity} />
          </div>
        </div>
      </header>
    </div>
  );
}

export function ServerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

export function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
