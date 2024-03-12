/**
 * TOTAL POINTS **
 *
 * [1 * no of posts a user creates] +
 * [2 * number of likes a user receives] +
 * [3 * number of solutions that was accepted from the user]
 *
 *  */

export const totalPoints = (posts, likes, solutions) =>
  1 * posts + 2 * likes + 3 * solutions;
