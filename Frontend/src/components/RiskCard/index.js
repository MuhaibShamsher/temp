import classes from "./RiskCard.module.css";

export function Card({ children, className = "" }) {
  return <div className={`${classes.card} ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <div className={classes.cardHeader}>{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className={classes.cardTitle}>{children}</h2>;
}

export function CardContent({ children }) {
  return <div className={classes.cardContent}>{children}</div>;
}
