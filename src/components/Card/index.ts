import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardImage } from './CardImage';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ Card, CardBody, CardFooter, CardHeader, CardImage });
export { Card, CardBody, CardFooter, CardHeader, CardImage };
export * from './Image';
