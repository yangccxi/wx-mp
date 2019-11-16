import {
  ccnavigateTo
} from "../../utils/util.js";

Page({
  onReady() {
    setTimeout(() => {
      ccnavigateTo("../lead/lead");
    }, 3000)
  }
})