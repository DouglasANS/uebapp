export default {
  expo: {
    name: "UEB",
    slug: "funemgapp",
    version: "1.0.9",
    orientation: "portrait",
    icon: "./assets/images/ueb3.png",
    scheme: "uebapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      }
    },
    android: {
      versionCode: 9,
      permissions: [],
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ff1481"
      },
      splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.linstef.uebcarteirinha"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff"
        }
      ],
      "expo-web-browser",
      "expo-font"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "842d0d2d-e868-4d03-b0b6-73b7cb79b928"
      }
    },
    owner: "linstef",
    updates: {
      url: "https://u.expo.dev/842d0d2d-e868-4d03-b0b6-73b7cb79b928"
    }
  }
};