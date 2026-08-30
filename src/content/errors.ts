import { ErrorContent } from '../types';

export const defaultErrors: ErrorContent = {
  error404: {
    title: '404 - Wrong Turn Ahead!',
    subtitle: 'Looks like this road doesn’t exist or has been rerouted.',
    description: 'Don’t worry — even the best drivers make a wrong turn now and then. Use the navigation below to get back on the main highway.',
    primaryButtonText: 'Back to Home Highway',
    secondaryButtonText: 'Explore Driving Courses',
  },
  error403: {
    title: '403 - Restricted Driving Zone',
    subtitle: 'You do not have administrative authorization for this area.',
    description: 'This lane is reserved for certified DriveCraft administrators. Please return to the public academy or log in with verified credentials.',
  },
  error500: {
    title: '500 - Unexpected Engine Stall',
    subtitle: 'Our technical pit crew is already looking under the hood.',
    description: 'An unexpected application error occurred. We apologize for the bump in the road. Please refresh the page or head back to home.',
  },
  error503: {
    title: '503 - Pit Stop in Progress',
    subtitle: 'Routine maintenance and performance tune-up.',
    description: 'Our digital academy is undergoing scheduled maintenance to upgrade your experience. We will be back at full speed shortly.',
  },
  offline: {
    title: 'Off the Grid - Connection Lost',
    subtitle: 'You have driven into a low network zone.',
    description: 'Please check your Wi-Fi or mobile data connection to resume browsing our driving academy resources.',
  },
};
