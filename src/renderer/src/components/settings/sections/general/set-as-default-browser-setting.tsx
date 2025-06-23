import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GlobeIcon, HeartIcon, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export function SetAsDefaultBrowserSetting() {
	const [isDefault, setIsDefault] = useState<boolean | null>(null);

	useEffect(() => {
		const refetchDefaultBrowser = async () => {
			const isDefaultResult = await flow.app.getDefaultBrowser();
			setIsDefault(isDefaultResult);
		};

		refetchDefaultBrowser();
		const interval = setInterval(refetchDefaultBrowser, 2000);
		return () => clearInterval(interval);
	}, []);

	const setDefaultBrowser = () => {
		flow.app.setDefaultBrowser();
	};

	return (
		<div className="flex flex-row justify-between items-center gap-4 hover:bg-muted/50 p-3 rounded-md transition-colors">
			<div className="flex-1 space-y-0.5">
				<Label htmlFor="default-browser-button" className="font-medium text-sm">
					Default Browser
				</Label>
				<p className="text-muted-foreground text-xs">
					Set Elo as your default browser.
				</p>
			</div>
			<div className="flex items-center gap-2">
				{isDefault === null && (
					<Loader2Icon className="w-5 h-5 text-muted-foreground animate-spin" />
				)}
				{isDefault === false && (
					<Button
						id="default-browser-button"
						variant="outline"
						className="px-3 py-1.5 h-fit text-sm"
						onClick={setDefaultBrowser}
					>
						<GlobeIcon className="mr-2 w-4 h-4" />
						Set to Elo
					</Button>
				)}
				{isDefault === true && (
					<Button
						id="default-browser-button"
						variant="outline"
						className="px-3 py-1.5 h-fit text-sm cursor-default"
						disabled
					>
						<HeartIcon className="mr-2 w-4 h-4 text-green-500" />
						Elo is Default
					</Button>
				)}
			</div>
		</div>
	);
}
