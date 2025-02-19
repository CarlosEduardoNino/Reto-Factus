import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdministradorStore = defineStore("administrador", () => {
  const token = ref("");
  const refreshToken = ref("");

  function set_Token_RefreshToken(Token, RefreshToken) {
    if (Token && RefreshToken) {
      token.value = Token;
      refreshToken.value = RefreshToken;
    } else {
      console.log("no-token no-refreshToken");
    }
  }

  return {
    token,
    refreshToken,
    set_Token_RefreshToken
  };
}, {
  persist: true
});
