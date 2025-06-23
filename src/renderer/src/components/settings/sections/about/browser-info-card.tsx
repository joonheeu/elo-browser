import { Loader2 } from "lucide-react"; // For loading state
import { useEffect, useState } from "react";

const getAppInfo = flow.app.getAppInfo;

interface InfoRowProps {
	label: string;
	value: React.ReactNode;
}

function InfoRow({ label, value }: InfoRowProps) {
	return (
		<>
			<div className="py-1.5 pr-2 font-medium text-muted-foreground text-sm break-words">
				{label}
			</div>
			<div className="col-span-2 py-1.5 pl-2 text-card-foreground text-sm break-words">
				{value}
			</div>
		</>
	);
}

export function BrowserInfoCard() {
	const [appInfo, setAppInfo] = useState<Awaited<
		ReturnType<typeof getAppInfo>
	> | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		getAppInfo()
			.then((info) => {
				setAppInfo(info);
			})
			.catch((error) => {
				console.error("Failed to fetch app info:", error);
				setAppInfo(null); // Ensure UI doesn't show stale/incorrect data
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		// Replaced Card with styled div
		<div className="bg-card p-6 border rounded-lg text-card-foreground">
			<div className="mb-4">
				<h3 className="font-semibold text-xl tracking-tight">
					Browser Information
				</h3>
				<p className="mt-1 text-muted-foreground text-sm">
					Details about your Elo Browser installation.
				</p>
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center h-32 text-muted-foreground">
					<Loader2 className="mr-2 w-6 h-6 animate-spin" />
					<span>Loading browser details...</span>
				</div>
			) : appInfo ? (
				// Using a 3-column grid for label & value to better control alignment and wrapping
				<div className="gap-x-4 gap-y-1 grid grid-cols-1 md:grid-cols-3 pt-4 border-t">
					<InfoRow label="Browser Name" value="Elo Browser" />
					<InfoRow label="Version" value={appInfo.app_version} />
					<InfoRow label="Build Number" value={appInfo.build_number} />
					<InfoRow
						label="Engine Version"
						value={`Chromium ${appInfo.chrome_version}`}
					/>
					<InfoRow label="Operating System" value={appInfo.os} />
					<InfoRow label="Update Channel" value={appInfo.update_channel} />
				</div>
			) : (
				<div className="flex justify-center items-center h-32 text-destructive">
					Could not load browser information.
				</div>
			)}
		</div>
	);
}
