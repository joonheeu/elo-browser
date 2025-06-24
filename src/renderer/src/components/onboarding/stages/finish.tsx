import { OnboardingAdvanceCallback } from "@/components/onboarding/main";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "motion/react";

export function OnboardingFinish({ advance }: { advance: OnboardingAdvanceCallback }) {
  return (
    <>
      {/* Success Icon */}
      <motion.div
        className="z-10 relative mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex justify-center items-center bg-[#0066FF]/20 border border-[#0066FF]/50 rounded-full size-24">
          <Check className="w-12 h-12 text-[#0066FF]" />
        </div>
      </motion.div>

      {/* Ready Badge */}
      <motion.div
        className="z-10 relative mb-6 px-4 py-1 border border-green-500/50 rounded-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      >
        <span className="text-green-400 text-sm">All Set!</span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="z-10 relative px-4 max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        <h1 className="mb-6 font-bold text-white text-5xl md:text-6xl">{"You're Ready!"}</h1>
        <p className="text-gray-400 text-xl">Your Elo Browser is now set up and ready to use.</p>
      </motion.div>

      {/* Button */}
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
            Finish
          </Button>
        </motion.div>
      </div>
    </>
  );
}
