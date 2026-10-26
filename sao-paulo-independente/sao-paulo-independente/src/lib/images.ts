/**
 * Imagens do site (hospedadas em OSS — URLs estáveis garantidas).
 * Selecionadas a partir de busca de fotos reais de São Paulo.
 */

/** Skyline noturno de SP — Pexels, 6000x4000 */
export const HERO_IMAGE =
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/873bd292fbe1.jpeg"

/** Avenida à noite, longa exposição — fotografia profissional */
export const CTA_IMAGE =
  "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4add5e28a440.jpg"

export interface GalleryPhoto {
  url: string
  title: string
  subtitle: string
  /** span no grid: "wide" ocupa 2 colunas, "tall" ocupa 2 linhas */
  span: "normal" | "wide" | "tall"
}

export const GALLERY: GalleryPhoto[] = [
  {
    url: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5a9d76067eb8.jpg",
    title: "Avenida Paulista",
    subtitle: "O coração econômico da América Latina",
    span: "wide",
  },
  {
    url: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/daaac98341e4.jpg",
    title: "Skyline",
    subtitle: "A maior cidade do hemisfério sul",
    span: "tall",
  },
  {
    url: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c2d7b10158a4.jpeg",
    title: "Estação da Luz",
    subtitle: "História e arquitetura no coração da capital",
    span: "normal",
  },
  {
    url: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4f8e06fcbaf5.jpg",
    title: "Mercado Municipal",
    subtitle: "O sabor da terra paulista no Mercadão",
    span: "normal",
  },
  {
    url: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7ebb25e42d59.jpg",
    title: "Theatro Municipal",
    subtitle: "Cultura que inspira o país desde 1911",
    span: "normal",
  },
  {
    url: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/312a95ee3266.jpg",
    title: "Parque do Ibirapuera",
    subtitle: "O pulmão verde da metrópole, projetado por Niemeyer",
    span: "normal",
  },
]
