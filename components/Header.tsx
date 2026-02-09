import Image from "next/image"
import Link from "next/link"
import NavItems from "@/components/NavItems"
import StockSearch from "@/components/StockSearch"

const Header = () => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image src="/assets/icons/logo.svg" alt="Signalist" width={140} height={32} className="h-8 w-auto cursor-pointer" />
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden sm:block">
            <NavItems />
          </nav>
          <StockSearch />
        </div>
      </div>
    </header>
  )
}

export default Header