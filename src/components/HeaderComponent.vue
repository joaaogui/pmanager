<template>
  <div class="header">
    <span class="header__greeting">Olá João Guilherme!</span>
    <span class="header__time">
      <span>{{ day }}</span> <span>{{ time }}</span>
    </span>
  </div>
</template>
<script>
import { todaysDate, todaysTime } from "@/utils";

export default {
  setup() {
    return {
      time: todaysTime(),
      day: todaysDate(true),
    };
  },
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  border-bottom: 3px gray solid;
  padding: 8px 0;
  background-color: white;

  &__greeting {
    position: absolute;
    left: 12px;
    @media only screen and (max-width: 720px) {
      display: none;
    }
  }

  &__time {
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    gap: 6px;
  }
}
</style>
