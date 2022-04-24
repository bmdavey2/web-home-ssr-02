<template lang="pug">
.xp-about
  .banner
    .container: h1 It shouldn’t be so hard to stay active…
  .contents
    .container.is-max-desktop
      p Like a lot of people, I found myself thinking this a few years ago. It wasn’t just about the battle to get out of bed early and put on my trainers.

      p It was modern day life and how insanely busy and distracting it had become. Notifications, meetings, alerts, comments, likes, calls, texts, Instagram, Facebook, Twitter, Youtube, Netflix, this influencer, that influencer, this brand, that brand, what brand?

      p Too much information in too many places and not enough time!

      p Instead of feeling enabled, I felt overwhelmed and confused.

      p While there was LinkedIn to simplify my business interactions, Facebook for my family and friends, there was nothing for helping me to stay active and healthy. Nowhere centralised with all the information and inspiration I craved to enhance that really important part of my life. No community to lean on for support and solace, and no trusted source I could find it from.

      p So, I reached out to some trusted friends and contacts to see if they would help build it with me.

      p ActivePlace is that specialized social marketplace the world’s active community has been craving for so long. Bringing together like-minded people and businesses from across the globe and providing them a destination to embrace their health, wellness and active life. Coaches, athletes, brands, amateurs, first timers and everything in between, all sharing stories, info, advice, products, events and active things to do that motivate us to tie up those laces and get moving every day, no matter how hard it feels or how hard times get.

      p Everything ActivePlace does, everything we build, has three principles in mind – does it help you GROW, does it help you become INSPIRED, does it help you connect to a COMMUNITY.

      p ActivePlace knows your health and active life is a journey, not a destination, and it believes in a future of meeting the modern day customers expectations, seamlessly integrating into their personal definition of active life.

      p It is right here that I hope you get that and more. After all, it’s your space, your active culture, your lifestyle. We’re just here to make it easy. It’s that simple!

      p Co-Founder &amp; CEO

      p Damien
</template>

<script>
export default {
  name: 'XPAbout',
}
</script>

<style lang="scss" scoped>
.xp-about::v-deep {
  border-bottom: 1px solid #e3e3e3;

  h1 {
    font-size: 4.2857rem;
    font-weight: 500;
    line-height: 1.2;
  }

  p {
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 20px;
  }

  .banner {
    background-image: url('~assets/images/About/banner.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 600px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    h1 {
      color: $secondary;
      width: 100%;
      max-width: 640px;
    }
  }

  .contents {
    padding: 100px 0;
    background-color: $white;
  }

  @media screen and (max-width: 767px) {
    h1 {
      font-size: 2.2857rem;
    }

    .banner {
      min-height: 400px;

      h1 {
        text-align: center;
      }
    }

    .contents {
      padding: 50px 0;
    }
  }
}
</style>
