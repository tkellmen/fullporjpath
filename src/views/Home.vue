<template>
  <div class="home">
    <dashbord msg="Welcome to Your Vue.js App" />
    <v-card class="mx-auto" max-width="300" tile>
      <v-list dense>
        <v-subheader>REPORTS</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in products" :key="i">
            <v-list-item-icon>
              <span>{{item.name}}</span>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.price"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import dashbord from "@/components/dashbord.vue";
import db from "@/db";

export default {
  name: "home",
  components: {
    dashbord,
    db
  },
  data() {
    return {
      products: []
    };
  },
  created() {
    db.collection("Products")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.products.push(doc.data());
        });
      });
  }
};
</script>
