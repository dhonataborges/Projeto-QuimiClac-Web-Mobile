import Layout from "@/components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Layout>
      <Toaster /** Essa Toaster serve para exibir uma mensagem profissional */
        position="top-center"
        containerStyle={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <AppRoutes />
    </Layout>
  );
}

export default App;
