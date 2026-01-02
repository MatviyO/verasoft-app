import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBuilding as faBuildingRegular,
  faEnvelope as faEnvelopeRegular,
  faHome as faHomeRegular,
  faStar as faStarRegular,
  faUser as faUserRegular,
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
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';

const faTimesRegularCompat: IconDefinition = {
  ...faTimes,
  prefix: 'far',
  iconName: 'times',
};

const faCircleNotchRegularCompat: IconDefinition = {
  ...faCircleNotch,
  prefix: 'far',
  iconName: 'circle-notch',
};

const faCircleNotchLightCompat: IconDefinition = {
  prefix: 'fal',
  iconName: 'circle-notch',
  icon: [
    512,
    512,
    [],
    'f1ce',
    'M464 376A240 240 0 1 1 464 136L443 148A216 216 0 1 0 443 364Z',
  ],
};

const faStarLightCompat: IconDefinition = {
  ...faStarRegular,
  prefix: 'fal',
  iconName: 'star',
};

const faUserLightCompat: IconDefinition = {
  ...faUserRegular,
  prefix: 'fal',
  iconName: 'user',
};

const faUserAltLightCompat: IconDefinition = {
  ...faUserAlt,
  prefix: 'fal',
  iconName: 'user-alt',
};

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
  faUserRegular,
  faCircleNotchLightCompat,
  faStarLightCompat,
  faUserLightCompat,
  faUserAltLightCompat,
);
