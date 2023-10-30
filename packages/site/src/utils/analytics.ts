import ReactGA from 'react-ga4';

enum Category {
  user = 'User',
}

export enum Action {
  donateClick = 'Donate Click',
  donateSuccess = 'Donate Success',
  snapConnectClick = 'Snap Connect Click',
}

class Analytics {
  constructor() {
    this.init();
  }

  init() {
    if (process.env.GATSBY_GA_TRACKING_ID) {
      ReactGA.initialize(process.env.GATSBY_GA_TRACKING_ID);
    }
  }

  trackEvent({
    category,
    action,
    label,
    params,
  }: {
    category: Category;
    action: Action;
    label?: string;
    params?: any;
  }) {
    ReactGA.event(
      {
        category,
        action,
        label,
      },
      params,
    );
  }

  trackUserEvent({
    action,
    label,
    params,
  }: {
    action: Action;
    label?: string;
    params?: any;
  }) {
    this.trackEvent({
      category: Category.user,
      action,
      label,
      params,
    });
  }
}

const analytics = new Analytics();

export default analytics;
