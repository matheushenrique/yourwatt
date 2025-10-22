import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2.5 rounded-xl shadow-lg">
                <Zap className="text-white" size={24} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">Solar Energy</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sistema inteligente de gestão de energia solar. Monitore, economize e contribua para um futuro sustentável.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-400 p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-700 p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Links Rápidos</h3>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="/about" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  Sobre Nós
                </a>
              </li>
              <li>
                <a 
                  href="/features" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  Funcionalidades
                </a>
              </li>
              <li>
                <a 
                  href="/pricing" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  Planos e Preços
                </a>
              </li>
              <li>
                <a 
                  href="/blog" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="/faq" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Suporte</h3>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="/help" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a 
                  href="/docs" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  Documentação
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  Contato
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a 
                  href="/terms" 
                  className="text-sm hover:text-yellow-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                  Termos de Uso
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contato</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-sm group">
                <Mail size={18} className="text-yellow-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Email</p>
                  <a 
                    href="mailto:contato@solarenergy.com" 
                    className="hover:text-yellow-400 transition-colors break-all"
                  >
                    contato@solarenergy.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm group">
                <Phone size={18} className="text-yellow-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Telefone</p>
                  <a 
                    href="tel:+558531234567" 
                    className="hover:text-yellow-400 transition-colors"
                  >
                    (85) 3123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm group">
                <MapPin size={18} className="text-yellow-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Endereço</p>
                  <p className="leading-relaxed">
                    Fortaleza, Ceará<br />
                    Brasil
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section (Optional) */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-white font-semibold mb-2">
              📬 Receba nossas novidades
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Fique por dentro das últimas atualizações e dicas sobre energia solar
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <button className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
                Assinar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} Solar Energy. Todos os direitos reservados.
            </p>

            {/* Additional Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a 
                href="/cookies" 
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                Política de Cookies
              </a>
              <a 
                href="/accessibility" 
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                Acessibilidade
              </a>
              <a 
                href="/sitemap" 
                className="text-gray-500 hover:text-yellow-400 transition-colors"
              >
                Mapa do Site
              </a>
            </div>

            {/* Made with love */}
            <p className="text-sm text-gray-500 flex items-center gap-1">
              Feito com <Heart size={14} className="text-red-500 fill-current animate-pulse" /> no Brasil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}