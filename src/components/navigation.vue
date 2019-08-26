<template>
  <div>
    <v-navigation-drawer absolute temporary v-model="drawer">
      <v-list-item v-for="(item,i) in sortedProduct()" :key="i" :to="item.router" link>
        <v-list-item-icon>
          <v-icon>{{ item.icons }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-toolbar light>
      <v-row>
        <v-icon
          @click.prevent="drawer = !drawer"
          color="teal"
          fab
          class="ma-4 hidden-md-and-up"
          dark
        >list</v-icon>
        <v-col>
          <router-link to="/" tag="span">
            <v-icon class="pt-2 logo" large utlined tile right>fingerprint</v-icon>
          </router-link>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto">
          <v-tabs class="hidden-sm-and-down">
            <v-tabs>
              <v-tab
                v-for="(item,i) in sortedProduct()"
                :key="i"
                :to="item.router"
                v-on:click="method_1($event, i)"
              >
                <v-icon class="pr-2">{{item.icons}}</v-icon>
                {{item.title}}
              </v-tab>
            </v-tabs>
          </v-tabs>
        </v-col>
      </v-row>
    </v-toolbar>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/db";

export default {
  name: "navigation",

  data() {
    return {
      navigationItems: [],
      drawer: false
    };
  },
  created() {
    db.collection("Navigation-items")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.navigationItems.push(doc.data());
        });
      });
  },
  methods: {
    method_1: function(ev, i) {
      if (ev.path[0].computedName === "LOGOUT") {
        this.logout();
      }
    },
    sortedProduct() {
      if (
        this.$store.getters.user == null &&
        this.$store.getters.user == undefined
      ) {
        let babels = this.navigationItems.filter(word => word.required == true);
        return babels.slice().sort((a, b) => {
          return a.id - b.id;
        });
      } else {
        let babels = this.navigationItems.filter(
          word => word.isauthenticated == true
        );
        return babels.slice().sort((a, b) => {
          return a.id - b.id;
        });
      }
    },
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo.theme--light.v-icon {
  color: #1976d2;
  cursor: pointer;
}
</style>
