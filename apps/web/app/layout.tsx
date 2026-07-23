import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
export const metadata = { title: "Pulse Gym OS", description: "Modern gym management dashboard" }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className="antialiased"><ThemeProvider>{children}</ThemeProvider></body></html>
}