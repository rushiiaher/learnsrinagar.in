import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookieSessionStorage, redirect } from "@remix-run/node";
import { RemixServer, Meta, Links, Outlet, ScrollRestoration, Scripts, Link, useActionData, useNavigation, Form, redirect as redirect$1, useLoaderData, useLocation, useSubmit, useNavigate } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useTheme } from "next-themes";
import { Toaster as Toaster$1, toast } from "sonner";
import * as React from "react";
import { useEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { School as School$1, MonitorPlay, Users, BookOpen, GraduationCap, LayoutGrid, Building2, MapPin, ChevronRight, XIcon, PanelLeftIcon, LayoutDashboard, ShieldCheck, RadioTower, UserCog, CalendarClock, UserCheck, UserPlus, LogOut, ChevronDownIcon, CheckIcon, ChevronUpIcon, ChevronLeft, CalendarIcon, PlusIcon, PencilIcon, TrashIcon, Plus, Search, Edit, Trash2, ExternalLink, Clock, CheckCircle, Play, VideoIcon, CheckCircleIcon, XCircleIcon, ClockIcon, BookOpenIcon, EyeIcon, MessageSquareIcon, StarIcon, Filter } from "lucide-react";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { subDays, format, addDays, isSameDay } from "date-fns";
import * as SelectPrimitive from "@radix-ui/react-select";
import { DayPicker } from "react-day-picker";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as Tooltip$1, Legend, Line } from "recharts";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { useReactTable, getPaginationRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as TabsPrimitive from "@radix-ui/react-tabs";
async function check_db() {
  return { isValid: true, message: "API key validated successfully (bypassed for local development)" };
}
const ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  const validation = await check_db();
  if (!validation.isValid) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
        message: validation.message
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)"
      },
      ...props
    }
  );
};
function meta() {
  return [{ title: "Hybrid School | learnsrinagar.in" }];
}
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(Toaster, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        "data-slot": "button",
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
function Card({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "card-content", className: cn("px-6", className), ...props });
}
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TabsPrimitive.Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function Home() {
  const schools = [
    {
      zone: "Srinagar",
      constituency: "Lal Chowk",
      name: "Boys Middle School Rajbagh",
      code: "01030100602"
    },
    {
      zone: "Hawal",
      constituency: "Zadibal",
      name: "Boys Middle School Soura",
      code: "01030101901"
    },
    {
      zone: "Gulab bagh",
      constituency: "Hazratbal",
      name: "BMS Zakura",
      code: "01030700604"
    },
    {
      zone: "Rainawari",
      constituency: "Hazratbal",
      name: "BMS Panjkerwari",
      code: "01031001606"
    },
    {
      zone: "Batamaloo",
      constituency: "Khanyar",
      name: "GMS Saidakdal",
      code: "01031001213"
    },
    {
      zone: "Eidgah",
      constituency: "Iddgah",
      name: "GMS Barzulla",
      code: "01030300702"
    },
    {
      zone: "Nishat",
      constituency: "Central Shalteng",
      name: "BMS Batamaloo",
      code: "01030401801"
    },
    {
      zone: "Zaldagar",
      constituency: "Central Shalteng",
      name: "MS Khojabagh Maloora",
      code: "01030400102"
    },
    {
      zone: "Lal Chowk",
      constituency: "Iddgah",
      name: "BMS NOorbagh",
      code: "01030401202"
    },
    {
      zone: "Channapora",
      constituency: "Khanyar",
      name: "MS Kreshbal",
      code: "01030800504"
    },
    {
      zone: "Nowgam",
      constituency: "Iddgah",
      name: "GMS New Theed",
      code: "01030800928"
    },
    {
      zone: "Habba Kadal",
      constituency: "Habba Kadal",
      name: "BMS Q, D Pora",
      code: "01030901102"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(School$1, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "Hybrid School" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx(Link, { to: "/login", children: /* @__PURE__ */ jsx(Button, { size: "sm", className: "hidden md:flex", children: "Login" }) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("section", { className: "w-full py-12", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none", children: "Connecting Classrooms Across Distances" }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[600px] text-muted-foreground md:text-xl", children: "Our Hybrid School project bridges the gap between schools with a central studio facilitating interactive class sessions for remote participating schools." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-[400px] md:h-[550px] rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center shadow-lg", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/80 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ jsx(School$1, { className: "h-12 w-12 md:h-16 md:w-16 text-white" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-background/80 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 p-4 opacity-50", children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "aspect-video rounded-md bg-primary/30"
            },
            i
          )) })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { id: "features", className: "w-full py-20 bg-muted/50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center space-y-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground", children: "Features" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tighter md:text-4xl/tight", children: "Innovative Learning Environment" }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed", children: "Our hybrid learning system combines the best of in-person and remote education to create an engaging and effective learning experience for all students." })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(MonitorPlay, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Central Studio" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "State-of-the-art central studio equipped with advanced audio-visual technology for high-quality broadcasting of lessons to remote schools." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Users, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Interactive Sessions" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Two-way communication allows students from remote schools to actively participate in discussions and ask questions in real-time." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Shared Resources" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Access to a wide range of educational resources, including digital libraries, interactive materials, and expert educators." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Expert Teachers" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Lessons delivered by specialized educators with expertise in their subject areas, benefiting students across all participating schools." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(LayoutGrid, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Flexible Learning" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Adaptable system that can accommodate various teaching methods and learning styles, ensuring every student can benefit." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-start", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Building2, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Infrastructure Support" }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Technical assistance and infrastructure setup for all participating schools to ensure seamless connectivity and learning experience." })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "mission", className: "w-full py-20", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:gap-16 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block rounded-lg bg-muted px-3 py-1 text-sm", children: "Our Mission" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl", children: "Bridging Educational Gaps" }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[600px] text-muted-foreground md:text-xl/relaxed", children: "Our mission is to provide equal access to quality education for all students, regardless of their geographical location or school resources. By connecting schools through our hybrid learning system, we aim to standardize educational quality and create opportunities for collaborative learning." }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 min-[400px]:flex-row", children: /* @__PURE__ */ jsx(Button, { children: "Join Our Mission" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start space-y-4", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block rounded-lg bg-muted px-3 py-1 text-sm", children: "Our Goals" }),
          /* @__PURE__ */ jsxs("ul", { className: "grid gap-4", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground", children: "1" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Equitable Education" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Ensure all students have access to the same quality of education regardless of their school's location." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground", children: "2" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Resource Optimization" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Maximize the use of available educational resources by sharing them across multiple schools." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground", children: "3" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Teacher Development" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Provide opportunities for teachers to specialize and share their expertise with a wider audience." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground", children: "4" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-medium", children: "Community Building" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Foster connections between different school communities, creating a larger educational ecosystem." })
              ] })
            ] })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { id: "schools", className: "w-full bg-muted/50 py-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 md:px-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center space-y-4 text-center mb-10", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground", children: "Participating Schools" }),
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tighter md:text-4xl/tight", children: "Our Network of Schools" }),
          /* @__PURE__ */ jsx("p", { className: "max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed", children: "The following schools are part of our Hybrid Learning System project in the Srinagar district." })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: schools.map((school, index) => /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: school.name }),
            /* @__PURE__ */ jsxs(CardDescription, { children: [
              "Zone: ",
              school.zone
            ] })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: school.constituency })
          ] }) })
        ] }, index)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "w-full border-t py-6 md:py-0", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto flex flex-col items-center justify-center gap-4 md:h-14 md:flex-row px-4", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Hybrid School Project. All rights reserved."
    ] }) }) }) })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
