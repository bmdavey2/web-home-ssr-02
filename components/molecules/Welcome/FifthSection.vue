<template lang="pug">
.section
  .fifth-contetn(style="max-width: 368px")
    h2.middle-text.is-mobile.is-size-1.is-size-3-mobile.has-text-centered.is-family-secondary
      | Your health is
      | literally everything.
    .py-5.px-3
      p.sm-middle-text.page-welcome-middletext.has-text-centered.has-text-weight-light.has-text-black-bis
        | The most important thing in your life now has a
        | place to call home, and you’re welcome to stay
        | as long as you like.
    .buttons
      b-button.mx-5(type="is-primary" tag="a" href="/trending" expanded) CLICK HERE.<i>Go to the feed</i>
  .page-welcome-container
    .page-welcome-footer
      ul.has-text-weight-medium.has-text-black-bis.is-uppercase.has-text-centered
        li: a(href="/businesses") BUSINESSES
        li: a(href="/mentors") MENTORS
        li: a(href="/about") ABOUT
        li: a(href="/faq") FAQ
        li: a(href="/contact") CONTACT
        li: a(href="/privacy-policy") PRIVACY
        li: a(href="/terms-conditions") TERMS
      p.has-text-centered @ActivePlace{{ new Date().getFullYear() }}
</template>

<script>
export default {
  name: 'XMWelcomeFifthSection',
}
</script>

<style lang="scss" scoped>
.fifth-contetn {
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  text-align: center;
}

.middle-text {
  white-space: pre;
  color: #f15a29;
}

.sm-middle-text {
  font-size: 16px;
}

@media screen and (max-width: $tabletLG) {
  .middle-text {
    margin: 0 !important;
    padding: 0 !important;
    padding-top: 30px !important;
    line-height: 40px !important;
  }
}

@media screen and (max-width: 375px) {
  .sm-middle-text {
    font-size: 13px !important;
  }
}

.page-welcome-container {
  position: absolute;
  top: 85%;
  width: 100%;
  font-size: 16px;

  .page-welcome-footer {
    margin: 0 auto;
    width: 70%;

    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    li {
      box-sizing: border-box;
      flex-basis: calc(30% / 2 - 3%);
      margin: 1% auto;
    }

    a {
      color: $secondary;
      font-weight: normal;
    }

    a:hover {
      color: $primary;
    }

    @media screen and (max-width: $tabletLG) and (min-width: $BPdesktop) {
      width: 85%;
    }

    @media screen and (max-width: $tabletSM) {
      width: 95% !important;
      li {
        font-size: 15px;
        margin: 1%;
      }
    }
  }
}
</style>
