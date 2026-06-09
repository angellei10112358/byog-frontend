const base = import.meta.env.BASE_URL || '/';

export const preBuiltGames = [
  { id: 'tetris', label: 'Tetris', file: `${base}cases/tetris.html` },
  { id: 'battle_city', label: 'Battle City', file: `${base}cases/battle_city.html` },
  { id: 'dragon_quest', label: 'Dragon Quest', file: `${base}cases/dragon_quest.html` },
  { id: 'minesweeper', label: 'Minesweeper', file: `${base}cases/minesweeper.html` },
  { id: 'sudoku', label: 'Sudoku', file: `${base}cases/sudoku.html` },
  { id: 'chinese_chess', label: 'Chinese Chess', file: `${base}cases/chinese_chess.html` },
  { id: '2048_game', label: '2048', file: `${base}cases/2048-game.html` },
];
