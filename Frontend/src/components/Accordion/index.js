import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import classes from "./Accordion.module.css";

export function Accordion({ children }) {
  return <div className={classes.accordion}>{children}</div>;
}

export function AccordionItem({ children, value }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.accordionItem}>
      <div
        className={classes.accordionTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isOpen && (
        <div
          className={`${classes.accordionContent} ${
            isOpen ? classes.open : classes.closed
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function AccordionTrigger({ children }) {
  return <div>{children}</div>;
}

export function AccordionContent({ children }) {
  return <div>{children}</div>;
}
