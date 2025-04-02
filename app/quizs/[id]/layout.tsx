
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MenuIcon,
  Clock,
  Star,
  Import,
  Database,
  FileText,
  Settings,
  ArrowLeft,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Quiz admin specific components
const BulkUpdateForm = () => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">
        Bulk Update Questions
      </CardTitle>
      <CardDescription>Update multiple questions at once</CardDescription>
    </CardHeader>
    <CardContent>
  <div className="space-y-2">
    <div className="grid grid-cols-1 gap-2">
      <div>
        <select 
          className="w-full rounded border p-2 bg-white" 
          defaultValue=""
        >
          <option value="" disabled >Select points</option>
          <option value="1">1 points</option>
          <option value="5">5 points</option>
          <option value="10">10 points</option>
          <option value="15">15 points</option>
          <option value="20">20 points</option>
        </select>
      </div>
      <div>
        <select 
          className="w-full rounded border p-2 bg-white" 
          defaultValue=""
        >
          <option value="" disabled>Select time</option>
          <option value="30">30 seconds</option>
          <option value="45">45 seconds</option>
          <option value="60">60 seconds</option>
          <option value="90">90 seconds</option>
          <option value="120">2 minutes</option>
        </select>
      </div>
    </div>
  </div>
</CardContent>
  </Card>
);

const ImportOptions = () => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium">Import Questions</CardTitle>
      <CardDescription>Add questions from external sources</CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      <Button
        variant="outline"
        className="w-full flex items-center justify-start gap-2"
        size="sm"
      >
        <FileText className="h-4 w-4" />
        <span>From CSV</span>
      </Button>
      <Button
        variant="outline"
        className="w-full flex items-center justify-start gap-2"
        size="sm"
      >
        <Database className="h-4 w-4" />
        <span>From Question Bank</span>
      </Button>
      <Button
        variant="outline"
        className="w-full flex items-center justify-start gap-2"
        size="sm"
      >
        <Import className="h-4 w-4" />
        <span>From Another Quiz</span>
      </Button>
    </CardContent>
  </Card>
);

export default function QuizAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed hidden h-full border-r bg-background transition-all duration-300 md:block z-10",
          isSidebarOpen ? "w-80" : "w-16"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="mr-2 underline"
              >
              Back
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-2"
            >
             Back
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="h-8 w-8 bg-emerald-500 text-white rounded-full"
          >
            {isSidebarOpen ? "←" : "→"}
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          {isSidebarOpen ? (
            <div className="p-4">
              <BulkUpdateForm />

              <ImportOptions />
            </div>
          ) : (
            <nav className="flex flex-col items-center gap-4 p-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Bulk Operations"
              >
                <Star className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Import Questions"
              >
                <Import className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                title="Quiz Settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </nav>
          )}
        </ScrollArea>
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex h-16 items-center border-b px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">Quiz Editor</span>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="bulk-update">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      <span>Bulk Operations</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <BulkUpdateForm />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="import">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <Import className="h-4 w-4" />
                      <span>Import Questions</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ImportOptions />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="settings">
                  <AccordionTrigger className="py-2">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Quiz Settings</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 px-2">
                      <Link
                        href="/quiz/settings"
                        className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                      >
                        <Clock className="h-4 w-4" />
                        <span>Time Settings</span>
                      </Link>
                      <Link
                        href="/quiz/scoring"
                        className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                      >
                        <Star className="h-4 w-4" />
                        <span>Scoring System</span>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 md:ml-16",
          isSidebarOpen && "md:ml-80"
        )}
      >
        <div className=" py-8">{children}</div>
      </main>
    </div>
  );
}
