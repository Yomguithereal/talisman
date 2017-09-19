/**
 * Talisman stemmers/ispell
 * =========================
 *
 * Stemmers inspired by ispell's dictionary flags.
 *
 * [Reference]:
 * https://www.gnu.org/software/ispell/
 */

/**
 * Function stemming the given world using ispell's dictionary flags.
 *
 * @param  {string} word - The word to stem.
 * @return {string}      - The resulting stem.
 */
export default function ispell() {

}

// "V" flag:
//         ...E --> ...IVE  as in CREATE --> CREATIVE
//         if # .ne. E, ...# --> ...#IVE  as in PREVENT --> PREVENTIVE

// "N" flag:
//         ...E --> ...ION  as in CREATE --> CREATION
//         ...Y --> ...ICATION  as in MULTIPLY --> MULTIPLICATION
//         if # .ne. E or Y, ...# --> ...#EN  as in FALL --> FALLEN

// "X" flag:
//         ...E --> ...IONS  as in CREATE --> CREATIONS
//         ...Y --> ...ICATIONS  as in MULTIPLY --> MULTIPLICATIONS
//         if # .ne. E or Y, ...# --> ...#ENS  as in WEAK --> WEAKENS

// "H" flag:
//         ...Y --> ...IETH  as in TWENTY --> TWENTIETH
//         if # .ne. Y, ...# --> ...#TH  as in HUNDRED --> HUNDREDTH

// "Y" FLAG:
//         ... --> ...LY  as in QUICK --> QUICKLY

// "G" FLAG:
//         ...E --> ...ING  as in FILE --> FILING
//         if # .ne. E, ...# --> ...#ING  as in CROSS --> CROSSING

// "J" FLAG"
//         ...E --> ...INGS  as in FILE --> FILINGS
//         if # .ne. E, ...# --> ...#INGS  as in CROSS --> CROSSINGS

// "D" FLAG:
//         ...E --> ...ED  as in CREATE --> CREATED
//         if @ .ne. A, E, I, O, or U,
//                 ...@Y --> ...@IED  as in IMPLY --> IMPLIED
//         if # .ne. E or Y, or (# = Y and @ = A, E, I, O, or U)
//                 ...@# --> ...@#ED  as in CROSS --> CROSSED
//                                 or CONVEY --> CONVEYED
// "T" FLAG:
//         ...E --> ...EST  as in LATE --> LATEST
//         if @ .ne. A, E, I, O, or U,
//                 ...@Y --> ...@IEST  as in DIRTY --> DIRTIEST
//         if # .ne. E or Y, or (# = Y and @ = A, E, I, O, or U)
//                 ...@# --> ...@#EST  as in SMALL --> SMALLEST
//                                 or GRAY --> GRAYEST

// "R" FLAG:
//         ...E --> ...ER  as in SKATE --> SKATER
//         if @ .ne. A, E, I, O, or U,
//                 ...@Y --> ...@IER  as in MULTIPLY --> MULTIPLIER
//         if # .ne. E or Y, or (# = Y and @ = A, E, I, O, or U)
//                 ...@# --> ...@#ER  as in BUILD --> BUILDER
//                                 or CONVEY --> CONVEYER

// "Z FLAG:
//         ...E --> ...ERS  as in SKATE --> SKATERS
//         if @ .ne. A, E, I, O, or U,
//                 ...@Y --> ...@IERS  as in MULTIPLY --> MULTIPLIERS
//         if # .ne. E or Y, or (# = Y and @ = A, E, I, O, or U)
//                 ...@# --> ...@#ERS  as in BUILD --> BUILDERS
//                                 or SLAY --> SLAYERS

// "S" FLAG:
//         if @ .ne. A, E, I, O, or U,
//                 ...@Y --> ...@IES  as in IMPLY --> IMPLIES
//         if # .eq. S, X, Z, or H,
//                 ...# --> ...#ES  as in FIX --> FIXES
//         if # .ne. S, X, Z, H, or Y, or (# = Y and @ = A, E, I, O, or U)
//                 ...@# --> ...@#S  as in BAT --> BATS
//                                 or CONVEY --> CONVEYS

// "P" FLAG:
//         if @ .ne. A, E, I, O, or U,
//                 ...@Y --> ...@INESS  as in CLOUDY --> CLOUDINESS
//         if # .ne. Y, or @ = A, E, I, O, or U,
//                 ...@# --> ...@#NESS  as in LATE --> LATENESS
//                                 or GRAY --> GRAYNESS

// "M" FLAG:
//         ... --> ...'S  as in DOG --> DOG'S
