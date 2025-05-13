<template>
  <nav>
    <router-link to="/">首頁</router-link> |
    <router-link to="/about">關於</router-link> |
    <router-link to="/contact">聯絡我們</router-link>
  </nav>
  <router-view></router-view>
</template>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
