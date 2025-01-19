import { Provider } from "@/components/ui/provider";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressBarProvider from "@/components/ProgressBarProvider";
import "./globals.css";

export const metadata = {
  title: "Real Estate App",
  description: "Website for buying and selling real estate",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Box maxWidth={{ sm: "600px", md: "800px", lg: "1536px" }} mx="auto">
            <header>
              <Navbar />
            </header>
            <ProgressBarProvider>
              <main>{children}</main>
            </ProgressBarProvider>
            <footer>
              <Footer />
            </footer>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
