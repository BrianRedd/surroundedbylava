# Surrounded By Lava

### DFS Test for Pompeii Board Game

Author: R. Brian Redd <www.rbrianredd.com>

## Problem

In the Downfall of Pompeii board game, if game spaces are surrounded by lava (no way for occupants of those tiles to reach an exit) then those spaces are covered in lava.

This react app uses a DFS (deep field search) methodology to determine which squares are surrounded by lava, and therefore should be themselves covered with lava.

Using a modified 11 x 7 grid, exits are marked with green `X`s, open spaces are marked with tan `O`s, and lava is marked with red `L`.  A randomizer touches each square and, 50% of the time, covers the square in lava.

## Solution

The process then involves finding each exit not covered in lava, using a DFS recursive function to determine which open spaces are connected to an exit, and then converting all other open spaces to lava.  To help verify, the array of spaces that have been converted is stringified and displayed.

Code is similar to the Island Problem (<www.rbrianredd.com/projects/islandproblem>).  Within `Calculate.jsx`, the array of known exits is looped through, and for those that are not covered in lava, a DFS helper function is called.  This function finds all open spaces attached to the exit and coverts them, in a hidden, duplicate array, from `O` to an intermediary value (`*`).  This way touched squares (already determined to be connected to an exit) are not touched again (the recursive function is only interested in untouched `O`s that are connected to an exit).  Once all exits are located and orthogonally adjacent spaces are marked, then any remaining `O`s are not connected to an exit, and are therefore should be converted to `L`.  In the primary grid array, these changed squares are thusly modified.