const pool = mysql.createPool({
  host: "69.62.84.118",
  user: "learnsrinagar",
  database: "learnsrinagar",
  password: "e3iWzvZnZifgN38OiM2Q",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
async function query(sql, params = []) {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.query(sql, params);
    return [results];
  } finally {
    connection.release();
  }
}
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: ["s3cret"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: true
  }
});
const { commitSession, destroySession, getSession } = sessionStorage;
async function createSession(request, user) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  session.set("user", user);
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7
      })
    }
  });
}
async function deleteSession(request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}
async function getUser(request) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  return user;
}
function Input({
  className,
  type,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
async function loader$i({ request }) {
  const user = await getUser(request);
  return user ? redirect$1("/dashboard") : null;
}
async function action$d({ request }) {
  var _a;
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const users = await query(`SELECT * FROM users WHERE email = ?`, [email]);
  const user = users == null ? void 0 : users[0][0];
  if (!user || !user.password_hash) {
    return { error: "Invalid credentials" };
  }
  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  if (!isValidPassword) {
    return { error: "Invalid credentials" };
  }
  const roles = await query(`SELECT name FROM roles WHERE id = ?`, [
    user.role_id
  ]);
  const role = roles == null ? void 0 : roles[0][0];
  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role_name: role.name,
    school_id: null,
    class_ids: [],
    student_ids: [],
    subject_ids: []
  };
  if (role) {
    const roleName = role.name;
    if (roleName === "student") {
      const studentProfiles = await query(
        `SELECT class_id, schools_id as school_id FROM student_profiles WHERE user_id = ?`,
        [user.id]
      );
      if (((_a = studentProfiles == null ? void 0 : studentProfiles[0]) == null ? void 0 : _a.length) > 0) {
        sessionUser.class_ids = [studentProfiles[0][0].class_id];
        sessionUser.school_id = studentProfiles[0][0].school_id;
      }
    } else if (roleName === "teacher") {
      const [teacherSubjects] = await query(
        `SELECT subject_id FROM teacher_assignments WHERE teacher_id = ?`,
        [user.id]
      );
      if ((teacherSubjects == null ? void 0 : teacherSubjects.length) > 0) {
        sessionUser.subject_ids = teacherSubjects.map((item) => item.subject_id);
      }
      const [teacherClasses] = await query(
        `SELECT DISTINCT c.id as class_id 
         FROM teacher_assignments ta
         JOIN subjects s ON ta.subject_id = s.id
         JOIN classes c ON s.class_id = c.id
         WHERE ta.teacher_id = ?`,
        [user.id]
      );
      if ((teacherClasses == null ? void 0 : teacherClasses.length) > 0) {
        sessionUser.class_ids = teacherClasses.map((item) => item.class_id);
      }
    } else if (roleName === "parent") {
      const [parentLinks] = await query(
        `SELECT student_id FROM parent_student_links WHERE parent_id = ?`,
        [user.id]
      );
      if ((parentLinks == null ? void 0 : parentLinks.length) > 0) {
        sessionUser.student_ids = parentLinks.map((link) => link.student_id);
      }
    } else if (roleName === "class_admin") {
      const [classAdmins] = await query(
        `SELECT school_id, class_id FROM class_admins WHERE admin_id = ?`,
        [user.id]
      );
      if ((classAdmins == null ? void 0 : classAdmins.length) > 0) {
        sessionUser.school_id = classAdmins[0].school_id;
        sessionUser.class_ids = classAdmins.map((item) => item.class_id);
      }
    } else if (roleName === "school_admin") {
      const [schools] = await query(
        `SELECT id as school_id FROM schools WHERE users_id = ? LIMIT 1`,
        [user.id]
      );
      if ((schools == null ? void 0 : schools.length) > 0) {
        sessionUser.school_id = schools[0].school_id;
      }
    }
  }
  return await createSession(request, sessionUser);
}
function Login() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (actionData == null ? void 0 : actionData.error) {
      toast.error(actionData.error);
    }
  }, [actionData]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-svh w-full items-center justify-center p-6 md:p-10", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl", children: "Login" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Enter your credentials below to login to your account" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, { method: "post", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            name: "email",
            type: "email",
            placeholder: "yourname@example.com",
            required: true,
            disabled: isSubmitting
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "password",
            name: "password",
            type: "password",
            placeholder: "********",
            required: true,
            disabled: isSubmitting
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          className: "w-full",
          disabled: isSubmitting,
          children: isSubmitting ? "Signing in..." : "Login"
        }
      )
    ] }) }) })
  ] }) }) });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$d,
  default: Login,
  loader: loader$i
}, Symbol.toStringTag, { value: "Module" }));
function Breadcrumb({
  ...props
}) {
  return /* @__PURE__ */ jsx("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  );
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "breadcrumb-link",
      className: cn("hover:text-foreground transition-colors", className),
      ...props
    }
  );
}
function BreadcrumbPage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("text-foreground font-normal", className),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsx(ChevronRight, {})
    }
  );
}
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator-root",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
const SheetOverlay = React.forwardRef(function SheetOverlay2({ className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      ref,
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
});
function SheetContent({ className, children, side = "right", ...props }) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Provider, { "data-slot": "tooltip-provider", delayDuration, ...props });
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(
          TooltipPrimitive.Arrow,
          {
            className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
          }
        )
      ]
    }
  ) });
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value;
    if (setOpenProp) {
      setOpenProp(openState);
    } else {
      _setOpen(openState);
    }
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [setOpenProp, open]);
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("size-7", className),
      onClick: (event) => {
        onClick == null ? void 0 : onClick(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx(PanelLeftIcon, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarRail({
  className,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsx(
    "button",
    {
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInset({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarMenu({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
async function loader$h({ request }) {
  const user = await getUser(request);
  return user ? user : redirect$1("/login");
}
const ALL_LINKS = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "School Admin", icon: ShieldCheck, url: "/school-admin" },
  { title: "School", icon: School$1, url: "/school" },
  { title: "Class", icon: Building2, url: "/class" },
  { title: "Subject", icon: BookOpen, url: "/subject" },
  { title: "Teacher", icon: GraduationCap, url: "/teacher" },
  { title: "Live Class", icon: RadioTower, url: "/live-class" },
  { title: "Manage Live Classes", icon: RadioTower, url: "/manage-live-classes" },
  { title: "Live Classes", icon: RadioTower, url: "/student-live-classes" },
  { title: "Class Admin", icon: UserCog, url: "/class-admin" },
  { title: "Timetable", icon: CalendarClock, url: "/timetable" },
  { title: "Attendance", icon: UserCheck, url: "/attendance" },
  { title: "Feedback", icon: BookOpen, url: "/feedback" },
  { title: "Homework", icon: GraduationCap, url: "/homework" },
  { title: "Student", icon: UserPlus, url: "/student" },
  // { title: 'Parent', icon: User, url: '/parent' },
  { title: "Logout", icon: LogOut, url: "/logout" }
];
const ROLE_LINKS = {
  super_admin: [
    "Dashboard",
    "School Admin",
    "School",
    "Teacher",
    "Class",
    "Subject",
    "Manage Live Classes",
    "Timetable",
    "Feedback"
  ],
  school_admin: ["Class Admin", "Manage Live Classes", "Attendance", "Timetable", "Student", "Parent"],
  class_admin: ["Attendance", "Timetable", "Student", "Parent"],
  teacher: ["Manage Live Classes", "Timetable", "Homework"],
  student: ["Live Classes", "Attendance", "Timetable", "Homework"],
  parent: ["Attendance", "Timetable", "Homework", "Feedback"]
};
function Layout() {
  const user = useLoaderData();
  const location = useLocation();
  const role = user == null ? void 0 : user.role_name;
  const allowedTitles = ROLE_LINKS[role] || [];
  const visibleLinks = ALL_LINKS.filter(
    (link) => allowedTitles.includes(link.title) || link.title === "Logout"
    // Always show logout
  );
  const isActivePath = (url) => location.pathname === url;
  const formatPathName = (path) => path.split("/").pop().split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return /* @__PURE__ */ jsxs(SidebarProvider, { children: [
    /* @__PURE__ */ jsxs(Sidebar, { collapsible: "icon", children: [
      /* @__PURE__ */ jsx(SidebarHeader, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(
        SidebarMenuButton,
        {
          size: "lg",
          className: "group-data-[collapsible=icon]:p-0!",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground", children: /* @__PURE__ */ jsx(BookOpen, { className: "size-4" }) }),
            /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate font-semibold", children: "Hybrid School" }),
              /* @__PURE__ */ jsx("span", { className: "truncate text-xs", children: "Powered by Cano Solutions" })
            ] })
          ]
        }
      ) }) }) }),
      /* @__PURE__ */ jsx(SidebarContent, { className: "relative flex w-full min-w-0 flex-col p-2", children: /* @__PURE__ */ jsx(SidebarMenu, { children: visibleLinks.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(Link, { to: item.url, children: /* @__PURE__ */ jsxs(
        SidebarMenuButton,
        {
          isActive: isActivePath(item.url),
          tooltip: item.title,
          children: [
            item.icon && /* @__PURE__ */ jsx(item.icon, {}),
            /* @__PURE__ */ jsx("span", { children: item.title })
          ]
        }
      ) }) }, item.title)) }) }),
      /* @__PURE__ */ jsx(SidebarFooter, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxs(SidebarMenuButton, { size: "lg", children: [
        /* @__PURE__ */ jsx("div", { className: "relative flex shrink-0 overflow-hidden rounded-full h-8 w-8", children: /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center rounded-full dark:bg-gray-800 bg-gray-200 text-gray-700", children: (user == null ? void 0 : user.name) ? user.name.charAt(0).toUpperCase() + (user.name.indexOf(" ") > 0 ? user.name.charAt(user.name.indexOf(" ") + 1).toUpperCase() : "") : "" }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
          /* @__PURE__ */ jsx("span", { className: "truncate font-semibold", children: (user == null ? void 0 : user.name) || "" }),
          /* @__PURE__ */ jsx("span", { className: "truncate text-xs", children: (user == null ? void 0 : user.email) || "" })
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsx(SidebarRail, {})
    ] }),
    /* @__PURE__ */ jsxs(SidebarInset, { children: [
      /* @__PURE__ */ jsx("header", { className: "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4", children: [
        /* @__PURE__ */ jsx(SidebarTrigger, {}),
        /* @__PURE__ */ jsx(Separator, { orientation: "vertical", className: "mr-2 h-4" }),
        /* @__PURE__ */ jsx(Breadcrumb, { children: /* @__PURE__ */ jsxs(BreadcrumbList, { children: [
          /* @__PURE__ */ jsx(BreadcrumbItem, { className: "hidden md:block", children: /* @__PURE__ */ jsx(BreadcrumbLink, { children: "Hybrid School" }) }),
          /* @__PURE__ */ jsx(BreadcrumbSeparator, { className: "hidden md:block" }),
          /* @__PURE__ */ jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsx(BreadcrumbPage, { children: /* @__PURE__ */ jsx(Link, { to: location.pathname, children: formatPathName(location.pathname) }) }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "p-4 pt-0", children: /* @__PURE__ */ jsx(Outlet, {}) })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout,
  loader: loader$h
}, Symbol.toStringTag, { value: "Module" }));
async function loader$g({ request }) {
  return await deleteSession(request);
}
function Logout() {
  return null;
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Logout,
  loader: loader$g
}, Symbol.toStringTag, { value: "Module" }));
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn("flex cursor-default items-center justify-center py-1", className),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronLeft, { className: cn("size-4", className2), ...props2 }),
        IconRight: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronRight, { className: cn("size-4", className2), ...props2 })
      },
      ...props
    }
  );
}
const Popover = React.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { "data-slot": "popover", ref, ...props });
});
Popover.displayName = "Popover";
const PopoverTrigger = React.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(
    PopoverPrimitive.Trigger,
    {
      "data-slot": "popover-trigger",
      ref,
      ...props
    }
  );
});
PopoverTrigger.displayName = "PopoverTrigger";
const PopoverContent = React.forwardRef(
  ({ className, align = "center", sideOffset = 4, ...props }, ref) => {
    return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
      PopoverPrimitive.Content,
      {
        "data-slot": "popover-content",
        align,
        sideOffset,
        className: cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        ),
        ref,
        ...props
      }
    ) });
  }
);
PopoverContent.displayName = "PopoverContent";
const PopoverAnchor = React.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Anchor, { "data-slot": "popover-anchor", ref, ...props });
});
PopoverAnchor.displayName = "PopoverAnchor";
async function loader$f({ request }) {
  const user = await getUser(request);
  const role = user.role_name;
  if (role !== "super_admin") {
    if (role == "school_admin") {
      return redirect("/class-admin");
    } else if (role == "class_admin") {
      return redirect("/attendance");
    } else if (role == "teacher") {
      return redirect("/timetable");
    } else if (role == "student") {
      return redirect("/attendance");
    } else if (role == "parent") {
      return redirect("/attendance");
    }
  }
  const [schools] = await query(
    `SELECT s.id, s.name, COUNT(DISTINCT c.id) as class_count
     FROM schools s
     LEFT JOIN student_profiles sp ON s.id = sp.schools_id
     LEFT JOIN classes c ON sp.class_id = c.id
     GROUP BY s.id, s.name
     ORDER BY s.name`
  );
  const [classes] = await query(
    `SELECT c.id, c.name, s.id as school_id, s.name as school_name
     FROM classes c
     JOIN student_profiles sp ON c.id = sp.class_id
     JOIN schools s ON sp.schools_id = s.id
     GROUP BY c.id, c.name, s.id, s.name
     ORDER BY s.name, c.name`
  );
  const [dailyAttendance] = await query(
    `SELECT 
       sa.date, 
       s.id as school_id,
       s.name as school_name,
       c.id as class_id,
       c.name as class_name,
       COUNT(CASE WHEN sa.status = 'present' THEN 1 END) as present_count,
       COUNT(CASE WHEN sa.status = 'absent' THEN 1 END) as absent_count,
       COUNT(CASE WHEN sa.status = 'late' THEN 1 END) as late_count,
       COUNT(sa.id) as total_count
     FROM student_attendance sa
     JOIN student_profiles sp ON sa.student_id = sp.user_id
     JOIN schools s ON sp.schools_id = s.id
     JOIN classes c ON sa.class_id = c.id
     WHERE sa.date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
     GROUP BY sa.date, s.id, s.name, c.id, c.name
     ORDER BY sa.date DESC, s.name, c.name`
  );
  const [feedbackData] = await query(
    `SELECT 
       s.id as school_id,
       s.name as school_name,
       c.id as class_id,
       c.name as class_name,
       pfi.section,
       AVG(pfi.rating) as avg_rating,
       COUNT(DISTINCT pf.id) as feedback_count
     FROM parent_feedback pf
     JOIN parent_feedback_items pfi ON pf.id = pfi.feedback_id
     JOIN users u ON pf.student_id = u.id
     JOIN student_profiles sp ON u.id = sp.user_id
     JOIN schools s ON sp.schools_id = s.id
     JOIN classes c ON sp.class_id = c.id
     GROUP BY s.id, s.name, c.id, c.name, pfi.section
     ORDER BY s.name, c.name, pfi.section`
  );
  return {
    user,
    schools,
    classes,
    dailyAttendance,
    feedbackData
  };
}
function Dashboard() {
  const {
    user,
    schools = [],
    classes = [],
    dailyAttendance = [],
    feedbackData = []
  } = useLoaderData();
  const [selectedSchool, setSelectedSchool] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [dateRange, setDateRange] = useState({
    from: subDays(/* @__PURE__ */ new Date(), 14),
    to: /* @__PURE__ */ new Date()
  });
  const calculateAverageRating = (section) => {
    if (!feedbackData || feedbackData.length === 0) return 0;
    const relevantFeedback = feedbackData.filter((item) => {
      var _a, _b;
      const isMatchingSchool = selectedSchool === "all" || ((_a = item.school_id) == null ? void 0 : _a.toString()) === selectedSchool;
      const isMatchingClass = selectedClass === "all" || ((_b = item.class_id) == null ? void 0 : _b.toString()) === selectedClass;
      const isMatchingSection = item.section === section;
      return isMatchingSchool && isMatchingClass && isMatchingSection;
    });
    if (relevantFeedback.length === 0) return 0;
    const sum = relevantFeedback.reduce((acc, item) => {
      return acc + parseFloat(item.avg_rating || 0);
    }, 0);
    return sum / relevantFeedback.length;
  };
  const getFeedbackCount = (section) => {
    if (!feedbackData || feedbackData.length === 0) return 0;
    const relevantFeedback = feedbackData.filter((item) => {
      var _a, _b;
      const isMatchingSchool = selectedSchool === "all" || ((_a = item.school_id) == null ? void 0 : _a.toString()) === selectedSchool;
      const isMatchingClass = selectedClass === "all" || ((_b = item.class_id) == null ? void 0 : _b.toString()) === selectedClass;
      const isMatchingSection = item.section === section;
      return isMatchingSchool && isMatchingClass && isMatchingSection;
    });
    if (relevantFeedback.length === 0) return 0;
    return relevantFeedback.reduce((acc, item) => {
      return acc + parseInt(item.feedback_count || 0);
    }, 0);
  };
  const filteredClasses = selectedSchool === "all" ? classes : classes.filter((cls) => {
    var _a;
    return ((_a = cls.school_id) == null ? void 0 : _a.toString()) === selectedSchool;
  });
  const chartData = dailyAttendance.filter((record) => {
    var _a, _b;
    const recordDate = new Date(record.date);
    const isInDateRange = recordDate >= dateRange.from && recordDate <= dateRange.to;
    const isMatchingSchool = selectedSchool === "all" || ((_a = record.school_id) == null ? void 0 : _a.toString()) === selectedSchool;
    const isMatchingClass = selectedClass === "all" || ((_b = record.class_id) == null ? void 0 : _b.toString()) === selectedClass;
    return isInDateRange && isMatchingSchool && isMatchingClass;
  }).reduce((acc, record) => {
    const date = format(new Date(record.date), "MMM dd");
    const existingDateIndex = acc.findIndex((item) => item.date === date);
    if (existingDateIndex >= 0) {
      acc[existingDateIndex].present += record.present_count || 0;
      acc[existingDateIndex].absent += record.absent_count || 0;
      acc[existingDateIndex].late += record.late_count || 0;
      acc[existingDateIndex].total += record.total_count || 0;
    } else {
      acc.push({
        date,
        rawDate: new Date(record.date),
        present: record.present_count || 0,
        absent: record.absent_count || 0,
        late: record.late_count || 0,
        total: record.total_count || 0
      });
    }
    return acc;
  }, []).sort((a, b) => a.rawDate - b.rawDate);
  const onDateRangeChange = (range) => {
    if (range.from) {
      if (!range.to) {
        const thirtyDaysLater = addDays(range.from, 30);
        const today = /* @__PURE__ */ new Date();
        const limitedTo = thirtyDaysLater > today ? today : thirtyDaysLater;
        setDateRange({ ...range, to: limitedTo });
      } else {
        setDateRange(range);
      }
    } else {
      setDateRange(range);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: "Dashboard" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-end md:flex-row gap-4 mt-4", children: [
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: selectedSchool,
            onValueChange: (value) => {
              setSelectedSchool(value);
              if (value !== selectedSchool) {
                setSelectedClass("all");
              }
            },
            defaultValue: "all",
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a school" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Schools" }),
                Array.isArray(schools) && schools.map((school) => /* @__PURE__ */ jsxs(
                  SelectItem,
                  {
                    value: school.id ? school.id.toString() : "",
                    children: [
                      school.name,
                      " (",
                      school.class_count || 0,
                      " classes)"
                    ]
                  },
                  school.id
                ))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: selectedClass,
            onValueChange: setSelectedClass,
            defaultValue: "all",
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a class" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Classes" }),
                Array.isArray(filteredClasses) && filteredClasses.map((cls) => /* @__PURE__ */ jsx(
                  SelectItem,
                  {
                    value: cls.id ? cls.id.toString() : "",
                    children: cls.name
                  },
                  cls.id
                ))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "w-full ", children: /* @__PURE__ */ jsxs(Popover, { children: [
          /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
            Button,
            {
              id: "date",
              variant: "outline",
              className: "w-full justify-start text-left font-normal",
              children: [
                /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                dateRange.from ? dateRange.to ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  format(dateRange.from, "LLL dd, y"),
                  " -",
                  " ",
                  format(dateRange.to, "LLL dd, y")
                ] }) : format(dateRange.from, "LLL dd, y") : /* @__PURE__ */ jsx("span", { children: "Pick a date range" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
            Calendar,
            {
              initialFocus: true,
              mode: "range",
              defaultMonth: dateRange.from,
              selected: dateRange,
              onSelect: onDateRangeChange,
              numberOfMonths: 2,
              disabled: (date) => date > /* @__PURE__ */ new Date()
            }
          ) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "mt-8 mb-4 text-xl font-semibold", children: "Parent's Feedback" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Academic Feedback" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold", children: [
            calculateAverageRating("academic").toFixed(1),
            "/5.0"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            getFeedbackCount("academic"),
            " ratings from parents"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Behavioral Feedback" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold", children: [
            calculateAverageRating("behavioral").toFixed(1),
            "/5.0"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            getFeedbackCount("behavioral"),
            " ratings from parents"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Overall Satisfaction" }) }),
        /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold", children: [
            calculateAverageRating("satisfaction").toFixed(1),
            "/5.0"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            getFeedbackCount("satisfaction"),
            " ratings from parents"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "mt-8 mb-4 text-xl font-semibold", children: "Student's Attendance" }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsx("div", { style: { width: "100%", height: 400 }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
        LineChart,
        {
          data: chartData,
          margin: {
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          },
          children: [
            /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3" }),
            /* @__PURE__ */ jsx(XAxis, { dataKey: "date" }),
            /* @__PURE__ */ jsx(YAxis, {}),
            /* @__PURE__ */ jsx(Tooltip$1, {}),
            /* @__PURE__ */ jsx(Legend, {}),
            /* @__PURE__ */ jsx(
              Line,
              {
                type: "monotone",
                dataKey: "present",
                stroke: "#10b981",
                activeDot: { r: 8 },
                strokeWidth: 2,
                name: "Present"
              }
            ),
            /* @__PURE__ */ jsx(
              Line,
              {
                type: "monotone",
                dataKey: "absent",
                stroke: "#ef4444",
                strokeWidth: 2,
                name: "Absent"
              }
            ),
            /* @__PURE__ */ jsx(
              Line,
              {
                type: "monotone",
                dataKey: "late",
                stroke: "#f59e0b",
                strokeWidth: 2,
                name: "Late"
              }
            )
          ]
        }
      ) }) }),
      chartData.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground py-4", children: "No attendance data available for the selected criteria. Please adjust your filters." })
    ] }) })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard,
  loader: loader$f
}, Symbol.toStringTag, { value: "Module" }));
function Textarea({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(
            SheetPrimitive.Close,
            {
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx(
      AlertDialogPrimitive.Content,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { className: cn(buttonVariants(), className), ...props });
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function Table({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: /* @__PURE__ */ jsx(
    "table",
    {
      "data-slot": "table",
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }
  ) });
}
function TableHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
async function loader$e() {
  const [users] = await query(`SELECT id, name FROM users WHERE role_id = ?`, [
    2
  ]);
  const [schools] = await query(
    `SELECT s.*, u.name as user_name FROM schools s JOIN users u ON s.users_id = u.id`
  );
  return {
    users,
    schools
  };
}
async function action$c({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  try {
    if (action2 === "create") {
      const name = formData.get("name");
      const address = formData.get("address");
      const users_id = formData.get("users_id");
      const [existingSchool] = await query(
        `SELECT id FROM schools WHERE users_id = ?`,
        [users_id]
      );
      if (existingSchool && existingSchool.length > 0) {
        return {
          success: false,
          message: "This user already has a school associated with them. One user can only have one school."
        };
      }
      await query(
        `INSERT INTO schools (name, address, users_id) VALUES (?, ?, ?)`,
        [name, address, users_id]
      );
      return { success: true, message: "School created successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const name = formData.get("name");
      const address = formData.get("address");
      const users_id = formData.get("users_id");
      const [existingSchool] = await query(
        `SELECT id FROM schools WHERE users_id = ? AND id != ?`,
        [users_id, id]
      );
      if (existingSchool && existingSchool.length > 0) {
        return {
          success: false,
          message: "This user already has another school associated with them. One user can only have one school."
        };
      }
      await query(
        `UPDATE schools SET name = ?, address = ?, users_id = ? WHERE id = ?`,
        [name, address, users_id, id]
      );
      return { success: true, message: "School updated successfully" };
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      await query(`DELETE FROM schools WHERE id = ?`, [id]);
      return { success: true, message: "School deleted successfully" };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred"
    };
  }
}
function School() {
  var _a, _b, _c;
  const { schools, users } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
        setOpenDialog(false);
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData]);
  const handleCreateSchool = () => {
    setDialogType("create");
    setSelectedSchool(null);
    setOpenDialog(true);
  };
  const handleEditSchool = (school) => {
    setDialogType("update");
    setSelectedSchool(school);
    setOpenDialog(true);
  };
  const openDeleteDialog = (school) => {
    setSchoolToDelete(school);
    setDeleteDialogOpen(true);
  };
  const handleDeleteSchool = () => {
    const formData = new FormData();
    formData.append("_action", "delete");
    formData.append("id", schoolToDelete.id);
    submit(formData, { method: "post" });
    setDeleteDialogOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("_action", dialogType);
    if (dialogType === "update" && selectedSchool) {
      formData.append("id", selectedSchool.id);
    }
    submit(formData, { method: "post" });
  };
  const columns = [
    {
      accessorKey: "name",
      header: "School Name",
      cell: ({ row }) => row.getValue("name")
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => row.getValue("address")
    },
    {
      accessorKey: "user_name",
      header: "Associated User",
      cell: ({ row }) => row.getValue("user_name")
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleDateString()
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleEditSchool(row.original),
            children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => openDeleteDialog(row.original),
            children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
          }
        )
      ] })
    }
  ];
  const table = useReactTable({
    data: schools,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10
      }
    }
  });
  const dialogTitle = dialogType === "create" ? "Create New School" : "Edit School";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Manage Schools" }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleCreateSchool, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Add School" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No schools found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Fill out the form below to create a new school." : "Update the school information." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "School Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                name: "name",
                placeholder: "Enter school name",
                defaultValue: (selectedSchool == null ? void 0 : selectedSchool.name) || "",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "address", children: "Address" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "address",
                name: "address",
                placeholder: "Enter school address",
                defaultValue: (selectedSchool == null ? void 0 : selectedSchool.address) || "",
                rows: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "users_id", children: "Associated User" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                name: "users_id",
                defaultValue: ((_b = selectedSchool == null ? void 0 : selectedSchool.users_id) == null ? void 0 : _b.toString()) || ((_c = users[0]) == null ? void 0 : _c.id.toString()),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a user" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: users.map((user) => /* @__PURE__ */ jsx(SelectItem, { value: user.id.toString(), children: user.name }, user.id)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setOpenDialog(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: dialogType === "create" ? "Create School" : "Update School" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete School" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete school "',
          schoolToDelete == null ? void 0 : schoolToDelete.name,
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteSchool,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$c,
  default: School,
  loader: loader$e
}, Symbol.toStringTag, { value: "Module" }));
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
async function loader$d() {
  const [teachers] = await query(
    `SELECT id, name, email, created_at FROM users WHERE role_id = ?`,
    [4]
  );
  const [classes] = await query(
    `SELECT id, name 
     FROM classes 
     ORDER BY name`
  );
  const [subjects] = await query(
    `SELECT s.id, s.name, sc.class_id, c.name AS class_name
     FROM subjects s
     JOIN subject_classes sc ON s.id = sc.subject_id
     JOIN classes c ON sc.class_id = c.id
     ORDER BY c.name, s.name`
  );
  const [assignments] = await query(
    `SELECT ta.id, ta.teacher_id, ta.subject_id, ta.class_id, 
            s.name as subject_name, 
            c.name as class_name
     FROM teacher_assignments ta
     JOIN subjects s ON ta.subject_id = s.id
     JOIN classes c ON ta.class_id = c.id
     ORDER BY ta.teacher_id, c.name, s.name`
  );
  const teacherAssignments = {};
  assignments.forEach((a) => {
    if (!teacherAssignments[a.teacher_id]) {
      teacherAssignments[a.teacher_id] = [];
    }
    teacherAssignments[a.teacher_id].push({
      id: a.id,
      subject_id: a.subject_id,
      subject_name: a.subject_name,
      class_id: a.class_id,
      class_name: a.class_name
    });
  });
  return { teachers, classes, subjects, teacherAssignments };
}
async function action$b({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  try {
    if (action2 === "create") {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const [existing] = await query(`SELECT id FROM users WHERE email = ?`, [
        email
      ]);
      if (existing.length > 0) {
        return {
          success: false,
          message: "A user with this email already exists. Please use a different email."
        };
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      await query(
        `INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, 4)`,
        [name, email, passwordHash]
      );
      return { success: true, message: "Teacher created successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const [existing] = await query(
        `SELECT id FROM users WHERE email = ? AND id != ?`,
        [email, id]
      );
      if (existing.length > 0) {
        return {
          success: false,
          message: "A user with this email already exists. Please use a different email."
        };
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        await query(
          `UPDATE users SET name = ?, email = ?, password_hash = ? WHERE id = ?`,
          [name, email, passwordHash, id]
        );
      } else {
        await query(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [
          name,
          email,
          id
        ]);
      }
      return { success: true, message: "Teacher updated successfully" };
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      await query(`DELETE FROM teacher_assignments WHERE teacher_id = ?`, [id]);
      await query(`DELETE FROM users WHERE id = ?`, [id]);
      return { success: true, message: "Teacher deleted successfully" };
    }
    if (action2 === "assign_subject") {
      const teacher_id = formData.get("teacher_id");
      const subject_id = formData.get("subject_id");
      const class_id = formData.get("class_id");
      if (!teacher_id || !subject_id || !class_id) {
        return {
          success: false,
          message: "Teacher, subject, and class are all required."
        };
      }
      const [existing] = await query(
        `SELECT id FROM teacher_assignments WHERE teacher_id = ? AND subject_id = ? AND class_id = ?`,
        [teacher_id, subject_id, class_id]
      );
      if (existing.length > 0) {
        return {
          success: false,
          message: "This subject is already assigned to this teacher for this class."
        };
      }
      await query(
        `INSERT INTO teacher_assignments (teacher_id, subject_id, class_id) VALUES (?, ?, ?)`,
        [teacher_id, subject_id, class_id]
      );
      return { success: true, message: "Subject assigned successfully" };
    }
    if (action2 === "remove_assignment") {
      const assignment_id = formData.get("assignment_id");
      await query(`DELETE FROM teacher_assignments WHERE id = ?`, [
        assignment_id
      ]);
      return {
        success: true,
        message: "Subject assignment removed successfully"
      };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An error occurred"
    };
  }
}
function Teacher() {
  var _a;
  const { teachers, classes, subjects, teacherAssignments } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
        setOpenDialog(false);
        setAssignDialogOpen(false);
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData]);
  useEffect(() => {
    if (selectedClassId) {
      const filtered = subjects.filter(
        (subject) => subject.class_id && subject.class_id.toString() === selectedClassId
      );
      setFilteredSubjects(filtered);
    } else {
      setFilteredSubjects([]);
    }
  }, [selectedClassId, subjects]);
  const handleClassChange = (value) => {
    setSelectedClassId(value);
    const form = document.getElementById("assignSubjectForm");
    if (form) {
      const subjectSelect = form.elements["subject_id"];
      if (subjectSelect) {
        subjectSelect.value = "";
      }
    }
  };
  const handleCreateTeacher = () => {
    setDialogType("create");
    setSelectedTeacher(null);
    setOpenDialog(true);
  };
  const handleEditTeacher = (teacher) => {
    setDialogType("update");
    setSelectedTeacher(teacher);
    setOpenDialog(true);
  };
  const openDeleteDialog = (teacher) => {
    setTeacherToDelete(teacher);
    setDeleteDialogOpen(true);
  };
  const handleDeleteTeacher = () => {
    const formData = new FormData();
    formData.append("_action", "delete");
    formData.append("id", teacherToDelete.id);
    submit(formData, { method: "post" });
    setDeleteDialogOpen(false);
  };
  const handleAssignSubject = (teacherId) => {
    setCurrentTeacherId(teacherId);
    setSelectedClassId("");
    setAssignDialogOpen(true);
  };
  const handleRemoveAssignment = (assignmentId) => {
    const formData = new FormData();
    formData.append("_action", "remove_assignment");
    formData.append("assignment_id", assignmentId);
    submit(formData, { method: "post" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("_action", dialogType);
    if (dialogType === "update" && selectedTeacher) {
      formData.append("id", selectedTeacher.id);
    }
    submit(formData, { method: "post" });
  };
  const submitAssign = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("_action", "assign_subject");
    formData.append("teacher_id", currentTeacherId);
    formData.append("class_id", selectedClassId);
    submit(formData, { method: "post" });
  };
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.name })
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.email })
    },
    {
      id: "subjects",
      header: "Assigned Subjects",
      cell: ({ row }) => {
        const id = row.original.id;
        const assigned = teacherAssignments[id] || [];
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 justify-center", children: [
          assigned.length > 0 ? assigned.map((a) => /* @__PURE__ */ jsxs(
            Badge,
            {
              variant: "secondary",
              className: "flex items-center gap-1",
              children: [
                a.subject_name,
                " (Class ",
                a.class_name,
                ")",
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "ml-1 text-xs hover:text-destructive",
                    onClick: () => handleRemoveAssignment(a.id),
                    children: "×"
                  }
                )
              ]
            },
            a.id
          )) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "No subjects assigned" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => handleAssignSubject(id),
              className: "mt-1 h-6",
              children: /* @__PURE__ */ jsx(PlusIcon, { className: "h-3 w-3" })
            }
          )
        ] });
      }
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: new Date(row.original.created_at).toLocaleDateString() })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleEditTeacher(row.original),
            children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => openDeleteDialog(row.original),
            children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
          }
        )
      ] })
    }
  ];
  const table = useReactTable({
    data: teachers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 }
    }
  });
  const dialogTitle = dialogType === "create" ? "Create New Teacher" : "Edit Teacher";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Manage Teachers" }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleCreateTeacher, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Add Teacher" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No teachers found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Fill out the form below to create a new teacher account." : "Update the teacher information." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                name: "name",
                placeholder: "Enter full name",
                defaultValue: (selectedTeacher == null ? void 0 : selectedTeacher.name) || "",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                name: "email",
                type: "email",
                placeholder: "Enter email address",
                defaultValue: (selectedTeacher == null ? void 0 : selectedTeacher.email) || "",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "password", children: dialogType === "create" ? "Password" : "New Password (leave blank to keep current)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                name: "password",
                type: "password",
                placeholder: dialogType === "create" ? "Enter password" : "Enter new password or leave blank",
                required: dialogType === "create"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setOpenDialog(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: dialogType === "create" ? "Create Teacher" : "Update Teacher" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Teacher" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete teacher "',
          teacherToDelete == null ? void 0 : teacherToDelete.name,
          '"? This will also remove all subject assignments for this teacher. This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteTeacher,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: assignDialogOpen, onOpenChange: setAssignDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Assign Subject" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Select a subject to assign to this teacher." })
      ] }),
      /* @__PURE__ */ jsxs("form", { id: "assignSubjectForm", onSubmit: submitAssign, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "class_id", children: "Class" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: selectedClassId,
                onValueChange: handleClassChange,
                required: true,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a class" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: classes.map((cls) => /* @__PURE__ */ jsxs(SelectItem, { value: cls.id.toString(), children: [
                    "Class ",
                    cls.name
                  ] }, cls.id)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "subject_id", children: "Subject" }),
            /* @__PURE__ */ jsxs(Select, { name: "subject_id", disabled: !selectedClassId, required: true, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(
                SelectValue,
                {
                  placeholder: selectedClassId ? "Select a subject" : "Select a class first"
                }
              ) }),
              /* @__PURE__ */ jsx(SelectContent, { children: filteredSubjects.map((subj) => /* @__PURE__ */ jsx(SelectItem, { value: subj.id.toString(), children: subj.name }, subj.id)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setAssignDialogOpen(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: !selectedClassId, children: "Assign Subject" })
        ] })
      ] })
    ] }) })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$b,
  default: Teacher,
  loader: loader$d
}, Symbol.toStringTag, { value: "Module" }));
const getStatusBadge$2 = (status) => {
  const statusConfig = {
    scheduled: { color: "bg-blue-100 text-blue-800", icon: Clock, text: "Scheduled" },
    live: { color: "bg-red-100 text-red-800", icon: Play, text: "Live Now" },
    completed: { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "Completed" },
    cancelled: { color: "bg-gray-100 text-gray-800", icon: Clock, text: "Cancelled" }
  };
  const config = statusConfig[status] || statusConfig.scheduled;
  const Icon = config.icon;
  return /* @__PURE__ */ jsxs(Badge, { className: `${config.color} flex items-center gap-1`, children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-3 w-3" }),
    config.text
  ] });
};
async function loader$c({ request }) {
  var _a;
  const user = await getUser(request);
  if (!user) return redirect$1("/login");
  const authorizedRoles = ["super_admin", "school_admin", "teacher"];
  if (!authorizedRoles.includes(user.role_name)) {
    throw new Response("Access denied", { status: 403 });
  }
  let classes = [];
  let subjects = [];
  let teachers = [];
  let liveClasses = [];
  let schools = [];
  if (user.role_name === "super_admin") {
    const [schoolsResult] = await query("SELECT * FROM schools ORDER BY name");
    const [classesResult] = await query("SELECT * FROM classes ORDER BY name");
    const [subjectsResult] = await query("SELECT * FROM subjects ORDER BY name");
    const [teachersResult] = await query(
      "SELECT id, name FROM users WHERE role_id = 4 ORDER BY name"
    );
    const [liveClassesResult] = await query(`
      SELECT lc.*, s.name as subject_name, c.name as class_name, u.name as teacher_name, sch.name as school_name
      FROM live_classes lc
      LEFT JOIN subjects s ON lc.subject_id = s.id
      JOIN classes c ON lc.class_id = c.id
      JOIN users u ON lc.teacher_id = u.id
      JOIN schools sch ON lc.school_id = sch.id
      ORDER BY lc.created_at DESC
    `);
    schools = schoolsResult;
    classes = classesResult;
    subjects = subjectsResult;
    teachers = teachersResult;
    liveClasses = liveClassesResult;
  } else if (user.role_name === "school_admin") {
    const [schoolsResult] = await query("SELECT * FROM schools WHERE users_id = ?", [user.id]);
    const schoolId = (_a = schoolsResult[0]) == null ? void 0 : _a.id;
    if (schoolId) {
      const [classesResult] = await query("SELECT * FROM classes ORDER BY name");
      const [subjectsResult] = await query("SELECT * FROM subjects ORDER BY name");
      const [teachersResult] = await query(
        "SELECT id, name FROM users WHERE role_id = 4 ORDER BY name"
      );
      const [liveClassesResult] = await query(`
        SELECT lc.*, s.name as subject_name, c.name as class_name, u.name as teacher_name, sch.name as school_name
        FROM live_classes lc
        LEFT JOIN subjects s ON lc.subject_id = s.id
        JOIN classes c ON lc.class_id = c.id
        JOIN users u ON lc.teacher_id = u.id
        JOIN schools sch ON lc.school_id = sch.id
        WHERE lc.school_id = ?
        ORDER BY lc.created_at DESC
      `, [schoolId]);
      schools = schoolsResult;
      classes = classesResult;
      subjects = subjectsResult;
      teachers = teachersResult;
      liveClasses = liveClassesResult;
    }
  } else if (user.role_name === "teacher") {
    const [classesResult] = await query(`
      SELECT DISTINCT c.id, c.name
      FROM classes c
      JOIN teacher_assignments ta ON c.id = ta.class_id
      WHERE ta.teacher_id = ?
      ORDER BY c.name
    `, [user.id]);
    const [subjectsResult] = await query(`
      SELECT DISTINCT s.id, s.name
      FROM subjects s
      JOIN teacher_assignments ta ON s.id = ta.subject_id
      WHERE ta.teacher_id = ?
      ORDER BY s.name
    `, [user.id]);
    const [liveClassesResult] = await query(`
      SELECT lc.*, s.name as subject_name, c.name as class_name, u.name as teacher_name, sch.name as school_name
      FROM live_classes lc
      LEFT JOIN subjects s ON lc.subject_id = s.id
      JOIN classes c ON lc.class_id = c.id
      JOIN users u ON lc.teacher_id = u.id
      JOIN schools sch ON lc.school_id = sch.id
      WHERE lc.teacher_id = ?
      ORDER BY lc.created_at DESC
    `, [user.id]);
    classes = classesResult;
    subjects = subjectsResult;
    teachers = [{ id: user.id, name: user.name }];
    liveClasses = liveClassesResult;
  }
  return { classes, subjects, teachers, liveClasses, schools, user };
}
async function action$a({ request }) {
  const user = await getUser(request);
  if (!user) return redirect$1("/login");
  const formData = await request.formData();
  const intent = formData.get("intent");
  try {
    if (intent === "create") {
      const title = formData.get("title");
      const youtube_live_link = formData.get("youtube_live_link");
      const session_type = formData.get("session_type");
      const topic_name = formData.get("topic_name");
      const subject_id = formData.get("subject_id") || null;
      const class_id = formData.get("class_id");
      const teacher_id = formData.get("teacher_id") || user.id;
      const school_id = formData.get("school_id");
      const start_time = formData.get("start_time");
      const end_time = formData.get("end_time");
      if (!start_time || !end_time) {
        return {
          success: false,
          message: "Start Time and End Time are mandatory fields"
        };
      }
      const status = formData.get("status") || "scheduled";
      let created_by_role = "teacher";
      if (user.role_name === "super_admin") created_by_role = "super_admin";
      else if (user.role_name === "school_admin") created_by_role = "school_admin";
      if (school_id === "all" && user.role_name === "super_admin") {
        const [allSchools] = await query("SELECT id FROM schools");
        for (const school of allSchools) {
          await query(
            `INSERT INTO live_classes (title, youtube_live_link, session_type, topic_name, subject_id, class_id, teacher_id, school_id, start_time, end_time, status, created_by_role)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              title,
              youtube_live_link,
              session_type,
              topic_name,
              subject_id,
              class_id,
              teacher_id,
              school.id,
              start_time,
              end_time,
              status,
              created_by_role
            ]
          );
        }
      } else {
        await query(
          `INSERT INTO live_classes (title, youtube_live_link, session_type, topic_name, subject_id, class_id, teacher_id, school_id, start_time, end_time, status, created_by_role)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            title,
            youtube_live_link,
            session_type,
            topic_name,
            subject_id,
            class_id,
            teacher_id,
            school_id,
            start_time,
            end_time,
            status,
            created_by_role
          ]
        );
      }
      return {
        success: true,
        message: school_id === "all" ? "Live class created for all schools successfully" : "Live class created successfully"
      };
    } else if (intent === "update") {
      const id = formData.get("id");
      const title = formData.get("title");
      const youtube_live_link = formData.get("youtube_live_link");
      const session_type = formData.get("session_type");
      const topic_name = formData.get("topic_name");
      const subject_id = formData.get("subject_id") || null;
      const class_id = formData.get("class_id");
      const start_time = formData.get("start_time");
      const end_time = formData.get("end_time");
      if (!start_time || !end_time) {
        return {
          success: false,
          message: "Start Time and End Time are mandatory fields"
        };
      }
      const status = formData.get("status");
      await query(
        `UPDATE live_classes
         SET title = ?, youtube_live_link = ?, session_type = ?, topic_name = ?, subject_id = ?, class_id = ?, start_time = ?, end_time = ?, status = ?
         WHERE id = ?`,
        [
          title,
          youtube_live_link,
          session_type,
          topic_name,
          subject_id,
          class_id,
          start_time,
          end_time,
          status,
          id
        ]
      );
      return {
        success: true,
        message: "Live class updated successfully"
      };
    } else if (intent === "delete") {
      const id = formData.get("id");
      await query("DELETE FROM live_classes WHERE id = ?", [id]);
      return {
        success: true,
        message: "Live class deleted successfully"
      };
    }
  } catch (error) {
    console.error("Live class action error:", error);
    return {
      success: false,
      message: "An error occurred while processing your request"
    };
  }
  return null;
}
function LiveClass() {
  var _a;
  const { classes, subjects, teachers, liveClasses, schools, user } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedClass, setSelectedClass] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [sessionType, setSessionType] = useState("subject_specific");
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    teacher: "all",
    class: "all"
  });
  useEffect(() => {
    if (actionData == null ? void 0 : actionData.success) {
      toast.success(actionData.message);
      setDialogOpen(false);
      setSelectedClass(null);
    } else if ((actionData == null ? void 0 : actionData.success) === false) {
      toast.error(actionData.message);
    }
  }, [actionData]);
  const handleCreate = () => {
    setDialogType("create");
    setSelectedClass(null);
    setSessionType("subject_specific");
    setDialogOpen(true);
  };
  const handleEdit = (liveClass) => {
    setDialogType("update");
    setSelectedClass(liveClass);
    setSessionType(liveClass.session_type);
    setDialogOpen(true);
  };
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center font-medium", children: row.original.title })
    },
    {
      accessorKey: "session_type",
      header: "Type",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Badge, { variant: row.original.session_type === "subject_specific" ? "default" : "secondary", children: row.original.session_type === "subject_specific" ? "Subject" : "Other Topic" }) })
    },
    {
      accessorKey: "topic_name",
      header: "Topic",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.topic_name })
    },
    {
      accessorKey: "subject_name",
      header: "Subject",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.subject_name || "N/A" })
    },
    {
      accessorKey: "class_name",
      header: "Class",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.class_name })
    },
    {
      accessorKey: "teacher_name",
      header: "Teacher",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.teacher_name })
    },
    {
      accessorKey: "start_time",
      header: "Start Time",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.start_time ? new Date(row.original.start_time).toLocaleString() : "Not scheduled" })
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: getStatusBadge$2(row.original.status) })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleEdit(row.original),
            children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxs(AlertDialog, { children: [
          /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setToDelete(row.original),
              children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
            /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
              /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Live Class" }),
              /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
                'Are you sure you want to delete "',
                toDelete == null ? void 0 : toDelete.title,
                '"? This action cannot be undone.'
              ] })
            ] }),
            /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
              /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
              /* @__PURE__ */ jsxs(Form, { method: "post", children: [
                /* @__PURE__ */ jsx("input", { type: "hidden", name: "intent", value: "delete" }),
                /* @__PURE__ */ jsx("input", { type: "hidden", name: "id", value: toDelete == null ? void 0 : toDelete.id }),
                /* @__PURE__ */ jsx(AlertDialogAction, { type: "submit", children: "Delete" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => window.open(row.original.youtube_live_link, "_blank"),
            title: "Open YouTube Live",
            children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" })
          }
        )
      ] })
    }
  ];
  const filteredLiveClasses = liveClasses.filter((lc) => {
    var _a2, _b, _c;
    const matchesSearch = !filters.search || lc.title.toLowerCase().includes(filters.search.toLowerCase()) || ((_a2 = lc.topic_name) == null ? void 0 : _a2.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesStatus = filters.status === "all" || lc.status === filters.status;
    const matchesTeacher = filters.teacher === "all" || ((_b = lc.teacher_id) == null ? void 0 : _b.toString()) === filters.teacher;
    const matchesClass = filters.class === "all" || ((_c = lc.class_id) == null ? void 0 : _c.toString()) === filters.class;
    return matchesSearch && matchesStatus && matchesTeacher && matchesClass;
  });
  const table = useReactTable({
    data: filteredLiveClasses,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto p-6", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-bold", children: "Live Classes" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Manage YouTube Live lecture sessions for students" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: handleCreate, children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          "Add Live Session"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search classes...",
              value: filters.search,
              onChange: (e) => setFilters((prev) => ({ ...prev, search: e.target.value })),
              className: "pl-8"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.status, onValueChange: (value) => setFilters((prev) => ({ ...prev, status: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Status" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Status" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "scheduled", children: "Scheduled" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "live", children: "Live" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "completed", children: "Completed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.teacher, onValueChange: (value) => setFilters((prev) => ({ ...prev, teacher: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Teacher" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Teachers" }),
            teachers.map((teacher) => /* @__PURE__ */ jsx(SelectItem, { value: teacher.id.toString(), children: teacher.name }, teacher.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.class, onValueChange: (value) => setFilters((prev) => ({ ...prev, class: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Class" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Classes" }),
            classes.map((cls) => /* @__PURE__ */ jsx(SelectItem, { value: cls.id.toString(), children: cls.name }, cls.id))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { style: { display: "none" } }) }),
      /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsxs(DialogHeader, { children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: dialogType === "create" ? "Create New Live Session" : "Edit Live Session" }),
          /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Add a new YouTube Live lecture session for students." : "Update the live session information." })
        ] }),
        /* @__PURE__ */ jsxs(Form, { method: "post", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "hidden",
              name: "intent",
              value: dialogType === "create" ? "create" : "update"
            }
          ),
          dialogType === "update" && /* @__PURE__ */ jsx("input", { type: "hidden", name: "id", value: selectedClass == null ? void 0 : selectedClass.id }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Session Title *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "title",
                  name: "title",
                  placeholder: "e.g., Mathematics Live Session",
                  required: true,
                  defaultValue: (selectedClass == null ? void 0 : selectedClass.title) || ""
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "youtube_live_link", children: "YouTube Live Link *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "youtube_live_link",
                  name: "youtube_live_link",
                  type: "url",
                  placeholder: "https://www.youtube.com/watch?v=...",
                  required: true,
                  defaultValue: (selectedClass == null ? void 0 : selectedClass.youtube_live_link) || ""
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "session_type", children: "Session Type *" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  name: "session_type",
                  value: sessionType,
                  onValueChange: setSessionType,
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select session type" }) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "subject_specific", children: "Subject-Specific Session" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "other_topic", children: "Other Topic Session" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "topic_name", children: "Topic Name *" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "topic_name",
                  name: "topic_name",
                  placeholder: "e.g., Algebra Basics, Career Guidance",
                  required: true,
                  defaultValue: (selectedClass == null ? void 0 : selectedClass.topic_name) || ""
                }
              )
            ] }),
            sessionType === "subject_specific" && /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "subject_id", children: "Subject" }),
              /* @__PURE__ */ jsxs(Select, { name: "subject_id", children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select subject" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: subjects.map((sub) => /* @__PURE__ */ jsx(SelectItem, { value: sub.id.toString(), children: sub.name }, sub.id)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "class_id", children: "Class *" }),
              /* @__PURE__ */ jsxs(Select, { name: "class_id", required: true, children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select class" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: classes.map((cls) => /* @__PURE__ */ jsx(SelectItem, { value: cls.id.toString(), children: cls.name }, cls.id)) })
              ] })
            ] }),
            user.role_name !== "teacher" && /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "teacher_id", children: "Teacher *" }),
              /* @__PURE__ */ jsxs(Select, { name: "teacher_id", required: true, children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select teacher" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: teachers.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t.id.toString(), children: t.name }, t.id)) })
              ] })
            ] }),
            (user.role_name === "super_admin" || user.role_name === "school_admin") && /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "school_id", children: "School *" }),
              /* @__PURE__ */ jsxs(Select, { name: "school_id", required: true, children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select school" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  user.role_name === "super_admin" && /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Schools" }),
                  schools.map((school) => /* @__PURE__ */ jsx(SelectItem, { value: school.id.toString(), children: school.name }, school.id))
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "start_time", children: "Start Time *" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "start_time",
                    name: "start_time",
                    type: "datetime-local",
                    required: true,
                    defaultValue: (selectedClass == null ? void 0 : selectedClass.start_time) ? new Date(selectedClass.start_time).toISOString().slice(0, 16) : ""
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "end_time", children: "End Time *" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "end_time",
                    name: "end_time",
                    type: "datetime-local",
                    required: true,
                    defaultValue: (selectedClass == null ? void 0 : selectedClass.end_time) ? new Date(selectedClass.end_time).toISOString().slice(0, 16) : ""
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Status *" }),
              /* @__PURE__ */ jsxs(Select, { name: "status", required: true, children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select status" }) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "scheduled", children: "Scheduled" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "live", children: "Live Now" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "completed", children: "Completed" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "cancelled", children: "Cancelled" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setDialogOpen(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting ? "Saving..." : dialogType === "create" ? "Create Session" : "Update Session" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: ((_a = table.getRowModel().rows) == null ? void 0 : _a.length) ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No live sessions found."
        }
      ) }) })
    ] }) }) })
  ] }) });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$a,
  default: LiveClass,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const getStatusBadge$1 = (status) => {
  const statusConfig = {
    upcoming: { color: "bg-blue-100 text-blue-800", icon: Clock, text: "Upcoming" },
    live: { color: "bg-red-100 text-red-800", icon: Play, text: "Live" },
    completed: { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "Completed" },
    cancelled: { color: "bg-gray-100 text-gray-800", icon: Clock, text: "Cancelled" }
  };
  const config = statusConfig[status] || statusConfig.upcoming;
  const Icon = config.icon;
  return /* @__PURE__ */ jsxs(Badge, { className: `${config.color} flex items-center gap-1`, children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-3 w-3" }),
    config.text
  ] });
};
const calculateStatus = (startTime, endTime) => {
  if (!startTime) return "upcoming";
  const now = /* @__PURE__ */ new Date();
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : null;
  if (now < start) return "upcoming";
  if (end && now > end) return "completed";
  if (now >= start && (!end || now <= end)) return "live";
  return "upcoming";
};
async function loader$b({ request }) {
  var _a;
  const user = await getUser(request);
  if (!user) return redirect$1("/login");
  const authorizedRoles = ["super_admin", "school_admin", "teacher"];
  if (!authorizedRoles.includes(user.role_name)) {
    throw new Response("Access denied", { status: 403 });
  }
  let classes = [];
  let subjects = [];
  let teachers = [];
  let liveClasses = [];
  let schools = [];
  if (user.role_name === "super_admin") {
    const [schoolsResult] = await query("SELECT * FROM schools ORDER BY name");
    const [classesResult] = await query("SELECT * FROM classes ORDER BY name");
    const [subjectsResult] = await query("SELECT * FROM subjects ORDER BY name");
    const [teachersResult] = await query(
      "SELECT id, name FROM users WHERE role_id = 4 ORDER BY name"
    );
    const [liveClassesResult] = await query(`
      SELECT 
        lc.*,
        s.name as subject_name,
        c.name as class_name,
        u.name as teacher_name,
        CASE 
          WHEN lc.is_all_schools = 1 THEN 'All Schools'
          ELSE sch.name 
        END as school_names,
        CASE 
          WHEN lc.is_all_schools = 1 THEN (SELECT COUNT(*) FROM schools)
          ELSE 1 
        END as school_count
      FROM live_classes lc
      LEFT JOIN subjects s ON lc.subject_id = s.id
      JOIN classes c ON lc.class_id = c.id
      JOIN users u ON lc.teacher_id = u.id
      LEFT JOIN schools sch ON lc.school_id = sch.id
      ORDER BY lc.created_at DESC
    `);
    schools = schoolsResult;
    classes = classesResult;
    subjects = subjectsResult;
    teachers = teachersResult;
    liveClasses = liveClassesResult;
  } else if (user.role_name === "school_admin") {
    const [schoolsResult] = await query("SELECT * FROM schools WHERE users_id = ?", [user.id]);
    const schoolId = (_a = schoolsResult[0]) == null ? void 0 : _a.id;
    if (schoolId) {
      const [classesResult] = await query("SELECT * FROM classes ORDER BY name");
      const [subjectsResult] = await query("SELECT * FROM subjects ORDER BY name");
      const [teachersResult] = await query(
        "SELECT id, name FROM users WHERE role_id = 4 ORDER BY name"
      );
      const [liveClassesResult] = await query(`
        SELECT lc.*, s.name as subject_name, c.name as class_name, u.name as teacher_name, sch.name as school_names
        FROM live_classes lc
        LEFT JOIN subjects s ON lc.subject_id = s.id
        JOIN classes c ON lc.class_id = c.id
        JOIN users u ON lc.teacher_id = u.id
        JOIN schools sch ON lc.school_id = sch.id
        WHERE lc.school_id = ?
        ORDER BY lc.created_at DESC
      `, [schoolId]);
      schools = schoolsResult;
      classes = classesResult;
      subjects = subjectsResult;
      teachers = teachersResult;
      liveClasses = liveClassesResult.map((lc) => ({ ...lc, school_count: 1, school_ids: schoolId.toString() }));
    }
  } else if (user.role_name === "teacher") {
    const [classesResult] = await query(`
      SELECT DISTINCT c.id, c.name
      FROM classes c
      JOIN teacher_assignments ta ON c.id = ta.class_id
      WHERE ta.teacher_id = ?
      ORDER BY c.name
    `, [user.id]);
    const [subjectsResult] = await query(`
      SELECT DISTINCT s.id, s.name
      FROM subjects s
      JOIN teacher_assignments ta ON s.id = ta.subject_id
      WHERE ta.teacher_id = ?
      ORDER BY s.name
    `, [user.id]);
    const [liveClassesResult] = await query(`
      SELECT lc.*, s.name as subject_name, c.name as class_name, u.name as teacher_name, sch.name as school_names
      FROM live_classes lc
      LEFT JOIN subjects s ON lc.subject_id = s.id
      JOIN classes c ON lc.class_id = c.id
      JOIN users u ON lc.teacher_id = u.id
      JOIN schools sch ON lc.school_id = sch.id
      WHERE lc.teacher_id = ?
      ORDER BY lc.created_at DESC
    `, [user.id]);
    classes = classesResult;
    subjects = subjectsResult;
    teachers = [{ id: user.id, name: user.name }];
    liveClasses = liveClassesResult.map((lc) => {
      var _a2;
      return { ...lc, school_count: 1, school_ids: (_a2 = lc.school_id) == null ? void 0 : _a2.toString() };
    });
  }
  return { classes, subjects, teachers, liveClasses, schools, user };
}
async function action$9({ request }) {
  const user = await getUser(request);
  if (!user) return redirect$1("/login");
  const formData = await request.formData();
  const intent = formData.get("intent");
  try {
    if (intent === "create") {
      const title = formData.get("title");
      const youtube_live_link = formData.get("youtube_live_link");
      const session_type = formData.get("session_type");
      const topic_name = formData.get("topic_name");
      const subject_id = formData.get("subject_id") || null;
      const class_id = formData.get("class_id");
      const teacher_id = formData.get("teacher_id") || user.id;
      const school_id = formData.get("school_id");
      const start_time = formData.get("start_time");
      const end_time = formData.get("end_time");
      if (!start_time || !end_time) {
        return {
          success: false,
          message: "Start Time and End Time are mandatory fields"
        };
      }
      const status = calculateStatus(start_time, end_time);
      let created_by_role = "teacher";
      if (user.role_name === "super_admin") created_by_role = "super_admin";
      else if (user.role_name === "school_admin") created_by_role = "school_admin";
      const is_all_schools = school_id === "all" && user.role_name === "super_admin";
      const final_school_id = is_all_schools ? null : school_id;
      await query(
        `INSERT INTO live_classes (title, youtube_live_link, session_type, topic_name, subject_id, class_id, teacher_id, school_id, is_all_schools, start_time, end_time, status, created_by_role)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, youtube_live_link, session_type, topic_name, subject_id, class_id, teacher_id, final_school_id, is_all_schools, start_time, end_time, status, created_by_role]
      );
      return {
        success: true,
        message: school_id === "all" ? "Live class created for all schools successfully" : "Live class created successfully"
      };
    } else if (intent === "update") {
      const id = formData.get("id");
      const title = formData.get("title");
      const youtube_live_link = formData.get("youtube_live_link");
      const session_type = formData.get("session_type");
      const topic_name = formData.get("topic_name");
      const subject_id = formData.get("subject_id") || null;
      const class_id = formData.get("class_id");
      const start_time = formData.get("start_time");
      const end_time = formData.get("end_time");
      if (!start_time || !end_time) {
        return {
          success: false,
          message: "Start Time and End Time are mandatory fields"
        };
      }
      const status = calculateStatus(start_time, end_time);
      await query(
        `UPDATE live_classes
         SET title = ?, youtube_live_link = ?, session_type = ?, topic_name = ?, subject_id = ?, class_id = ?, start_time = ?, end_time = ?, status = ?
         WHERE id = ?`,
        [title, youtube_live_link, session_type, topic_name, subject_id, class_id, start_time, end_time, status, id]
      );
      return {
        success: true,
        message: "Live class updated successfully"
      };
    } else if (intent === "delete") {
      const id = formData.get("id");
      await query("DELETE FROM live_classes WHERE id = ?", [id]);
      return {
        success: true,
        message: "Live class deleted successfully"
      };
    }
  } catch (error) {
    console.error("Live class action error:", error);
    return {
      success: false,
      message: "An error occurred while processing your request"
    };
  }
  return null;
}
function ManageLiveClasses() {
  var _a, _b, _c;
  const { classes, subjects, teachers, liveClasses, schools, user } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedClass, setSelectedClass] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [sessionType, setSessionType] = useState("subject_specific");
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    school: "all",
    teacher: "all",
    class: "all",
    date: "all"
  });
  useEffect(() => {
    if (actionData == null ? void 0 : actionData.success) {
      toast.success(actionData.message);
      setDialogOpen(false);
      setSelectedClass(null);
    } else if ((actionData == null ? void 0 : actionData.success) === false) {
      toast.error(actionData.message);
    }
  }, [actionData]);
  const liveClassesWithUpdatedStatus = liveClasses.map((lc) => ({
    ...lc,
    status: calculateStatus(lc.start_time, lc.end_time)
  }));
  const filteredLiveClasses = liveClassesWithUpdatedStatus.filter((lc) => {
    var _a2, _b2, _c2, _d;
    const matchesSearch = !filters.search || lc.title.toLowerCase().includes(filters.search.toLowerCase()) || ((_a2 = lc.topic_name) == null ? void 0 : _a2.toLowerCase().includes(filters.search.toLowerCase())) || ((_b2 = lc.teacher_name) == null ? void 0 : _b2.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesStatus = filters.status === "all" || lc.status === filters.status;
    const matchesSchool = filters.school === "all" || lc.school_ids && lc.school_ids.includes(filters.school);
    const matchesTeacher = filters.teacher === "all" || ((_c2 = lc.teacher_id) == null ? void 0 : _c2.toString()) === filters.teacher;
    const matchesClass = filters.class === "all" || ((_d = lc.class_id) == null ? void 0 : _d.toString()) === filters.class;
    const matchesDate = filters.date === "all" || (() => {
      if (!lc.start_time) return filters.date === "all";
      const classDate = new Date(lc.start_time).toDateString();
      const today = (/* @__PURE__ */ new Date()).toDateString();
      const tomorrow = new Date(Date.now() + 864e5).toDateString();
      switch (filters.date) {
        case "today":
          return classDate === today;
        case "tomorrow":
          return classDate === tomorrow;
        case "this_week": {
          const weekFromNow = new Date(Date.now() + 7 * 864e5);
          return new Date(lc.start_time) <= weekFromNow;
        }
        default:
          return true;
      }
    })();
    return matchesSearch && matchesStatus && matchesSchool && matchesTeacher && matchesClass && matchesDate;
  });
  const handleCreate = () => {
    setDialogType("create");
    setSelectedClass(null);
    setSessionType("subject_specific");
    setDialogOpen(true);
  };
  const handleEdit = (liveClass) => {
    setDialogType("update");
    setSelectedClass(liveClass);
    setSessionType(liveClass.session_type);
    setDialogOpen(true);
  };
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto p-6", children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl font-bold", children: "Manage Live Classes" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Efficiently manage YouTube Live lecture sessions with automatic status updates" })
        ] }),
        /* @__PURE__ */ jsxs(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: [
          /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { onClick: handleCreate, children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
            "Create Live Class"
          ] }) }),
          /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
            /* @__PURE__ */ jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsx(DialogTitle, { children: dialogType === "create" ? "Create New Live Class" : "Edit Live Class" }),
              /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Create a new live class session. Start Time and End Time are mandatory." : "Update the live class information. Start Time and End Time are mandatory." })
            ] }),
            /* @__PURE__ */ jsxs(Form, { method: "post", children: [
              /* @__PURE__ */ jsx("input", { type: "hidden", name: "intent", value: dialogType === "create" ? "create" : "update" }),
              dialogType === "update" && /* @__PURE__ */ jsx("input", { type: "hidden", name: "id", value: selectedClass == null ? void 0 : selectedClass.id }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Lecture Title *" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "title",
                      name: "title",
                      placeholder: "e.g., Mathematics Live Lecture",
                      required: true,
                      defaultValue: (selectedClass == null ? void 0 : selectedClass.title) || ""
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "youtube_live_link", children: "YouTube Live Link *" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "youtube_live_link",
                      name: "youtube_live_link",
                      type: "url",
                      placeholder: "https://www.youtube.com/watch?v=...",
                      required: true,
                      defaultValue: (selectedClass == null ? void 0 : selectedClass.youtube_live_link) || ""
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "session_type", children: "Session Type *" }),
                  /* @__PURE__ */ jsxs(Select, { name: "session_type", value: sessionType, onValueChange: setSessionType, required: true, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select session type" }) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsx(SelectItem, { value: "subject_specific", children: "Subject-Specific Session" }),
                      /* @__PURE__ */ jsx(SelectItem, { value: "other_topic", children: "Other Topic Session" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "topic_name", children: "Topic Name *" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "topic_name",
                      name: "topic_name",
                      placeholder: "e.g., Algebra Basics, Career Guidance",
                      required: true,
                      defaultValue: (selectedClass == null ? void 0 : selectedClass.topic_name) || ""
                    }
                  )
                ] }),
                sessionType === "subject_specific" && /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "subject_id", children: "Subject" }),
                  /* @__PURE__ */ jsxs(Select, { name: "subject_id", defaultValue: (_a = selectedClass == null ? void 0 : selectedClass.subject_id) == null ? void 0 : _a.toString(), children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select subject" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: subjects.map((sub) => /* @__PURE__ */ jsx(SelectItem, { value: sub.id.toString(), children: sub.name }, sub.id)) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "class_id", children: "Class *" }),
                  /* @__PURE__ */ jsxs(Select, { name: "class_id", required: true, defaultValue: (_b = selectedClass == null ? void 0 : selectedClass.class_id) == null ? void 0 : _b.toString(), children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select class" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: classes.map((cls) => /* @__PURE__ */ jsx(SelectItem, { value: cls.id.toString(), children: cls.name }, cls.id)) })
                  ] })
                ] }),
                user.role_name !== "teacher" && /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "teacher_id", children: "Teacher *" }),
                  /* @__PURE__ */ jsxs(Select, { name: "teacher_id", required: true, defaultValue: (_c = selectedClass == null ? void 0 : selectedClass.teacher_id) == null ? void 0 : _c.toString(), children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select teacher" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: teachers.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t.id.toString(), children: t.name }, t.id)) })
                  ] })
                ] }),
                (user.role_name === "super_admin" || user.role_name === "school_admin") && /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx(Label, { htmlFor: "school_id", children: "School *" }),
                  /* @__PURE__ */ jsxs(Select, { name: "school_id", required: true, children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select school" }) }),
                    /* @__PURE__ */ jsxs(SelectContent, { children: [
                      user.role_name === "super_admin" && /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Schools" }),
                      schools.map((school) => /* @__PURE__ */ jsx(SelectItem, { value: school.id.toString(), children: school.name }, school.id))
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "start_time", children: "Start Time *" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "start_time",
                        name: "start_time",
                        type: "datetime-local",
                        required: true,
                        defaultValue: (selectedClass == null ? void 0 : selectedClass.start_time) ? new Date(selectedClass.start_time).toISOString().slice(0, 16) : ""
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                    /* @__PURE__ */ jsx(Label, { htmlFor: "end_time", children: "End Time *" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "end_time",
                        name: "end_time",
                        type: "datetime-local",
                        required: true,
                        defaultValue: (selectedClass == null ? void 0 : selectedClass.end_time) ? new Date(selectedClass.end_time).toISOString().slice(0, 16) : ""
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
                /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => setDialogOpen(false), children: "Cancel" }),
                /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting ? "Saving..." : dialogType === "create" ? "Create Class" : "Update Class" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search classes...",
              value: filters.search,
              onChange: (e) => setFilters((prev) => ({ ...prev, search: e.target.value })),
              className: "pl-8"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.status, onValueChange: (value) => setFilters((prev) => ({ ...prev, status: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Status" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Status" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "upcoming", children: "Upcoming" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "live", children: "Live" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "completed", children: "Completed" })
          ] })
        ] }),
        user.role_name === "super_admin" && /* @__PURE__ */ jsxs(Select, { value: filters.school, onValueChange: (value) => setFilters((prev) => ({ ...prev, school: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "School" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Schools" }),
            schools.map((school) => /* @__PURE__ */ jsx(SelectItem, { value: school.id.toString(), children: school.name }, school.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.teacher, onValueChange: (value) => setFilters((prev) => ({ ...prev, teacher: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Teacher" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Teachers" }),
            teachers.map((teacher) => /* @__PURE__ */ jsx(SelectItem, { value: teacher.id.toString(), children: teacher.name }, teacher.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.class, onValueChange: (value) => setFilters((prev) => ({ ...prev, class: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Class" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Classes" }),
            classes.map((cls) => /* @__PURE__ */ jsx(SelectItem, { value: cls.id.toString(), children: cls.name }, cls.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.date, onValueChange: (value) => setFilters((prev) => ({ ...prev, date: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Date" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Dates" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "today", children: "Today" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "tomorrow", children: "Tomorrow" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "this_week", children: "This Week" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Title" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Topic" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Class" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Teacher" }),
        user.role_name === "super_admin" && /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Schools" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Start Time" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "End Time" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Status" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: (filteredLiveClasses == null ? void 0 : filteredLiveClasses.length) ? filteredLiveClasses.map((lc) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "text-center font-medium", children: lc.title }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: lc.topic_name }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: lc.class_name }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: lc.teacher_name }),
        user.role_name === "super_admin" && /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: lc.school_count > 1 ? `All Schools (${lc.school_count})` : lc.school_names }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: lc.start_time ? new Date(lc.start_time).toLocaleString() : "Not set" }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: lc.end_time ? new Date(lc.end_time).toLocaleString() : "Not set" }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: getStatusBadge$1(lc.status) }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-center space-x-2", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", onClick: () => handleEdit(lc), children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs(Form, { method: "post", style: { display: "inline" }, children: [
            /* @__PURE__ */ jsx("input", { type: "hidden", name: "intent", value: "delete" }),
            /* @__PURE__ */ jsx("input", { type: "hidden", name: "id", value: lc.id }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                variant: "outline",
                size: "sm",
                onClick: (e) => {
                  const message = lc.is_all_schools ? `Are you sure you want to delete "${lc.title}" from all schools? This action cannot be undone.` : `Are you sure you want to delete "${lc.title}"? This action cannot be undone.`;
                  if (!confirm(message)) {
                    e.preventDefault();
                  }
                },
                children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => window.open(lc.youtube_live_link, "_blank"),
              title: "Open YouTube Live",
              children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4" })
            }
          )
        ] }) })
      ] }, lc.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: user.role_name === "super_admin" ? 9 : 8, className: "h-24 text-center", children: "No live classes found matching your filters." }) }) })
    ] }) }) })
  ] }) });
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$9,
  default: ManageLiveClasses,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}
async function loader$a() {
  const [subjects] = await query(`SELECT * FROM subjects`);
  const [classes] = await query(`SELECT * FROM classes`);
  const [subjectClasses] = await query(`
    SELECT sc.subject_id, sc.class_id, c.name as class_name
    FROM subject_classes sc
    JOIN classes c ON sc.class_id = c.id
  `);
  const subjectClassMap = {};
  for (const sc of subjectClasses) {
    if (!subjectClassMap[sc.subject_id]) {
      subjectClassMap[sc.subject_id] = [];
    }
    subjectClassMap[sc.subject_id].push({
      id: sc.class_id,
      name: sc.class_name
    });
  }
  const subjectsWithClasses = subjects.map((subject) => ({
    ...subject,
    classes: subjectClassMap[subject.id] || [],
    class_names: (subjectClassMap[subject.id] || []).map((c) => c.name).join(", ")
  }));
  return { subjects: subjectsWithClasses, classes };
}
async function action$8({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  try {
    if (action2 === "create") {
      const name = formData.get("name");
      const classIds = formData.getAll("class_ids");
      if (!name || !classIds.length) {
        return {
          success: false,
          message: "Subject name and at least one class are required."
        };
      }
      if (classIds.length === 0) {
        return {
          success: false,
          message: "Please select at least one class."
        };
      }
      const [existingSubjects] = await query(
        `SELECT id FROM subjects WHERE name = ?`,
        [name]
      );
      if (existingSubjects.length > 0) {
        return {
          success: false,
          message: "A subject with this name already exists. Please use a different name."
        };
      }
      const defaultClassId = classIds[0];
      const [result] = await query(
        `INSERT INTO subjects (name, class_id) VALUES (?, ?)`,
        [name, defaultClassId]
      );
      const subjectId = result.insertId;
      if (subjectId) {
        const values = classIds.map((classId) => [subjectId, classId]).join("), (");
        await query(
          `INSERT INTO subject_classes (subject_id, class_id) VALUES (${values})`
        );
      }
      return { success: true, message: "Subject created successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const name = formData.get("name");
      const classIds = formData.getAll("class_ids");
      if (!name || !classIds.length) {
        return {
          success: false,
          message: "Subject name and at least one class are required."
        };
      }
      const [existingSubjects] = await query(
        `SELECT id FROM subjects WHERE name = ? AND id != ?`,
        [name, id]
      );
      if (existingSubjects.length > 0) {
        return {
          success: false,
          message: "Another subject with this name already exists. Please use a different name."
        };
      }
      const defaultClassId = classIds[0];
      await query(`UPDATE subjects SET name = ?, class_id = ? WHERE id = ?`, [
        name,
        defaultClassId,
        id
      ]);
      await query(`DELETE FROM subject_classes WHERE subject_id = ?`, [id]);
      if (classIds.length > 0) {
        const values = classIds.map((classId) => [id, classId]).join("), (");
        await query(
          `INSERT INTO subject_classes (subject_id, class_id) VALUES (${values})`
        );
      }
      return { success: true, message: "Subject updated successfully" };
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      await query(`DELETE FROM subjects WHERE id = ?`, [id]);
      return { success: true, message: "Subject deleted successfully" };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
function Subject() {
  const { subjects, classes } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
        setOpenDialog(false);
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData]);
  useEffect(() => {
    if (selectedSubject && selectedSubject.classes) {
      setSelectedClasses(selectedSubject.classes.map((c) => c.id.toString()));
    } else {
      setSelectedClasses([]);
    }
  }, [selectedSubject]);
  const handleCreateSubject = () => {
    setDialogType("create");
    setSelectedSubject(null);
    setSelectedClasses([]);
    setOpenDialog(true);
  };
  const handleEditSubject = (subject) => {
    setDialogType("update");
    setSelectedSubject(subject);
    setOpenDialog(true);
  };
  const openDeleteDialog = (subject) => {
    setSubjectToDelete(subject);
    setDeleteDialogOpen(true);
  };
  const handleDeleteSubject = () => {
    const fd = new FormData();
    fd.append("_action", "delete");
    fd.append("id", subjectToDelete.id);
    submit(fd, { method: "post" });
    setDeleteDialogOpen(false);
  };
  const toggleClassSelection = (classId) => {
    setSelectedClasses((prev) => {
      const strClassId = classId.toString();
      if (prev.includes(strClassId)) {
        return prev.filter((id) => id !== strClassId);
      } else {
        return [...prev, strClassId];
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("_action", dialogType);
    selectedClasses.forEach((classId) => {
      fd.append("class_ids", classId);
    });
    if (dialogType === "update" && selectedSubject) {
      fd.append("id", selectedSubject.id);
    }
    submit(fd, { method: "post" });
  };
  const columns = [
    {
      accessorKey: "name",
      header: "Subject",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.name })
    },
    {
      accessorKey: "class_names",
      header: "Classes",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.class_names })
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: new Date(row.original.created_at).toLocaleDateString() })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleEditSubject(row.original),
            children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => openDeleteDialog(row.original),
            children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
          }
        )
      ] })
    }
  ];
  const table = useReactTable({
    data: subjects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });
  const dialogTitle = dialogType === "create" ? "Create New Subject" : "Edit Subject";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Manage Subjects" }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleCreateSubject, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Add Subject" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No subjects found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Fill out the form below to create a new subject." : "Update the subject information." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Subject Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                name: "name",
                placeholder: "Enter subject name",
                defaultValue: (selectedSubject == null ? void 0 : selectedSubject.name) || "",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { children: "Classes" }),
            /* @__PURE__ */ jsx("div", { className: "border rounded-md p-4 max-h-60 overflow-y-auto", children: /* @__PURE__ */ jsx("div", { className: "space-y-2", children: classes.map((cls) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  id: `class-${cls.id}`,
                  checked: selectedClasses.includes(cls.id.toString()),
                  onCheckedChange: () => toggleClassSelection(cls.id)
                }
              ),
              /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: `class-${cls.id}`,
                  className: "text-sm cursor-pointer",
                  children: [
                    "Class ",
                    cls.name
                  ]
                }
              )
            ] }, cls.id)) }) }),
            selectedClasses.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500 mt-1", children: "Please select at least one class." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setOpenDialog(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: selectedClasses.length === 0, children: dialogType === "create" ? "Create Subject" : "Update Subject" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Subject" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete subject "',
          subjectToDelete == null ? void 0 : subjectToDelete.name,
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteSubject,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$8,
  default: Subject,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
async function loader$9() {
  const [classes] = await query(`SELECT * FROM classes`);
  return { classes };
}
async function action$7({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  try {
    if (action2 === "create") {
      const name = formData.get("name");
      if (!/^\d+$/.test(name)) {
        return {
          success: false,
          message: "Class name must contain only numbers (e.g., 1, 2, 3)."
        };
      }
      const [existing] = await query(`SELECT id FROM classes WHERE name = ?`, [
        name
      ]);
      if (existing.length > 0) {
        return {
          success: false,
          message: "A class with this name already exists. Please use a different name."
        };
      }
      await query(`INSERT INTO classes (name) VALUES (?)`, [name]);
      return { success: true, message: "Class created successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const name = formData.get("name");
      if (!/^\d+$/.test(name)) {
        return {
          success: false,
          message: "Class name must contain only numbers (e.g., 1, 2, 3)."
        };
      }
      const [existing] = await query(
        `SELECT id FROM classes WHERE name = ? AND id != ?`,
        [name, id]
      );
      if (existing.length > 0) {
        return {
          success: false,
          message: "A class with this name already exists. Please use a different name."
        };
      }
      await query(`UPDATE classes SET name = ? WHERE id = ?`, [name, id]);
      return { success: true, message: "Class updated successfully" };
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      await query(`DELETE FROM classes WHERE id = ?`, [id]);
      return { success: true, message: "Class deleted successfully" };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
function ClassManagement() {
  const { classes } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
        setOpenDialog(false);
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData]);
  const handleCreateClass = () => {
    setDialogType("create");
    setSelectedClass(null);
    setOpenDialog(true);
  };
  const handleEditClass = (cls) => {
    setDialogType("update");
    setSelectedClass(cls);
    setOpenDialog(true);
  };
  const openDeleteDialog = (cls) => {
    setClassToDelete(cls);
    setDeleteDialogOpen(true);
  };
  const handleDeleteClass = () => {
    const fd = new FormData();
    fd.append("_action", "delete");
    fd.append("id", classToDelete.id);
    submit(fd, { method: "post" });
    setDeleteDialogOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("_action", dialogType);
    if (dialogType === "update" && selectedClass) {
      fd.append("id", selectedClass.id);
    }
    submit(fd, { method: "post" });
  };
  const columns = [
    {
      accessorKey: "name",
      header: "Class",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center flex items-center justify-center gap-2", children: row.original.name })
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: new Date(row.original.created_at).toLocaleDateString() })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleEditClass(row.original),
            children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => openDeleteDialog(row.original),
            children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
          }
        )
      ] })
    }
  ];
  const table = useReactTable({
    data: classes,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });
  const dialogTitle = dialogType === "create" ? "Create New Class" : "Edit Class";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Manage Classes" }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleCreateClass, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Add Class" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No classes found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Fill out the form below to create a new class." : "Update the class information." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Class Number" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              name: "name",
              type: "number",
              placeholder: "Enter class number (e.g., 1, 2, 3)",
              defaultValue: (selectedClass == null ? void 0 : selectedClass.name) || "",
              pattern: "[0-9]*",
              inputMode: "numeric",
              required: true
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setOpenDialog(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: dialogType === "create" ? "Create Class" : "Update Class" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Class" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete class "',
          classToDelete == null ? void 0 : classToDelete.name,
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteClass,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7,
  default: ClassManagement,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
async function loader$8({ request }) {
  const user = await getUser(request);
  const [liveClasses] = await query(`
    SELECT z.*,
           s.name AS subject_name,
           c.name AS class_name,
           z.class_id,
           u.name AS teacher_name
    FROM live_classes z
    JOIN subjects s  ON z.subject_id = s.id
    JOIN classes c   ON z.class_id   = c.id
    JOIN users u     ON z.teacher_id = u.id
    ORDER BY z.start_time ASC
  `);
  return { liveClasses, user };
}
function Timetable() {
  const { liveClasses, user } = useLoaderData();
  const [selectedDate, setSelectedDate] = useState(
    format(/* @__PURE__ */ new Date(), "yyyy-MM-dd")
  );
  const [timeSlots, setTimeSlots] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [classTimeTable, setClassTimeTable] = useState({});
  const isTeacher = user && user.role_name === "teacher";
  const canJoinClass = user && ["super_admin", "school_admin", "class_admin", "teacher"].includes(
    user.role_name
  );
  useEffect(() => {
    const selectedDateObj = new Date(selectedDate);
    let filteredClasses = liveClasses.filter((cls) => {
      const classDate = new Date(cls.class_date);
      return isSameDay(classDate, selectedDateObj);
    });
    if (user && user.class_ids) {
      const classIds = Array.isArray(user.class_ids) ? user.class_ids : user.class_ids.split(",").map((id) => parseInt(id.trim()));
      if (classIds.length !== 0) {
        filteredClasses = filteredClasses.filter(
          (zc) => classIds.includes(zc.class_id)
        );
      }
    }
    if (isTeacher) {
      filteredClasses = filteredClasses.filter(
        (zc) => zc.teacher_id === user.id
      );
    }
    if (selectedTeacher !== "all") {
      filteredClasses = filteredClasses.filter(
        (zc) => zc.teacher_id.toString() === selectedTeacher
      );
    }
    filteredClasses.sort((a, b) => {
      const timeA = (/* @__PURE__ */ new Date(`2000-01-01T${a.class_time}`)).getTime();
      const timeB = (/* @__PURE__ */ new Date(`2000-01-01T${b.class_time}`)).getTime();
      return timeA - timeB;
    });
    if (!isTeacher) {
      const uniqueTeachers = [];
      const teacherMap = /* @__PURE__ */ new Map();
      liveClasses.forEach((cls) => {
        if (!teacherMap.has(cls.teacher_id)) {
          teacherMap.set(cls.teacher_id, {
            id: cls.teacher_id,
            name: cls.teacher_name
          });
          uniqueTeachers.push({
            id: cls.teacher_id,
            name: cls.teacher_name
          });
        }
      });
      uniqueTeachers.sort((a, b) => a.name.localeCompare(b.name));
      setTeachersData(uniqueTeachers);
    }
    const uniqueTimeSlots = [];
    const timeSlotMap = /* @__PURE__ */ new Map();
    filteredClasses.forEach((cls) => {
      const startTime = /* @__PURE__ */ new Date(`2000-01-01T${cls.class_time}`);
      const endTime = new Date(
        startTime.getTime() + cls.duration_minutes * 6e4
      );
      const timeKey = `${format(startTime, "h:mm")} - ${format(
        endTime,
        "h:mm"
      )}`;
      if (!timeSlotMap.has(timeKey)) {
        timeSlotMap.set(timeKey, {
          key: timeKey,
          startTime,
          endTime,
          formattedTime: timeKey
        });
        uniqueTimeSlots.push({
          key: timeKey,
          startTime,
          endTime,
          formattedTime: timeKey
        });
      }
    });
    uniqueTimeSlots.sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime()
    );
    setTimeSlots(uniqueTimeSlots);
    const uniqueClasses = [];
    const classMap = /* @__PURE__ */ new Map();
    filteredClasses.forEach((cls) => {
      if (!classMap.has(cls.class_id)) {
        classMap.set(cls.class_id, {
          id: cls.class_id,
          name: cls.class_name
        });
        uniqueClasses.push({
          id: cls.class_id,
          name: cls.class_name
        });
      }
    });
    uniqueClasses.sort((a, b) => a.name.localeCompare(b.name));
    setClassesData(uniqueClasses);
    const timetable = {};
    uniqueClasses.forEach((cls) => {
      timetable[cls.id] = {};
      uniqueTimeSlots.forEach((slot) => {
        timetable[cls.id][slot.key] = null;
      });
    });
    filteredClasses.forEach((cls) => {
      const startTime = /* @__PURE__ */ new Date(`2000-01-01T${cls.class_time}`);
      const endTime = new Date(
        startTime.getTime() + cls.duration_minutes * 6e4
      );
      const timeKey = `${format(startTime, "h:mm")} - ${format(
        endTime,
        "h:mm"
      )}`;
      timetable[cls.class_id][timeKey] = {
        id: cls.id,
        subject: cls.subject_name,
        teacher: cls.teacher_name,
        startTime,
        endTime,
        joinUrl: cls.join_url,
        description: cls.description
      };
    });
    setClassTimeTable(timetable);
  }, [liveClasses, selectedDate, user, isTeacher, selectedTeacher]);
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("h1", { className: "ml-2 pt-2 text-xl font-semibold", children: "Class Schedule" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "date",
            value: selectedDate,
            onChange: (e) => setSelectedDate(e.target.value),
            className: "w-full sm:w-[200px]"
          }
        ) }),
        !isTeacher && teachersData.length > 0 && /* @__PURE__ */ jsxs(
          Select,
          {
            value: selectedTeacher,
            onValueChange: (value) => setSelectedTeacher(value),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full sm:w-[240px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Filter by Teacher" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Teachers" }),
                teachersData.map((teacher) => /* @__PURE__ */ jsx(SelectItem, { value: teacher.id.toString(), children: teacher.name }, teacher.id))
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 p-3 bg-gray-50 rounded-lg", children: /* @__PURE__ */ jsxs("span", { className: "font-medium text-gray-700", children: [
      "Showing schedule for: ",
      format(new Date(selectedDate), "dd/MM/yyyy")
    ] }) }),
    timeSlots.length > 0 && classesData.length > 0 ? /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "border border-gray-300 bg-gray-100 p-2 text-center font-medium text-sm", children: "Class" }),
        timeSlots.map((slot) => /* @__PURE__ */ jsx(
          "th",
          {
            className: "border border-gray-300 bg-gray-100 p-2 text-center font-medium text-sm",
            children: slot.formattedTime
          },
          slot.key
        ))
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: classesData.map((cls) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsxs("td", { className: "border border-gray-300 bg-gray-50 p-3 text-center font-medium", children: [
          "Class ",
          cls.name
        ] }),
        timeSlots.map((slot) => {
          var _a;
          const classInfo = (_a = classTimeTable[cls.id]) == null ? void 0 : _a[slot.key];
          if (!classInfo) {
            return /* @__PURE__ */ jsx(
              "td",
              {
                className: "border border-gray-300 p-4 text-center text-gray-400",
                children: "-"
              },
              slot.key
            );
          }
          return /* @__PURE__ */ jsxs(
            "td",
            {
              className: "border border-gray-300 p-4 text-center",
              children: [
                /* @__PURE__ */ jsx("div", { className: "font-medium", children: classInfo.subject }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm mt-1", children: [
                  "(",
                  classInfo.teacher,
                  ")"
                ] }),
                classInfo.description && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-600 mt-1 italic", children: classInfo.description }),
                canJoinClass && /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: classInfo.joinUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                    children: [
                      /* @__PURE__ */ jsx(VideoIcon, { className: "h-3.5 w-3.5 mr-1.5" }),
                      "Join Class"
                    ]
                  }
                ) })
              ]
            },
            slot.key
          );
        })
      ] }, cls.id)) })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "p-8 text-center text-muted-foreground border rounded-lg", children: isTeacher ? `You have no classes scheduled for ${format(
      new Date(selectedDate),
      "dd/MM/yyyy"
    )}.` : `No classes scheduled for ${format(
      new Date(selectedDate),
      "dd/MM/yyyy"
    )}.` })
  ] });
}
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Timetable,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
async function loader$7() {
  const [roles] = await query(`SELECT * FROM roles`);
  const [admins] = await query(
    `
    SELECT u.*, r.name AS role_name
    FROM users u
    JOIN roles r ON u.role_id = r.id
    WHERE u.role_id = ?
  `,
    [2]
  );
  return { roles, admins };
}
async function action$6({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  try {
    if (action2 === "create") {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const role_id = 2;
      const salt = bcrypt.genSaltSync(10);
      const password_hash = bcrypt.hashSync(password, salt);
      await query(
        `INSERT INTO users (name, email, password_hash, role_id)
         VALUES (?, ?, ?, ?)`,
        [name, email, password_hash, role_id]
      );
      return { success: true, message: "Admin created successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      if (password && password.trim() !== "") {
        const salt = bcrypt.genSaltSync(10);
        const password_hash = bcrypt.hashSync(password, salt);
        await query(
          `UPDATE users
           SET name = ?, email = ?, password_hash = ?
           WHERE id = ?`,
          [name, email, password_hash, id]
        );
      } else {
        await query(
          `UPDATE users
           SET name = ?, email = ?
           WHERE id = ?`,
          [name, email, id]
        );
      }
      return { success: true, message: "Admin updated successfully" };
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      await query(`DELETE FROM users WHERE id = ?`, [id]);
      return { success: true, message: "Admin deleted successfully" };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY" && error.message.includes("email")) {
      return {
        success: false,
        message: "This email address is already in use. Please use a different email."
      };
    }
    return { success: false, message: error.message || "An error occurred" };
  }
}
function Admins() {
  const { admins } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
        setOpenDialog(false);
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData]);
  const handleCreateAdmin = () => {
    setDialogType("create");
    setSelectedAdmin(null);
    setOpenDialog(true);
  };
  const handleEditAdmin = (admin) => {
    setDialogType("update");
    setSelectedAdmin(admin);
    setOpenDialog(true);
  };
  const openDeleteDialog = (admin) => {
    setAdminToDelete(admin);
    setDeleteDialogOpen(true);
  };
  const handleDeleteAdmin = () => {
    const fd = new FormData();
    fd.append("_action", "delete");
    fd.append("id", adminToDelete.id);
    submit(fd, { method: "post" });
    setDeleteDialogOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("_action", dialogType);
    if (dialogType === "update" && selectedAdmin) {
      fd.append("id", selectedAdmin.id);
    }
    submit(fd, { method: "post" });
  };
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.name })
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.email })
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: new Date(row.original.created_at).toLocaleDateString() })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleEditAdmin(row.original),
            children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => openDeleteDialog(row.original),
            children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
          }
        )
      ] })
    }
  ];
  const table = useReactTable({
    data: admins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });
  const dialogTitle = dialogType === "create" ? "Create New Admin" : "Edit Admin";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Manage Admins" }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleCreateAdmin, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Add Admin" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No admins found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Fill out the form below to create a new admin." : "Update the admin information." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                name: "name",
                placeholder: "Enter admin name",
                defaultValue: (selectedAdmin == null ? void 0 : selectedAdmin.name) || "",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                name: "email",
                type: "email",
                placeholder: "Enter admin email",
                defaultValue: (selectedAdmin == null ? void 0 : selectedAdmin.email) || "",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                name: "password",
                type: "password",
                placeholder: dialogType === "create" ? "Enter password" : "Leave blank to keep current password",
                required: dialogType === "create"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setOpenDialog(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: dialogType === "create" ? "Create Admin" : "Update Admin" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Admin" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete admin "',
          adminToDelete == null ? void 0 : adminToDelete.name,
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteAdmin,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6,
  default: Admins,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
async function loader$6({ request }) {
  const user = await getUser(request);
  const [users] = await query("SELECT id, name FROM users WHERE role_id = ?", [
    3
  ]);
  const [schools] = await query("SELECT id, name FROM schools");
  const [classes] = await query("SELECT id, name FROM classes");
  const [classAdmins] = await query(`
    SELECT ca.id,
           ca.admin_id,
           ca.school_id,
           ca.class_id,
           ca.assigned_at,
           u.name       AS admin_name,
           u.email      AS admin_email,
           s.name       AS school_name,
           c.name       AS class_name
    FROM class_admins ca
    JOIN users u   ON ca.admin_id  = u.id
    JOIN schools s ON ca.school_id = s.id
    JOIN classes c ON ca.class_id  = c.id
  `);
  return { users, schools, classes, classAdmins, user };
}
async function action$5({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  const user = await getUser(request);
  try {
    if (action2 === "create") {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const school_id = user.school_id;
      const class_id = formData.get("class_id");
      try {
        const [exists] = await query("SELECT id FROM users WHERE email = ?", [
          email
        ]);
        if (exists.length > 0) {
          return {
            success: false,
            message: "A user with this email already exists."
          };
        }
        await query("START TRANSACTION");
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const [result] = await query(
          "INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, 3)",
          [name, email, password_hash]
        );
        const admin_id = result.insertId;
        await query(
          "INSERT INTO class_admins (admin_id, school_id, class_id) VALUES (?, ?, ?)",
          [admin_id, school_id, class_id]
        );
        await query("COMMIT");
        return {
          success: true,
          message: "Class admin created and assigned successfully"
        };
      } catch (err) {
        await query("ROLLBACK");
        throw err;
      }
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const school_id = user.school_id;
      const class_id = formData.get("class_id");
      const [currentAssignment] = await query(
        `SELECT admin_id FROM class_admins WHERE id = ?`,
        [id]
      );
      if (currentAssignment.length === 0) {
        return { success: false, message: "Assignment not found" };
      }
      const admin_id = currentAssignment[0].admin_id;
      const [emailExists] = await query(
        `SELECT id FROM users WHERE email = ? AND id != ?`,
        [email, admin_id]
      );
      if (emailExists.length > 0) {
        return {
          success: false,
          message: "A user with this email already exists."
        };
      }
      try {
        await query("START TRANSACTION");
        if (password && password.trim() !== "") {
          const salt = await bcrypt.genSalt(10);
          const password_hash = await bcrypt.hash(password, salt);
          await query(
            `UPDATE users SET name = ?, email = ?, password_hash = ? WHERE id = ?`,
            [name, email, password_hash, admin_id]
          );
        } else {
          await query(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [
            name,
            email,
            admin_id
          ]);
        }
        const [exists] = await query(
          `SELECT id
           FROM class_admins
           WHERE admin_id = ? AND school_id = ? AND class_id = ? AND id != ?`,
          [admin_id, school_id, class_id, id]
        );
        if (exists.length > 0) {
          await query("ROLLBACK");
          return { success: false, message: "This assignment already exists." };
        }
        await query(
          `UPDATE class_admins
           SET school_id = ?, class_id = ?
           WHERE id = ?`,
          [school_id, class_id, id]
        );
        await query("COMMIT");
        return {
          success: true,
          message: "Class admin updated successfully"
        };
      } catch (err) {
        await query("ROLLBACK");
        throw err;
      }
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      await query("DELETE FROM class_admins WHERE id = ?", [id]);
      return {
        success: true,
        message: "Class admin assignment deleted successfully"
      };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
function ClassAdmin() {
  var _a, _b;
  const { users, schools, classes, classAdmins } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selected, setSelected] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
        setOpenDialog(false);
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData]);
  const handleCreate = () => {
    setDialogType("create");
    setSelected(null);
    setOpenDialog(true);
  };
  const handleEdit = (assignment) => {
    setDialogType("update");
    setSelected(assignment);
    setOpenDialog(true);
  };
  const openDelete = (assignment) => {
    setToDelete(assignment);
    setDeleteDialogOpen(true);
  };
  const handleDelete = () => {
    const fd = new FormData();
    fd.append("_action", "delete");
    fd.append("id", toDelete.id);
    submit(fd, { method: "post" });
    setDeleteDialogOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("_action", dialogType);
    if (dialogType === "update" && selected) {
      fd.append("id", selected.id);
    }
    submit(fd, { method: "post" });
  };
  const columns = [
    {
      accessorKey: "admin_name",
      header: "Admin Name",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center flex items-center justify-center gap-2", children: row.original.admin_name })
    },
    {
      accessorKey: "admin_email",
      header: "Email",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.admin_email })
    },
    {
      accessorKey: "class_name",
      header: "Class",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.class_name })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleEdit(row.original),
            children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => openDelete(row.original),
            children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
          }
        )
      ] })
    }
  ];
  const table = useReactTable({
    data: classAdmins,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });
  const dialogTitle = dialogType === "create" ? "Create New Class Admin" : "Edit Assignment";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Manage Class Admins" }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleCreate, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Add Class Admin" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No assignments found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Enter admin details and assign to school and class." : "Update the class admin assignment." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 pb-4", children: [
          dialogType === "create" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Admin Name" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  name: "name",
                  placeholder: "Enter name",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  name: "email",
                  type: "email",
                  placeholder: "Enter email",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  name: "password",
                  type: "password",
                  placeholder: "Enter password",
                  required: true
                }
              )
            ] })
          ] }),
          dialogType === "update" && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Admin Name" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  name: "name",
                  placeholder: "Enter name",
                  defaultValue: (selected == null ? void 0 : selected.admin_name) || "",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  name: "email",
                  type: "email",
                  placeholder: "Enter email",
                  defaultValue: (selected == null ? void 0 : selected.admin_email) || "",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  name: "password",
                  type: "password",
                  placeholder: "Leave blank to keep current password"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "class_id", children: "Class" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                name: "class_id",
                defaultValue: ((_a = selected == null ? void 0 : selected.class_id) == null ? void 0 : _a.toString()) || ((_b = classes[0]) == null ? void 0 : _b.id.toString()),
                required: true,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a class" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: classes.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c.id.toString(), children: c.name }, c.id)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setOpenDialog(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: dialogType === "create" ? "Create & Assign" : "Update Assignment" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Assignment" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete the assignment for "',
          toDelete == null ? void 0 : toDelete.admin_name,
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDelete,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  default: ClassAdmin,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
async function loader$5({ request }) {
  const user = await getUser(request);
  let attendanceQuery = `
    SELECT sa.id, sa.student_id, sa.class_id, sa.date, sa.status, sa.created_at,
           u.name as student_name, c.name as class_name
    FROM student_attendance sa
    JOIN users u ON sa.student_id = u.id
    JOIN classes c ON sa.class_id = c.id
    LEFT JOIN student_profiles sp ON sa.student_id = sp.user_id
  `;
  const attendanceQueryParams = [];
  const attendanceWhereConditions = [];
  if (user.class_ids && user.class_ids.length > 0) {
    attendanceWhereConditions.push(
      `sa.class_id IN (${user.class_ids.map(() => "?").join(",")})`
    );
    attendanceQueryParams.push(...user.class_ids);
  }
  if (user.school_id) {
    attendanceWhereConditions.push("sp.schools_id = ?");
    attendanceQueryParams.push(user.school_id);
  }
  if (attendanceWhereConditions.length > 0) {
    attendanceQuery += ` WHERE ${attendanceWhereConditions.join(" AND ")}`;
  }
  attendanceQuery += ` ORDER BY sa.date DESC, c.name, u.name`;
  const [attendance] = await query(attendanceQuery, attendanceQueryParams);
  let studentsQuery = `
    SELECT u.id, u.name, sp.class_id, c.name as class_name
    FROM users u
    JOIN student_profiles sp ON u.id = sp.user_id
    JOIN classes c ON sp.class_id = c.id
    WHERE u.role_id = 5
  `;
  const studentsQueryParams = [];
  const studentsWhereConditions = [];
  if (user.class_ids && user.class_ids.length > 0) {
    studentsWhereConditions.push(
      `sp.class_id IN (${user.class_ids.map(() => "?").join(",")})`
    );
    studentsQueryParams.push(...user.class_ids);
  }
  if (user.school_id) {
    studentsWhereConditions.push("sp.schools_id = ?");
    studentsQueryParams.push(user.school_id);
  }
  if (studentsWhereConditions.length > 0) {
    studentsQuery += ` AND ${studentsWhereConditions.join(" AND ")}`;
  }
  studentsQuery += ` ORDER BY c.name, u.name`;
  const [students] = await query(studentsQuery, studentsQueryParams);
  let classesQuery = `SELECT id, name FROM classes`;
  const classQueryParams = [];
  if (user.class_ids && user.class_ids.length > 0) {
    classesQuery += ` WHERE id IN (${user.class_ids.map(() => "?").join(",")})`;
    classQueryParams.push(...user.class_ids);
  }
  classesQuery += ` ORDER BY name`;
  const [classes] = await query(classesQuery, classQueryParams);
  return {
    user,
    attendance,
    students,
    classes
  };
}
async function action$4({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  const user = await getUser(request);
  if (user.role_name !== "class_admin") {
    return {
      success: false,
      message: "Only class admins can modify attendance records."
    };
  }
  try {
    if (action2 === "create") {
      const studentId = formData.get("student_id");
      const classId = formData.get("class_id");
      const date = formData.get("date");
      const status = formData.get("status");
      const [existingRecord] = await query(
        "SELECT id FROM student_attendance WHERE student_id = ? AND class_id = ? AND date = ?",
        [studentId, classId, date]
      );
      if (existingRecord.length > 0) {
        return {
          success: false,
          message: "An attendance record already exists for this student on the selected date."
        };
      }
      await query(
        "INSERT INTO student_attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)",
        [studentId, classId, date, status]
      );
      return { success: true, message: "Attendance recorded successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const studentId = formData.get("student_id");
      const classId = formData.get("class_id");
      const date = formData.get("date");
      const status = formData.get("status");
      const [existingRecord] = await query(
        "SELECT id FROM student_attendance WHERE student_id = ? AND class_id = ? AND date = ? AND id != ?",
        [studentId, classId, date, id]
      );
      if (existingRecord.length > 0) {
        return {
          success: false,
          message: "An attendance record already exists for this student on the selected date."
        };
      }
      await query(
        "UPDATE student_attendance SET student_id = ?, class_id = ?, date = ?, status = ? WHERE id = ?",
        [studentId, classId, date, status, id]
      );
      return { success: true, message: "Attendance updated successfully" };
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      await query("DELETE FROM student_attendance WHERE id = ?", [id]);
      return {
        success: true,
        message: "Attendance record deleted successfully"
      };
    }
    if (action2 === "bulk_create") {
      const classId = formData.get("class_id");
      const date = formData.get("date");
      const studentIds = formData.getAll("student_ids");
      const statuses = formData.getAll("statuses");
      const conn = await db.getConnection();
      await conn.beginTransaction();
      try {
        for (let i = 0; i < studentIds.length; i++) {
          const studentId = studentIds[i];
          const status = statuses[i];
          const [existingRecord] = await conn.query(
            "SELECT id FROM student_attendance WHERE student_id = ? AND class_id = ? AND date = ?",
            [studentId, classId, date]
          );
          if (existingRecord.length > 0) {
            await conn.query(
              "UPDATE student_attendance SET status = ? WHERE student_id = ? AND class_id = ? AND date = ?",
              [status, studentId, classId, date]
            );
          } else {
            await conn.query(
              "INSERT INTO student_attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)",
              [studentId, classId, date, status]
            );
          }
        }
        await conn.commit();
        return { success: true, message: "Attendance recorded successfully" };
      } catch (error) {
        await conn.rollback();
        throw error;
      } finally {
        conn.release();
      }
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
function Attendance() {
  const { attendance, students, classes, user } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [selectedDate, setSelectedDate] = useState(/* @__PURE__ */ new Date());
  const [selectedClass, setSelectedClass] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [tableData, setTableData] = useState([]);
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData]);
  useEffect(() => {
    if (selectedClass) {
      const classStudents = students.filter(
        (student) => student.class_id.toString() === selectedClass
      );
      setFilteredStudents(classStudents);
    } else if (classes.length > 0) {
      setSelectedClass(classes[0].id.toString());
    } else {
      setFilteredStudents([]);
    }
  }, [selectedClass, students, classes]);
  useEffect(() => {
    const initialAttendance = {};
    const todaysRecords = attendance.filter((record) => {
      if (typeof record.date === "string") {
        return record.date.substring(0, 10) === formattedDate;
      } else if (record.date instanceof Date) {
        return format(record.date, "yyyy-MM-dd") === formattedDate;
      }
      return false;
    });
    filteredStudents.forEach((student) => {
      const existingRecord = todaysRecords.find(
        (record) => record.student_id === student.id && record.class_id.toString() === selectedClass
      );
      if (existingRecord) {
        initialAttendance[student.id] = {
          status: existingRecord.status,
          recordId: existingRecord.id
        };
      } else {
        initialAttendance[student.id] = {
          status: "not_marked",
          recordId: null
        };
      }
    });
    setStudentAttendance(initialAttendance);
  }, [filteredStudents, selectedDate, attendance, selectedClass, formattedDate]);
  useEffect(() => {
    const newTableData = filteredStudents.map((student) => {
      var _a, _b;
      return {
        id: student.id,
        name: student.name,
        class_name: student.class_name,
        attendanceStatus: ((_a = studentAttendance[student.id]) == null ? void 0 : _a.status) || "not_marked",
        recordId: ((_b = studentAttendance[student.id]) == null ? void 0 : _b.recordId) || null
      };
    });
    setTableData(newTableData);
  }, [filteredStudents, studentAttendance]);
  const markAttendance = (studentId, status) => {
    const formData = new FormData();
    const existingRecord = studentAttendance[studentId];
    if (existingRecord && existingRecord.recordId) {
      formData.append("_action", "update");
      formData.append("id", existingRecord.recordId);
    } else {
      formData.append("_action", "create");
    }
    formData.append("student_id", studentId);
    formData.append("class_id", selectedClass);
    formData.append("date", formattedDate);
    formData.append("status", status);
    submit(formData, { method: "post" });
    setStudentAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status
      }
    }));
  };
  const openDeleteDialog = (studentId) => {
    var _a;
    const studentData = filteredStudents.find((s) => s.id === studentId);
    if ((_a = studentAttendance[studentId]) == null ? void 0 : _a.recordId) {
      setRecordToDelete({
        id: studentAttendance[studentId].recordId,
        student_name: (studentData == null ? void 0 : studentData.name) || "Student",
        date: formattedDate
      });
      setDeleteDialogOpen(true);
    } else {
      toast.error("No attendance record exists to delete");
    }
  };
  const handleDeleteAttendance = () => {
    const formData = new FormData();
    formData.append("_action", "delete");
    formData.append("id", recordToDelete.id);
    submit(formData, { method: "post" });
    setDeleteDialogOpen(false);
    const studentId = Object.keys(studentAttendance).find(
      (id) => studentAttendance[id].recordId === recordToDelete.id
    );
    if (studentId) {
      setStudentAttendance((prev) => ({
        ...prev,
        [studentId]: {
          status: "not_marked",
          recordId: null
        }
      }));
    }
  };
  const getStatusBadge2 = (status) => {
    switch (status) {
      case "present":
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700", children: [
          /* @__PURE__ */ jsx(CheckCircleIcon, { className: "mr-1 h-3 w-3" }),
          "Present"
        ] });
      case "absent":
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700", children: [
          /* @__PURE__ */ jsx(XCircleIcon, { className: "mr-1 h-3 w-3" }),
          "Absent"
        ] });
      case "late":
        return /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700", children: [
          /* @__PURE__ */ jsx(ClockIcon, { className: "mr-1 h-3 w-3" }),
          "Late"
        ] });
      default:
        return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700", children: "Not marked" });
    }
  };
  const columns = [
    {
      accessorKey: "name",
      header: "Student",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.name })
    },
    {
      accessorKey: "attendanceStatus",
      header: "Status",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: getStatusBadge2(row.original.attendanceStatus) })
    },
    {
      id: "markAttendance",
      header: "Mark Attendance",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-2", children: user.role_name === "class_admin" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: row.original.attendanceStatus === "present" ? "default" : "outline",
            size: "sm",
            onClick: () => markAttendance(row.original.id, "present"),
            children: [
              /* @__PURE__ */ jsx(CheckCircleIcon, { className: "mr-1 size-4" }),
              "Present"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: row.original.attendanceStatus === "absent" ? "default" : "outline",
            size: "sm",
            onClick: () => markAttendance(row.original.id, "absent"),
            children: [
              /* @__PURE__ */ jsx(XCircleIcon, { className: "mr-1 size-4" }),
              "Absent"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: row.original.attendanceStatus === "late" ? "default" : "outline",
            size: "sm",
            onClick: () => markAttendance(row.original.id, "late"),
            children: [
              /* @__PURE__ */ jsx(ClockIcon, { className: "mr-1 size-4" }),
              "Late"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500 italic", children: "Only class admins can mark attendance" }) })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-2", children: user.role_name === "class_admin" ? /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => openDeleteDialog(row.original.id),
          disabled: !row.original.recordId,
          children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
        }
      ) : /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-500", children: "-" }) })
    }
  ];
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col space-y-4 md:flex-row md:items-center md:justify-end mb-6", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs(Select, { value: selectedClass, onValueChange: setSelectedClass, children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a class" }) }),
        /* @__PURE__ */ jsx(SelectContent, { children: classes.map((cls) => /* @__PURE__ */ jsxs(SelectItem, { value: cls.id.toString(), children: [
          "Class ",
          cls.name
        ] }, cls.id)) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs(Popover, { children: [
        /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full justify-start text-left font-normal",
            children: [
              /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
              selectedDate ? format(selectedDate, "PPP") : "Select date"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", children: /* @__PURE__ */ jsx(
          Calendar,
          {
            mode: "single",
            selected: selectedDate,
            onSelect: setSelectedDate,
            initialFocus: true
          }
        ) })
      ] }) })
    ] }) }),
    tableData.length > 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No students found."
        }
      ) }) })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "rounded-md border p-8 text-center", children: selectedClass ? "No students found in this class" : "Please select a class" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Attendance Record" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to delete this attendance record for",
          " ",
          /* @__PURE__ */ jsx("strong", { children: recordToDelete == null ? void 0 : recordToDelete.student_name }),
          " on",
          " ",
          (recordToDelete == null ? void 0 : recordToDelete.date) && /* @__PURE__ */ jsx("strong", { children: new Date(recordToDelete.date).toLocaleDateString() }),
          "? This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteAttendance,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: Attendance,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
async function loader$4({ request }) {
  const user = await getUser(request);
  let studentsQuery = `
    SELECT u.id, u.name, u.email, u.created_at,
           sp.id AS profile_id,
           sp.enrollment_no, sp.date_of_birth,
           sp.class_id, sp.schools_id,
           c.name AS class_name,
           s.name AS school_name
    FROM users u
    LEFT JOIN student_profiles sp ON u.id = sp.user_id
    LEFT JOIN classes c          ON sp.class_id   = c.id
    LEFT JOIN schools s          ON sp.schools_id = s.id
    WHERE u.role_id = 5
  `;
  const queryParams = [];
  const whereConditions = [];
  if (user.class_ids && user.class_ids.length > 0) {
    whereConditions.push(
      `sp.class_id IN (${user.class_ids.map(() => "?").join(",")})`
    );
    queryParams.push(...user.class_ids);
  }
  if (user.school_id) {
    whereConditions.push("sp.schools_id = ?");
    queryParams.push(user.school_id);
  }
  if (whereConditions.length > 0) {
    studentsQuery += ` AND ${whereConditions.join(" AND ")}`;
  }
  const [students] = await query(studentsQuery, queryParams);
  let classesQuery = `SELECT id, name FROM classes`;
  const classQueryParams = [];
  if (user.class_ids && user.class_ids.length > 0) {
    classesQuery += ` WHERE id IN (${user.class_ids.map(() => "?").join(",")})`;
    classQueryParams.push(...user.class_ids);
  }
  const [classes] = await query(classesQuery, classQueryParams);
  let schoolsQuery = `SELECT id, name FROM schools`;
  const schoolQueryParams = [];
  if (user.school_id) {
    schoolsQuery += ` WHERE id = ?`;
    schoolQueryParams.push(user.school_id);
  }
  const [schools] = await query(schoolsQuery, schoolQueryParams);
  const [parents] = await query(
    `SELECT id, name, email FROM users WHERE role_id = ?`,
    [6]
  );
  const [links] = await query(
    `SELECT psl.id, psl.parent_id, psl.student_id, p.name AS parent_name, p.email AS parent_email
     FROM parent_student_links psl
     JOIN users p ON psl.parent_id = p.id`
  );
  const studentParentLinks = {};
  links.forEach((ln) => {
    if (!studentParentLinks[ln.student_id])
      studentParentLinks[ln.student_id] = [];
    studentParentLinks[ln.student_id].push({
      id: ln.id,
      parent_id: ln.parent_id,
      parent_name: ln.parent_name,
      parent_email: ln.parent_email
    });
  });
  return { user, students, classes, schools, parents, studentParentLinks };
}
async function action$3({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  const user = await getUser(request);
  try {
    if (action2 === "create") {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const enrollment_no = formData.get("enrollment_no");
      const date_of_birth = formData.get("date_of_birth");
      const class_id = formData.get("class_id");
      const schools_id = user.school_id;
      const addParent = formData.get("add_parent") === "on";
      const parentName = formData.get("parent_name");
      const parentEmail = formData.get("parent_email");
      const parentPassword = formData.get("parent_password");
      const existingParentId = formData.get("existing_parent_id");
      const [dupEmail] = await query("SELECT id FROM users WHERE email = ?", [
        email
      ]);
      if (dupEmail.length > 0) {
        return {
          success: false,
          message: "A user with this email already exists. Please use a different email."
        };
      }
      const [dupEnroll] = await query(
        "SELECT id FROM student_profiles WHERE enrollment_no = ?",
        [enrollment_no]
      );
      if (dupEnroll.length > 0) {
        return {
          success: false,
          message: "A student with this enrollment number already exists. Please use a different number."
        };
      }
      if (addParent && !existingParentId && parentEmail) {
        const [dupParentEmail] = await query(
          "SELECT id FROM users WHERE email = ?",
          [parentEmail]
        );
        if (dupParentEmail.length > 0) {
          return {
            success: false,
            message: "A user with this parent email already exists. Please use a different email."
          };
        }
      }
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);
      const [userRes] = await query(
        `INSERT INTO users
         (name, email, password_hash, role_id)
         VALUES (?, ?, ?, 5)`,
        [name, email, password_hash]
      );
      const studentId = userRes.insertId;
      await query(
        `INSERT INTO student_profiles
         (user_id, class_id, schools_id, enrollment_no, date_of_birth)
         VALUES (?, ?, ?, ?, ?)`,
        [studentId, class_id, schools_id, enrollment_no, date_of_birth]
      );
      let parentId = null;
      if (addParent) {
        if (existingParentId) {
          parentId = existingParentId;
        } else if (parentName && parentEmail && parentPassword) {
          const salt2 = await bcrypt.genSalt(10);
          const parentPasswordHash = await bcrypt.hash(parentPassword, salt2);
          const [parentRes] = await query(
            `INSERT INTO users
             (name, email, password_hash, role_id)
             VALUES (?, ?, ?, 6)`,
            [parentName, parentEmail, parentPasswordHash]
          );
          parentId = parentRes.insertId;
        }
        if (parentId) {
          await query(
            `INSERT INTO parent_student_links (parent_id, student_id) VALUES (?, ?)`,
            [parentId, studentId]
          );
        }
      }
      return { success: true, message: "Student created successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const profile_id = formData.get("profile_id");
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const enrollment_no = formData.get("enrollment_no");
      const date_of_birth = formData.get("date_of_birth");
      const class_id = formData.get("class_id");
      const schools_id = user.school_id;
      const addParent = formData.get("add_parent") === "on";
      const parentName = formData.get("parent_name");
      const parentEmail = formData.get("parent_email");
      const parentPassword = formData.get("parent_password");
      const existingParentId = formData.get("existing_parent_id");
      const [dupEmail] = await query(
        "SELECT id FROM users WHERE email = ? AND id != ?",
        [email, id]
      );
      if (dupEmail.length > 0) {
        return {
          success: false,
          message: "A user with this email already exists. Please use a different email."
        };
      }
      const [dupEnroll] = await query(
        "SELECT id FROM student_profiles WHERE enrollment_no = ? AND id != ?",
        [enrollment_no, profile_id]
      );
      if (dupEnroll.length > 0) {
        return {
          success: false,
          message: "A student with this enrollment number already exists. Please use a different number."
        };
      }
      if (addParent && !existingParentId && parentEmail) {
        const [dupParentEmail] = await query(
          "SELECT id FROM users WHERE email = ?",
          [parentEmail]
        );
        if (dupParentEmail.length > 0) {
          return {
            success: false,
            message: "A user with this parent email already exists. Please use a different email."
          };
        }
      }
      try {
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const password_hash = await bcrypt.hash(password, salt);
          await query(
            `UPDATE users
             SET name = ?, email = ?, password_hash = ?
             WHERE id = ?`,
            [name, email, password_hash, id]
          );
        } else {
          await query(
            `UPDATE users
             SET name = ?, email = ?
             WHERE id = ?`,
            [name, email, id]
          );
        }
        if (profile_id) {
          await query(
            `UPDATE student_profiles
             SET class_id = ?, schools_id = ?, enrollment_no = ?, date_of_birth = ?
             WHERE id = ?`,
            [class_id, schools_id, enrollment_no, date_of_birth, profile_id]
          );
        } else {
          await query(
            `INSERT INTO student_profiles
             (user_id, class_id, schools_id, enrollment_no, date_of_birth)
             VALUES (?, ?, ?, ?, ?)`,
            [id, class_id, schools_id, enrollment_no, date_of_birth]
          );
        }
        let parentId = null;
        if (addParent) {
          if (existingParentId) {
            parentId = existingParentId;
          } else if (parentName && parentEmail) {
            const [existingParent] = await query(
              "SELECT id FROM users WHERE email = ? AND role_id = 6",
              [parentEmail]
            );
            if (existingParent.length > 0) {
              parentId = existingParent[0].id;
            } else {
              const salt = await bcrypt.genSalt(10);
              const parentPasswordHash = parentPassword ? await bcrypt.hash(parentPassword, salt) : await bcrypt.hash("default123", salt);
              const [parentRes] = await query(
                `INSERT INTO users
                 (name, email, password_hash, role_id)
                 VALUES (?, ?, ?, 6)`,
                [parentName, parentEmail, parentPasswordHash]
              );
              parentId = parentRes.insertId;
            }
          }
          if (parentId) {
            const [existingLink] = await query(
              `SELECT id FROM parent_student_links WHERE parent_id = ? AND student_id = ?`,
              [parentId, id]
            );
            if (existingLink.length === 0) {
              await query(
                `INSERT INTO parent_student_links (parent_id, student_id) VALUES (?, ?)`,
                [parentId, id]
              );
            }
          }
        }
        return { success: true, message: "Student updated successfully" };
      } catch (err) {
        throw err;
      }
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      await query(`DELETE FROM parent_student_links WHERE student_id = ?`, [id]);
      await query(`DELETE FROM student_profiles WHERE user_id = ?`, [id]);
      await query(`DELETE FROM users WHERE id = ?`, [id]);
      return { success: true, message: "Student deleted successfully" };
    }
    if (action2 === "remove_parent_link") {
      const linkId = formData.get("link_id");
      await query(`DELETE FROM parent_student_links WHERE id = ?`, [linkId]);
      return { success: true, message: "Parent link removed successfully" };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
function Student() {
  var _a, _b;
  const { students, classes, schools, user, parents, studentParentLinks } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [addParent, setAddParent] = useState(false);
  const [useExistingParent, setUseExistingParent] = useState(false);
  useEffect(() => {
    if (actionData) {
      actionData.success ? toast.success(actionData.message) : toast.error(actionData.message);
      if (actionData.success) setOpenDialog(false);
    }
  }, [actionData]);
  useEffect(() => {
    if (selectedStudent == null ? void 0 : selectedStudent.date_of_birth) {
      setSelectedDate(new Date(selectedStudent.date_of_birth));
    } else {
      setSelectedDate(null);
    }
    setAddParent(false);
    setUseExistingParent(false);
  }, [selectedStudent]);
  const handleCreateStudent = () => {
    setDialogType("create");
    setSelectedStudent(null);
    setSelectedDate(null);
    setOpenDialog(true);
    setAddParent(false);
    setUseExistingParent(false);
  };
  const handleEditStudent = (student) => {
    setDialogType("update");
    setSelectedStudent(student);
    setOpenDialog(true);
  };
  const openDeleteDialog = (student) => {
    setStudentToDelete(student);
    setDeleteDialogOpen(true);
  };
  const handleDeleteStudent = () => {
    const fd = new FormData();
    fd.append("_action", "delete");
    fd.append("id", studentToDelete.id);
    submit(fd, { method: "post" });
    setDeleteDialogOpen(false);
  };
  const handleRemoveParentLink = (linkId) => {
    const fd = new FormData();
    fd.append("_action", "remove_parent_link");
    fd.append("link_id", linkId);
    submit(fd, { method: "post" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("_action", dialogType);
    if (dialogType === "update" && selectedStudent) {
      fd.append("id", selectedStudent.id);
      if (selectedStudent.profile_id) {
        fd.append("profile_id", selectedStudent.profile_id);
      }
    }
    if (selectedDate) {
      fd.set("date_of_birth", format(selectedDate, "yyyy-MM-dd"));
    }
    submit(fd, { method: "post" });
  };
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.name })
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.email })
    },
    {
      accessorKey: "enrollment_no",
      header: "Enrollment No",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.enrollment_no || "-" })
    },
    {
      accessorKey: "class_name",
      header: "Class",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.class_name || "-" })
    },
    {
      id: "parents",
      header: "Linked Parents",
      cell: ({ row }) => {
        const sid = row.original.id;
        const linked = studentParentLinks[sid] || [];
        return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 justify-center", children: linked.length > 0 ? linked.map((ln) => /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "secondary",
            className: "flex items-center gap-1",
            children: [
              ln.parent_name,
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "ml-1 text-xs hover:text-destructive",
                  onClick: () => handleRemoveParentLink(ln.id),
                  children: "×"
                }
              )
            ]
          },
          ln.id
        )) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "No parents linked" }) });
      }
    },
    {
      accessorKey: "date_of_birth",
      header: "Date of Birth",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.date_of_birth ? new Date(row.original.date_of_birth).toLocaleDateString() : "-" })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleEditStudent(row.original),
            children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => openDeleteDialog(row.original),
            children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
          }
        )
      ] })
    }
  ];
  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination }
  });
  const dialogTitle = dialogType === "create" ? "Create New Student" : "Edit Student";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Manage Students" }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleCreateStudent, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Add Student" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(TableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      ) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No students found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Fill out the form below to create a new student account." : "Update the student information." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Name" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "name",
                  name: "name",
                  placeholder: "Enter full name",
                  defaultValue: (selectedStudent == null ? void 0 : selectedStudent.name) || "",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  name: "email",
                  type: "email",
                  placeholder: "Enter email address",
                  defaultValue: (selectedStudent == null ? void 0 : selectedStudent.email) || "",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2 col-span-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "password", children: "Password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  name: "password",
                  type: "password",
                  placeholder: dialogType === "create" ? "Enter password" : "leave blank to keep current",
                  required: dialogType === "create"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "enrollment_no", children: "Enrollment Number" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "enrollment_no",
                  name: "enrollment_no",
                  type: "number",
                  placeholder: "Enter enrollment number",
                  defaultValue: (selectedStudent == null ? void 0 : selectedStudent.enrollment_no) || "",
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "date_of_birth", children: "Date of Birth" }),
              /* @__PURE__ */ jsxs(Popover, { children: [
                /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: `w-full justify-start text-left font-normal ${!selectedDate && "text-muted-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }),
                      selectedDate ? format(selectedDate, "PPP") : "Select date"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", children: /* @__PURE__ */ jsx(
                  Calendar,
                  {
                    mode: "single",
                    selected: selectedDate,
                    onSelect: setSelectedDate,
                    initialFocus: true
                  }
                ) })
              ] })
            ] }),
            classes.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "grid gap-2 col-span-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "class_id", children: "Class" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  name: "class_id",
                  defaultValue: ((_a = selectedStudent == null ? void 0 : selectedStudent.class_id) == null ? void 0 : _a.toString()) || "",
                  required: true,
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a class" }) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: classes.map((cls) => /* @__PURE__ */ jsxs(SelectItem, { value: cls.id.toString(), children: [
                      "Class ",
                      cls.name
                    ] }, cls.id)) })
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxs("div", { className: "grid gap-2 col-span-2", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "class_id", children: "Class" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No classes available for your account." }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "hidden",
                  name: "class_id",
                  value: (selectedStudent == null ? void 0 : selectedStudent.class_id) || ""
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "border-t pt-4 mt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [
              /* @__PURE__ */ jsx(
                Checkbox,
                {
                  id: "add_parent",
                  name: "add_parent",
                  checked: addParent,
                  onCheckedChange: setAddParent
                }
              ),
              /* @__PURE__ */ jsx("label", { htmlFor: "add_parent", className: "text-base font-medium", children: dialogType === "create" ? "Add parent information" : "Link or add a new parent" })
            ] }),
            addParent && /* @__PURE__ */ jsxs(Fragment, { children: [
              dialogType === "update" && selectedStudent && /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-medium mb-2", children: "Current linked parents:" }),
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ((_b = studentParentLinks[selectedStudent.id]) == null ? void 0 : _b.map(
                  (parent) => /* @__PURE__ */ jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "flex items-center gap-1",
                      children: [
                        parent.parent_name,
                        " (",
                        parent.parent_email,
                        ")",
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            className: "ml-1 text-xs hover:text-destructive",
                            type: "button",
                            onClick: () => handleRemoveParentLink(parent.id),
                            children: "×"
                          }
                        )
                      ]
                    },
                    parent.id
                  )
                )) || /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "No parents linked" }) })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [
                /* @__PURE__ */ jsx(
                  Checkbox,
                  {
                    id: "use_existing_parent",
                    checked: useExistingParent,
                    onCheckedChange: setUseExistingParent
                  }
                ),
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "use_existing_parent",
                    className: "text-sm font-medium",
                    children: "Use existing parent"
                  }
                )
              ] }),
              useExistingParent ? /* @__PURE__ */ jsxs("div", { className: "grid gap-2 mb-4", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "existing_parent_id", children: "Select Parent" }),
                /* @__PURE__ */ jsxs(Select, { name: "existing_parent_id", required: true, children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a parent" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: parents.map((parent) => /* @__PURE__ */ jsxs(
                    SelectItem,
                    {
                      value: parent.id.toString(),
                      children: [
                        parent.name,
                        " (",
                        parent.email,
                        ")"
                      ]
                    },
                    parent.id
                  )) })
                ] })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "parent_name", children: "Parent Name" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "parent_name",
                      name: "parent_name",
                      placeholder: "Enter parent full name",
                      required: addParent && !useExistingParent
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "parent_email", children: "Parent Email" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "parent_email",
                      name: "parent_email",
                      type: "email",
                      placeholder: "Enter parent email address",
                      required: addParent && !useExistingParent
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "grid gap-2 col-span-2", children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "parent_password", children: "Parent Password" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "parent_password",
                      name: "parent_password",
                      type: "password",
                      placeholder: dialogType === "create" ? "Enter parent password" : "Leave blank to set default password",
                      required: dialogType === "create" && addParent && !useExistingParent
                    }
                  )
                ] })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { className: "mt-4", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setOpenDialog(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: dialogType === "create" ? "Create Student" : "Update Student" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Student" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete student "',
          studentToDelete == null ? void 0 : studentToDelete.name,
          '"? This will also remove all parent links for this student. This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteStudent,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: Student,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
async function loader$3() {
  const [parents] = await query(
    `SELECT id, name, email, created_at FROM users WHERE role_id = ?`,
    [6]
  );
  const [students] = await query(
    `SELECT id, name, email FROM users WHERE role_id = ?`,
    [5]
  );
  const [links] = await query(
    `SELECT psl.id, psl.parent_id, psl.student_id, s.name AS student_name, s.email AS student_email
     FROM parent_student_links psl
     JOIN users s ON psl.student_id = s.id`
  );
  const parentStudentLinks = {};
  links.forEach((ln) => {
    if (!parentStudentLinks[ln.parent_id]) parentStudentLinks[ln.parent_id] = [];
    parentStudentLinks[ln.parent_id].push({
      id: ln.id,
      student_id: ln.student_id,
      student_name: ln.student_name,
      student_email: ln.student_email
    });
  });
  return { parents, students, parentStudentLinks };
}
async function action$2({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  try {
    if (action2 === "create") {
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const [existing] = await query(`SELECT id FROM users WHERE email = ?`, [
        email
      ]);
      if (existing.length > 0) {
        return {
          success: false,
          message: "A user with this email already exists. Please use a different email."
        };
      }
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      await query(
        `INSERT INTO users (name, email, password_hash, role_id) VALUES (?, ?, ?, 6)`,
        [name, email, passwordHash]
      );
      return { success: true, message: "Parent created successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      const [existing] = await query(
        `SELECT id FROM users WHERE email = ? AND id != ?`,
        [email, id]
      );
      if (existing.length > 0) {
        return {
          success: false,
          message: "A user with this email already exists. Please use a different email."
        };
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        await query(
          `UPDATE users SET name = ?, email = ?, password_hash = ? WHERE id = ?`,
          [name, email, passwordHash, id]
        );
      } else {
        await query(`UPDATE users SET name = ?, email = ? WHERE id = ?`, [
          name,
          email,
          id
        ]);
      }
      return { success: true, message: "Parent updated successfully" };
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      await query(`DELETE FROM parent_student_links WHERE parent_id = ?`, [id]);
      await query(`DELETE FROM users WHERE id = ?`, [id]);
      return { success: true, message: "Parent deleted successfully" };
    }
    if (action2 === "link_student") {
      const parent_id = formData.get("parent_id");
      const student_id = formData.get("student_id");
      const [existing] = await query(
        `SELECT id FROM parent_student_links WHERE parent_id = ? AND student_id = ?`,
        [parent_id, student_id]
      );
      if (existing.length > 0) {
        return {
          success: false,
          message: "This student is already linked to this parent."
        };
      }
      await query(
        `INSERT INTO parent_student_links (parent_id, student_id) VALUES (?, ?)`,
        [parent_id, student_id]
      );
      return { success: true, message: "Student linked successfully" };
    }
    if (action2 === "remove_link") {
      const link_id = formData.get("link_id");
      await query(`DELETE FROM parent_student_links WHERE id = ?`, [link_id]);
      return { success: true, message: "Student link removed successfully" };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
function Parent() {
  const { parents, students, parentStudentLinks } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedParent, setSelectedParent] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [parentToDelete, setParentToDelete] = useState(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [currentParentId, setCurrentParentId] = useState(null);
  useEffect(() => {
    if (actionData) {
      if (actionData.success) {
        toast.success(actionData.message);
        setOpenDialog(false);
        setLinkDialogOpen(false);
      } else {
        toast.error(actionData.message);
      }
    }
  }, [actionData]);
  const handleCreateParent = () => {
    setDialogType("create");
    setSelectedParent(null);
    setOpenDialog(true);
  };
  const handleEditParent = (parent) => {
    setDialogType("update");
    setSelectedParent(parent);
    setOpenDialog(true);
  };
  const openDeleteDialog = (parent) => {
    setParentToDelete(parent);
    setDeleteDialogOpen(true);
  };
  const handleDeleteParent = () => {
    const formData = new FormData();
    formData.append("_action", "delete");
    formData.append("id", parentToDelete.id);
    submit(formData, { method: "post" });
    setDeleteDialogOpen(false);
  };
  const handleLinkStudent = (parentId) => {
    setCurrentParentId(parentId);
    setLinkDialogOpen(true);
  };
  const handleRemoveLink = (linkId) => {
    const formData = new FormData();
    formData.append("_action", "remove_link");
    formData.append("link_id", linkId);
    submit(formData, { method: "post" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("_action", dialogType);
    if (dialogType === "update" && selectedParent) {
      formData.append("id", selectedParent.id);
    }
    submit(formData, { method: "post" });
  };
  const submitLink = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("_action", "link_student");
    formData.append("parent_id", currentParentId);
    submit(formData, { method: "post" });
  };
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.name })
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.email })
    },
    {
      id: "students",
      header: "Linked Students",
      cell: ({ row }) => {
        const pid = row.original.id;
        const linked = parentStudentLinks[pid] || [];
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 justify-center", children: [
          linked.length > 0 ? linked.map((ln) => /* @__PURE__ */ jsxs(
            Badge,
            {
              variant: "secondary",
              className: "flex items-center gap-1",
              children: [
                ln.student_name,
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "ml-1 text-xs hover:text-destructive",
                    onClick: () => handleRemoveLink(ln.id),
                    children: "×"
                  }
                )
              ]
            },
            ln.id
          )) : /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "No students linked" }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => handleLinkStudent(pid),
              className: "mt-1 h-6",
              children: /* @__PURE__ */ jsx(PlusIcon, { className: "h-3 w-3" })
            }
          )
        ] });
      }
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: new Date(row.original.created_at).toLocaleDateString() })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleEditParent(row.original),
            children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => openDeleteDialog(row.original),
            children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
          }
        )
      ] })
    }
  ];
  const table = useReactTable({
    data: parents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });
  const dialogTitle = dialogType === "create" ? "Create New Parent" : "Edit Parent";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Manage Parents" }),
      /* @__PURE__ */ jsxs(Button, { onClick: handleCreateParent, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Add Parent" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: !header.isPlaceholder && flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(TableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      ) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No parents found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Fill out the form below to create a new parent account." : "Update the parent information." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                name: "name",
                placeholder: "Enter full name",
                defaultValue: (selectedParent == null ? void 0 : selectedParent.name) || "",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                name: "email",
                type: "email",
                placeholder: "Enter email address",
                defaultValue: (selectedParent == null ? void 0 : selectedParent.email) || "",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "password", children: dialogType === "create" ? "Password" : "New Password (leave blank to keep current)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                name: "password",
                type: "password",
                placeholder: dialogType === "create" ? "Enter password" : "Enter new password or leave blank",
                required: dialogType === "create"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setOpenDialog(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: dialogType === "create" ? "Create Parent" : "Update Parent" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Parent" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete parent "',
          parentToDelete == null ? void 0 : parentToDelete.name,
          '"? This will also remove all student links for this parent. This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteParent,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: linkDialogOpen, onOpenChange: setLinkDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Link Student" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Select a student to link to this parent." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submitLink, children: [
        /* @__PURE__ */ jsx("div", { className: "grid gap-4 pb-4", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "student_id", children: "Student" }),
          /* @__PURE__ */ jsxs(Select, { name: "student_id", required: true, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a student" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: students.map((st) => /* @__PURE__ */ jsxs(SelectItem, { value: st.id.toString(), children: [
              st.name,
              " (",
              st.email,
              ")"
            ] }, st.id)) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setLinkDialogOpen(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: "Link Student" })
        ] })
      ] })
    ] }) })
  ] });
}
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: Parent,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
async function loader$2({ request }) {
  const user = await getUser(request);
  let homeworkQuery = `
    SELECT h.id, h.title, h.description, h.created_at,
           h.subject_id, h.teacher_id, 
           s.name AS subject_name,
           c.name AS class_name,
           u.name AS teacher_name
    FROM homework h
    JOIN subjects s ON h.subject_id = s.id
    JOIN classes c ON s.class_id = c.id
    JOIN users u ON h.teacher_id = u.id
  `;
  const queryParams = [];
  const whereConditions = [];
  if (user.role_name === "teacher") {
    whereConditions.push("h.teacher_id = ?");
    queryParams.push(user.id);
  } else if (user.class_ids && user.class_ids.length > 0) {
    whereConditions.push(
      `s.class_id IN (${user.class_ids.map(() => "?").join(",")})`
    );
    queryParams.push(...user.class_ids);
  } else if (user.school_id) {
    whereConditions.push("c.school_id = ?");
    queryParams.push(user.school_id);
  }
  if (whereConditions.length > 0) {
    homeworkQuery += ` WHERE ${whereConditions.join(" AND ")}`;
  }
  homeworkQuery += ` ORDER BY h.created_at DESC`;
  const [homework] = await query(homeworkQuery, queryParams);
  let subjectsQuery = `
    SELECT s.id, s.name, c.name AS class_name 
    FROM subjects s
    JOIN classes c ON s.class_id = c.id
  `;
  const subjectParams = [];
  const subjectConditions = [];
  if (user.role_name === "teacher") {
    subjectConditions.push(`
      s.id IN (
        SELECT subject_id 
        FROM teacher_assignments 
        WHERE teacher_id = ?
      )
    `);
    subjectParams.push(user.id);
  } else if (user.class_ids && user.class_ids.length > 0) {
    subjectConditions.push(
      `s.class_id IN (${user.class_ids.map(() => "?").join(",")})`
    );
    subjectParams.push(...user.class_ids);
  } else if (user.school_id) {
    subjectConditions.push("c.school_id = ?");
    subjectParams.push(user.school_id);
  }
  if (subjectConditions.length > 0) {
    subjectsQuery += ` WHERE ${subjectConditions.join(" AND ")}`;
  }
  subjectsQuery += ` ORDER BY c.name, s.name`;
  const [subjects] = await query(subjectsQuery, subjectParams);
  return { user, homework, subjects };
}
async function action$1({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  const user = await getUser(request);
  try {
    if (action2 === "create") {
      if (user.role_name !== "teacher") {
        return { success: false, message: "Only teachers can create homework" };
      }
      const title = formData.get("title");
      const description = formData.get("description");
      const subject_id = formData.get("subject_id");
      const teacher_id = user.id;
      await query(
        `INSERT INTO homework (title, description, subject_id, teacher_id)
         VALUES (?, ?, ?, ?)`,
        [title, description, subject_id, teacher_id]
      );
      return { success: true, message: "Homework created successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const title = formData.get("title");
      const description = formData.get("description");
      const subject_id = formData.get("subject_id");
      if (user.role_name !== "teacher") {
        return { success: false, message: "Only teachers can update homework" };
      } else {
        await query(
          `UPDATE homework
           SET title = ?, description = ?, subject_id = ?
           WHERE id = ? AND teacher_id = ?`,
          [title, description, subject_id, id, user.id]
        );
      }
      return { success: true, message: "Homework updated successfully" };
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      if (user.role_name !== "teacher") {
        return { success: false, message: "Only teachers can delete homework" };
      } else {
        await query(`DELETE FROM homework WHERE id = ? AND teacher_id = ?`, [
          id,
          user.id
        ]);
      }
      return { success: true, message: "Homework deleted successfully" };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
function Homework() {
  var _a;
  const { homework, subjects, user } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [homeworkToDelete, setHomeworkToDelete] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [homeworkToView, setHomeworkToView] = useState(null);
  useEffect(() => {
    if (actionData) {
      actionData.success ? toast.success(actionData.message) : toast.error(actionData.message);
      if (actionData.success) {
        setOpenDialog(false);
        setDeleteDialogOpen(false);
      }
    }
  }, [actionData]);
  const handleCreateHomework = () => {
    setDialogType("create");
    setSelectedHomework(null);
    setOpenDialog(true);
  };
  const handleEditHomework = (homework2) => {
    setDialogType("update");
    setSelectedHomework(homework2);
    setOpenDialog(true);
  };
  const handleViewHomework = (homework2) => {
    setHomeworkToView(homework2);
    setViewDialogOpen(true);
  };
  const openDeleteDialog = (homework2) => {
    setHomeworkToDelete(homework2);
    setDeleteDialogOpen(true);
  };
  const handleDeleteHomework = () => {
    const fd = new FormData();
    fd.append("_action", "delete");
    fd.append("id", homeworkToDelete.id);
    submit(fd, { method: "post" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("_action", dialogType);
    if (dialogType === "update" && selectedHomework) {
      fd.append("id", selectedHomework.id);
    }
    submit(fd, { method: "post" });
  };
  const canModify = (homework2) => {
    return user.role_name === "teacher" && homework2.teacher_id === user.id;
  };
  const isTeacher = user.role_name === "teacher";
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.title })
    },
    {
      accessorKey: "subject_name",
      header: "Subject",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        row.original.subject_name,
        " (",
        row.original.class_name,
        ")"
      ] })
    },
    {
      accessorKey: "teacher_name",
      header: "Teacher",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.teacher_name })
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: new Date(row.original.created_at).toLocaleDateString() })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleViewHomework(row.original),
            children: /* @__PURE__ */ jsx(EyeIcon, { className: "size-4" })
          }
        ),
        canModify(row.original) && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => handleEditHomework(row.original),
              children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => openDeleteDialog(row.original),
              children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
            }
          )
        ] })
      ] })
    }
  ];
  const table = useReactTable({
    data: homework,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });
  const dialogTitle = dialogType === "create" ? "Create New Homework" : "Edit Homework";
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Manage Homework" }),
      isTeacher && /* @__PURE__ */ jsxs(Button, { onClick: handleCreateHomework, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Add Homework" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(TableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      ) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No homework assignments found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    isTeacher && /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Fill out the form below to create a new homework assignment." : "Update the homework information." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-6 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "title", children: "Title" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "title",
                name: "title",
                placeholder: "Enter homework title",
                defaultValue: (selectedHomework == null ? void 0 : selectedHomework.title) || "",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "subject_id", children: "Subject" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                name: "subject_id",
                defaultValue: ((_a = selectedHomework == null ? void 0 : selectedHomework.subject_id) == null ? void 0 : _a.toString()) || "",
                required: true,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a subject" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: subjects.map((subject) => /* @__PURE__ */ jsxs(
                    SelectItem,
                    {
                      value: subject.id.toString(),
                      children: [
                        subject.name,
                        " (Class ",
                        subject.class_name,
                        ")"
                      ]
                    },
                    subject.id
                  )) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "description", children: "Description" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "description",
                name: "description",
                placeholder: "Enter homework description",
                rows: 5,
                defaultValue: (selectedHomework == null ? void 0 : selectedHomework.description) || "",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              onClick: () => setOpenDialog(false),
              type: "button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", children: dialogType === "create" ? "Create Homework" : "Update Homework" })
        ] })
      ] })
    ] }) }),
    isTeacher && /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Homework" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete the homework "',
          homeworkToDelete == null ? void 0 : homeworkToDelete.title,
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteHomework,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: viewDialogOpen, onOpenChange: setViewDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(BookOpenIcon, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { children: "Homework Details" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "title", className: "text-sm font-medium", children: "Title" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              id: "title",
              value: homeworkToView == null ? void 0 : homeworkToView.title,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "subject", className: "text-sm font-medium", children: "Subject" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              id: "subject",
              value: `${homeworkToView == null ? void 0 : homeworkToView.subject_name} (${homeworkToView == null ? void 0 : homeworkToView.class_name})`,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "teacher", className: "text-sm font-medium", children: "Teacher" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              id: "teacher",
              value: homeworkToView == null ? void 0 : homeworkToView.teacher_name,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "created_at", className: "text-sm font-medium", children: "Created At" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              id: "created_at",
              value: new Date(homeworkToView == null ? void 0 : homeworkToView.created_at).toLocaleString(),
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "description", className: "text-sm font-medium", children: "Description" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "description",
              value: homeworkToView == null ? void 0 : homeworkToView.description,
              readOnly: true,
              rows: 5
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Homework,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const feedbackStatements = {
  academic: [
    "My child has shown noticeable improvement in academic performance.",
    "The hybrid system has helped my child stay focused and organized.",
    "My child is completing assignments and homework more consistently.",
    "Teachers provide timely and effective academic support.",
    "The curriculum is well-balanced between in-person and online learning."
  ],
  behavioral: [
    "My child has become more self-disciplined and responsible.",
    "There has been a positive change in my child's attitude toward learning.",
    "My child actively participates in both online and in-person sessions.",
    "The hybrid model supports my child's emotional and social development.",
    "My child is balancing screen time and physical activity effectively."
  ],
  satisfaction: [
    "I am satisfied with the hybrid learning experience overall.",
    "Communication between the school and parents is clear and consistent.",
    "I would recommend this hybrid model to other parents."
  ]
};
const sectionLabels = {
  academic: "Academic",
  behavioral: "Behavioral",
  satisfaction: "Overall"
};
const ratingLabels = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree"
};
async function loader$1({ request }) {
  const user = await getUser(request);
  const isParent = user.role_name === "parent";
  const isSuperAdmin = user.role_name === "super_admin";
  if (!isParent && !isSuperAdmin) {
    return {
      user,
      feedback: [],
      children: [],
      message: "Access denied. Only parents and administrators can access feedback."
    };
  }
  let feedbackQuery = `
    SELECT f.id, f.title, f.description, f.created_at,
           f.parent_id, f.student_id, 
           p.name AS parent_name,
           s.name AS student_name
    FROM parent_feedback f
    JOIN users p ON f.parent_id = p.id
    JOIN users s ON f.student_id = s.id
  `;
  const queryParams = [];
  const whereConditions = [];
  if (isParent) {
    whereConditions.push("f.parent_id = ?");
    queryParams.push(user.id);
  }
  if (whereConditions.length > 0) {
    feedbackQuery += ` WHERE ${whereConditions.join(" AND ")}`;
  }
  feedbackQuery += ` ORDER BY f.created_at DESC`;
  const [feedback] = await query(feedbackQuery, queryParams);
  for (const item of feedback) {
    const [feedbackItems] = await query(
      `SELECT * FROM parent_feedback_items WHERE feedback_id = ? ORDER BY section, statement_id`,
      [item.id]
    );
    item.items = feedbackItems;
  }
  let children = [];
  if (isParent && user.student_ids && user.student_ids.length > 0) {
    const studentIds = user.student_ids;
    const studentPlaceholders = studentIds.map(() => "?").join(",");
    const childrenQuery = `
      SELECT id, name 
      FROM users 
      WHERE id IN (${studentPlaceholders})
      ORDER BY name
    `;
    const [studentsResult] = await query(childrenQuery, studentIds);
    children = studentsResult;
  } else if (isSuperAdmin) {
    const [studentsResult] = await query(`
      SELECT id, name 
      FROM users 
      WHERE role_id = '5'
      ORDER BY name
    `);
    children = studentsResult;
  }
  return { user, feedback, children };
}
async function action({ request }) {
  const formData = await request.formData();
  const action2 = formData.get("_action");
  const user = await getUser(request);
  if (user.role_name !== "parent" && user.role_name !== "super_admin") {
    return {
      success: false,
      message: "Access denied. Only parents can submit feedback."
    };
  }
  try {
    if (action2 === "create") {
      const title = formData.get("title");
      const student_id = formData.get("student_id");
      const parent_id = user.id;
      const [result] = await query(
        `INSERT INTO parent_feedback (title, student_id, parent_id)
         VALUES (?, ?, ?)`,
        [title, student_id, parent_id]
      );
      const feedbackId = result.insertId;
      const sections = ["academic", "behavioral", "satisfaction"];
      for (const section of sections) {
        const statements = feedbackStatements[section];
        for (let i = 0; i < statements.length; i++) {
          const ratingKey = `${section}_rating_${i}`;
          const commentKey = `${section}_comment_${i}`;
          const rating = formData.get(ratingKey);
          const comment = formData.get(commentKey) || null;
          if (rating) {
            await query(
              `INSERT INTO parent_feedback_items (feedback_id, section, statement_id, rating, comment)
               VALUES (?, ?, ?, ?, ?)`,
              [feedbackId, section, i, rating, comment]
            );
          }
        }
      }
      return { success: true, message: "Feedback submitted successfully" };
    }
    if (action2 === "update") {
      const id = formData.get("id");
      const title = formData.get("title");
      const student_id = formData.get("student_id");
      if (user.role_name === "super_admin") {
        await query(
          `UPDATE parent_feedback
           SET title = ?, student_id = ?
           WHERE id = ?`,
          [title, student_id, id]
        );
      } else {
        await query(
          `UPDATE parent_feedback
           SET title = ?, student_id = ?
           WHERE id = ? AND parent_id = ?`,
          [title, student_id, id, user.id]
        );
      }
      await query("DELETE FROM parent_feedback_items WHERE feedback_id = ?", [
        id
      ]);
      const sections = ["academic", "behavioral", "satisfaction"];
      for (const section of sections) {
        const statements = feedbackStatements[section];
        for (let i = 0; i < statements.length; i++) {
          const ratingKey = `${section}_rating_${i}`;
          const commentKey = `${section}_comment_${i}`;
          const rating = formData.get(ratingKey);
          const comment = formData.get(commentKey) || null;
          if (rating) {
            await query(
              `INSERT INTO parent_feedback_items (feedback_id, section, statement_id, rating, comment)
               VALUES (?, ?, ?, ?, ?)`,
              [id, section, i, rating, comment]
            );
          }
        }
      }
      return { success: true, message: "Feedback updated successfully" };
    }
    if (action2 === "delete") {
      const id = formData.get("id");
      if (user.role_name === "super_admin") {
        await query(`DELETE FROM parent_feedback WHERE id = ?`, [id]);
      } else {
        await query(
          `DELETE FROM parent_feedback WHERE id = ? AND parent_id = ?`,
          [id, user.id]
        );
      }
      return { success: true, message: "Feedback deleted successfully" };
    }
    return { success: false, message: "Invalid action" };
  } catch (error) {
    return { success: false, message: error.message || "An error occurred" };
  }
}
function Feedback() {
  var _a;
  const { feedback, children, user, message } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();
  useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [feedbackToView, setFeedbackToView] = useState(null);
  const [activeTab, setActiveTab] = useState("academic");
  const [ratings, setRatings] = useState({});
  const isParent = user.role_name === "parent";
  const isSuperAdmin = user.role_name === "super_admin";
  useEffect(() => {
    if (actionData) {
      actionData.success ? toast.success(actionData.message) : toast.error(actionData.message);
      if (actionData.success) {
        setOpenDialog(false);
        setDeleteDialogOpen(false);
      }
    }
  }, [actionData]);
  useEffect(() => {
    if (openDialog && dialogType === "create") {
      setRatings({});
      setActiveTab("academic");
    } else if (openDialog && dialogType === "update" && selectedFeedback) {
      const newRatings = {};
      if (selectedFeedback.items) {
        selectedFeedback.items.forEach((item) => {
          const ratingKey = `${item.section}_rating_${item.statement_id}`;
          const commentKey = `${item.section}_comment_${item.statement_id}`;
          newRatings[ratingKey] = item.rating.toString();
          if (item.comment) {
            newRatings[commentKey] = item.comment;
          }
        });
      }
      setRatings(newRatings);
      setActiveTab("academic");
    }
  }, [openDialog, dialogType, selectedFeedback]);
  if (!isParent && !isSuperAdmin) {
    return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-6 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-red-600 mb-4", children: "Access Denied" }),
      /* @__PURE__ */ jsx("p", { children: "Only parents and administrators can access the feedback system." })
    ] });
  }
  const handleCreateFeedback = () => {
    setDialogType("create");
    setSelectedFeedback(null);
    setOpenDialog(true);
  };
  const handleEditFeedback = (feedback2) => {
    setDialogType("update");
    setSelectedFeedback(feedback2);
    setOpenDialog(true);
  };
  const handleViewFeedback = (feedback2) => {
    setFeedbackToView(feedback2);
    setViewDialogOpen(true);
  };
  const openDeleteDialog = (feedback2) => {
    setFeedbackToDelete(feedback2);
    setDeleteDialogOpen(true);
  };
  const handleDeleteFeedback = () => {
    const fd = new FormData();
    fd.append("_action", "delete");
    fd.append("id", feedbackToDelete.id);
    submit(fd, { method: "post" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.append("_action", dialogType);
    if (dialogType === "update" && selectedFeedback) {
      fd.append("id", selectedFeedback.id);
    }
    Object.keys(ratings).forEach((key) => {
      if (ratings[key]) {
        fd.append(key, ratings[key]);
      }
    });
    submit(fd, { method: "post" });
  };
  const handleRatingChange = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };
  const handleCommentChange = (key, e) => {
    setRatings((prev) => ({ ...prev, [key]: e.target.value }));
  };
  const handleNextTab = () => {
    if (activeTab === "academic") {
      setActiveTab("behavioral");
    } else if (activeTab === "behavioral") {
      setActiveTab("satisfaction");
    }
  };
  const canModify = (feedback2) => {
    return isParent && feedback2.parent_id === user.id;
  };
  const renderRatingSection = (section, statements) => {
    return /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: statements.map((statement, index) => {
      const ratingKey = `${section}_rating_${index}`;
      const commentKey = `${section}_comment_${index}`;
      const ratingValue = ratings[ratingKey] || "";
      const commentValue = ratings[commentKey] || "";
      return /* @__PURE__ */ jsxs("div", { className: "border rounded-md p-4", children: [
        /* @__PURE__ */ jsx("div", { className: "font-medium mb-2", children: statement }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "mb-2 block", children: "Rating (1-5)" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: ratingValue,
                onValueChange: (value) => handleRatingChange(ratingKey, value),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a rating" }) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: Object.entries(ratingLabels).map(([value, label]) => /* @__PURE__ */ jsxs(SelectItem, { value, children: [
                    value,
                    " - ",
                    label
                  ] }, value)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "mb-2 block", children: "Comments (optional)" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                value: commentValue,
                onChange: (e) => handleCommentChange(commentKey, e),
                placeholder: "Add any additional comments here",
                rows: 2
              }
            )
          ] })
        ] })
      ] }, ratingKey);
    }) });
  };
  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.title })
    },
    {
      accessorKey: "student_name",
      header: "Student",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.student_name })
    },
    {
      accessorKey: "parent_name",
      header: "Parent",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: row.original.parent_name })
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { className: "text-center", children: new Date(row.original.created_at).toLocaleDateString() })
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => handleViewFeedback(row.original),
            children: /* @__PURE__ */ jsx(EyeIcon, { className: "size-4" })
          }
        ),
        canModify(row.original) && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => handleEditFeedback(row.original),
              children: /* @__PURE__ */ jsx(PencilIcon, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => openDeleteDialog(row.original),
              children: /* @__PURE__ */ jsx(TrashIcon, { className: "size-4" })
            }
          )
        ] })
      ] })
    }
  ];
  const table = useReactTable({
    data: feedback,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  });
  const dialogTitle = dialogType === "create" ? "Submit New Feedback" : "Edit Feedback";
  const renderViewRatingSection = (section, items) => {
    if (!items || items.length === 0) return null;
    const sectionItems = items.filter((item) => item.section === section);
    if (sectionItems.length === 0) return null;
    return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: feedbackStatements[section].map((statement, index) => {
      const item = sectionItems.find(
        (i) => parseInt(i.statement_id) === index
      );
      if (!item) return null;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "border rounded-md p-4",
          children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium", children: statement }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center mt-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold mr-2", children: "Rating:" }),
              /* @__PURE__ */ jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(
                StarIcon,
                {
                  className: `h-5 w-5 ${star <= parseInt(item.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`
                },
                star
              )) }),
              /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm text-gray-600", children: [
                "(",
                item.rating,
                " - ",
                ratingLabels[parseInt(item.rating)],
                ")"
              ] })
            ] }) }),
            item.comment && /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Comment:" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm mt-1 text-gray-700", children: item.comment })
            ] })
          ]
        },
        `view_${section}_${index}`
      );
    }) });
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto pb-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx("span", { className: "ml-2 pt-2 text-xl font-semibold", children: "Parent Feedback" }),
      isParent && /* @__PURE__ */ jsxs(Button, { onClick: handleCreateFeedback, children: [
        /* @__PURE__ */ jsx(PlusIcon, { className: "mr-2 h-4 w-4" }),
        /* @__PURE__ */ jsx("span", { children: "Submit Feedback" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((hg) => /* @__PURE__ */ jsx(TableRow, { children: hg.headers.map((header) => /* @__PURE__ */ jsx(TableHead, { className: "text-center", children: header.isPlaceholder ? null : flexRender(
        header.column.columnDef.header,
        header.getContext()
      ) }, header.id)) }, hg.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx(TableRow, { children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(TableCell, { className: "text-center", children: flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      ) }, cell.id)) }, row.id)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-24 text-center",
          children: "No feedback found."
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end space-x-2 py-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.previousPage(),
          disabled: !table.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => table.nextPage(),
          disabled: !table.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: dialogTitle }),
        /* @__PURE__ */ jsx(DialogDescription, { children: dialogType === "create" ? "Fill out the form below to submit new feedback." : "Update your feedback information." })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6 pb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "title", children: "Title" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "title",
              name: "title",
              placeholder: "Enter feedback title",
              defaultValue: (selectedFeedback == null ? void 0 : selectedFeedback.title) || "",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "student_id", children: "Student" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              name: "student_id",
              defaultValue: ((_a = selectedFeedback == null ? void 0 : selectedFeedback.student_id) == null ? void 0 : _a.toString()) || "",
              required: true,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a student" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: children.map((child) => /* @__PURE__ */ jsx(SelectItem, { value: child.id.toString(), children: child.name }, child.id)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "academic", children: "Academic" }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "behavioral", children: "Behavioral" }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "satisfaction", children: "Overall" })
          ] }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "academic", className: "mt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: sectionLabels.academic }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Please rate each statement from 1-5 (1: Strongly Disagree to 5: Strongly Agree)" })
            ] }),
            renderRatingSection(
              "academic",
              feedbackStatements.academic
            ),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleNextTab, children: "Next" }) })
          ] }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "behavioral", className: "mt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: sectionLabels.behavioral }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Please rate each statement from 1-5 (1: Strongly Disagree to 5: Strongly Agree)" })
            ] }),
            renderRatingSection(
              "behavioral",
              feedbackStatements.behavioral
            ),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleNextTab, children: "Next" }) })
          ] }),
          /* @__PURE__ */ jsxs(TabsContent, { value: "satisfaction", className: "mt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: sectionLabels.satisfaction }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Please rate each statement from 1-5 (1: Strongly Disagree to 5: Strongly Agree)" })
            ] }),
            renderRatingSection(
              "satisfaction",
              feedbackStatements.satisfaction
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 mt-6", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => setOpenDialog(false),
                  type: "button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(Button, { type: "submit", children: dialogType === "create" ? "Submit Feedback" : "Update Feedback" })
            ] })
          ] })
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(AlertDialog, { open: deleteDialogOpen, onOpenChange: setDeleteDialogOpen, children: /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Delete Feedback" }),
        /* @__PURE__ */ jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete the feedback "',
          feedbackToDelete == null ? void 0 : feedbackToDelete.title,
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "flex justify-end", children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            onClick: handleDeleteFeedback,
            className: "bg-destructive hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: viewDialogOpen, onOpenChange: setViewDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(MessageSquareIcon, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { children: "Feedback Details" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "title", className: "text-sm font-medium", children: "Title" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              id: "title",
              value: feedbackToView == null ? void 0 : feedbackToView.title,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "student", className: "text-sm font-medium", children: "Student" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              id: "student",
              value: feedbackToView == null ? void 0 : feedbackToView.student_name,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "parent", className: "text-sm font-medium", children: "Parent" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              id: "parent",
              value: feedbackToView == null ? void 0 : feedbackToView.parent_name,
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "created_at", className: "text-sm font-medium", children: "Created At" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "text",
              id: "created_at",
              value: new Date(feedbackToView == null ? void 0 : feedbackToView.created_at).toLocaleString(),
              readOnly: true
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-2 mt-4", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: "academic", children: [
          /* @__PURE__ */ jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [
            /* @__PURE__ */ jsx(TabsTrigger, { value: "academic", children: sectionLabels.academic }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "behavioral", children: sectionLabels.behavioral }),
            /* @__PURE__ */ jsx(TabsTrigger, { value: "satisfaction", children: sectionLabels.satisfaction })
          ] }),
          /* @__PURE__ */ jsx(TabsContent, { value: "academic", className: "mt-4", children: renderViewRatingSection("academic", feedbackToView == null ? void 0 : feedbackToView.items) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "behavioral", className: "mt-4", children: renderViewRatingSection("behavioral", feedbackToView == null ? void 0 : feedbackToView.items) }),
          /* @__PURE__ */ jsx(TabsContent, { value: "satisfaction", className: "mt-4", children: renderViewRatingSection(
            "satisfaction",
            feedbackToView == null ? void 0 : feedbackToView.items
          ) })
        ] }) })
      ] })
    ] }) })
  ] });
}
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: Feedback,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const getStatusBadge = (status) => {
  const statusConfig = {
    scheduled: { color: "bg-blue-100 text-blue-800", icon: Clock, text: "Scheduled" },
    live: { color: "bg-red-100 text-red-800", icon: Play, text: "Live Now" },
    completed: { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "Completed" },
    cancelled: { color: "bg-gray-100 text-gray-800", icon: Clock, text: "Cancelled" }
  };
  const config = statusConfig[status] || statusConfig.scheduled;
  const Icon = config.icon;
  return /* @__PURE__ */ jsxs(Badge, { className: `${config.color} flex items-center gap-1`, children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-3 w-3" }),
    config.text
  ] });
};
const extractYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
const getYouTubeThumbnail = (url) => {
  const videoId = extractYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgMTIwTDE3MCA5MEwxMzAgNjBWMTIwWiIgZmlsbD0iI0VGNDQ0NCIvPgo8L3N2Zz4K";
};
async function loader({ request }) {
  var _a;
  const user = await getUser(request);
  if (!user) return redirect$1("/login");
  if (user.role_name !== "student") {
    throw new Response("Access denied. Only students can view live classes.", { status: 403 });
  }
  const [studentProfile] = await query(`
    SELECT class_id, schools_id 
    FROM student_profiles 
    WHERE user_id = ?
  `, [user.id]);
  if (!studentProfile || studentProfile.length === 0) {
    throw new Response("Student profile not found", { status: 404 });
  }
  const classId = studentProfile[0].class_id;
  const schoolId = studentProfile[0].schools_id;
  const [liveClasses] = await query(`
    SELECT lc.*, 
           s.name as subject_name, 
           c.name as class_name, 
           u.name as teacher_name,
           sch.name as school_name
    FROM live_classes lc
    LEFT JOIN subjects s ON lc.subject_id = s.id
    JOIN classes c ON lc.class_id = c.id
    JOIN users u ON lc.teacher_id = u.id
    LEFT JOIN schools sch ON lc.school_id = sch.id
    WHERE lc.class_id = ? AND (lc.school_id = ? OR lc.is_all_schools = 1) AND lc.is_active = 1
    ORDER BY 
      CASE 
        WHEN lc.status = 'live' THEN 1
        WHEN lc.status = 'scheduled' THEN 2
        WHEN lc.status = 'completed' THEN 3
        ELSE 4
      END,
      lc.start_time ASC,
      lc.created_at DESC
  `, [classId, schoolId]);
  const [subjects] = await query("SELECT * FROM subjects ORDER BY name");
  const [schoolInfo] = await query("SELECT name FROM schools WHERE id = ?", [schoolId]);
  const schoolName = ((_a = schoolInfo[0]) == null ? void 0 : _a.name) || "Unknown School";
  return { liveClasses, subjects, user, classId, schoolId, schoolName };
}
function StudentLiveClasses() {
  const { liveClasses, subjects, user, schoolName } = useLoaderData();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    subject: "all",
    status: "all",
    date: "all"
  });
  const handleWatchLive = (liveClass) => {
    window.open(liveClass.youtube_live_link, "_blank");
  };
  const updatedLiveClasses = liveClasses.map((lc) => {
    if (!lc.start_time) return lc;
    const now = /* @__PURE__ */ new Date();
    const start = new Date(lc.start_time);
    const end = lc.end_time ? new Date(lc.end_time) : null;
    let status = lc.status;
    if (now < start) status = "upcoming";
    else if (end && now > end) status = "completed";
    else if (now >= start && (!end || now <= end)) status = "live";
    return { ...lc, status };
  });
  const filteredLiveClasses = updatedLiveClasses.filter((lc) => {
    var _a, _b, _c;
    const matchesSearch = !filters.search || lc.title.toLowerCase().includes(filters.search.toLowerCase()) || ((_a = lc.topic_name) == null ? void 0 : _a.toLowerCase().includes(filters.search.toLowerCase())) || ((_b = lc.teacher_name) == null ? void 0 : _b.toLowerCase().includes(filters.search.toLowerCase()));
    const matchesSubject = filters.subject === "all" || ((_c = lc.subject_id) == null ? void 0 : _c.toString()) === filters.subject;
    const matchesStatus = filters.status === "all" || lc.status === filters.status;
    const matchesDate = filters.date === "all" || (() => {
      if (!lc.start_time) return filters.date === "all";
      const classDate = new Date(lc.start_time).toDateString();
      const today = (/* @__PURE__ */ new Date()).toDateString();
      const tomorrow = new Date(Date.now() + 864e5).toDateString();
      switch (filters.date) {
        case "today":
          return classDate === today;
        case "tomorrow":
          return classDate === tomorrow;
        case "this_week": {
          const weekFromNow = new Date(Date.now() + 7 * 864e5);
          return new Date(lc.start_time) <= weekFromNow;
        }
        default:
          return true;
      }
    })();
    return matchesSearch && matchesSubject && matchesStatus && matchesDate;
  });
  const liveSessions = filteredLiveClasses.filter((lc) => lc.status === "live");
  const upcomingSessions = filteredLiveClasses.filter((lc) => lc.status === "upcoming" || lc.status === "scheduled");
  const completedSessions = filteredLiveClasses.filter((lc) => lc.status === "completed");
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Live Classes" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
        schoolName,
        " - Watch live lectures and access recorded sessions"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "mb-6", children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Filter, { className: "h-5 w-5" }),
        "Filter Classes"
      ] }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search lectures...",
              value: filters.search,
              onChange: (e) => setFilters((prev) => ({ ...prev, search: e.target.value })),
              className: "pl-8"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.subject, onValueChange: (value) => setFilters((prev) => ({ ...prev, subject: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Subjects" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Subjects" }),
            subjects.map((subject) => /* @__PURE__ */ jsx(SelectItem, { value: subject.id.toString(), children: subject.name }, subject.id))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.status, onValueChange: (value) => setFilters((prev) => ({ ...prev, status: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Status" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Status" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "live", children: "Live Now" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "upcoming", children: "Upcoming" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "completed", children: "Completed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: filters.date, onValueChange: (value) => setFilters((prev) => ({ ...prev, date: value })), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Dates" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Dates" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "today", children: "Today" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "tomorrow", children: "Tomorrow" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "this_week", children: "This Week" })
          ] })
        ] })
      ] }) })
    ] }),
    liveSessions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold mb-4 text-red-600 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Play, { className: "h-6 w-6" }),
        "Live Now"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: liveSessions.map((liveClass) => /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden border-red-200 bg-red-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-video", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: getYouTubeThumbnail(liveClass.youtube_live_link),
              alt: liveClass.title,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgMTIwTDE3MCA5MEwxMzAgNjBWMTIwWiIgZmlsbD0iI0VGNDQ0NCIvPgo8L3N2Zz4K";
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse", children: [
            /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-white rounded-full" }),
            "LIVE"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-1 line-clamp-2", children: liveClass.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-3 line-clamp-1", children: liveClass.topic_name }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-700 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Teacher:" }),
              /* @__PURE__ */ jsx("span", { children: liveClass.teacher_name })
            ] }),
            liveClass.subject_name && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Subject:" }),
              /* @__PURE__ */ jsx("span", { children: liveClass.subject_name })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              className: "w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200",
              onClick: () => handleWatchLive(liveClass),
              children: [
                /* @__PURE__ */ jsx(Play, { className: "mr-2 h-5 w-5" }),
                "Join Live Session"
              ]
            }
          )
        ] })
      ] }, liveClass.id)) })
    ] }),
    upcomingSessions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-6 w-6" }),
        "Upcoming Sessions"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: upcomingSessions.map((liveClass) => /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-video", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: getYouTubeThumbnail(liveClass.youtube_live_link),
              alt: liveClass.title,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgMTIwTDE3MCA5MEwxMzAgNjBWMTIwWiIgZmlsbD0iI0VGNDQ0NCIvPgo8L3N2Zz4K";
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3", children: getStatusBadge(liveClass.status) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-1 line-clamp-2", children: liveClass.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-3 line-clamp-1", children: liveClass.topic_name }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-700 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Teacher:" }),
              /* @__PURE__ */ jsx("span", { children: liveClass.teacher_name })
            ] }),
            liveClass.subject_name && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Subject:" }),
              /* @__PURE__ */ jsx("span", { children: liveClass.subject_name })
            ] }),
            liveClass.start_time && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Starts:" }),
              /* @__PURE__ */ jsx("span", { className: "text-blue-600 font-medium", children: new Date(liveClass.start_time).toLocaleString() })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200",
              onClick: () => handleWatchLive(liveClass),
              children: [
                /* @__PURE__ */ jsx(Clock, { className: "mr-2 h-4 w-4" }),
                "Preview Session"
              ]
            }
          )
        ] })
      ] }, liveClass.id)) })
    ] }),
    completedSessions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(CheckCircle, { className: "h-6 w-6" }),
        "Completed Sessions"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: completedSessions.map((liveClass) => /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-gray-50", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-video", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: getYouTubeThumbnail(liveClass.youtube_live_link),
              alt: liveClass.title,
              className: "w-full h-full object-cover opacity-80",
              onError: (e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMzAgMTIwTDE3MCA5MEwxMzAgNjBWMTIwWiIgZmlsbD0iI0VGNDQ0NCIvPgo8L3N2Zz4K";
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-3", children: getStatusBadge(liveClass.status) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-lg mb-1 line-clamp-2 text-gray-800", children: liveClass.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-3 line-clamp-1", children: liveClass.topic_name }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-gray-700 mb-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Teacher:" }),
              /* @__PURE__ */ jsx("span", { children: liveClass.teacher_name })
            ] }),
            liveClass.subject_name && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Subject:" }),
              /* @__PURE__ */ jsx("span", { children: liveClass.subject_name })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full border-green-200 hover:bg-green-50 hover:border-green-300 transition-colors duration-200",
              onClick: () => handleWatchLive(liveClass),
              children: [
                /* @__PURE__ */ jsx(Play, { className: "mr-2 h-4 w-4" }),
                "Watch Recording"
              ]
            }
          )
        ] })
      ] }, liveClass.id)) })
    ] }),
    filteredLiveClasses.length === 0 && liveClasses.length > 0 && /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(Filter, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "No Classes Match Your Filters" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Try adjusting your filters to see more live classes." })
    ] }) }),
    liveClasses.length === 0 && /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(Clock, { className: "mx-auto h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "No Live Classes Available" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "There are currently no live classes scheduled for your class. Check back later!" })
    ] }) }),
    /* @__PURE__ */ jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh]", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: selectedVideo == null ? void 0 : selectedVideo.title }),
        /* @__PURE__ */ jsxs(DialogDescription, { children: [
          selectedVideo == null ? void 0 : selectedVideo.topic_name,
          " - ",
          selectedVideo == null ? void 0 : selectedVideo.teacher_name
        ] })
      ] }),
      selectedVideo && /* @__PURE__ */ jsx("div", { className: "aspect-video", children: selectedVideo.videoId ? /* @__PURE__ */ jsx(
        "iframe",
        {
          width: "100%",
          height: "100%",
          src: `https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`,
          title: selectedVideo.title,
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true,
          className: "rounded-lg"
        }
      ) : /* @__PURE__ */ jsx(
        "iframe",
        {
          width: "100%",
          height: "100%",
          src: selectedVideo.youtube_live_link,
          title: selectedVideo.title,
          frameBorder: "0",
          allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true,
          className: "rounded-lg"
        }
      ) })
    ] }) })
  ] });
}
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StudentLiveClasses,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-tWtejC-A.js", "imports": ["/assets/components-DNEopB8l.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-22k1P0P_.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js"], "css": ["/assets/root-BqkLYzrV.css"] }, "./pages/index": { "id": "./pages/index", "parentId": "root", "path": "/", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CCiJZfa1.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/button-DmCSXUvz.js", "/assets/card-C6ZhIbSz.js", "/assets/school-CdVvG36K.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/book-open-DGBbRqVw.js"], "css": [] }, "./pages/login": { "id": "./pages/login", "parentId": "root", "path": "/login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-DySJ-A0M.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/card-C6ZhIbSz.js", "/assets/input-B4036BWQ.js", "/assets/label-CqMZDcZc.js", "/assets/button-DmCSXUvz.js", "/assets/index-bREvOmy8.js"], "css": [] }, "./components/layout": { "id": "./components/layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/layout-DabJQaJz.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/button-DmCSXUvz.js", "/assets/chevron-right-Sm6q8V6a.js", "/assets/index-B1Wa2_Lw.js", "/assets/x-BMWVmNVa.js", "/assets/index-DI9OIEKY.js", "/assets/index-hRx_RXvi.js", "/assets/index-Czq8eJ6L.js", "/assets/index-bREvOmy8.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/school-CdVvG36K.js", "/assets/book-open-DGBbRqVw.js", "/assets/index-Beviy4mB.js"], "css": [] }, "./pages/logout": { "id": "./pages/logout", "parentId": "./components/layout", "path": "/logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-CSxRPO1x.js", "imports": [], "css": [] }, "./pages/dashboard": { "id": "./pages/dashboard", "parentId": "./components/layout", "path": "dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/dashboard-CAGvvoue.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/button-DmCSXUvz.js", "/assets/card-C6ZhIbSz.js", "/assets/select-0BSzPRfs.js", "/assets/popover-PgOMidk7.js", "/assets/format-CkqhGn1q.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/chevron-right-Sm6q8V6a.js", "/assets/index-Czq8eJ6L.js"], "css": [] }, "./pages/school": { "id": "./pages/school", "parentId": "./components/layout", "path": "/school", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/school-crdQt9_O.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/textarea-CJU3mRXV.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/select-0BSzPRfs.js", "/assets/index-C_3qY_oq.js", "/assets/table-CALqcIIP.js", "/assets/plus-CdrJRhaZ.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js"], "css": [] }, "./pages/teacher": { "id": "./pages/teacher", "parentId": "./components/layout", "path": "/teacher", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/teacher-DCOq4pjq.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/select-0BSzPRfs.js", "/assets/index-C_3qY_oq.js", "/assets/table-CALqcIIP.js", "/assets/badge-DjLCa4jX.js", "/assets/plus-CdrJRhaZ.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js"], "css": [] }, "./pages/live-class": { "id": "./pages/live-class", "parentId": "./components/layout", "path": "/live-class", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/live-class-PSaBfUtR.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/card-C6ZhIbSz.js", "/assets/input-B4036BWQ.js", "/assets/label-CqMZDcZc.js", "/assets/button-DmCSXUvz.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/select-0BSzPRfs.js", "/assets/table-CALqcIIP.js", "/assets/index-C_3qY_oq.js", "/assets/badge-DjLCa4jX.js", "/assets/plus-CdrJRhaZ.js", "/assets/search-Cr9CJLNR.js", "/assets/trash-2-BbE6-bGl.js", "/assets/clock-CqMB_GdE.js", "/assets/index-bREvOmy8.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-DI9OIEKY.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js"], "css": [] }, "./pages/manage-live-classes": { "id": "./pages/manage-live-classes", "parentId": "./components/layout", "path": "/manage-live-classes", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/manage-live-classes-DX6l7dA_.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/card-C6ZhIbSz.js", "/assets/input-B4036BWQ.js", "/assets/label-CqMZDcZc.js", "/assets/button-DmCSXUvz.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/select-0BSzPRfs.js", "/assets/table-CALqcIIP.js", "/assets/badge-DjLCa4jX.js", "/assets/plus-CdrJRhaZ.js", "/assets/search-Cr9CJLNR.js", "/assets/trash-2-BbE6-bGl.js", "/assets/clock-CqMB_GdE.js", "/assets/index-bREvOmy8.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-DI9OIEKY.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js"], "css": [] }, "./pages/subject": { "id": "./pages/subject", "parentId": "./components/layout", "path": "/subject", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/subject-CODeESNT.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/index-C_3qY_oq.js", "/assets/checkbox-DqZxbzz9.js", "/assets/table-CALqcIIP.js", "/assets/plus-CdrJRhaZ.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/index-BCBzHor-.js", "/assets/index-Beviy4mB.js"], "css": [] }, "./pages/class": { "id": "./pages/class", "parentId": "./components/layout", "path": "/class", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/class-CY8-0oEM.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/index-C_3qY_oq.js", "/assets/table-CALqcIIP.js", "/assets/plus-CdrJRhaZ.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js", "/assets/createLucideIcon-BH6nH0mB.js"], "css": [] }, "./pages/timetable": { "id": "./pages/timetable", "parentId": "./components/layout", "path": "/timetable", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/timetable-iVN896sH.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/select-0BSzPRfs.js", "/assets/input-B4036BWQ.js", "/assets/button-DmCSXUvz.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/format-CkqhGn1q.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js"], "css": [] }, "./pages/school-admin": { "id": "./pages/school-admin", "parentId": "./components/layout", "path": "/school-admin", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/school-admin-DKhgqDVA.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/index-C_3qY_oq.js", "/assets/table-CALqcIIP.js", "/assets/plus-CdrJRhaZ.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js", "/assets/createLucideIcon-BH6nH0mB.js"], "css": [] }, "./pages/class-admin": { "id": "./pages/class-admin", "parentId": "./components/layout", "path": "/class-admin", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/class-admin-0mK9xDZL.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/select-0BSzPRfs.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/index-C_3qY_oq.js", "/assets/table-CALqcIIP.js", "/assets/plus-CdrJRhaZ.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js"], "css": [] }, "./pages/attendance": { "id": "./pages/attendance", "parentId": "./components/layout", "path": "/attendance", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/attendance-DKBsh9vN.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/popover-PgOMidk7.js", "/assets/select-0BSzPRfs.js", "/assets/index-C_3qY_oq.js", "/assets/table-CALqcIIP.js", "/assets/clock-CqMB_GdE.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/trash-skOUOoGy.js", "/assets/format-CkqhGn1q.js", "/assets/chevron-right-Sm6q8V6a.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-Czq8eJ6L.js", "/assets/index-BCBzHor-.js", "/assets/index-B1Wa2_Lw.js"], "css": [] }, "./pages/student": { "id": "./pages/student", "parentId": "./components/layout", "path": "/student", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/student-XLoWFm_q.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/popover-PgOMidk7.js", "/assets/select-0BSzPRfs.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/index-C_3qY_oq.js", "/assets/table-CALqcIIP.js", "/assets/badge-DjLCa4jX.js", "/assets/checkbox-DqZxbzz9.js", "/assets/plus-CdrJRhaZ.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/format-CkqhGn1q.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/chevron-right-Sm6q8V6a.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-Czq8eJ6L.js", "/assets/index-BCBzHor-.js", "/assets/index-B1Wa2_Lw.js", "/assets/x-BMWVmNVa.js"], "css": [] }, "./pages/parent": { "id": "./pages/parent", "parentId": "./components/layout", "path": "/parent", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/parent-BA8dyG0f.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/select-0BSzPRfs.js", "/assets/index-C_3qY_oq.js", "/assets/table-CALqcIIP.js", "/assets/badge-DjLCa4jX.js", "/assets/plus-CdrJRhaZ.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js"], "css": [] }, "./pages/homework": { "id": "./pages/homework", "parentId": "./components/layout", "path": "/homework", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/homework-DyFwYo81.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/textarea-CJU3mRXV.js", "/assets/select-0BSzPRfs.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/index-C_3qY_oq.js", "/assets/table-CALqcIIP.js", "/assets/label-CqMZDcZc.js", "/assets/plus-CdrJRhaZ.js", "/assets/book-open-DGBbRqVw.js", "/assets/eye-BYkaO2NC.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js"], "css": [] }, "./pages/feedback": { "id": "./pages/feedback", "parentId": "./components/layout", "path": "/feedback", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/feedback-DlsR9fke.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/index-A8lymLFx.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/textarea-CJU3mRXV.js", "/assets/select-0BSzPRfs.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/index-C_3qY_oq.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-Czq8eJ6L.js", "/assets/table-CALqcIIP.js", "/assets/label-CqMZDcZc.js", "/assets/plus-CdrJRhaZ.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/eye-BYkaO2NC.js", "/assets/pencil-BGp3lt72.js", "/assets/trash-skOUOoGy.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js", "/assets/index-B1Wa2_Lw.js", "/assets/x-BMWVmNVa.js"], "css": [] }, "./pages/student-live-classes": { "id": "./pages/student-live-classes", "parentId": "./components/layout", "path": "/student-live-classes", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/student-live-classes-Cy8_55LG.js", "imports": ["/assets/components-DNEopB8l.js", "/assets/card-C6ZhIbSz.js", "/assets/badge-DjLCa4jX.js", "/assets/button-DmCSXUvz.js", "/assets/input-B4036BWQ.js", "/assets/select-0BSzPRfs.js", "/assets/dialog-ZJ1iQ9TC.js", "/assets/createLucideIcon-BH6nH0mB.js", "/assets/search-Cr9CJLNR.js", "/assets/clock-CqMB_GdE.js", "/assets/index-DI9OIEKY.js", "/assets/index-bREvOmy8.js", "/assets/index-hRx_RXvi.js", "/assets/index-Beviy4mB.js", "/assets/index-BCBzHor-.js", "/assets/index-B1Wa2_Lw.js", "/assets/index-Czq8eJ6L.js", "/assets/x-BMWVmNVa.js"], "css": [] } }, "url": "/assets/manifest-5932938e.js", "version": "5932938e" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "./pages/index": {
    id: "./pages/index",
    parentId: "root",
    path: "/",
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "./pages/login": {
    id: "./pages/login",
    parentId: "root",
    path: "/login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "./components/layout": {
    id: "./components/layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "./pages/logout": {
    id: "./pages/logout",
    parentId: "./components/layout",
    path: "/logout",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "./pages/dashboard": {
    id: "./pages/dashboard",
    parentId: "./components/layout",
    path: "dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "./pages/school": {
    id: "./pages/school",
    parentId: "./components/layout",
    path: "/school",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "./pages/teacher": {
    id: "./pages/teacher",
    parentId: "./components/layout",
    path: "/teacher",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "./pages/live-class": {
    id: "./pages/live-class",
    parentId: "./components/layout",
    path: "/live-class",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "./pages/manage-live-classes": {
    id: "./pages/manage-live-classes",
    parentId: "./components/layout",
    path: "/manage-live-classes",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "./pages/subject": {
    id: "./pages/subject",
    parentId: "./components/layout",
    path: "/subject",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "./pages/class": {
    id: "./pages/class",
    parentId: "./components/layout",
    path: "/class",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "./pages/timetable": {
    id: "./pages/timetable",
    parentId: "./components/layout",
    path: "/timetable",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "./pages/school-admin": {
    id: "./pages/school-admin",
    parentId: "./components/layout",
    path: "/school-admin",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "./pages/class-admin": {
    id: "./pages/class-admin",
    parentId: "./components/layout",
    path: "/class-admin",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "./pages/attendance": {
    id: "./pages/attendance",
    parentId: "./components/layout",
    path: "/attendance",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "./pages/student": {
    id: "./pages/student",
    parentId: "./components/layout",
    path: "/student",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "./pages/parent": {
    id: "./pages/parent",
    parentId: "./components/layout",
    path: "/parent",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "./pages/homework": {
    id: "./pages/homework",
    parentId: "./components/layout",
    path: "/homework",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "./pages/feedback": {
    id: "./pages/feedback",
    parentId: "./components/layout",
    path: "/feedback",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "./pages/student-live-classes": {
    id: "./pages/student-live-classes",
    parentId: "./components/layout",
    path: "/student-live-classes",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
