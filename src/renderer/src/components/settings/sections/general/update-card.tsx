import { useAppUpdates } from "@/components/providers/app-updates-provider";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
	AlertCircle,
	ArrowDownToLine,
	ArrowUpCircle,
	CheckCircle2,
	ExternalLink,
	InfoIcon,
	RefreshCw,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const DOWNLOAD_PAGE = "https://flow-browser.com/download/";

interface UpdateState {
	currentVersion: string;
	dialogOpen: boolean;
}

export function UpdateCard() {
	const {
		updateStatus,
		isCheckingForUpdates,
		isDownloadingUpdate,
		isInstallingUpdate,
		isAutoUpdateSupported,
		checkForUpdates,
		downloadUpdate,
		installUpdate,
	} = useAppUpdates();

	const [state, setState] = useState<UpdateState>({
		currentVersion: "-", // Will be fetched
		dialogOpen: false,
	});

	useEffect(() => {
		const getAppInfo = async () => {
			try {
				const appInfo = await flow.app.getAppInfo();
				setState((prev) => ({ ...prev, currentVersion: appInfo.app_version }));
			} catch (error) {
				console.error("Failed to get app info:", error);
				setState((prev) => ({ ...prev, currentVersion: "N/A" }));
			}
		};
		getAppInfo();
	}, []);

	useEffect(() => {
		if (!updateStatus && isAutoUpdateSupported) {
			// Only auto-check if supported
			checkForUpdates();
		}
	}, [checkForUpdates, updateStatus, isAutoUpdateSupported]);

	const openDownloadPage = () => {
		flow.tabs.newTab(DOWNLOAD_PAGE, true);
	};

	const handleInstallUpdate = async () => {
		await installUpdate();
		setState((prev) => ({ ...prev, dialogOpen: false }));
	};

	const isDownloaded = updateStatus?.updateDownloaded === true;
	const updateProgress = updateStatus?.downloadProgress?.percent || 0;
	const hasChecked = updateStatus !== null;
	const hasUpdate = updateStatus?.availableUpdate !== null;
	const availableVersion = updateStatus?.availableUpdate?.version || "";
	const downloadFailed = updateStatus?.downloadProgress?.percent === -1;
	const isUpToDate =
		hasChecked && !hasUpdate && !isCheckingForUpdates && !isDownloadingUpdate;

	const renderStatusIconAndText = () => {
		if (isCheckingForUpdates) {
			return (
				<>
					<RefreshCw className="mr-2 w-5 h-5 text-muted-foreground animate-spin" />{" "}
					<span className="text-muted-foreground text-sm">
						Checking for updates...
					</span>
				</>
			);
		}
		if (downloadFailed) {
			return (
				<>
					<XCircle className="mr-2 w-5 h-5 text-destructive" />{" "}
					<span className="text-destructive text-sm">
						Download failed for v{availableVersion}
					</span>
				</>
			);
		}
		if (isDownloadingUpdate) {
			return (
				<>
					<ArrowDownToLine className="mr-2 w-5 h-5 text-primary" />{" "}
					<span className="text-primary text-sm">
						Downloading v{availableVersion}...
					</span>
				</>
			);
		}
		if (isDownloaded) {
			return (
				<>
					<CheckCircle2 className="mr-2 w-5 h-5 text-green-500" />{" "}
					<span className="text-green-500 text-sm">
						Update v{availableVersion} downloaded
					</span>
				</>
			);
		}
		if (hasUpdate) {
			return (
				<>
					<InfoIcon className="mr-2 w-5 h-5 text-primary" />{" "}
					<span className="text-primary text-sm">
						Update available: v{availableVersion}
					</span>
				</>
			);
		}
		if (isUpToDate) {
			return (
				<>
					<CheckCircle2 className="mr-2 w-5 h-5 text-green-500" />{" "}
					<span className="text-green-500 text-sm">Elo is up to date</span>
				</>
			);
		}
		return (
			<>
				<InfoIcon className="mr-2 w-5 h-5 text-muted-foreground" />{" "}
				<span className="text-muted-foreground text-sm">
					Check for browser updates
				</span>
			</>
		);
	};

	const renderActionButton = () => {
		if (isCheckingForUpdates || isDownloadingUpdate || isInstallingUpdate) {
			return (
				<Button variant="outline" size="sm" disabled className="min-w-[140px]">
					<RefreshCw className="mr-2 w-4 h-4 animate-spin" />
					{isInstallingUpdate
						? "Installing..."
						: isDownloadingUpdate
							? "Downloading..."
							: "Checking..."}
				</Button>
			);
		}

		if (downloadFailed) {
			return (
				<Button
					variant="default"
					size="sm"
					onClick={downloadUpdate}
					className="min-w-[140px]"
				>
					<RefreshCw className="mr-2 w-4 h-4" /> Retry Download
				</Button>
			);
		}

		if (isDownloaded) {
			return (
				<Dialog
					open={state.dialogOpen}
					onOpenChange={(open) =>
						setState((prev) => ({ ...prev, dialogOpen: open }))
					}
				>
					<DialogTrigger asChild>
						<Button variant="default" size="sm" className="min-w-[140px]">
							<ArrowUpCircle className="w-4 h-4" /> Install v{availableVersion}
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Install Update to v{availableVersion}?</DialogTitle>
							<DialogDescription>
								The app will close and restart to complete the update. Any
								unsaved changes may be lost.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className="gap-2 mt-2">
							<Button
								variant="outline"
								onClick={() =>
									setState((prev) => ({ ...prev, dialogOpen: false }))
								}
							>
								Later
							</Button>
							<Button
								onClick={handleInstallUpdate}
								disabled={isInstallingUpdate}
								className="flex items-center gap-2"
							>
								{isInstallingUpdate ? (
									<>
										<RefreshCw className="w-4 h-4 animate-spin" /> Installing...
									</>
								) : (
									`Install v${availableVersion}`
								)}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			);
		}

		if (hasUpdate && !isAutoUpdateSupported) {
			return (
				<Button
					variant="default"
					size="sm"
					onClick={openDownloadPage}
					className="min-w-[140px]"
				>
					<ExternalLink className="mr-2 w-4 h-4" /> Download Manually
				</Button>
			);
		}

		if (hasUpdate && isAutoUpdateSupported) {
			return (
				<Button
					variant="default"
					size="sm"
					onClick={downloadUpdate}
					className="min-w-[140px]"
				>
					<ArrowDownToLine className="mr-2 w-4 h-4" /> Download v
					{availableVersion}
				</Button>
			);
		}

		// Default: Up to date or initial state, allow manual check
		return (
			<Button
				variant={isUpToDate ? "outline" : "default"}
				size="sm"
				onClick={checkForUpdates}
				className="min-w-[140px]"
			>
				<RefreshCw className="mr-2 w-4 h-4" />{" "}
				{isUpToDate ? "Check Again" : "Check for Updates"}
			</Button>
		);
	};

	return (
		<div className="bg-card p-6 border rounded-lg text-card-foreground remove-app-drag">
			<div className="mb-4">
				<h3 className="font-semibold text-xl tracking-tight">Updates</h3>
				<p className="mt-1 text-muted-foreground text-sm">
					Current Version: {state.currentVersion}
				</p>
			</div>

			<div className="space-y-4">
				{/* Status and Action Button Row */}
				<div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-3 bg-muted/30 p-3 border rounded-md">
					<div className="flex flex-grow items-center">
						{renderStatusIconAndText()}
					</div>
					<div className="flex-shrink-0 self-stretch sm:self-center">
						{renderActionButton()}
					</div>
				</div>

				{/* Download Progress */}
				{isDownloadingUpdate && !downloadFailed && (
					<div className="px-1 pt-2">
						<Progress value={updateProgress} className="w-full h-2" />
						<div className="flex justify-end mt-1 text-muted-foreground text-xs">
							<span>{Math.round(updateProgress)}%</span>
						</div>
					</div>
				)}

				{/* Platform not supported warning */}
				{hasChecked && hasUpdate && !isAutoUpdateSupported && (
					<div
						className={cn(
							"rounded-md border p-3 mt-4 text-sm",
							"bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-400",
						)}
					>
						<div className="flex items-center gap-2">
							<AlertCircle className="flex-shrink-0 w-5 h-5" />
							<div className="font-medium">
								Automatic updates are not supported on this platform.
							</div>
						</div>
						<div className="mt-1.5 pl-7 text-xs">
							Please download v{availableVersion} manually from our website.
							<Button
								variant="link"
								size="sm"
								className="ml-1 p-0 h-auto text-orange-700 dark:text-orange-400 text-xs hover:underline"
								onClick={openDownloadPage}
							>
								Go to Downloads <ExternalLink className="ml-1 w-3 h-3" />
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
