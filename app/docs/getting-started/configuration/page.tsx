import { Metadata } from "next";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsPager } from "@/components/docs/docs-pager";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfigTable } from "@/components/docs/config-table";
import { CodeBlock } from "@/components/docs/code-block";
import { Settings, Shield, Database, Webhook } from "lucide-react";

export const metadata: Metadata = {
  title: "Configuration - AffTrack Documentation",
  description: "Learn how to configure AffTrack for your needs.",
};

export default function ConfigurationPage() {
  return (
    <main className="relative max-w-3xl">
      <DocsHeader
        heading="Configuration"
        text="Configure AffTrack to match your requirements."
      />

      <div className="space-y-8">
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertDescription>
            Make sure to complete all required configuration steps before running in production.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="database" className="space-y-6">
          <TabsList>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <CardTitle>Database Configuration</CardTitle>
                </div>
                <CardDescription>Configure your database connection and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <ConfigTable
                  items={[
                    {
                      key: "DATABASE_URL",
                      value: "postgresql://user:pass@localhost:5432/afftrack",
                      description: "PostgreSQL connection string"
                    },
                    {
                      key: "DATABASE_POOL_SIZE",
                      value: "20",
                      description: "Maximum number of database connections"
                    },
                    {
                      key: "DATABASE_SSL",
                      value: "true",
                      description: "Enable SSL for database connections"
                    }
                  ]}
                />
              </CardContent>
            </Card>

            <CodeBlock
              title="Database Migration"
              code={`# Run database migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate`}
            />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <CardTitle>Security Settings</CardTitle>
                </div>
                <CardDescription>Configure security and authentication settings</CardDescription>
              </CardHeader>
              <CardContent>
                <ConfigTable
                  items={[
                    {
                      key: "JWT_SECRET",
                      value: "<random-32-char-string>",
                      description: "Secret key for JWT tokens"
                    },
                    {
                      key: "SESSION_SECRET",
                      value: "<random-32-char-string>",
                      description: "Secret key for session encryption"
                    },
                    {
                      key: "COOKIE_SECURE",
                      value: "true",
                      description: "Enable secure cookies in production"
                    }
                  ]}
                />
              </CardContent>
            </Card>

            <CodeBlock
              title="Generate Security Keys"
              code={`# Generate JWT secret
openssl rand -base64 32

# Generate session secret
openssl rand -base64 32`}
            />
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tracking Configuration</CardTitle>
                <CardDescription>Set up tracking endpoints and behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <ConfigTable
                  items={[
                    {
                      key: "TRACKING_DOMAIN",
                      value: "track.yourdomain.com",
                      description: "Domain for tracking endpoints"
                    },
                    {
                      key: "CLICK_PARAM",
                      value: "click_id",
                      description: "URL parameter for click tracking"
                    },
                    {
                      key: "LEAD_PARAM",
                      value: "lead_id",
                      description: "URL parameter for lead tracking"
                    }
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Webhook className="h-4 w-4" />
                  <CardTitle>Webhook Configuration</CardTitle>
                </div>
                <CardDescription>Configure webhook endpoints and security</CardDescription>
              </CardHeader>
              <CardContent>
                <ConfigTable
                  items={[
                    {
                      key: "WEBHOOK_SECRET",
                      value: "<random-32-char-string>",
                      description: "Secret for webhook signatures"
                    },
                    {
                      key: "WEBHOOK_TIMEOUT",
                      value: "5000",
                      description: "Webhook timeout in milliseconds"
                    },
                    {
                      key: "WEBHOOK_RETRIES",
                      value: "3",
                      description: "Number of retry attempts"
                    }
                  ]}
                />
              </CardContent>
            </Card>

            <CodeBlock
              title="Test Webhook Configuration"
              code={`curl -X POST https://your-domain.com/webhook \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: <signature>" \
  -d '{"event": "test"}'`}
            />
          </TabsContent>
        </Tabs>

        <DocsPager />
      </div>
    </main>
  );
}