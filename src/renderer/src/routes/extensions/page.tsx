import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "@/router/provider";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import {
	ExtensionsProvider,
	useExtensions,
} from "@/components/providers/extensions-provider";
import { toast } from "sonner";
import ExtensionCard from "./components/extension-card";
import ExtensionDetails from "./components/extension-details";

const CHROME_WEB_STORE_URL =
	"https://chromewebstore.google.com/category/extensions?utm_source=ext_sidebar";

function ExtensionsPage() {
	const [isDeveloperMode, setIsDeveloperMode] = useState(false);
	const router = useRouter();
	const selectedExtensionId = new URLSearchParams(router.search).get("id");

	const { extensions } = useExtensions();

	const [isProcessing, setIsProcessing] = useState(false);

	const setExtensionEnabled = async (id: string, enabled: boolean) => {
		setIsProcessing(true);

		const success = await flow.extensions.setExtensionEnabled(id, enabled);
		if (success) {
			toast.success(
				`This extension has been successfully ${enabled ? "enabled" : "disabled"}!`,
			);
		} else {
			toast.error(
				`Failed to ${enabled ? "enable" : "disable"} this extension!`,
			);
		}

		setIsProcessing(false);
		return success;
	};

	const setExtensionPinned = async (id: string, pinned: boolean) => {
		setIsProcessing(true);

		const success = await flow.extensions.setExtensionPinned(id, pinned);
		if (success) {
			toast.success(
				`This extension has been successfully ${pinned ? "pinned" : "unpinned"}!`,
			);
		} else {
			toast.error(`Failed to ${pinned ? "pin" : "unpin"} this extension!`);
		}

		setIsProcessing(false);
		return success;
	};

	const handleDetailsClick = (id: string) => {
		window.history.pushState(null, "", `/?id=${id}`);
	};

	const handleBack = () => {
		window.history.pushState(null, "", "/");
	};

	const selectedExtension = extensions.find(
		(ext) => ext.id === selectedExtensionId,
	);

	return (
		<div className="bg-background p-8 w-screen h-screen">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mx-auto max-w-4xl"
			>
				{!selectedExtension ? (
					<>
						<div className="mb-6">
							<div className="flex justify-between items-center">
								<div>
									<h1 className="font-semibold text-foreground text-2xl">
										Elo Extensions
									</h1>
									<p className="mt-1 text-muted-foreground">
										Manage your browser extensions
									</p>
								</div>
								<a
									href={CHROME_WEB_STORE_URL}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm transition-colors"
								>
									<Button variant="outline" className="gap-2">
										<ExternalLink size={16} />
										Get more extensions
									</Button>
								</a>
							</div>
						</div>

						<Card className="border-border">
							<CardContent>
								<div className="flex justify-between items-center mb-6">
									<div className="flex items-center space-x-4">
										<div className="flex items-center space-x-2">
											<Switch
												checked={isDeveloperMode}
												onCheckedChange={setIsDeveloperMode}
												disabled
												id="developer-mode"
											/>
											<label
												htmlFor="developer-mode"
												className="peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed"
											>
												Developer mode
											</label>
										</div>
									</div>
									{/* TODO: Add developer mode & Allow Loading Unpacked Extensions */}
									{isDeveloperMode && (
										<div className="flex space-x-2">
											<Button variant="outline" size="sm">
												Load unpacked
											</Button>
											<Button variant="outline" size="sm">
												Pack extension
											</Button>
											<Button variant="outline" size="sm">
												Update
											</Button>
										</div>
									)}
								</div>

								{extensions.length > 0 ? (
									<div className="space-y-2">
										{extensions.map((extension) => (
											<ExtensionCard
												key={extension.id}
												extension={extension}
												isProcessing={isProcessing}
												setExtensionEnabled={setExtensionEnabled}
												onDetailsClick={handleDetailsClick}
											/>
										))}
									</div>
								) : (
									<div className="py-12 text-center">
										<h3 className="mb-2 font-medium text-lg">
											No extensions installed
										</h3>
										<p className="mb-6 text-muted-foreground">
											Install extensions to enhance your browsing experience
										</p>
										<a
											href={CHROME_WEB_STORE_URL}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button className="gap-2">
												<ExternalLink size={16} />
												Browse Chrome Web Store
											</Button>
										</a>
									</div>
								)}

								<div className="mt-8 py-4 border-t border-border text-center">
									<a
										href={CHROME_WEB_STORE_URL}
										target="_blank"
										rel="noopener noreferrer"
										className="flex justify-center items-center gap-1 text-primary hover:text-primary/80 text-sm"
									>
										<ExternalLink size={14} />
										Browse more extensions in the Chrome Web Store
									</a>
								</div>
							</CardContent>
						</Card>
					</>
				) : (
					<Card className="border-border">
						<CardContent className="p-6">
							<ExtensionDetails
								extension={selectedExtension}
								isDeveloperMode={isDeveloperMode}
								isProcessing={isProcessing}
								setExtensionEnabled={setExtensionEnabled}
								setExtensionPinned={setExtensionPinned}
								onBack={handleBack}
							/>
						</CardContent>
					</Card>
				)}
			</motion.div>
		</div>
	);
}

function App() {
	return (
		<>
			<title>Extensions</title>
			<ExtensionsProvider>
				<ExtensionsPage />
			</ExtensionsProvider>
		</>
	);
}

export default App;
