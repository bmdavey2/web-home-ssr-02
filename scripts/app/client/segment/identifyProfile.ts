import gql from 'graphql-tag'
import { Context } from '@nuxt/types/app'
import compact from 'lodash/compact'
import Vue from 'vue'

export default async function (this: Context) {
  if (!process.client) return
  const {
    data: {
      Me: { BusinessRoles, Profile },
    },
  } = await this.app.apolloProvider!.defaultClient.query({
    fetchPolicy: 'no-cache',
    query: gql`
      query {
        Me {
          BusinessRoles {
            Business {
              name
            }
          }
          Profile {
            Member {
              UserID
              firstName
              lastName
              name
              gender
              personalStatus
              Categories {
                name
              }
              birthDate
              country
              createdAt
              phoneNumber
              ap5FavoriteEvents
              ap5InspiredBy
              ap5PassionateAbout
              ap5ToughestThing
              ap5TrainingWith
              Aggregates {
                updates
                articlesPublished
                likes
                likesReceived
              }
            }
          }
        }
      }
    `,
  })

  const profile = Profile.Member
  const businessList = compact(BusinessRoles.map((x: any) => x.Business?.name))
  if (!profile) return

  const { ap5FavoriteEvents, ap5InspiredBy, ap5PassionateAbout, ap5ToughestThing, ap5TrainingWith } = profile
  const ap5s = [ap5FavoriteEvents, ap5InspiredBy, ap5PassionateAbout, ap5ToughestThing, ap5TrainingWith]

  const empty = ap5s.every((ap5) => ap5 === null || ap5 === '')
  let ap5
  if (empty) {
    ap5 = 'empty'
  } else {
    const finished = ap5s.every((ap5) => ap5 !== '')
    if (finished) {
      ap5 = 'finished'
    } else {
      ap5 = 'started'
    }
  }

  const interests = profile.Categories.map((category: any) => category.name)

  let phone, businesses
  // if (profile?.Mentor) mentor = profile?.Mentor?.badge
  if (profile?.phoneNumber) phone = profile?.phoneNumber
  if (businessList.length > 0) businesses = businessList

  const props = {
    ...this.app.$appClient.segment.getTrackDefaults(),
    email: this.store.state.auth?.email,
    typeOfUser: profile?.personalStatus,
    birthday: this.$moment(profile?.birthDate).format('MMMM D, YYYY'),
    createdAt: this.$moment(profile?.createdAt).format('MMMM D, YYYY [at] h:mm a'),
    updates: profile?.Aggregates?.updates || 0,
    articles: profile?.Aggregates?.articlesPublished || 0,
    highFivesGiven: profile?.Aggregates?.likes || 0,
    highFivesReceived: profile?.Aggregates?.likesReceived || 0,
    // achievements: profile?.Aggregates?.achievements || 0,
    interests,
    phone,
    businesses,
    ap5,
  }

  Vue.$segment.identify(profile.UserID, props)
}
