export const TITLE_CLASSES = `text-2xl text-center font-bold uppercase`;

const BASE_SECTION = `flex flex-col items-start justify-start gap-4 w-full p-4 bg-white/25 rounded`;

export const SECTION_CLASSES = {
  SECTION: BASE_SECTION,

  SOLO_SECTION: `${BASE_SECTION} col-start-1 row-start-1`,

  JOIN_ROOM_SECTION: `${BASE_SECTION} col-start-1 row-start-2`,

  CREATE_ROOM_SECTION: `${BASE_SECTION} col-start-1 row-start-1 h-full`,

  PUBLIC_ROOMS_SECTION: `${BASE_SECTION} col-start-2 row-start-1 row-span-2 h-full`,

  LOG_CHAT_SECTION: `${BASE_SECTION} h-full`,
} as const;

export const FORM_CLASSES = {
  FORM: `w-full flex flex-col gap-2`,
  INPUT_CONTAINER: `flex flex-col gap-2 w-full`,
  INPUT_ROW: `flex gap-2 items-center relative`,
  INPUT: `flex-[2]`,
  INPUT_INVAVLID: 'outline outline-1 outline-red-600',
  BUTTON: `flex-[1]`,
  LABEL: `w-full block font-bold`,
} as const;

export const CELL_BASE = 'truncate overflow-hidden whitespace-nowrap';
export const GRID_ROW = 'w-full grid grid-cols-[3fr_2fr_3fr_2fr] px-3';
export const TABLE_CLASSES = {
  TABLE: 'w-full flex flex-col gap-2 border-collapse border-0 p-0 m-0 flex-1 overflow-y-hidden',
  THEAD: {
    TR: GRID_ROW,
    TH: {
      FIRST: `text-left`,
      BASE: `text-center`,
    },
  },
  TBODY: {
    TBODY: `flex-1 flex flex-col gap-2 overflow-y-auto max-h-70`,
    TR: `${GRID_ROW} text-black bg-white rounded py-1`,
    TD: {
      FIRST: `${CELL_BASE} text-left`,
      BASE: `${CELL_BASE} text-center`,
    },
  },
};
export const ANIMATION_DURATION = 300;
