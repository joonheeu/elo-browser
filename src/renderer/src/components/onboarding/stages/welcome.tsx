import { OnboardingAdvanceCallback } from "@/components/onboarding/main";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function OnboardingWelcome({
	advance,
}: { advance: OnboardingAdvanceCallback }) {
	const [version, setVersion] = useState<string>("0.0.0");
	useEffect(() => {
		flow.app.getAppInfo().then((info) => {
			setVersion(info.app_version);
		});
	}, []);

	return (
		<>
			{/* Logo */}
			<motion.div
				className="z-10 relative mb-8"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.8, opacity: 0 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
			>
				<img
					src="/assets/icon.png"
					alt="App Icon"
					className="rounded-full size-24"
				/>
			</motion.div>

			{/* Alpha badge */}
			<motion.div
				className="z-10 relative mb-6 px-4 py-1 border border-[#0066FF]/50 rounded-full"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
			>
				<span className="text-[#0066FF] text-sm">{`v${version}`}</span>
			</motion.div>

			{/* Content */}
			<motion.div
				className="z-10 relative px-4 max-w-2xl text-center"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
			>
				<h1 className="mb-6 font-bold text-white text-5xl md:text-6xl">
					Welcome to
					<br />
					Elo Browser
				</h1>
				<p className="text-gray-400 text-xl">
					Thank you for joining us early on this journey.
				</p>
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
						Continue
					</Button>
				</motion.div>
			</div>
		</>
	);
}
