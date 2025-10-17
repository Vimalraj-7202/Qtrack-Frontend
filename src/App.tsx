import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes/routes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Spinner from "./common/suspense/Spinner";

const theme = createTheme({
  palette: {
    primary: {
      main: "#033a3aff",
    },
  },
});

function App() {
  const routing = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<Spinner />}>{routing}</Suspense>
    </ThemeProvider>
  );
}

export default App;
