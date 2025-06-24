import { OnboardingAdvanceCallback } from "@/components/onboarding/main";
import { OnboardingDragDisabler } from "@/components/onboarding/stages/onboarding-drag-disabler";
import { useSettings } from "@/components/providers/settings-provider";
import { BasicSettingsCard } from "@/components/settings/sections/general/basic-settings-cards";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export function OnboardingNewTab({ advance }: { advance: OnboardingAdvanceCallback }) {
  const card = useSettings().cards.find((card) => card.title === "New Tab Mode");

  if (!card) {
    return null;
  }

  return (
    <>
      <OnboardingDragDisabler />

      {/* Header */}
      <motion.div
        className="z-10 relative mt-12 mb-6 px-4 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="mb-4 font-bold text-white text-4xl md:text-5xl">New Tab Experience</h1>
        <p className="text-gray-400 text-lg">{"Choose how you'd like new tabs to open in Elo Browser"}</p>
      </motion.div>

      {/* Sidebar Collapse Mode Card */}
      <motion.div
        className="z-10 relative px-4 w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        <BasicSettingsCard card={card} transparent />
      </motion.div>

      {/* Continue Button */}
      <div className="my-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        >
          <Button
            onClick={advance}
            className="bg-[#0066FF]/10 hover:bg-[#0066FF]/20 backdrop-blur-md px-12 py-6 border border-[#0066FF]/30 text-white text-lg cursor-pointer remove-app-drag"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </>
  );
}
