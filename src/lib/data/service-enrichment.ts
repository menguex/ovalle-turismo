import type { Ficha } from "@/lib/types/ficha";

/** Datos de contacto y descripción tomados de ovalleturismo.cl y sitios oficiales */
export const SERVICE_ENRICHMENT: Record<string, Partial<Ficha>> = {
  "don-giorgio": {
    description:
      "Con casi 30 años de trayectoria, Pizzería Don Giorgio se ha consolidado como un verdadero referente gastronómico en Ovalle. Desde 1996 destaca por su masa artesanal a la piedra e ingredientes frescos, con propuestas como la Raffaela, Isabella y opciones vegetarianas como la Francisca. Ambiente cálido y familiar en el centro de la ciudad.",
    address: "Arauco 455, Centro, Ovalle",
    phone: "+56 9 7798 6964 · (53) 2 629012",
    email: "pizzeriadongiorgio@gmail.com",
    schedule: "Lun–mié 12:30–22:00 hrs. · Consulta horarios jue–dom por teléfono",
    mapUrl: "https://maps.google.com/?q=Arauco+455+Ovalle+Chile",
    details: ["Referente de pizza en Ovalle desde 1996", "Masa artesanal a la piedra"],
  },
  "la-lia-pizza": {
    address: "Vicuña Mackenna 668, Centro, Ovalle",
    phone: "+56 9 5516 4766",
    email: "laliapizzas@gmail.com",
    schedule: "Mar–jue 14:00–21:30 hrs.",
    mapUrl: "https://maps.google.com/?q=Vicuña+Mackenna+668+Ovalle+Chile",
  },
  "scart-sushi": {
    address: "Mirador Poniente 1281, El Portal, Ovalle",
    phone: "+56 9 3506 3888",
    email: "scartsushi@gmail.com",
    schedule: "Lun–dom 10:00–00:00 hrs.",
    mapUrl: "https://maps.google.com/?q=Mirador+Poniente+1281+Ovalle+Chile",
  },
  "rincon-de-los-postres": {
    address: "Vicuña Mackenna 615, Centro, Ovalle",
    phone: "+56 9 7431 5502",
    email: "rincondelospostresovalle@gmail.com",
    schedule: "Lun–sáb 08:00–20:00 hrs.",
    mapUrl: "https://maps.google.com/?q=Vicuña+Mackenna+615+Ovalle+Chile",
  },
  "rincon-del-sushi": {
    address: "Jorge Galleguillos 805, El Portal, Ovalle",
    phone: "+56 9 4632 4426",
    email: "elrincondelsushi20@gmail.com",
    schedule: "Lun–dom 10:00–00:00 hrs.",
    mapUrl: "https://maps.google.com/?q=Jorge+Galleguillos+805+Ovalle+Chile",
  },
  "cafe-vittoria": {
    address: "Miguel Aguirre 164, Centro, Ovalle",
    schedule: "Lun–vie 07:30–20:00 hrs.",
    mapUrl: "https://maps.google.com/?q=Miguel+Aguirre+164+Ovalle+Chile",
  },
  "angel-calameno": {
    address: "El Espinal S/N, Camino a Sotaquí, Ovalle",
    phone: "+56 9 9748 0804",
    email: "angelcalamenoovalle@gmail.com",
    schedule: "Lun–jue 09:00–22:00 hrs.",
    mapUrl: "https://maps.google.com/?q=El+Espinal+Sotaquí+Ovalle+Chile",
  },
  "cabildo-abierto": {
    address: "Federico Alfonso 380, Barraza, Ovalle",
    phone: "+56 9 9425 5367",
    email: "cabildoabiertobarraza@gmail.com",
    schedule: "Lun–vie · Solo con reserva",
    mapUrl: "https://maps.google.com/?q=Federico+Alfonso+380+Barraza+Ovalle+Chile",
  },
  "plaza-terraza": {
    address: "Miguel Aguirre 209, Centro, Ovalle",
    phone: "+56 9 3366 4217",
    mapUrl: "https://maps.google.com/?q=Miguel+Aguirre+209+Ovalle+Chile",
    email: "plazaterrazaovalle@gmail.com",
  },
  "cafe-carmen": {
    address: "Vicuña Mackenna 490, Centro, Ovalle",
    schedule: "Lun–vie 08:00–20:00 hrs.",
    mapUrl: "https://maps.google.com/?q=Vicuña+Mackenna+490+Ovalle+Chile",
    email: "cafecarmenovalle@gmail.com",
  },
  "kata-resto-bar": {
    address: "Vicuña Mackenna 376, Centro, Ovalle",
    phone: "(53) 2 628952",
    schedule: "Lun–jue 09:30–01:00 · Vie–sáb 09:30–03:00 hrs.",
    mapUrl: "https://maps.google.com/?q=Vicuña+Mackenna+376+Ovalle+Chile",
    email: "katabaryresto@gmail.com",
  },
  "riquisimo": {
    address: "Coquimbo 136, Centro, Ovalle",
    phone: "+56 9 4494 7786",
    email: "restaurant.riquisimo@gmail.com",
    schedule: "Lun–vie 08:30–21:30 · Sáb 11:00–21:30 hrs. · Dom cerrado",
    mapUrl: "https://maps.google.com/?q=Coquimbo+136+Ovalle+Chile",
  },
  "blackcoffe": {
    address: "Vicuña Mackenna 284, Centro, Ovalle",
    phone: "+56 9 3622 4511",
    email: "coffe6762@gmail.com",
    schedule: "Invierno 09:00–20:00 · Verano 10:00–21:00 hrs.",
    mapUrl: "https://maps.google.com/?q=Vicuña+Mackenna+284+Ovalle+Chile",
  },
  "heladeria-alex": {
    address: "Ariztía Poniente 224, Ovalle",
    phone: "+56 9 8138 2250",
    schedule: "Invierno lun–sáb 11:00–18:00 · Verano lun–sáb 11:00–19:00 · dom 11:00–18:00 hrs.",
    mapUrl: "https://maps.google.com/?q=Ariztía+Poniente+224+Ovalle+Chile",
    email: "heladeriaalexovalle@gmail.com",
  },
  "poki-bubble-tea": {
    address: "Coquimbo 240, Centro, Ovalle",
    schedule: "Lun–vie 09:30–20:30 · Sáb–dom 10:30–20:30 hrs.",
    mapUrl: "https://maps.google.com/?q=Coquimbo+240+Ovalle+Chile",
  },
  "fuente-toscana": {
    address: "Independencia 146, Ovalle",
    phone: "+56 9 3411 0588",
    email: "contacto@fuentetoscana.com",
    website: "https://www.fuentetoscana.cl/",
    schedule: "Mar 12:30–16:30 · Mié 12:30–16:30 y 17:30–20:30 · Jue–sáb 12:30–16:30 y 17:30–22:00 · Lun y dom cerrado",
    mapUrl: "https://maps.google.com/?q=Independencia+146+Ovalle+Chile",
  },
  "los-pumas-encanto": {
    address: "21 km al sur de Ovalle, sector Campo Lindo (a 800 m del Valle del Encanto)",
    phone: "+56 9 6150 9957 · +56 9 6229 9611",
    email: "camp_pisc_pumas_encanto@hotmail.com",
    details: ["No cuentan con leña o carbón — el cliente debe traerlo", "Capacidad máxima 16 personas"],
  },
  "viento-sur": {
    address: "Peral Ojo de Agua S/N, Ruta D-540, Ovalle",
    phone: "+56 9 4989 5921 · +56 9 8433 9166",
  },
  "hostal-las-majadas": {
    address: "Las Majadas S/N, Camino Antiguo a Ovalle, Punitaqui",
    phone: "+56 9 8129 7729",
    website: "https://hostalovalle.cl/",
    schedule: "Consultar horario con el establecimiento",
    details: ["Capacidad máxima: 13 personas"],
  },
  "trapiche-lodge": {
    address: "Parcela 34, Lote 1, Trapiche, Ovalle",
    phone: "+56 9 6728 1723",
    schedule: "Consultar horario con el establecimiento",
  },
  "hotel-italia": {
    address: "Vicuña Mackenna 687, Centro, Ovalle",
    phone: "+56 9 5757 2323",
  },
  "hacienda-huamalata": {
    phone: "+56 9 3382 2140",
    schedule: "Restaurant Cannoli: jue–sáb 12:00–22:00 · dom 12:00–18:30 hrs.",
  },
  "hostal-casona-campos": {
    phone: "+56 9 4250 6659 · +56 9 8218 9827",
    schedule: "Consultar horario con el establecimiento",
    details: ["Capacidad máxima: 12 personas"],
  },
  "hotel-florencia": {
    address: "Vicuña Mackenna 772, Ovalle",
    phone: "+56 9 9730 6313",
    schedule: "Consultar horario con el establecimiento",
  },
  "apart-hotel-dolce-vita": {
    address: "Río Loa 384, Los Leices, Ovalle",
    mapUrl: "https://maps.google.com/?q=Río+Loa+384+Ovalle+Chile",
  },
  "hotel-termas-socos": {
    address: "Panamericana Norte Km 370, a 30 km de Ovalle (Ruta 5 Norte)",
    phone: "+56 9 9219 7671",
    mapUrl: "https://maps.google.com/?q=Termas+de+Socos+Ovalle+Chile",
  },
  "ovalle-suite": {
    phone: "(53) 2 627202",
  },
  "keo-hotel": {
    address: "Av. Manuel Peñafiel 2711, Ovalle",
    phone: "(53) 2 655100",
    mapUrl: "https://maps.google.com/?q=Av.+Manuel+Peñafiel+2711+Ovalle+Chile",
  },
  "hotel-limari": {
    address: "Km 5 Ruta D-55, Camino a Sotaquí, Sector Viñitas, Ovalle",
    phone: "(53) 2 661400 · +56 9 7669 2327",
    mapUrl: "https://maps.google.com/?q=Hotel+Limari+Ovalle+Chile",
  },
  "hotel-american": {
    address: "Vicuña Mackenna 169, Ovalle",
    phone: "(53) 2 620159",
    mapUrl: "https://maps.google.com/?q=Vicuña+Mackenna+169+Ovalle+Chile",
  },
  "hotel-altos-de-tuqui": {
    address: "Av. Manuel Peñafiel 2746, Ovalle",
    mapUrl: "https://maps.google.com/?q=Av.+Manuel+Peñafiel+2746+Ovalle+Chile",
  },
  "hacienda-santa-cristina": {
    address: "Km 4 Ruta D-505 S/N, Ovalle",
    phone: "(53) 2 622335 · +56 9 9871 5269",
    mapUrl: "https://maps.google.com/?q=Hacienda+Santa+Cristina+Ovalle+Chile",
  },
  "descanso-antakari": {
    address: "Esmeralda 264, Huamalata, Ovalle",
    mapUrl: "https://maps.google.com/?q=Esmeralda+264+Huamalata+Ovalle+Chile",
  },
  "ecocamping-munay": {
    address: "Ruta D-565, camino público S/N, Salala, Ovalle",
    mapUrl: "https://maps.google.com/?q=Ecocamping+Munay+Ovalle+Chile",
  },
  "cabanas-stommeln": {
    address: "Ruta D-43, kilómetro 15, Ovalle – La Serena",
    mapUrl: "https://maps.google.com/?q=Cabañas+Stommeln+Ovalle+Chile",
  },
  "gran-hotel-ovalle": {
    address: "Vicuña Mackenna 210, Ovalle",
    mapUrl: "https://maps.google.com/?q=Vicuña+Mackenna+210+Ovalle+Chile",
  },
  "cabanas-fray-jorge": {
    address: "Kilómetro 383, sector Oruro, Limarí, Ovalle",
    phone: "+56 9 8544 0682 · +56 9 9430 0554",
    website: "https://www.cabañasfrayjorge.cl",
    mapUrl: "https://maps.google.com/?q=Cabañas+Fray+Jorge+Ovalle+Chile",
    details: ["Capacidad hasta 100 personas"],
  },
  "limari-aventura": {
    address: "Calle Única La Chimba, Ovalle",
    phone: "+56 9 6409 6784",
    mapUrl: "https://maps.google.com/?q=La+Chimba+Ovalle+Chile",
  },
  "limari-experience": {
    address: "Vicuña Mackenna 370, Ovalle",
    phone: "+56 9 3233 6366 · +56 9 8274 5851",
    mapUrl: "https://maps.google.com/?q=Vicuña+Mackenna+370+Ovalle+Chile",
  },
  "limari-travel": {
    address: "Vicuña Mackenna 370, Ovalle",
    phone: "+56 9 7880 1089",
    mapUrl: "https://maps.google.com/?q=Vicuña+Mackenna+370+Ovalle+Chile",
  },
  "turismo-diaguitas": {
    address: "Blanca Castillo 110, Ovalle",
    phone: "+56 9 3451 3896",
    mapUrl: "https://maps.google.com/?q=Blanca+Castillo+110+Ovalle+Chile",
    details: ["Operador receptivo y emisivo"],
  },
  "turismo-huerta": {
    address: "Victoria 420, Ovalle",
    phone: "+56 9 5214 6572",
    mapUrl: "https://maps.google.com/?q=Victoria+420+Ovalle+Chile",
  },
  "viento-sur-operador": {
    address: "Peral Ojo de Agua S/N, Ruta D-540, Ovalle",
    phone: "+56 9 4989 5921 · +56 9 8433 9166",
  },
  "vina-tololo": {
    address: "Ruta D-43 Km 12, Punitaqui, Ovalle",
    phone: "+56 9 3869 3973",
    email: "ventas@tololovinos.cl",
    website: "https://www.tololovinos.cl/",
    mapUrl: "https://maps.google.com/?q=Viña+Tololo+Punitaqui+Ovalle",
    schedule: "Lun–vie 09:30–13:00 / 14:00–18:30 hrs.",
    details: ["Capacidad máxima: 30 personas"],
  },
  "macero-sour": {
    phone: "+56 9 7798 6964",
    email: "macerosour@gmail.com",
    website: "https://macerosour.cl/",
    address: "Ovalle, Región de Coquimbo",
    mapUrl: "https://maps.google.com/?q=Macero+Sour+Ovalle",
  },
  "pisco-ovalle": {
    address: "Ovalle, Región de Coquimbo",
  },
  "espumante-azur": {
    phone: "+56 9 2833 8383",
    email: "info@azur.cl",
    website: "https://www.azur.cl/",
    address: "Valle del Limarí, Ovalle",
    schedule: "Consultar horario con el establecimiento",
  },
  "vina-tabali": {
    email: "turismo@tabali.cl",
    website: "https://www.tabali.com/",
    address: "Valle del Limarí, Ovalle",
    schedule: "Sábado 11:00–16:00 hrs. · Consultar tours entre semana",
  },
  "vina-ochotierras": {
    phone: "+56 9 9542 2781",
    email: "info@ochotierras.cl",
    website: "https://ochotierras.cl/",
    address: "Valle del Limarí, Ovalle",
  },
  "cooperativa-pisquera": {
    phone: "+56 9 5665 4120",
    email: "ventas@controlpisquero.cl",
    website: "https://www.controlpisquero.cl/",
    schedule: "Consultar horarios de visita y degustación",
  },
  "museo-limari": {
    schedule: "Mar–dom 10:00–18:00 hrs. · Lunes cerrado",
    instagram: "@museodelimari",
  },
  "iglesia-san-vicente": {
    schedule: "Exterior accesible todo el año · Interior consultar horarios de misa",
  },
  "pueblo-barraza": {
    schedule: "Todo el año · Fiesta de Barraza en febrero",
  },
};

export function enrichFicha<T extends Ficha>(ficha: T): T {
  const patch = SERVICE_ENRICHMENT[ficha.id];
  if (!patch) return ficha;

  return {
    ...ficha,
    ...patch,
    description:
      patch.description && patch.description.length > ficha.description.length
        ? patch.description
        : ficha.description,
    schedule: patch.schedule ?? ficha.schedule,
    highlights: ficha.highlights,
    details: patch.details
      ? Array.from(new Set([...(ficha.details ?? []), ...patch.details]))
      : ficha.details,
  };
}

export function enrichFichas<T extends Ficha>(items: readonly T[]): readonly T[] {
  return items.map(enrichFicha);
}
