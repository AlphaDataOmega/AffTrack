import { Metadata } from "next";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPager } from "@/components/docs/docs-pager";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Terminal, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Getting Started - AffTrack Documentation",
  description: "Learn how to get started with AffTrack.",
};

export default function GettingStartedPage() {
  return (
    <main className="relative max-w-3xl">
      <DocsHeader
        heading="Getting Started"
        text="Learn how to get started with AffTrack in a few simple steps."
      />

      <div className="space-y-8">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertDescription>
            This guide will help you set up and configure AffTrack for your affiliate marketing needs.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Prerequisites
          </h2>
          <div className="grid gap-4">
            <Card className="p-4">
              <h3 className="font-medium mb-2">System Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Node.js 18 or higher</li>
                <li>PostgreSQL database</li>
                <li>Basic understanding of affiliate marketing</li>
              </ul>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Quick Start
          </h2>
          
          <Tabs defaultValue="npm" className="relative mt-6 w-full">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="npm"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                npm
              </TabsTrigger>
              <TabsTrigger
                value="docker"
                className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
              >
                Docker
              </TabsTrigger>
            </TabsList>
            <TabsContent value="npm" className="relative [&_pre]:my-0 [&_pre]:max-h-[400px] [&_pre]:overflow-auto">
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`git clone https://github.com/yourusername/afftrack.git
cd afftrack
npm install
npm run setup`}</code></pre>
              </div>
            </TabsContent>
            <TabsContent value="docker" className="relative [&_pre]:my-0 [&_pre]:max-h-[400px] [&_pre]:overflow-auto">
              <div className="rounded-md bg-muted p-4">
                <pre><code>{`docker pull afftrack/afftrack
docker-compose up -d`}</code></pre>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Core Concepts
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Tracking</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Visit tracking</li>
                <li>Click monitoring</li>
                <li>Lead capture</li>
                <li>Conversion tracking</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-2">Transfers</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Real-time transfers</li>
                <li>Conditional routing</li>
                <li>Response validation</li>
                <li>Automatic retries</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-2">Analytics</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Real-time metrics</li>
                <li>Revenue analysis</li>
                <li>Conversion tracking</li>
                <li>Split testing</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium mb-2">Security</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Role-based access</li>
                <li>API authentication</li>
                <li>Data encryption</li>
                <li>Audit logging</li>
              </ul>
            </Card>
          </div>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Make sure to properly configure your security settings before deploying to production.
          </AlertDescription>
        </Alert>

        <DocsPager />
      </div>
    </main>
  );
}