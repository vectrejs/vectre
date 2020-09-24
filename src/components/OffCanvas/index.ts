import { OffCanvas } from './OffCanvas';
import { OffCanvasContent } from './OffCanvasContent';
import { OffCanvasOverlay } from './OffCanvasOverlay';
import { OffCanvasSidebar } from './OffCanvasSidebar';
import { OffCanvasToggle } from './OffCanvasToggle';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({
  OffCanvas,
  OffCanvasContent,
  OffCanvasOverlay,
  OffCanvasSidebar,
  OffCanvasToggle,
});

export { OffCanvas, OffCanvasContent, OffCanvasOverlay, OffCanvasSidebar, OffCanvasToggle };
