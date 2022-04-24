<template lang="pug">
.component-welcome-container
  .component-tovnav-left
    nuxt-link(to="/"): img.my-2(
      src="~/assets/images/Welcome/index-logo.svg"
      alt="Welcome to the world's healthiest social network"
      width="190"
      height="20")
  .component-tovnav-right
    .buttons
      figure.image.component-welcome-nav-imgshadow
        img(
          src="~/assets/images/Welcome/sign-in-logo.svg"
          alt="Active Place world's healthiest social network"
          width="42"
          height="42")
      a.button.btn-signin.btn-padding.has-text-primary(@click="showLogInDialog") SIGN IN
      b-button.btn-join.btn-padding(type="is-primary" tag="router-link" to="/signup") JOIN NOW
</template>

<script>
export default {
  name: 'XOWelcomeNavigation',
  methods: {
    showLogInDialog() {
      const fullScreen = this.lt('tabletLG')
      this.$buefy.modal.open({
        parent: this,
        component: require('~/components/pages/LogIn').default,
        width: 600,
        fullScreen,
        canCancel: !fullScreen,
        props: {
          fullScreen,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.is-fixed-top {
  background: transparent;
}

.btn-padding {
  padding: 20px;
}

.btn-signin {
  border-color: $primary;
  background: rgba(255, 255, 255, 0.1) !important;
}

.component-welcome-nav-imgshadow img {
  image-rendering: -webkit-optimize-contrast;
  vertical-align: middle;
  height: 42px;
  width: 42px;
  margin-right: 7px;
  -webkit-filter: drop-shadow(0 4px 10px rgba(10, 39, 46, 0.15));
  filter: drop-shadow(0 4px 10px rgba(10, 39, 46, 0.15));
}

.component-welcome-container {
  white-space: nowrap;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  overflow: hidden;
  position: fixed;
  z-index: 10;
  padding-top: 24px;

  .component-tovnav-right {
    float: right;
    width: max-content;
  }

  .component-tovnav-left {
    float: left;

    a {
      display: block;

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  @media only screen and (max-width: 329px) {
    .component-tovnav-right {
      width: 100px !important;
    }

    .btn-signin {
      padding: 5px 19px 5px !important;
      margin-right: 0 !important; /* no unit */
    }

    .btn-join {
      padding: 0 8px 0 !important; /* no unit */
    }

    .buttons {
      button {
        padding: 5px;
      }
    }
  }
  @media only screen and (max-width: 558px) {
    .component-welcome-nav-imgshadow {
      visibility: hidden;
      position: absolute;
    }

    .component-welcome-container {
      box-sizing: border-box;
      width: 100% !important;
      padding: 0 !important;
      left: 0 !important;
      transform: 0 !important;
    }

    .component-tovnav-left {
      img {
        width: 160px !important;
        height: 19px !important;
        margin-top: 10px;
      }
    }

    .component-tovnav-right {
      width: 120px;
    }

    .buttons {
      padding: 0 !important;
      justify-content: flex-end;
    }

    .btn-signin {
      padding: 20px 30px 20px;
      margin-right: 0 !important;
    }
  }
}
</style>
