<template lang="pug">
#what-is-mentor.what-is-mentor
  .background.is-flex.is-flex-wrap-wrap
    .left-background
    .right-background 
  .container.is-max-widescreen
    ._content.is-flex.is-flex-wrap-wrap
      .left-content
        h2 What is mentor?
        .sub-heading By definition, a Mentor is an experienced and trusted person.
        p.has-text-weight-light They’re highly experienced, representing leadership and knowledge, as a result of an authentic commitment to their field. On ActivePlace, Mentors are visibly elevated within the community, featuring as leaders within health, wellness and active lifestyle interests.

      .right-content
</template>

<script>
export default {
  name: 'XMMentorWhatisMentor',
}
</script>

<style lang="scss" scoped>
.what-is-mentor::v-deep {
  position: relative;

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 560px;
    z-index: 1;

    .left-background {
      background-color: #f8f8f8;
      width: 65%;
    }

    .right-background {
      background-color: #cff1f8;
      width: 35%;
    }

    @media screen and (max-width: $BPdesktop) {
      height: 500px;
    }
    @media screen and (max-width: $tabletLG) {
      visibility: hidden !important;
    }
  }

  ._content {
    position: relative;
    z-index: 2;
    font-size: 1.1429rem;
    padding-top: 8.5714rem;

    .left-content {
      width: 100%;
      max-width: 455px;
      padding: 110px 0;

      .sub-heading {
        margin-top: 1.0714rem;
        margin-bottom: 2.1429rem;
        letter-spacing: -0.9px;
      }
    }

    .right-content {
      margin-left: 2.8571rem;
      background-image: url('~assets/images/Mentors/what-is-mentor.png');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    @media screen and (max-width: $BPdesktop) {
      padding-top: 3.5714rem;

      .left-content {
        max-width: 50%;
        padding: 50px 0;
      }
    }

    @media screen and (max-width: $tabletLG) {
      .left-content {
        max-width: 100%;
        padding: 0 0 30px;

        h2 {
          font-size: 2.1429rem;
          line-height: 2.7143rem;
        }
      }

      .right-content {
        margin: 0 -15px -10px;
        background-image: none;
      }
    }
  }

  @media screen and (min-width: $tabletLG) {
    .right-content {
      flex: 10000 1 0%;
    }
  }

  @media screen and (max-width: $tabletLG) {
    background-color: #f8f8f8;
  }
}
</style>
