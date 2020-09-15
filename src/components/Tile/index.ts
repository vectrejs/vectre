import { Tile } from './Tile';
import { TileAction } from './TileAction';
import { TileIcon } from './TileIcon';
import { TileContent } from './TileContent';
import { TileSubtitle } from './TileSubtitle';
import { TileTitle } from './TileTitle';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ Tile, TileAction, TileIcon, TileContent, TileSubtitle, TileTitle });
export { Tile, TileAction, TileIcon, TileContent, TileSubtitle, TileTitle };
