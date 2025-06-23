import { useTheme } from "@/components/main/theme";
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Omnibox } from "@/lib/omnibox/omnibox";
import { AutocompleteMatch } from "@/lib/omnibox/types";
import { cn } from "@/lib/utils";
import { GlobeIcon, Moon, Search, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { QuickLinks } from "./quick-links";

const MAX_SUGGESTIONS = 6;

function SuggestionIcon({ match }: { match: AutocompleteMatch }) {
	switch (match.type) {
		case "history-url":
		case "open-tab":
		case "url-what-you-typed":
			return <GlobeIcon size={18} className="mr-3 text-gray-400" />;
		case "verbatim":
		case "search-query":
			return <Search size={18} className="mr-3 text-gray-400" />;
		default:
			return null;
	}
}

export function NewTabPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [matches, setMatches] = useState<AutocompleteMatch[]>([]);
	const { theme, setTheme, resolvedTheme } = useTheme();
	const searchRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const omniboxRef = useRef<Omnibox | null>(null);
	const [commandValue, setCommandValue] = useState("");

	// Update search query when command value changes
	useEffect(() => {
		const match = matches.find(
			(match) => match.destinationUrl === commandValue,
		);
		if (!match && matches.length > 0) {
			setCommandValue(matches[0].destinationUrl);
		}
	}, [commandValue, matches]);

	// Mount effect
	useEffect(() => {
		setMounted(true);
	}, []);

	// Initialize omnibox
	useEffect(() => {
		const handleSuggestionsUpdate = (updatedMatches: AutocompleteMatch[]) => {
			console.log("Received Updated Suggestions:", updatedMatches.length);
			setMatches(updatedMatches);
		};

		omniboxRef.current = new Omnibox(handleSuggestionsUpdate);

		if (omniboxRef.current) {
			// Initialize with empty query on focus
			omniboxRef.current.handleInput("", "focus");
		}

		// Cleanup
		return () => {
			omniboxRef.current?.stopQuery();
		};
	}, []);

	// Update omnibox when search query changes
	useEffect(() => {
		if (omniboxRef.current) {
			omniboxRef.current.handleInput(searchQuery, "keystroke");
		}
	}, [searchQuery]);

	// Handle suggestion click or selection
	const handleSuggestionSelect = (match: AutocompleteMatch) => {
		omniboxRef.current?.openMatch(match, "current");
	};

	const toggleTheme = () => {
		// If current theme is system, set to explicit light/dark based on current resolved theme
		// Otherwise toggle between light and dark
		const newTheme =
			theme === "system"
				? resolvedTheme === "dark"
					? "light"
					: "dark"
				: theme === "dark"
					? "light"
					: "dark";
		console.log(`Switching theme from ${theme} to ${newTheme}`);
		setTheme(newTheme);
	};

	if (!mounted) {
		// Return a placeholder or skeleton to avoid hydration mismatch
		return <div className="bg-gray-50 dark:bg-gray-900 min-h-screen"></div>;
	}

	return (
		<div className="flex flex-col justify-between items-center bg-gradient-to-br from-gray-50 dark:from-gray-900 to-blue-100 dark:to-gray-800 p-4 md:p-8 min-h-screen font-sans text-gray-800 dark:text-white transition-colors duration-300 select-none">
			{/* Theme toggle button */}
			<div className="flex justify-end w-full">
				<button
					onClick={toggleTheme}
					type="button"
					className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-full transition-colors"
					aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
				>
					{resolvedTheme === "dark" ? (
						<Sun className="w-5 h-5 text-yellow-400" />
					) : (
						<Moon className="w-5 h-5 text-gray-700" />
					)}
				</button>
			</div>

			{/* Center section with logo and search */}
			<div className="flex flex-col flex-grow justify-start items-center pt-5 md:pt-8">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-8 md:mb-14"
				>
					<div className="flex justify-center items-center gap-3 mb-2">
						<img
							src="/assets/icon.png"
							alt="Elo Browser Logo"
							className="rounded-full size-16 md:size-20 object-contain"
						/>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="relative px-3 sm:px-0 w-[400px] sm:w-[600px]"
					ref={searchRef}
				>
					<Command
						className="bg-transparent !rounded-none"
						shouldFilter={false}
						value={commandValue}
						onValueChange={setCommandValue}
						loop
					>
						<div className="relative">
							<input
								ref={inputRef}
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onFocus={() => setShowSuggestions(true)}
								onBlur={() => setTimeout(() => setShowSuggestions(false), 50)}
								placeholder="Search or enter URL..."
								className={cn(
									"w-full h-10 md:h-12 py-2 md:py-3 px-4 md:px-6 text-base md:text-lg rounded-2xl md:rounded-3xl",
									"outline-none border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white",
									showSuggestions &&
										matches.length > 0 &&
										"!rounded-b-none border-b-0",
								)}
								autoFocus
							/>
							<div className="top-1/2 right-3 absolute text-gray-400 -translate-y-1/2 transform">
								<Search className="mr-2 size-5 md:size-6" />
							</div>
						</div>

						{showSuggestions && matches.length > 0 && (
							<div
								className={cn(
									"absolute top-full left-0 right-0 bg-white dark:bg-gray-800 !rounded-t-none rounded-b-2xl overflow-hidden z-10",
									"border border-gray-200 dark:border-gray-700 shadow-2xl",
								)}
							>
								<CommandList className="max-h-[250px] md:max-h-[300px] overflow-y-auto">
									<CommandGroup>
										{matches.slice(0, MAX_SUGGESTIONS).map((match) => (
											<CommandItem
												key={match.destinationUrl}
												value={match.destinationUrl}
												onSelect={() => handleSuggestionSelect(match)}
												onMouseDown={(e) => {
													e.preventDefault();
													e.stopPropagation();
													handleSuggestionSelect(match);
												}}
												className={cn(
													"px-4 md:px-6 py-2 md:py-3 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm md:text-base",
													"data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-gray-700",
												)}
											>
												<SuggestionIcon match={match} />
												<span className="text-gray-800 dark:text-white truncate">
													{match.contents}
												</span>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</div>
						)}
					</Command>
				</motion.div>
			</div>

			{/* Quick Links at the bottom */}
			<QuickLinks />
		</div>
	);
}
