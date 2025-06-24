import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { copyTextToClipboard } from "@/lib/utils";
import { motion } from "motion/react";

function Page() {
  const hostnames = ["about", "new-tab", "games", "omnibox", "error", "extensions"];

  return (
    <div className="flex flex-col items-center bg-background p-8 w-screen h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-lg border-border">
          <CardHeader>
            <CardTitle className="font-bold text-3xl">Elo URLs</CardTitle>
            <CardDescription>A list of available Elo browser URLs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hostnames.map((hostname) => {
                const url = `flow://${hostname}`;
                return (
                  <div key={url} className="flex justify-between items-center bg-muted p-3 rounded-md">
                    <span className="font-medium text-foreground">{url}</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => copyTextToClipboard(url)}>
                        Copy URL
                      </Button>
                      <Button variant="default" size="sm" onClick={() => window.open(url, "_blank")}>
                        Open
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <>
      <title>Elo URLs</title>
      <Page />
    </>
  );
}
export default App;
