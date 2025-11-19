/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Adicionando reactStrictMode para garantir que o React seja bem configurado
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  swcMinify: true,  // Habilita minificação com SWC
  trailingSlash: true,  // Garante que as URLs terminem com barra
  poweredByHeader: false,  // Opcional: desabilita o cabeçalho X-Powered-By para segurança
}

export default nextConfig

