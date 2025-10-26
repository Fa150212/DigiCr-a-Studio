"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaRocket,
  FaGraduationCap,
  FaLaptopCode,
  FaBullhorn,
  FaHandshake,
  FaEnvelope,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaPenNib,
} from "react-icons/fa";
import {
  SiCanva,
  SiAdobephotoshop,
  SiAdobeillustrator,
} from "react-icons/si";


export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center px-6 py-20 space-y-16 overflow-hidden">
      {/* 💫 Photo de profil */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl border-4 border-white"
      >
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80"
          alt="Profil"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 💬 Titre principal */}
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-blue-900 text-center"
      >
        À propos de moi
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-gray-600 text-center max-w-2xl leading-relaxed overflow-y-auto no-scrollbar"
      >
        Passionnée par la <strong>communication digitale</strong> et le{" "}
        <strong>développement web</strong>, je partage ici mes conseils et mes
        découvertes pour inspirer et aider chacun à bâtir une présence forte et authentique sur le web.
      </motion.p>

      {/* 🧩 Carte mission */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="bg-white shadow-lg rounded-3xl p-10 max-w-3xl w-full text-center border border-blue-100 hover:shadow-2xl transition-all"
      >
        <div className="flex justify-center mb-4">
          <FaBullhorn className="text-4xl text-orange-500" />
        </div>
        <h3 className="text-2xl font-bold text-blue-800 mb-4">Ma mission</h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          Rendre la <strong>communication digitale</strong> plus accessible et inspirante.
          Que vous soyez étudiant, entrepreneur ou créateur, ce blog vous aide à améliorer votre visibilité et votre stratégie.
        </p>

        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl hover:shadow-md hover:opacity-90 transition font-semibold"
        >
          Explorer mes articles
        </Link>
      </motion.div>

      {/* 🧭 Mon parcours */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="max-w-3xl w-full"
      >
        <h3 className="text-2xl font-bold text-blue-800 mb-8 text-center">
          Mon parcours
        </h3>

        <div className="relative border-l-4 border-blue-300 pl-6 space-y-8">
          {[
            {
              icon: <FaGraduationCap className="text-blue-500 text-xl" />,
              year: "2021",
              title: "Premiers pas en Communication Digitale",
              text: "Découverte du marketing digital, du storytelling et des réseaux sociaux.",
            },
            {
              icon: <FaLaptopCode className="text-blue-500 text-xl" />,
              year: "2022",
              title: "Formation en Développement Web",
              text: "Apprentissage de HTML, CSS, JavaScript, React et Next.js pour créer mes propres projets.",
            },
            {
              icon: <FaRocket className="text-blue-500 text-xl" />,
              year: "2023",
              title: "Lancement de mon Blog",
              text: "Création de ce blog pour partager mes connaissances et inspirer d'autres passionnés du digital.",
            },
            {
              icon: <FaHandshake className="text-blue-500 text-xl" />,
              year: "2024",
              title: "Projets Collaboratifs",
              text: "Participation à des projets combinant communication et web, pour allier stratégie et technique.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
              className="relative bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <span className="absolute -left-3 top-6 w-6 h-6 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center shadow">
                {step.icon}
              </span>
              <h4 className="text-lg font-semibold text-blue-700">
                {step.year} — {step.title}
              </h4>
              <p className="text-gray-600 mt-2">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 💼 Expériences */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="max-w-4xl w-full text-center"
      >
        <h3 className="text-2xl font-bold text-blue-800 mb-8">Mes expériences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Assistante Communication Digitale",
              company: "Agence XYZ",
              date: "2023",
              desc: "Création de visuels, gestion de contenu et optimisation de campagnes sur les réseaux sociaux.",
            },
            {
              title: "Développeuse Web Freelance",
              company: "Projets personnels",
              date: "2024",
              desc: "Conception de sites web modernes et responsives pour des clients locaux.",
            },
          ].map((exp, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition"
            >
              <h4 className="text-lg font-semibold text-blue-700">{exp.title}</h4>
              <p className="text-sm text-gray-500">{exp.company} — {exp.date}</p>
              <p className="text-gray-600 mt-2">{exp.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🧠 Mes compétences */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="max-w-4xl w-full text-center"
      >
        <h3 className="text-2xl font-bold text-blue-800 mb-8">Mes compétences</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {[
            { icon: <FaHtml5 />, name: "HTML5", color: "text-orange-500" },
            { icon: <FaCss3Alt />, name: "CSS3", color: "text-blue-500" },
            { icon: <FaJsSquare />, name: "JavaScript", color: "text-yellow-500" },
            { icon: <FaReact />, name: "React & Next.js", color: "text-cyan-500" },
            { icon: <SiCanva />, name: "Canva", color: "text-sky-400" },
            { icon: <SiAdobephotoshop />, name: "Photoshop", color: "text-blue-600" },
            { icon: <SiAdobeillustrator />, name: "Illustrator", color: "text-orange-600" },
            { icon: <FaPenNib />, name: "Design & Rédaction", color: "text-pink-500" },
            { icon: <FaBullhorn />, name: "Stratégie Digitale", color: "text-orange-600" },
            { icon: <FaHandshake />, name: "Collaboration", color: "text-green-600" },
          ].map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="flex flex-col items-center bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className={`text-4xl mb-2 ${skill.color}`}>{skill.icon}</div>
              <p className="text-gray-700 font-medium">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 🎯 Centres d’intérêt */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="max-w-3xl w-full text-center"
      >
        <h3 className="text-2xl font-bold text-blue-800 mb-8">
          Centres d’intérêt
        </h3>
        <div className="flex flex-wrap justify-center gap-4 text-gray-700">
          {["Création de contenu", "UX/UI Design", "Marketing Digital", "Photographie", "Veille technologique", "Écriture créative"].map((item, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-white px-5 py-2 rounded-full shadow text-sm hover:bg-blue-50 border border-gray-100 transition"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* ✉️ Contact */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="max-w-3xl w-full text-center bg-white shadow-lg rounded-2xl p-10 border border-blue-100"
      >
        <div className="flex justify-center mb-4">
          <FaEnvelope className="text-3xl text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-blue-800 mb-4">Me contacter</h3>
        <p className="text-gray-600 mb-6">
          Vous souhaitez collaborer, poser une question ou simplement échanger ?  
          Laissez-moi un message directement ci-dessous 👇
        </p>

        {/* Formulaire de contact */}
        <form
          action="https://formsubmit.co/fg8002220@gmail.com"
          method="POST"
          className="flex flex-col space-y-4 text-left max-w-md mx-auto"
        >
          {/* Protection anti-spam */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="http://localhost:3000/merci" />
          {/* <input type="hidden" name="_next" value="https://ton-site.com/merci" /> */}

          <div>
            <label className="block text-gray-600 font-medium mb-1">Nom</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              placeholder="Écrivez votre message ici..."
            ></textarea>
            <input type="hidden" name="_next" value="http://localhost:3000/merci" />
            {/* <input type="hidden" name="_next" value="https://ton-site.com/merci" /> */}

          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition w-full"
          >
            Envoyer le message ✉️
          </button>
        </form>
      </motion.section>

      {/* 🌐 Réseaux sociaux */}
       <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex space-x-6 mt-10"
      >
        {[
          {
            href: "#",
            icon: <FaTwitter />,
            color: "hover:text-blue-500 hover:shadow-blue-300",
          },
          {
            href: "#",
            icon: <FaLinkedin />,
            color: "hover:text-blue-700 hover:shadow-blue-400",
          },
          {
            href: "#",
            icon: <FaInstagram />,
            color: "hover:text-pink-600 hover:shadow-pink-300",
          },
        ].map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className={`text-gray-600 text-3xl transition-all duration-300 ${item.color} hover:shadow-lg rounded-full p-3`}
          >
            {item.icon}
          </motion.a>
        ))}
      </motion.div>

      {/* 📨 Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="text-gray-500 text-sm text-center"
      >
        Mon Blog Communication Digitale | Créé avec ❤️ et Next.js
      </motion.p>
    </main>
  );
}
