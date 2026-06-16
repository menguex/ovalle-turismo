import type { Ficha } from "@/lib/types/ficha";

/** Descripciones, contactos e imágenes ampliadas desde ovalleturismo.cl/sitio/limari */
export const LIMARI_ENRICHMENT: Record<string, Partial<Ficha>> = {
  "comunidad-ovalle": {
    description:
      "Capital provincial del Limarí y punto de partida del valle. Desde aquí se accede a viñedos, Fray Jorge, el Valle del Encanto, la Feria Modelo y el Museo del Limarí, con plaza de armas, gastronomía y vida urbana al ritmo del territorio.",
    highlights: ["Capital provincial", "Fray Jorge y Valle del Encanto", "Feria Modelo y museo"],
  },
  "comunidad-monte-patria": {
    description:
      "Comuna de tradición diaguita y raíces campesinas profundas. En Tulahuén y sus sectores se elabora pisco artesanal de renombre; el amansa racional de caballos con arpa y las fiestas costumbristas mantienen viva la identidad rural del valle.",
    highlights: ["Cultura Diaguita", "Tulahuén · pisco artesanal", "Tradiciones rurales"],
  },
  "comunidad-punitaqui": {
    description:
      "Territorio de secano y viñedos de autor en el corazón del valle interior. Microclimas singulares que dan vinos elegantes, junto a patrimonio rural, quebradas y vida campesina auténtica entre cerros del Limarí.",
    highlights: ["Viñedos de terroir", "Paisajes del valle", "Patrimonio rural"],
  },
  "comunidad-rio-hurtado": {
    description:
      "Puerta andina del valle con termas, quebradas y paisajes de montaña. Ideal para desconectar, recorrer la precordillera y conectar con la naturaleza en uno de los sectores más verdes del Limarí.",
    highlights: ["Termas", "Naturaleza de montaña", "Precordillera"],
  },
  "comunidad-combarbala": {
    description:
      "Comuna histórica entre valle y precordillera, famosa por su artesanía en lapislázuli y patrimonio religioso. Sus paisajes únicos y tradiciones mineras y campesinas completan la diversidad del territorio limarino.",
    highlights: ["Lapislázuli", "Patrimonio histórico", "Artesanía local"],
  },
  "exp-enraizada": {
    image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/09/flores1.jpg",
    description:
      "Terapias holísticas y bienestar en contacto con la naturaleza del valle. Parte de la Ruta Enoturística y de Bienestar Ovalle, con propuestas de reconexión corporal y espiritual en entorno natural.",
    highlights: ["Bienestar", "Ruta enoturística Ovalle", "Terapias holísticas"],
  },
  "exp-las-majadas": {
    description:
      "Hacienda histórica con hostal en casona centenaria, queso artesanal Las Majadas y ambiente campestre. A minutos del Valle del Encanto y Fray Jorge, con piscina, Wi-Fi y espacios pet friendly.",
    phone: "+56 9 8129 7729",
    email: "hostallasmajadas@gmail.com",
    website: "https://hostalovalle.cl/",
    address: "Las Majadas S/N, Camino Antiguo a Ovalle, Punitaqui",
  },
  "exp-caprinos": {
    image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/09/5-1024x683.jpg",
    description:
      "Empresa familiar en Villaseca dedicada a quesos finos de leche de cabra. Premio Nacional a la Mujer Innovadora en Agricultura 2022 (FIA) y referente de la identidad gastronómica mar-campo del Limarí.",
    email: "yasna.molina79@gmail.com",
    website: "https://caprinosvillaseca.cl/",
    highlights: ["Quesos artesanales", "Premio FIA 2022", "Villaseca · Ovalle"],
  },
  "exp-qori": {
    image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/09/IMG-20241220-WA0006.jpeg",
    description:
      "Aceite de oliva extra virgen gourmet del clima único del Limarí. Blend cuidadoso y extracción especializada en Ovalle, entre los aceites de oliva más reconocidos del valle.",
    email: "claudimoreno@qori.cl",
    website: "https://qori.cl/",
    highlights: ["Extra virgen", "Producto gourmet local", "Degustación"],
  },
  "exp-waqar": {
    image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/09/slider-3-balck-heron.png",
    description:
      "Pisco ultra premium de Pisquera Tulahuén, 100% uvas moscatel de terruño ancestral a los pies de los Andes. Destilado transparente, fino y delicado, bajo Denominación de Origen.",
    email: "CONTACTO@PISQUERATULAHUEN.CL",
    website: "https://pisqueratulahuen.cl/",
    highlights: ["Ultra premium", "Uvas moscatel", "Denominación de origen"],
  },
  "exp-tulahuen": {
    image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/09/slider-3-balck-heron.png",
    description:
      "Tradición familiar en Tulahuén, Monte Patria. Elabora Pisco Waqar y Pisco Heron con destilación artesanal bajo cielos despejados del valle, vinculada a las Denominaciones de Origen Pisco y Pajarete.",
    email: "CONTACTO@PISQUERATULAHUEN.CL",
    website: "https://pisqueratulahuen.cl/",
    highlights: ["Tulahuén · Monte Patria", "Pisco Waqar y Heron", "Destilación artesanal"],
  },
  "exp-dalbosco": {
    image: "https://www.ovalleturismo.cl/sitio/wp-content/uploads/2025/08/d24dde_f6af857f986e4f15904913fabf7d83bbmv2_d_5163_3442_s_4_2.avif",
    description:
      "Viña en Punitaqui, en el corazón del Valle del Limarí. Microclimas singulares que dan vinos elegantes de intenso color y gran cuerpo, con visitas y degustaciones con reserva previa.",
    email: "info@dalboscowines.cl",
    website: "http://www.dalboscowines.com/",
    highlights: ["Punitaqui · Valle del Limarí", "Vinos de terroir", "Visitas enológicas"],
  },
};

export function enrichLimariFicha<T extends Ficha>(ficha: T): T {
  const patch = LIMARI_ENRICHMENT[ficha.id];
  if (!patch) return ficha;

  return {
    ...ficha,
    ...patch,
    description:
      patch.description && patch.description.length > (ficha.description?.length ?? 0)
        ? patch.description
        : ficha.description,
    highlights: patch.highlights ?? ficha.highlights,
    details: patch.details
      ? Array.from(new Set([...(ficha.details ?? []), ...patch.details]))
      : ficha.details,
  };
}

export function enrichLimariFichas<T extends Ficha>(items: readonly T[]): readonly T[] {
  return items.map(enrichLimariFicha);
}
