import { RiAlertFill } from "react-icons/ri";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../Accordion";
import { Card, CardContent, CardHeader, CardTitle } from "../RiskCard";
import Badge from "../Badge";
import classes from "./RiskCardContainer.module.css";
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
    navigate(`/risk/${data.ip}`, { state: { data } });
  };

  return (
    <div className={`${classes.container} dark:bg-muted`}>
      <header className={`${classes.header} dark:bg-muted`}>
        <div className={classes.headerContainer}>
          <div className={classes.headerLeft}>
            <RiAlertFill color="red" size="2.5rem" />
            <div>
              <h1 className={classes.title}>{hostname}</h1>
              <div className={classes.subtitle}>
                <span>{ip}</span>
              </div>
            </div>
          </div>
          <div className={classes.headerRight}>
            <h3 className={classes.sectionTitle}>Severity Level</h3>
            <Badge severity={severity} />
          </div>
        </div>
      </header>
      <main className={classes.main}>
        <div>
          <Card className="dark:bg-muted">
            <CardHeader>
              <CardTitle>Potential Risk</CardTitle>
              <Button onClick={handleSeeDetails} className={classes.button}>
                See Details
              </Button>
            </CardHeader>
            <CardContent>
              <div className={classes.cardContent}>
                <div>
                  <h2 className={classes.alertTitle}>{alert}</h2>
                  {/* <p className={classes.alertDescription}>
                    An alert was triggered due to the detected issue.
                  </p> */}
                  <span className={classes.dot}>Port</span>
                  <span>{port}</span>
                  <p className={classes.dot}>
                    Port Name: <span>{protocol}</span>
                  </p>
                </div>
                {/* <div>
                  <h3 className={classes.sectionTitle}>Compliance Breach</h3>
                  <p className={classes.alertDescription}>
                    {compliance_breached}
                  </p>
                </div> */}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className={classes.referenceStandards}>
          <Card className="dark:bg-muted">
            <CardHeader>
              <CardTitle>Reference Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion>
                {Object.entries(reference).map(([key, value]) => (
                  <AccordionItem key={key} value={key}>
                    {/* <AccordionContent> */}
                    <p className={classes.accordionContent}>{value}</p>
                    {/* </AccordionContent> */}
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
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
