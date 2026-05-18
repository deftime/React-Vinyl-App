import "./wdyr.ts";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import App from "./components/Application.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";
import SearchPage from "./components/SearchPage/SearchPage.tsx";
import SearchResultPage from "./components/SearchResultPage/SearchResultPage.tsx";
import Error from "./components/Error/Error.tsx";

export const BASE_URL = import.meta.env.PROD ? '/React-Vinyl-App/' : '/';

const root = createRoot(document.querySelector("#app") as HTMLElement);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: BASE_URL,
        element: (
          <ErrorBoundary FallbackComponent={Error}>
            <Suspense
              fallback={
                <img
                  src="/img/loader.png"
                  alt="loader_pic"
                  className="loader"
                />
              }
            >
              <HomePage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: `${BASE_URL}search`,
        element: (
          <ErrorBoundary FallbackComponent={Error}>
            <Suspense
              fallback={
                <img
                  src="/img/loader.png"
                  alt="loader_pic"
                  className="loader"
                />
              }
            >
              <SearchPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: `${BASE_URL}result`,
        element: (
          <ErrorBoundary FallbackComponent={Error}>
            <Suspense
              fallback={
                <img
                  src="/img/loader.png"
                  alt="loader_pic"
                  className="loader"
                />
              }
            >
              <SearchResultPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "*",
        element: <div className="noPage">404</div>,
      },
    ],
  },
]);

async function bootstrap() {
  const { worker } = await import("./mocks/browser.js");
  worker.start();
}

bootstrap().then(() => {
  root.render(
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
});
