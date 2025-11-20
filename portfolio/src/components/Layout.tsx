import type { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { ScrollArea } from "./ui/scroll-area"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <ScrollArea className="flex-1">
        <main className="container mx-auto py-6 px-4 md:px-6 flex-1">{children}</main>
      </ScrollArea>
      <Footer />
    </div>
  )
}

export default Layout
