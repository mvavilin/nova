export const TITLE_CLASSES = `text-2xl text-center font-bold uppercase`;

const BASE_SECTION = `flex flex-col items-start justify-start gap-4 w-full p-4 bg-white/25 rounded`;

export const SECTION_CLASSES = {
  SECTION: BASE_SECTION,

  SOLO_SECTION: `${BASE_SECTION} col-start-1 row-start-1`,

  JOIN_ROOM_SECTION: `${BASE_SECTION} col-start-2 row-start-1`,

  CREATE_ROOM_SECTION: `${BASE_SECTION} col-start-1 row-start-2 h-full`,

  PUBLIC_ROOMS_SECTION: `${BASE_SECTION} col-start-2 row-start-2 h-full`,
} as const;

export const FORM_CLASSES = {
  FORM: `w-full flex flex-col gap-2`,
  INPUT_CONTAINER: `flex flex-col gap-2 w-full`,
  INPUT_ROW: `flex gap-2 items-center`,
  INPUT: `flex-[2]`,
  BUTTON: `flex-[1]`,
} as const;
