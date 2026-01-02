/**
 * Font Awesome configuration
 * Import and configure icons here to optimize bundle size
 */
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBuilding as faBuildingRegular,
  faEnvelope as faEnvelopeRegular,
  faHome as faHomeRegular,
  faStar as faStarRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  faArrowDown,
  faArrowUp,
  faAt,
  faBuilding,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faCircle,
  faCircleNotch,
  faEdit,
  faEllipsisH,
  faEllipsisV,
  faExclamationCircle,
  faFilter,
  faHome,
  faMobileAlt,
  faPlus,
  faSearch,
  faSort,
  faSortDown,
  faSortUp,
  faSpinner,
  faStar,
  faTimes,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Compat: FA Free Regular doesn't ship `times`, but design/code may still reference `['far','times']`.
 * We alias the solid glyph to that lookup key so it renders without requiring Pro.
 */
const faTimesRegularCompat: IconDefinition = {
  ...faTimes,
  prefix: 'far',
  iconName: 'times',
};

/**
 * Compat: Free Regular doesn't ship `circle-notch`. Alias solid glyph to `['far','circle-notch']`.
 */
const faCircleNotchRegularCompat: IconDefinition = {
  ...faCircleNotch,
  prefix: 'far',
  iconName: 'circle-notch',
};

/**
 * Compat: `fal` (Light/Pro) isn't installed. Alias solid glyph to `['fal','circle-notch']`
 * so legacy design references still render.
 */
const faCircleNotchLightCompat: IconDefinition = {
  prefix: 'fal',
  iconName: 'circle-notch',
  icon: [
    512,
    512,
    [],
    'f1ce',
    // Custom thin "circle notch" (donut segment). This is NOT the Pro glyph; it's a compatible lightweight look.
    'M464 376A240 240 0 1 1 464 136L443 148A216 216 0 1 0 443 364Z',
  ],
};

/**
 * Compat: `fal` (Light/Pro) isn't installed. Use regular outline star for `['fal','star']`
 * so legacy design references still render with proper thin/unfilled look.
 */
const faStarLightCompat: IconDefinition = {
  ...faStarRegular,
  prefix: 'fal',
  iconName: 'star',
};

// Add icons to the library for global use
library.add(
  faUser,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faFilter,
  faAt,
  faBuilding,
  faHome,
  faSort,
  faSortUp,
  faSortDown,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faArrowUp,
  faArrowDown,
  faTimes,
  faCheck,
  faCircle,
  faCircleNotch,
  faSpinner,
  faStar,
  faEllipsisH,
  faEllipsisV,
  faExclamationCircle,
  faMobileAlt,
  faBuildingRegular,
  faHomeRegular,
  faEnvelopeRegular,
  faTimesRegularCompat,
  faCircleNotchRegularCompat,
  faCircleNotchLightCompat,
  faStarLightCompat,
);
