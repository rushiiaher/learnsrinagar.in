import path from "path"
import tailwindcss from "@tailwindcss/vite"

import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    tailwindcss(),
    remix({
      appDirectory: "src",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "./pages/index.jsx", { index: true });
          route("/login", "./pages/login.jsx");
          route("/.well-known/*", "./pages/.well-known.jsx");
          route("", "./components/layout.jsx", () => {
            return [
              route("/logout", "./pages/logout.jsx"),
              route("dashboard", "./pages/dashboard.jsx"),
              route("/school", "./pages/school.jsx"),
              route("/teacher", "./pages/teacher.jsx"),
              route("/live-class", "./pages/live-class.jsx"),
              route("/manage-live-classes", "./pages/manage-live-classes.jsx"),
              route("/subject", "./pages/subject.jsx"),
              route("/class", "./pages/class.jsx"),
              route("/timetable", "./pages/timetable.jsx"),
              route("/school-admin", "./pages/school-admin.jsx"),
              route("/class-admin", "./pages/class-admin.jsx"),
              route("/attendance", "./pages/attendance.jsx"),
              route("/student", "./pages/student.jsx"),
              route("/parent", "./pages/parent.jsx"),
              route("/homework", "./pages/homework.jsx"),
              route("/feedback", "./pages/feedback.jsx"),
              route("/student-live-classes", "./pages/student-live-classes.jsx"),
            ];
          })
        });
      },
    }),
  ],
});
