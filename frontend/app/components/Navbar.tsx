export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <a href="/" className="text-xl font-bold">DigiCréa-Studio</a>
        <div className="space-x-6">
          <a href="/" className="hover:underline">Accueil</a>
          <a href="/articles" className="hover:underline">Articles</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </nav>
  )
}
