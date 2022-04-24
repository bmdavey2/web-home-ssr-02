import { Context } from '@nuxt/types/app'

import getTrackDefaults from './getTrackDefaults'
import identifyProfile from './identifyProfile'
import track from './track'
import trackArticleImpression from './trackArticleImpression'
import trackArticleShareClick from './trackArticleShareClick'
import trackArticleViewed from './trackArticleViewed'
import trackClickedExternalLink from './trackClickedExternalLink'
import trackClickedProfileFromArticle from './trackClickedProfileFromArticle'
import trackClickedToCreateAccount from './trackClickedToCreateAccount'
import trackClickedToSignIn from './trackClickedToSignIn'
import trackPageView from './trackPageView'
import trackProductExternalClick from './trackProductExternalClick'
import trackProductImpression from './trackProductImpression'
import trackProductInquiry from './trackProductInquiry'
import trackProductViewed from './trackProductViewed'
import trackUpdateImpression from './trackUpdateImpression'
import trackUserLogIn from './trackUserLogIn'
import trackUserSignUp from './trackUserSignUp'
import trackError from './trackError'
import trackRaceRosterLogin from './trackRaceRosterLogin'
import trackMedalShare from './trackMedalShare'

export default function (context: Context) {
  return {
    getTrackDefaults: getTrackDefaults.bind(context),
    identifyProfile: identifyProfile.bind(context),
    track: track.bind(context),
    trackArticleImpression: trackArticleImpression.bind(context),
    trackArticleShareClick: trackArticleShareClick.bind(context),
    trackArticleViewed: trackArticleViewed.bind(context),
    trackClickedExternalLink: trackClickedExternalLink.bind(context),
    trackClickedProfileFromArticle: trackClickedProfileFromArticle.bind(context),
    trackClickedToCreateAccount: trackClickedToCreateAccount.bind(context),
    trackClickedToSignIn: trackClickedToSignIn.bind(context),
    trackPageView: trackPageView.bind(context),
    trackProductExternalClick: trackProductExternalClick.bind(context),
    trackProductImpression: trackProductImpression.bind(context),
    trackProductInquiry: trackProductInquiry.bind(context),
    trackProductViewed: trackProductViewed.bind(context),
    trackUpdateImpression: trackUpdateImpression.bind(context),
    trackUserLogIn: trackUserLogIn.bind(context),
    trackUserSignUp: trackUserSignUp.bind(context),
    trackError: trackError.bind(context),
    trackRaceRosterLogin: trackRaceRosterLogin.bind(context),
    trackMedalShare: trackMedalShare.bind(context),
  }
}
