import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "./routes";
import tempoRoutes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(tempoRoutes)}
      </>
    </Suspense>
  );
}

export default App;
