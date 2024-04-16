import { motion, type Variants } from "framer-motion";
import { memo, type PropsWithChildren, useEffect } from "react";
import { useWizard } from "react-use-wizard";

const variants: Variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    };
  },
};

type Props = {
  previousStep: React.MutableRefObject<number>;
};

export const AnimatedStep = memo(({ children, previousStep: previousStepIndex }: PropsWithChildren<Props>) => {
  const { activeStep } = useWizard();

  useEffect(() => {
    return () => {
      previousStepIndex.current = activeStep;
    };
  }, [activeStep, previousStepIndex]);

  return (
    <motion.div
      custom={activeStep - previousStepIndex.current}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
});

AnimatedStep.displayName = "AnimatedStep";
