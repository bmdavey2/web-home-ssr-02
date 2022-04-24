<template lang="pug">
.xm-businesses-any-questions
  .container
    .contents
      .left-content
        h2 Any questions?
        .card
          .card-content
            .accordions
              .accordion(v-for="(question, index) in questions")
                ._header(@click.prevent="doActiveQuestion(question.id)")
                  ._title.is-flex-width-auto {{ question.title }}
                  ._icon: b-icon(:icon="activeQuestion === question.id ? 'chevron-down' : 'chevron-right'")
                ._content(v-if="activeQuestion === question.id") {{ question.content }}
        .actions
          b-button.btn-plans-pricing(
            type="is-primary"
            size="is-medium"
            tag="router-link"
            to="/businesses/plans-pricing") Discover Plans and Pricing
      .right-content
</template>

<script>
export default {
  name: 'XMBusinessesAnyQuestions',
  data() {
    return {
      questions: [
        {
          id: 1,
          title: `Can you tell me quickly what ActivePlace is?`,
          content: `We'll try! Put everything you love about a social platform in your left hand, and everything you love about a marketplace in your right hand, now combine them, and throw away all the topics that aren't related to your health, fitness or active lifestyle, that's ActivePlace.`,
        },
        {
          id: 2,
          title: `When you say health, fitness and active lifestyle, what do you mean?`,
          content: `Everything on ActivePlace is aligned to community interests, which include: General Wellness, Running, Active Culture, Adventure Racing, Cycling, Swimming, Triathlon, Health & Nutrition, Yoga, Training, Trail Running, Mountain Biking, Crossfit, General Outdoors, Hiking, Hydration, Meditation, Obstacle Racing, Pilates, Self Development, Recovery & Injuries, Supplements, Ultra Distance, Walking, Weight Management, Duathlon, Mental Wellness, Combat Sports, Apparel, Footwear, Accessories, and Equipment.`,
        },
        {
          id: 3,
          title: `What type of businesses, products and services are relevant on ActivePlace?`,
          content: `Event Organizers, Travel & Tour Operators, Active Programs (Virtual or IRL), Consumer Goods, Governing Bodies, Personal Trainers, Coaches, Instructors, Qualified Practitioners`,
        },
        {
          id: 4,
          title: `Sometimes technology annoys me, is ActivePlace easy to use?`,
          content: `Yes! It feels familiar and is really simple to use. We made it for novices and seasoned professionals alike. If you ever need help, we're here 24/7.`,
        },
        {
          id: 5,
          title: `How much support do you provide businesses?`,
          content: `Every single business subscription comes with a 30 day training program. This starts from the moment you set up your business, and includes guidance on the basics, pro tips, face to face time with co-founders, case studies and 24/7 support. Beyond that, we're always here. Remember what Cyndi Lauper said... "If you fall, I will catch you, i'll be waiting.." Our support is kind of like that.`,
        },
        {
          id: 6,
          title: `Do all businesses start on the Warm Up Package?`,
          content: `Right now, yes, but that will change when new plans are added to our range. Higher priced plans have a broader kit of business tools, some of which are yet to be released. We'll alert you when we open new plans, or add new business tools to your existing plan.`,
        },
        {
          id: 7,
          title: `How do I know if I need ActivePlace?`,
          content: `If you want to grow your business by reaching more of the right customers, at the right time, you will love it. Not sure still? Let's have a call so you can fire some questions at us and see what you think?`,
        },
        {
          id: 8,
          title: `I'm ready to get started, what do I need to do?`,
          content: `Awesome, that's exciting! Click on the button just below to get started, or, if you'd like help, click the Support button in the bottom left corner.`,
        },
      ],
      activeQuestion: 0,
    }
  },
  methods: {
    doActiveQuestion(id) {
      if (this.activeQuestion === id) {
        this.activeQuestion = 0
        return
      }
      this.activeQuestion = id
    },
  },
}
</script>

<style lang="scss" scoped>
.xm-businesses-any-questions::v-deep {
  padding: 100px 0;
  overflow: hidden;

  .contents {
    display: flex;
    flex-wrap: wrap;

    .left-content {
      width: 100%;
      max-width: 575px;

      h2 {
        text-align: center;
        margin-bottom: 50px;
        color: #050505;
      }

      .card {
        z-index: 2;

        &::after {
          background-image: url('~assets/images/Businesses/got-questions-background.webp');
          background-position: right center;
          background-repeat: no-repeat;
          background-size: cover;
          content: '';
          position: absolute;
          top: 0;
          left: 575px;
          width: calc(100% + 575px);
          height: 100%;
          z-index: 1;
        }

        .card-content {
          padding: 0;
          z-index: 2;
          background-color: $white;

          .accordions {
            .accordion {
              border-left: 4px solid $primary;
              border-bottom: 1px solid #eef1f1;
              padding: 20px;

              &:last-child {
                border-bottom: 0;
              }

              ._header {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                cursor: pointer;
                user-select: none;

                ._title {
                  font-size: 16px;
                  line-height: 20px;
                  color: $secondary;
                  padding-right: 10px;
                }
              }

              ._content {
                font-size: 1.1429rem;
                line-height: 1.7143rem;
                font-weight: 300;
                padding-top: 10px;
              }
            }
          }
        }
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 30px;

        button,
        a {
          margin: 0 10px;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .contents {
      .left-content {
        .card {
          &::after {
            width: 100%;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .contents {
      .left-content {
        max-width: 65%;

        .card {
          &::after {
            left: 80%;
            z-index: -1;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .contents {
      .left-content {
        max-width: 100%;

        .card {
          &::after {
            content: none;
          }
        }

        .actions {
          .btn-help {
            order: 2;
          }

          .btn-plans-pricing {
            order: 1;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
